const database = require('./connection');
const logger = require('./logger');

const handleCreateClApplication = async (req, res) => {
	try {
		// ?? Create the connection
		const connection = await database();

		await connection.execute('SELECT 1');

		return res.status(200).json({
			result: true,
			message: 'test'
		});
	} catch (e) {}
};

module.exports = { handleCreateClApplication };
