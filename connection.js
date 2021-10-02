const mysql = require('mysql2/promise');

// ? the promise implementation, we will use bluebird
const bluebird = require('bluebird');
const logger = require('./logger');

const { DB_NAME, DB_PASSWORD, DB_HOSTNAME, DB_USERNAME, DB_PORT } = process.env;

let connection;

(async () => {
	try {
		// ? create the connection to database
		connection = await mysql.createConnection({
			host: DB_HOSTNAME,
			user: DB_USERNAME,
			database: DB_NAME,
			password: DB_PASSWORD,
			port: DB_PORT,

			Promise: bluebird // ? Promise Wrapper
		});

		logger.info('Db Connected');
	} catch (e) {
		logger.error(e);
	}
})();

module.exports = connection;
