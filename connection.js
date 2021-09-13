const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: process.env.DB_NAME,
});

module.exports = connection;
