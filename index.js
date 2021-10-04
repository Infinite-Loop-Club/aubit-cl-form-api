require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const logger = require('./logger');

const { SERVER_PORT } = process.env;

// ? initialize app
const app = express();

// * Set default root path
global.ROOT_PATH = path.resolve(__dirname);

// ? setup middlewares
app.use(helmet());
app.use(cors('*'));
app.use(express.json());

// * Set dev logger for better viewing response with optimization
app.use(morgan('dev'));

// * Setup express response and body parser configurations
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

// ? setup route handler
app.use('/api', require('./routers'));

// ? Initiate server starting
app.listen(SERVER_PORT || 4000, () => {
	logger.info(`Server running on ${SERVER_PORT}`);
});
