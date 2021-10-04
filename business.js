const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const { EMAIL_TEMPLATES } = require('./constant');

/**
 *
 * @param {{templateId, data}} templateId Email template id and correspond data should be needs to pass
 * @returns {String} html for email
 */
const getEmailTemplate = async ({ templateId, data }) => {
	let contents = '';

	switch (templateId) {
		case EMAIL_TEMPLATES.ADMINISTRATIVE: {
			contents = await fs.readFileSync(
				path.join(ROOT_PATH, 'views', 'administrativeTemplate.ejs'),
				'utf8'
			);

			break;
		}

		case EMAIL_TEMPLATES.CONFIRMATION: {
			contents = await fs.readFileSync(
				path.join(ROOT_PATH, 'views', 'confirmationTemplate.ejs'),
				'utf8'
			);

			break;
		}

		default:
	}

	// TODO: convert ejs file to html string
	return await ejs.render(contents, { data, async: true });
};

module.exports = {
	getEmailTemplate
};
