//from our pg package we are only using the pool library
const { Pool } = require("pg");

//this will work just fine as long as we define our env variables
const pool = new Pool();

module.exports = {
    query: (text,params) => pool.query(text, params),
};