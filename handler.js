const database = require('./connection');
const errorHandleManager = require('./errors');
const logger = require('./logger');

const { insertOne } = require('./db_worker');

/**
 * @readonly /api/apply-cl
 * @param {Express.Request} req Request object of exresss framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleCreateClApplication = async (req, res) => {
	try {
		// ?? Create the connection
		const connection = await database();

		const insertQ = await insertOne(connection, {
			table_name: 'staffs',
			data: {
				email: 'test2@gmail.com',
				password: 'slfjfsdk',
				name: 'MD2',
				department: 'Cse',
				is_verified: 1,
				is_active: 1
			}
		});

		return res.status(200).json({
			result: true,
			message: 'test'
		});
	} catch (err) {
		errorHandleManager(err, res);
	}
};

module.exports = { handleCreateClApplication };
