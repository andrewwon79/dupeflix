require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");
const verify = require('./verifyToken');
const { s3Uploadv3, s3Deletev3 } = require("./s3Service");
const app = express();
const multer = require("multer");
const e = require("express");
const uuid = require("uuid").v4;


//This middleware takes our json body data we put in postman
//and makes it nice for our create restaurant API
app.use(express.json());

//This prevents domain cors error because server and frontend run on different domains
//have to npm install cors
app.use(cors());

//Register a new user
app.post("/api/auth/register", async (req,res) => {
    console.log(req.body);
     try{
        const encryptedPass = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString();

        const results = req.body.isadmin ? 
        await db.query("INSERT INTO users (username, email, password, isadmin) VALUES ($1, $2, $3, $4) returning *;",[req.body.username, req.body.email, encryptedPass, req.body.isadmin]) 
        : await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) returning *;",[req.body.username, req.body.email, encryptedPass]);

        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0],
            }
        });
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    } 
});

//Login existing user
app.post("/api/auth/login", async (req,res) => {
    try{
        const userInfo = await db.query("SELECT * FROM users WHERE email = $1;", [req.body.email]);
        if(userInfo.rowCount === 0) {
            res.status(401).json("Wrong password or username!");
        }
        else
        {
            console.log(userInfo.rows);
            const bytes = CryptoJS.AES.decrypt(userInfo.rows[0].password, process.env.SECRET_KEY);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            const accessToken = jwt.sign({id: userInfo.rows[0].id, isadmin: userInfo.rows[0].isadmin},process.env.SECRET_KEY,{expiresIn: "5d"});

            if(originalPassword !== req.body.password)
            {
                res.status(401).json("Wrong password or username!");
            }
            else
            {
                //This returns everything except the password, which we store in the password variable
                //We don't want to show password in our return status
                //...info is the spread operator, spreads out our array into nice elements
                const {password, ...info} = userInfo.rows[0];
                res.status(200).json({...info,accessToken});
            }
                          
        }
        
    }catch(err){
        console.log(err);
    }
});

//UPDATE
app.put("/api/users/:id",verify, async (req,res) => {
    if(req.user.id === req.params.id || req.user.isadmin) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }
        try {
            const results = await db.query("UPDATE users SET username = $1, email  = $2, password = $3 WHERE id = $4 returning *;",
            [req.body.username,req.body.email,req.body.password,req.params.id]
            );
            res.status(200).json({
                status: "success",
                data: {
                    results: results.rows[0],
                }
            });
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can update only your account!");
    }
});

