const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./connection');
const logger = require('./logger');

// ? initialize app
const app = express();

connection.connect(err => {
	if (err) 
		logger.error('DB connection error', err.stack);
	 else 
		logger.info('Connected to database');
	
});

// ? setup middlewares
app.use(helmet());
app.use(cors('*'));
app.use(express.json());

// ? setup route handler
app.post('/apply-cl', () => {});
