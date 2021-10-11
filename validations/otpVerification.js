const Joi = require('joi');

const { MESSAGES } = require('../constant');
const { BadRequest } = require('../errors/BadRequest');

/**
 * It validates the payload and throw if there is any error.
 * @param {Express.Request.body} body Json payload of the request object
 */
const optVerificationValidator = async body => {
	try {
		const validatorSchema = Joi.object().keys({
			email: Joi.string()
				.min(6)
				.max(100)
				.email({ tlds: { allow: false } })
				.required(),
			code: Joi.number().min(10000).max(99999).required()
		});

		await validatorSchema.validateAsync(body);
	} catch (exp) {
		throw new BadRequest(exp.details[0]?.message?.replace(/"/g, '') ?? MESSAGES.BAD_REQUEST);
	}
};

module.exports = optVerificationValidator;
