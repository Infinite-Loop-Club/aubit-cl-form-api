const mysql = require('mysql2');

const { DB_NAME, DB_PASSWORD, DB_HOSTNAME, DB_USERNAME, DB_PORT } = process.env;

// ? create the connection to database
const connection = mysql.createConnection({
	host: DB_HOSTNAME,
	user: DB_USERNAME,
	database: DB_NAME,
	password: DB_PASSWORD,
	port: DB_PORT
});

module.exports = connection;