//DELETE
app.delete("/api/users/:id",verify, async (req,res) => {
    if(req.user.id === req.params.id || req.user.isadmin) {
        try {
            await db.query("DELETE FROM users WHERE id = $1;", [req.params.id]);
            res.status(200).json({
                status: "Successfully deleted",
            });
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can delete only your account!");
    }
});

//GET
app.get("/api/users/find/:id", async (req,res) => {
        try {
            const user = await db.query("SELECT * FROM users WHERE id = $1;", [req.params.id]);
            console.log(user.rows[0]);
            const {password, ...info} = user.rows[0];
            res.status(200).json({...info});
        }catch(err) {
            res.status(500).json(err);
        }
});

//GET ALL
app.get("/api/users",verify, async (req,res) => {
    //How this query works
    //if we just have http://localhost:3006/users/ this query will be false, but
    //if we have http://localhost:3006/users?new=true then query will return true, then we will limit number of returns in the statement below
    const query = req.query.new;
    if(req.user.isadmin) {
        try {
            const users = query ? await db.query("SELECT * FROM users ORDER BY id DESC LIMIT 10;") : await db.query("SELECT * FROM users;");
            res.status(200).json(users.rows);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed to see all users!");
    }
});

//GET USER STATS
app.get("/api/users/stats", async (req, res) => {
    const today = new Date()
    today.setFullYear( today.getFullYear() - 1 );
    console.log(today);
    
    try{        
        //ok we want to FIRST filter by created_at with our query, then with this result, refine it even further by getting the count, then extracting, then grouping
        const data = await db.query("SELECT EXTRACT(MONTH FROM created_at), COUNT(id) AS count FROM (SELECT * FROM users WHERE created_at >= $1 AND created_at < now()) GROUP BY \"extract\";", [today]);
        /* const data = await db.query("SELECT DATE_TRUNC('month',created_at)::date AS created_at_month, COUNT(id) AS count "
        + "FROM (SELECT * FROM users WHERE created_at >= $1 AND created_at < now()) "
        + "GROUP BY DATE_TRUNC('month',created_at);", [today]);  */
        res.status(200).json(data.rows);
    
    }catch(err){
        res.status(500).json(err);
    }
})

app.get("/api/users",verify, async (req,res) => {
    //How this query works
    //if we just have http://localhost:3006/users/ this query will be false, but
    //if we have http://localhost:3006/users?new=true then query will return true, then we will limit number of returns in the statement below
    const query = req.query.new;
    if(req.user.isadmin) {
        try {
            const users = query ? await db.query("SELECT * FROM users ORDER BY id DESC LIMIT 10;") : await db.query("SELECT * FROM users;");
            res.status(200).json(users.rows);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed to see all users!");
    }
});

app.get("/api/user/verify/:id",verify, async (req,res) => {
    try {
        res.status(200).json("success");
    }catch(err) {
        console.log("error!");
        res.status(500).json(err);
    }
});

//Movie section apis

//where we handle offline uploading, but some of it is still applicable to cloud
//Also where we do error handling for failed uploads
{

//This is how we get multer to upload a SINGLE file from postman to our local machine
//This upload is our middleware that handles files for single file uploads
/* const upload = multer({dest: "uploads/" });

app.post("/api/movies/s3",verify,upload.single("movie"), async(req, res) => {
    try {
        //const results = await s3Uploadv3(movie);
        //console.log(results);
        return res.json({status: "success"});
    }catch(err){
        console.log(err);
    }
}) */

//This is how we get multer to upload MULTIPLE files from postman
/* const upload = multer({dest: "uploads/" });
//The 2 next to movie restricts how many files user is allowed to upload at once
app.post("/api/movies/s3",verify,upload.array("movie", 2), async(req, res) => {
    try {
        //const results = await s3Uploadv3(movie);
        //console.log(results);
        return res.json({status: "success"});
    }catch(err){
        console.log(err);
    }
}) */

//multiple fields upload
//const upload = multer({dest: "uploads/" });
//This handles on postman where our form-data has 2 rows
//right now its handling where
//key: avatar (max files we can upload is 1 for this)
//key: resume (max files we can upload is 1 for this)
/* const multiUpload = upload.fields([
    {name: "avatar", maxCount: 1}, 
    {name: "resume", maxCount: 1}
],)
app.post("/api/movies/s3",verify,multiUpload, async(req, res) => {
    try {
        //const results = await s3Uploadv3(movie);
        //when we console log req.files, it shows us various properties of the file uploaded
        //important one is mimtype, multer will determine what the file truly is
        //User can rename anything to .png so we dont trust that, mimetype will give us truly what it is
        console.log(req.files);
        return res.json({status: "success"});
    }catch(err){
        console.log(err);
    }
}) */

//This is how we rename files that multer uploads, by default it'll give the file that user has uploaded a gibberish name
//We can make multer rename it to what we want
//cb means callback function
/* const storage = multer.diskStorage({
    destination: (req,file, cb) => {    
        cb(null, "uploads");
    },
    //this bottom function will run everytime we upload a file
    //the file variable we have in filename function contains all those fields we get when we printed req.files, mimetype, size, name, etc.
    //this is where we rename it, uuid will just generate a random number for us, I guess to make sure its unique
    //need to use npm install uuid
    filename: (req,file,cb) => {
        const {originalname} = file;
        cb(null, `${uuid()}-${originalname}`);
    }
}); */

//this ensures that we receive only the type of file we want
//if we want all images we would want to make sure mimetype = image
//or mimetype = image/jpeg specifically
//in this bottom case we want user to be able to upload all images, split will give us this ["image","jpeg"]
//to use this filter in our "upload = multer" we pass in , fileFilter like below
/* const fileFilter = (req,file,cb) => {
    if(file.mimetype.split("/")[0] === 'image'){
        cb(null,true);
    } else {
        //this will make our error an unexpected file error and go into our error handling app.use statement
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false);
    }
}; */

//storage handles where our file uploads, and we rename it
//fileFilter ensures user is uploading correct file type, image, jpeg, video, etc.
//limits: fileSize ensure user doesn't upload a 40gb image 1000 = 1kb, 1000000 = 1mb
//limits: files: 1 ensures that user is only uploading 2 or less files, I guess this is similar to above but better i think

/* const upload = multer({storage, fileFilter, limits: {fileSize: 1000000, files: 2}}); */

//The 2 next to movie restricts how many files user is allowed to upload at once
//but this is perhaps deprecated because in the above we set the limites in files: 2
//original looked like this upload.array("movie", 2)
/* app.post("/api/movies/s3",verify,upload.array("movie", 2), async(req, res) => {
    try {
        //const results = await s3Uploadv3(movie);
        //console.log(results);
        return res.json({status: "success"});
    }catch(err){
        console.log(err);
    }
}) */

}

//where we will do our cloud based uploading, test version


    //disk storage is for local
    //const storage = multer.diskStorage({
    const storage = multer.memoryStorage({
        destination: (req,file, cb) => {    
            cb(null, "uploads");
        },

        filename: (req,file,cb) => {
            const {originalname} = file;
            cb(null, `${uuid()}-${originalname}`);
        }
    });

    const fileFilter = (req,file,cb) => {
        console.log("filtering " +file.originalname);
        if(file.fieldname === 'video' || file.fieldname === 'trailer')
        {
            if(file.mimetype.split("/")[0] === 'video'){
                cb(null,true);
            } else {
                //this will make our error an unexpected file error and go into our error handling app.use statement
                cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false);
            }
        }
        else
        {
            if(file.mimetype.split("/")[0] === 'image'){
                cb(null,true);
            } else {
                //this will make our error an unexpected file error and go into our error handling app.use statement
                cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false);
            }
        }
    };

    //const upload = multer({storage, limits: {fileSize: 100000000, files: 5}});
    const upload = multer({storage,fileFilter, limits: {fileSize: 100000000, files: 5}});


    app.post("/api/movies/s3",verify,upload.array("movie"), async(req, res) => {
        //const movie = req.files[0]; //this is only for a singular file
        const movies = req.files;
        try {
            //then pass into our s3uploadv3
            const results = await s3Uploadv3(movies);
            console.log(results);

            return res.json({status: "success",});
        }catch(err){
            console.log(err);
        }
    })


const multiUpload = upload.fields([
    {name: "img"}, 
    {name: "imgTitle"},
    {name: "imgSm"}, 
    {name: "trailer"}, 
    {name: "video"}, 
])

//Create Movie
app.post("/api/movies/",verify, multiUpload, async (req,res) => {
    const movieFiles = req.files;
    //const jsonMovies = JSON.parse(JSON.stringify(movieFiles));
    let jsonMovies = [];
    let urlPaths = [];
    console.log(req.headers);
    console.log("files");
    console.log(movieFiles);
    console.log("body");
    console.log(req.body);
    //this below is done because we have multiple fields for multiple uploads
    //if we were doing a single field with multiple uploads then we don't need to do this and can just pass in movieFiles to our s3Uploadv3
    //for some reason the multiple field uploads will return an object with an array for each field
    //the single field upload returns an array for each files properties
    const movieObjects = Object.values(movieFiles);
    movieObjects.forEach(element => {
        //The order we will push file urls in here is img, imgtitle, imgsm, trailer, video
        urlPaths.push(`https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/${element[0].originalname}`);
        jsonMovies.push(element[0]);
    });

    if(req.user.isadmin) {
        //This req.user is returned to us from our verify function, grabs it from decoding the token
        try{
            const results = await s3Uploadv3(jsonMovies);
            //console.log(jsonMovies);
            
            const updatedMovie = await db.query("INSERT INTO movies (title, description, img, imgtitle, imgsm, trailer, video, year, agelimit, movielength, genre, isseries) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *;",
            //[req.body.title, req.body.description, urlPaths[0], urlPaths[1], urlPaths[2], "https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/interstellartrailer.mp4", "https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/interstellarvideo.mp4", req.body.year, req.body.agelimit, req.body.movielength, req.body.genre, req.body.isseries]);
            //We have some hardcoded strings here because we are inputting dummy data
            [req.body.title, req.body.description, urlPaths[0], urlPaths[1], urlPaths[2], urlPaths[3], urlPaths[4], req.body.year, req.body.agelimit, req.body.movielength, req.body.genre, req.body.isseries]);
            //return res.json({status: "success"});
            res.status(201).json(updatedMovie.rows[0]);
        }catch(err){
            res.status(500).json(err);
        }
    }else {
        res.status(403).json("You are not allowed!");
    }
});

//Update Movie
//We will first grab the file URL's we want changed from our DB then delete it on S3
//After we delete then we will build a query with the columns we want changed then upload new files onto S3 and then update with new values/url
app.put("/api/movies/:id",verify,multiUpload, async (req,res) => {
    if(req.user.isadmin) {
        try {
            let counter=1;
            let jsonMovies = [];
            const movieFiles = req.files;
            const movieObjects = Object.values(movieFiles);

            //build our query, we will only update the changed values
            let query = "UPDATE movies SET ";
            let selectQuery = "SELECT ";
            //build our values we'll input
            let values = [];
            
            //console.log(movieObjects);
            movieObjects.forEach(element => {
                const urlString=`https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/${element[0].originalname}`;
                jsonMovies.push(element[0]);
                values.push(urlString);
                query+= `${element[0].fieldname.toLowerCase()} = $${counter++}, `
                selectQuery+= `${element[0].fieldname.toLowerCase()}, `;
            });

            for (const key in req.body) {
                if(key!='id')
                {
                    query+= `${key} = $${counter++}, `;
                    values.push(req.body[key]);
                }        
            }
            
            //complete our query by removing last comma and a semicolon
            query=query.substring(0,query.lastIndexOf(','));
            query+=` WHERE id=${req.body.id};`;

            //We only enter here IF a new file is being updated, gotta delete old ones and upload new ones to S3
            if(movieObjects.length != 0)
            {
                //complete our files select query by removing last comma and adding the where
                selectQuery=selectQuery.substring(0,selectQuery.lastIndexOf(','));
                selectQuery+= ` FROM movies WHERE id=${req.body.id};`;
                
                //We will first grab url for associated files we want to change, we will delete these from S3
                const movieFileURLs = await db.query(selectQuery);
                if(!movieFileURLs){
                    res.status(404).json("Movie not found");
                    return;
                }
                const urls = movieFileURLs.rows;
                const urlObjects = Object.values(urls[0]);
                let fileNames = [];

                urlObjects.forEach(element => {
                    //For each element in urls, (img, imgtitle, imgsm, trailer, video) we will have to grab the file name from its url
                    const parts = element.split("/");
                    fileNames.push(parts.at(-1));
                });
                
                //Delete from S3 bucket
                console.log(fileNames);
                await s3Deletev3(fileNames);

                //Upload any new files onto S3 if we have any new ones
                await s3Uploadv3(jsonMovies);
            }
            
            //console.log(values);
            //Now we update our database with new file URL's
            await db.query(query,values);
            /* const results = await db.query("UPDATE movies SET title = $1, description = $2, img = $3, imgtitle = $4, imgsm = $5, trailer = $6, video = $7, year = $8, movielength = $9, genre = $10, isseries = $11 WHERE id = $12 returning *;",
            [req.body.title, req.body.description, req.body.img, req.body.imgtitle, req.body.imgsm, req.body.trailer, req.body.video, req.body.year, req.body.movielength, req.body.genre, req.body.isseries, req.params.id]
            ); */
            res.status(200).json({
                status: "success",
            });
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed!");
    }
});

    //where we do error handling for file uploads, every time its a crash if user uploads invalids
//this will run anytime we throw an error inside one of our controllers, not exclusive to multer
app.use((error, req, res, next) => {
    //ctrl click multererror and it'll show you what kind of errorcodes multererror has
    //then we can send a customized response
    //I attempted to send multiple files so that we throw a multiple file error (which expects crash to server), but we don't handle
    //looks like this scenario just hangs
    if(error instanceof multer.MulterError) {
        if(error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "file is too large",
            })
        }
        if(error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message: "file limit reached",
            })
        }
        if(error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message: "File must be an image",
            })
        }
    }
    
})



