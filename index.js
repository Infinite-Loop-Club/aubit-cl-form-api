require('dotenv').config();
require('./connection');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// ? initialize app
const app = express();

// ? setup middlewares
app.use(helmet());
app.use(cors('*'));
app.use(express.json());

// ? setup route handler
app.post('/apply-cl', () => {});
