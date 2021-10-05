const db_connector = require('./connection');
const errorHandleManager = require('./errors');
const logger = require('./logger');

const database = require('./db_worker');
const { BadRequest } = require('./errors/BadRequest');
const { Unauthorized } = require('./errors/Unauthorized');
const { sendEmail } = require('./mailer');
const { EMAIL_TEMPLATES } = require('./constant');
const { generateVerificationCode } = require('./business');

/**
 * @readonly /api/apply-cl
 * @param {Express.Request} req Request object of exresss framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleCreateClApplication = async (req, res) => {
	try {
		// ?? Create the connection
		const connection = await db_connector();

		await database.insertOne(connection, {
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

/**
 * @readonly /api/login
 * @param {Express.Request} req Request object of exresss framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleStaffLoginRoute = async (req, res) => {
	try {
		const connection = await db_connector();

		const { email } = req.body;

		// ! Basic validations
		if (!email) throw new BadRequest('Email missing!');

		const getQuery = await database.get(connection, {
			table_name: 'staffs',
			projection: 'id, email',
			condition: 'email = ?',
			value: [email]
		});

		// ! Email check
		if (!getQuery.rows.length) throw new Unauthorized('Email not existed!');

		// ?? Random code generation
		const code = await generateVerificationCode();

		// ?? Email sending
		await sendEmail(
			{ to: email, subject: 'Verification code.' },
			{
				templateId: EMAIL_TEMPLATES.VERIFICATION,
				data: {
					otp: code
				}
			}
		);

		return await res.status(200).json({
			result: true,
			message: 'Email sent if not please contact administrator.',
			data: {
				staff_id: getQuery.rows[0].id
			}
		});
	} catch (err) {
		errorHandleManager(err, res);
	}
};

/**
 * @readonly /api/login
 * @param {Express.Request} req Request object of exresss framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleStaffVerifyRoute = async (req, res) => {
	try {
	} catch (err) {
		errorHandleManager(err, res);
	}
};

module.exports = { handleCreateClApplication, handleStaffLoginRoute, handleStaffVerifyRoute };
