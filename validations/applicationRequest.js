const Joi = require('joi');

const { MESSAGES } = require('../constant');
const { BadRequest } = require('../errors/BadRequest');

/**
 * It validates the payload and throw if there is any error.
 * @param {Express.Request.body} body Json payload of the request object
 */
const applicationRequest = async body => {
	try {
		const validatorSchema = Joi.object({
			arrangements: Joi.array()
				.items(
					Joi.object().keys({
						date_hour: Joi.date().required(),
						class: Joi.string().required(),
						subject: Joi.string().required(),
						year: Joi.string().required()
					})
				)
				.min(1)
				.required(),
			basic: Joi.object().keys({
				name: Joi.string().required(),
				designation: Joi.string().required(),
				nature_of_leave: Joi.number(),
				availed_days: Joi.number().min(1).max(1000),
				no_of_days: Joi.number().min(1).max(31).required(),
				phone_number: Joi.string().min(8).max(10).required(),
				country_code: Joi.string().min(2).max(2).required(),
				department_name: Joi.string().min(1).required(),
				semester_type: Joi.string().required(),
				purpose_description: Joi.string().max(500)
			}),
			address: Joi.object().keys({
				line1: Joi.string().required(),
				line2: Joi.string(),
				city: Joi.string().required(),
				state: Joi.string().required(),
				postal_code: Joi.string()
					.test('len', 'Invalid code!', val => val.length === 6)
					.required(),
				country: Joi.string().required()
			}),
			dates: Joi.array().items(Joi.date().required()).min(1).required()
		});

		await validatorSchema.validateAsync(body);
	} catch (exp) {
		throw new BadRequest(exp.details[0]?.message?.replace(/"/g, '') ?? MESSAGES.BAD_REQUEST);
	}
};

module.exports = applicationRequest;
