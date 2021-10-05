const moment = require('moment');
const nodemailer = require('nodemailer');
const logger = require('./logger');

// const { UnprocessableEntity } = require('./errors/UnproccessableEntity');
const { getEmailTemplate } = require('./business');

const { AUBIT_FROM_EMAIL, AUBIT_FROM_EMAIL_PASSWORD } = process.env;

/**
 *
 * @param {{to, bcc, cc, subject, text, attachments}} config Email basic configuration
 * @param {{templateId, data}} templateConfiguration Template information needs to fill up in the email
 */
exports.sendEmail = async (config, templateConfiguration) => {
	const emailConfiguration = {
		...config,
		from: AUBIT_FROM_EMAIL,
		html: await getEmailTemplate(templateConfiguration)
	};

	/**
	 * Note: This transport creation from email should be enabled third party devices login
	 * and disable low secure app block on gmail settings.
	 */
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: AUBIT_FROM_EMAIL,
			pass: AUBIT_FROM_EMAIL_PASSWORD
		}
	});

	transporter.sendMail(emailConfiguration, function (err) {
		if (err) {
			logger.error(err);
			// throw new UnprocessableEntity(
			// 	'Sending email had an issue. Please contact the administrator.'
			// );
		}

		logger.info(`Email sent at ${moment().format('LLLL')}.`);
	});
};
