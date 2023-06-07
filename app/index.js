require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./routers');

const swagger = require('./services/swagger');

const app = express();

// Session setup

// CORS setup
const corsOptions = {
  origin: process.env.CORS_DOMAINS ?? '*',
};

// Use bodySanitizer for all requests

// Middlewares setup
app.use(express.json());
app.use(cors(corsOptions));
swagger(app, path.join(__dirname, 'routers'));

// Routers
app.use(router);

app.use('/docs', express.static(path.join(__dirname, '../documentation')));

module.exports = app;
