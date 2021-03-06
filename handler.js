const moment = require('moment');

const db_connector = require('./connection');
const errorHandleManager = require('./errors');
const logger = require('./logger');

const database = require('./db_worker');
const { Unauthorized } = require('./errors/Unauthorized');
const { sendEmail } = require('./mailer');
const { EMAIL_TEMPLATES } = require('./constant');
const { generateVerificationCode } = require('./business');
const { getAccessToken } = require('./auth');

const validateOtpRequest = require('./validations/otpRequest');
const validateOtpVerificationRequest = require('./validations/otpVerification');
const validateApplicationRequest = require('./validations/applicationRequest');

/**
 * @readonly /api/apply-cl
 * @param {Express.Request} req Request object of express framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleCreateClApplication = async (req, res) => {
	try {
		// ! Validations
		await validateApplicationRequest(req.body);

		const { basic, arrangements, address, dates } = req.body;

		// ?? Create the connection
		const connection = await db_connector();

		// todo: validate
		const insertAddressQuery = await database.insertOne(connection, {
			table_name: 'staff_addresses',
			data: { ...address, staff_id: req.user.id }
		});

		console.log({
			...basic,
			staff_id: req.user.id,
			staff_address_id: insertAddressQuery.rows.insertId
		});

		// todo: add validation {atleast 1 arrangement}
		const insertClQuery = await database.insertOne(connection, {
			table_name: 'cl_informations',
			data: {
				...basic,
				staff_id: req.user.id,
				staff_address_id: insertAddressQuery.rows.insertId
			}
		});

		await arrangements.forEach(async arrangement => {
			await database.insertOne(connection, {
				table_name: 'arrangements',
				data: {
					...arrangement,
					cl_id: insertClQuery.rows.insertId,
					date_hour: moment(new Date(arrangement.date_hour)).format('YYYY-MM-DD HH:mm:ss')
				}
			});
		});

		await dates.forEach(async date => {
			await database.insertOne(connection, {
				table_name: 'dates',
				data: {
					cl_id: insertClQuery.rows.insertId,
					date: moment(new Date(date)).format('YYYY-MM-DD')
				}
			});
		});

		return res.status(200).json({
			result: true,
			message: 'CL has been create successfully !'
		});
	} catch (err) {
		logger.error(err);
		errorHandleManager(err, res);
	}
};

/**
 * @readonly /api/login
 * @param {Express.Request} req Request object of express framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleStaffLoginRoute = async (req, res) => {
	try {
		// ! Validations
		await validateOtpRequest(req.body);

		const { email } = req.body;

		const connection = await db_connector();

		const getQuery = await database.get(connection, {
			table_name: 'staffs',
			projection: 'id, email',
			condition: 'email = ? limit 1',
			value: [email]
		});

		// ! Email check
		if (!getQuery.rows.length) throw new Unauthorized('Email not existed!');

		// ?? Random code generation
		const code = await generateVerificationCode();

		logger.info(`Login code => ${code}`);

		await database.updateOne(connection, {
			table_name: 'staffs',
			updating_fields: 'code = ?',
			updating_values: [code],
			key: 'id',
			value: [getQuery.rows[0].id]
		});

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

		return res.status(200).json({
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
 * @param {Express.Request} req Request object of express framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleStaffVerifyRoute = async (req, res) => {
	try {
		// ! Validations
		await validateOtpVerificationRequest(req.body);

		const { email, code } = req.body;

		const connection = await db_connector();
		// // ! Basic validations
		const getQuery = await database.get(connection, {
			table_name: 'staffs',
			projection: 'id, email',
			condition: 'email = ? and code = ? limit 1',
			value: [email, code]
		});

		// ! Email check
		if (!getQuery.rows.length) throw new Unauthorized('Invalid code!');

		// ? Generate access token
		const token = await getAccessToken(
			{
				id: getQuery.rows[0].id,
				email: getQuery.rows[0].email
			},
			'30d'
		);

		return res.status(200).json({
			result: true,
			message: 'Logged in successfully.',
			data: {
				id: getQuery.rows[0].id,
				email: getQuery.rows[0].email,
				token
			}
		});
	} catch (err) {
		errorHandleManager(err, res);
	}
};

/**
 * @readonly /api/auth
 * @param {Express.Request} req Request object of express framework
 * @param {Express.Response} res Response object of express framework
 * @returns {json} Response of the request
 */
const handleCheckAuth = async (req, res) => {
	return res.status(200).json({
		result: true,
		message: 'Authentication successfully.'
	});
};

module.exports = {
	handleCreateClApplication,
	handleStaffLoginRoute,
	handleStaffVerifyRoute,
	handleCheckAuth
};
