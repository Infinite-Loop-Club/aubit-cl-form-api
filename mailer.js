const moment = require('moment');
const nodemailer = require('nodemailer');
const logger = require('./logger');

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
	 * and enable Less secure app block on gmail settings.
	 */
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: AUBIT_FROM_EMAIL,
			pass: AUBIT_FROM_EMAIL_PASSWORD
		}
	});

	transporter.sendMail(emailConfiguration, function (err) {
		if (err) return logger.error(err);

		logger.info(`Email sent at ${moment().format('LLLL')}.`);
	});
};
