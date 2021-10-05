const mysql = require('mysql2');
const logger = require('./logger');

const { MESSAGES } = require('./constant');
const { SqlError } = require('./errors/SqlError');

/**
 *
 * @param {mysql.Connection} connection Mysql connection object to make the query against database
 * @param {{table_name, data}} query Needs to pass an object with proper informations
 * @returns {{rows, fields}} Results after the query execution
 */
exports.insertOne = async (connection, query) => {
	try {
		// ? Query preparation
		const sql = await mysql.format(`INSERT INTO ?? SET ?`, [query.table_name, query.data]);

		// ? Query execution
		const [rows, fields] = await connection.execute(sql);

		return {
			rows,
			fields
		};
	} catch (err) {
		logger.error('insertOne query => ', err);
		throw new SqlError(MESSAGES.SQL_ERROR);
	}
};

/**
 *
 * @param {mysql.Connection} connection Mysql connection object to make the query against database
 * @param {{table_name, projection, table_name, condition, value}} query Needs to pass an object with proper informations
 * @returns {{rows, fields}} Results after the query execution
 */
exports.get = async (connection, { projection, table_name, condition, value }) => {
	try {
		// ? Query preparation
		const sql = await mysql.format(
			`SELECT ${projection} FROM ${table_name} WHERE ${condition}`,
			value
		);

		// ? Query execution
		const [rows, fields] = await connection.execute(sql);

		return {
			rows,
			fields
		};
	} catch (err) {
		logger.error('get query => ', err);
		throw new SqlError(MESSAGES.SQL_ERROR);
	}
};
