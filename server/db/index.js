//from our pg package we are only using the pool library
const { Pool } = require("pg");

//this will work just fine as long as we define our env variables
const pool = new Pool();
//this is where we will actually connect to our postgres db
//When we use environment variables pg will automatically populate


module.exports = {
    query: (text,params) => pool.query(text, params),
};