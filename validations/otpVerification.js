const joi = require('joi');

const optVerificationSchema = joi.object({
	email: joi
		.string()
		.min(6)
		.max(100)
		.email({ tlds: { allow: false } })
		.required(),
	otp: joi.number().min(10000).max(99999).required()
});

module.exports = optVerificationSchema.validateAsync;
