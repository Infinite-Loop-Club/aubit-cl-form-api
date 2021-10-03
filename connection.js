const mysql = require('mysql2/promise');

// ? the promise implementation, we will use bluebird
const bluebird = require('bluebird');
const logger = require('./logger');
const { SqlError } = require('./errors/SqlError');

const { DB_NAME, DB_PASSWORD, DB_HOSTNAME, DB_USERNAME, DB_PORT } = process.env;

/**
 * @description to create a new conenction of mysql
 * @returns Promise<mysql.Connection>
 */
const getConnection = async () => {
	try {
		// ? create the connection to database
		return await mysql.createConnection({
			host: DB_HOSTNAME,
			user: DB_USERNAME,
			database: DB_NAME,
			password: DB_PASSWORD,
			port: DB_PORT,

			Promise: bluebird // ? Promise Wrapper
		});
	} catch (e) {
		logger.error(e);
		throw new SqlError('Database connection not established!');
	}
};

module.exports = getConnection;