//Delete Movie
app.delete("/api/movies/:id",verify, async (req,res) => {
    //const movieFiles = req.params.id;
    //const movie = await db.query("SELECT img, imgtitle, imgsm, trailer, video from MOVIES where id = $1;",[movieFiles]);
    //console.log(movie.rows);

    if(req.user.isadmin) {
        try {
            const movie = await db.query("SELECT img, imgtitle, imgsm, trailer, video from MOVIES where id = $1;",[req.params.id]);
            if(!movie){
                res.status(404).json("Movie not found");
                return;
            }

            //const url = "https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/District_9_Logo.png";
            const urls = movie.rows;
            const urlObjects = Object.values(urls[0]);
            let fileNames = [];

            urlObjects.forEach(element => {
                //For each element in urls, (img, imgtitle, imgsm, trailer, video) we will have to grab the file name from its url
                const parts = element.split("/");
                fileNames.push(parts.at(-1));
            });
            //Deleting from list
            //Fixed version, we grab the rows containing the movie ID we want to delete, then on each row we will update individually based on id
            console.log(req.params.id);
            await db.query(`
            DO 
            $$ 
            DECLARE rec RECORD; 
            BEGIN FOR rec IN SELECT id, array_remove 
            FROM (SELECT id, array_remove(content, ${req.params.id}) FROM list WHERE ${req.params.id}=ANY(content)) 
            LOOP 
            UPDATE list SET content = rec.array_remove WHERE id = rec.id;
            END LOOP; 
            END; 
            $$`
            );

            //Delete from S3 bucket
            const results = await s3Deletev3(fileNames);

            //Delete from your sql database
            await db.query("DELETE FROM movies WHERE id = $1 returning *;",
            [req.params.id]
            );
            
            res.status(200).json({
                status: "Successfully deleted movie"
            });
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed!");
    }
});

//Get Movie
app.get("/api/movies/find/:id",verify, async (req,res) => {
    try {
        const SelectedMovie = await db.query("SELECT * FROM movies WHERE id = $1;",
        [req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                movie: SelectedMovie.rows[0],
            }
        });
    }catch(err) {
        res.status(500).json(err);
    }
});

