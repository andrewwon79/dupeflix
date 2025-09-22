const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");


//This is for single file uploads
/* exports.s3Uploadv3 = async (file) => {
    const s3client = new S3Client();

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        //Key: `uploads/${uuid()}-${file.originalname}`,
        Key:`uploads/${file.originalname}`,
        //buffer is our movie body when we uploaded it through multer
        Body: file.buffer,
    }
    //this is already a promise based method so no need to put async await or promise
    return s3client.send(new PutObjectCommand(param));
} */

exports.s3Deletev3 = async (files) => {
    const s3client = new S3Client();
    //console.log(files);
    
    const params = files.map((filename) => {
        console.log(filename);
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            //Key: `uploads/${uuid()}-${file.originalname}`,
            Key:`uploads/${filename}`,
        };
    });

    return await Promise.all(
        params.map(param => s3client.send(new DeleteObjectCommand(param)))
    )

/*     const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        //Key: `uploads/${uuid()}-${file.originalname}`,
        Key:`uploads/${file.originalname}`,
        //buffer is our movie body when we uploaded it through multer
      }

      return s3client.send(new DeleteObjectCommand(deleteParams)); */
}

//multiple file uploads
exports.s3Uploadv3 = async (files) => {
    const s3client = new S3Client();

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            //Key: `uploads/${uuid()}-${file.originalname}`,
            Key:`uploads/${file.originalname}`,
            //buffer is our movie body when we uploaded it through multer
            Body: file.buffer,
        };
    });
    
    return await Promise.all(
        params.map(param => s3client.send(new PutObjectCommand(param)))
    )
}