const mysql = require('mysql2');

const { MESSAGES } = require('./constant');
const { SqlError } = require('./errors/SqlError');
const logger = require('./logger');

/**
 *
 * @param {mysql.Connection} connection Mysql connection object to make the query against database
 * @param {{table_name, data}} query Needs to pass an object with proper informations
 * @returns {{rows, fields}} Results after the query execution
 */
exports.insertOne = async (connection, query) => {
	try {
		// ? Query preparation
		const sql = mysql.format(`INSERT INTO ?? SET ?`, [query.table_name, query.data]);

		// ? Qeury execution
		const [rows, fields] = await connection.execute(sql);

		return {
			rows,
			fields
		};
	} catch (err) {
		logger.error('Inert query => ', err);
		throw new SqlError(MESSAGES.SQL_ERROR);
	}
};
