const joi = require('joi');

const otpRequestSchema = joi.object({
	email: joi
		.string()
		.min(6)
		.max(100)
		.email({ tlds: { allow: false } })
		.required()
});

module.exports = otpRequestSchema.validateAsync;