//Get Random Movie
//If our query is /api/movies/random?type=series then type will return
///api/movies/random will make type = false
app.get("/api/movies/random",verify, async (req,res) => {
    const type = req.query.type;
    let RandomMovie;
    try {
        //This will first create a temp table that filters our media, then we will choose a random one
        //Currently as of 10/01/2023 tablesample does not work with filtered films
        if(type === "series"){
            RandomMovie = await db.query("SELECT * FROM movies WHERE isseries = true ORDER BY random() LIMIT 10;");
        } else {
            RandomMovie = await db.query("SELECT * FROM movies WHERE isseries = false ORDER BY random() LIMIT 10;");
            /* RandomMovie = await db.query("CREATE TEMPORARY TABLE filtered_Media AS SELECT * FROM movies WHERE isseries = false;" +
            "SELECT * FROM filtered_Media TABLESAMPLE BERNOULLI (50) ORDER BY random()  LIMIT 1;" +
            "DROP TABLE filtered_media;"); */
        }
        res.status(200).json(RandomMovie.rows[0]);
    }catch(err) {
        res.status(500).json(err);
    }
});

//Get all movies
app.get("/api/movies/",verify, async (req,res) => {
    if(req.user.isadmin) {
        try {
            const mediaResults = await db.query("SELECT * FROM movies ORDER BY id DESC;");
            res.status(200).json(mediaResults.rows);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed to see all movies!");
    }
});

//Movie Lists (for the homepage all those tiny squares)
//Create Lists
app.post("/api/lists/",verify, async (req,res) => {
    if(req.user.isadmin) {
        try {
            const newList = await db.query("INSERT INTO list (title, type, genre, content) VALUES ($1, $2, $3, $4) returning *;",
            [req.body.title, req.body.type, req.body.genre, req.body.content]);

            res.status(200).json(newList.rows[0]);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed to delete Lists!");
    }
});

//Delete Lists
app.delete("/api/lists/:id",verify, async (req,res) => {
    if(req.user.isadmin) {
        try {
            const newList = await db.query("DELETE FROM list WHERE id = $1 returning *;",
            [req.params.id]);

            res.status(200).json(newList.rows);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed to see all movies!");
    }
});

//Get few random Lists
app.get("/api/lists/random",verify, async (req,res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if(typeQuery){
            if(genreQuery){
                //list = await db.query("SELECT * FROM list WHERE type = $1 AND genre = $2 ORDER BY random() LIMIT 10;",[typeQuery,genreQuery]);
                list = await db.query("SELECT * FROM list WHERE type = $1 AND genre = $2 ORDER BY random() LIMIT 3;",[typeQuery,genreQuery]);
            }
            else {
                //list = await db.query("SELECT * FROM list WHERE type = $1 ORDER BY random() LIMIT 10;",[typeQuery]);
                list = await db.query("SELECT * FROM list WHERE type = $1 ORDER BY random() LIMIT 3;",[typeQuery]);
            }
        }
        else{
            //list = await db.query("SELECT * FROM list ORDER BY random() LIMIT 10;");
            list = await db.query("SELECT * FROM list ORDER BY random() LIMIT 3;");
        }
        //res.status(200).json(list.rows);
        res.status(200).json({
            status: "success",
            data: {
                List: list.rows,
            }
        });
    }catch(err) {
        res.status(500).json(err);
    }
});

//Get ALL Lists
app.get("/api/lists/",verify, async (req,res) => {
    let list = [];

    try {
        list = await db.query("SELECT * FROM list;");
        res.status(200).json({
            status: "success",
            data: {
                List: list.rows,
            }
        });
    }catch(err) {
        res.status(500).json(err);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
});

/* the last line after our derived table, is just an alias or any name we give to our new created table, so it could be
newReviews on restaurants.id = newReviews.restaurant_id;

SELECT * FROM restaurants 
LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) 
newReviews ON restaurants.id = newReviews.restaurant_id;
*/