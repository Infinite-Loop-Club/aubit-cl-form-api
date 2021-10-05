const mysql = require('mysql2');
const logger = require('./logger');

const { MESSAGES } = require('./constant');
const { SqlError } = require('./errors/SqlError');

/**
 *
 * @param {mysql.Connection} connection Mysql connection object to make the query against database
 * @param {{table_name, data}} query Needs to pass an object with proper informations
 * @returns {Promise<{rows: Record<string, string>, fields: Record<string, string>}>} Results after the query execution
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
 * @param {{table_name, data}} query Needs to pass an object with proper informations
 * @returns {Promise<{rows: Record<string, string>, fields: Record<string, string>}>} Results after the query execution
 */
exports.insertMultiple = async (connection, query) => {
	try {
		const baseQ = `INSERT INTO ? SET ? ; `;

		let genQ = baseQ.repeat(query.data.length);

		const data = [];

		// ? make our query with data array
		query.data.forEach(v => {
			genQ = genQ.replace('INSERT INTO ?', `INSERT INTO ${v.table_name}`);
			data.push(v.data);
		});

		// ? Query preparation
		const sql = await mysql.format(`${genQ}`, query.data);

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
 * @returns {Promise<{rows:Array<rows>, fields: Record<string, string>}>} Results after the query execution
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

/**
 *
 * @param {mysql.Connection} connection Mysql connection object to make the query against database
 * @param {{table_name, updating_fields, updating_values, table_name, condition, value, key}} query Needs to pass an object with proper informations
 * @returns {Promise<{rows:Array<rows>, fields: Record<string, string>}>} Results after the query execution
 */
exports.updateOne = async (
	connection,
	{ updating_fields, updating_values, table_name, condition, value, key }
) => {
	try {
		// ? Query preparation
		const sql = await mysql.format(
			`UPDATE ${table_name} SET ${updating_fields} WHERE ${key} = ?`,
			updating_values.concat(value)
		);

		// ? Query execution
		const [rows, fields] = await connection.execute(sql);

		return {
			rows,
			fields
		};
	} catch (err) {
		logger.error('UPDATE query => ', err);
		throw new SqlError(MESSAGES.SQL_ERROR);
	}
};
