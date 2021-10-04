const database = require('./connection');
const errorHandleManager = require('./errors');

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

		await connection.execute('SELECT 1');

		return res.status(200).json({
			result: true,
			message: 'test'
		});
	} catch (err) {
		errorHandleManager(err, res);
	}
};

module.exports = { handleCreateClApplication };
