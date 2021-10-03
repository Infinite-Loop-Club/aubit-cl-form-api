require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./logger');

const { SERVER_PORT } = process.env;

// ? initialize app
const app = express();

// ? setup middlewares
app.use(helmet());
app.use(cors('*'));
app.use(express.json());

// ? setup route handler
app.use('/api', require('./routers'));

// ? Initiate server starting
app.listen(SERVER_PORT || 4000, () => {
	logger.info(`Server running on ${SERVER_PORT}`);
});
