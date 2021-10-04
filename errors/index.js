const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { MESSAGES } = require('../constant');
const { BadRequest } = require('./BadRequest');
const { Forbidden } = require('./Forbidden');
const { NotFound } = require('./NotFound');
const { Unauthorized } = require('./Unauthorized');
const { UnprocessableEntity } = require('./UnproccessableEntity');

/**
 *
 * @param {Express.Response} res Object to send response to user
 * @returns {void} return correspond response to user
 */
const errorHandleManager = (err, res) => {
	let error = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
	let message = MESSAGES.INTERNAL_SERVER_ERROR;
	let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

	// ! 400
	if (err instanceof BadRequest) {
		error = getReasonPhrase(StatusCodes.BAD_REQUEST);
		message = err.message;
		statusCode = StatusCodes.BAD_REQUEST;
	}

	// ! 401
	if (err instanceof Unauthorized) {
		error = getReasonPhrase(StatusCodes.UNAUTHORIZED);
		message = err.message;
		statusCode = StatusCodes.UNAUTHORIZED;
	}

	// ! 403
	if (err instanceof Forbidden) {
		error = getReasonPhrase(StatusCodes.FORBIDDEN);
		message = err.message;
		statusCode = StatusCodes.FORBIDDEN;
	}

	// ! 404
	if (err instanceof NotFound) {
		error = getReasonPhrase(StatusCodes.NOT_FOUND);
		message = err.message;
		statusCode = StatusCodes.NOT_FOUND;
	}

	// ! 429
	if (err instanceof UnprocessableEntity) {
		error = getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY);
		message = err.message;
		statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
	}

	// ! 500
	return res.status(statusCode).json({
		result: false,
		error,
		message
	});
};

module.exports = errorHandleManager;
