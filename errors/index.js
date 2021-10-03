const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { BadRequest } = require('./BadRequest');

/**
 *
 * @param {Express.Response} res Object to send response to user
 * @returns {void} return correspond response to user
 */
const errorHandleManager = (err, res) => {
	// ! 400
	if (err instanceof BadRequest)
		return res.status(StatusCodes.BAD_REQUEST).json({
			result: false,
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
			message: err.message
		});

	// ! 500
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		result: false,
		error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		message: err.message
	});
};

module.exports = errorHandleManager;
