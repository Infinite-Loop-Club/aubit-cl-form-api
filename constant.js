const MESSAGES = {
	SQL_ERROR: 'Database had an issue. Please contact the administrator.',
	INTERNAL_SERVER_ERROR:
		"Sorry for the inconvenience. If it's still persist feel free to contact our web team admistrator."
};

const EMAIL_TEMPLATES = {
	CONFIRMATION: 'CONFIRMATION',
	ADMINISTRATIVE: 'ADMINISTRATIVE'
};

module.exports = {
	EMAIL_TEMPLATES,
	MESSAGES
};
