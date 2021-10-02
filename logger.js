const winston = require('winston');

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),

		new winston.transports.File({
			filename: 'logs/info.log',
			level: 'info'
		}),
		new winston.transports.File({
			filename: 'logs/we.log',
			level: 'warn'
		})
	],
	exitOnError: true
});

module.exports = logger;
