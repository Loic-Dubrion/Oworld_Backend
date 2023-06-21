// binds the .env
require('dotenv').config();

// necessary library
const path = require('path');
const express = require('express');
const cors = require('cors');

// necessary modules
const bodySanitizer = require('./services/sanitizer');
// const scheduleTasks = require('./services/mailer/scheduler');
const swagger = require('./services/swagger');
const router = require('./routers');

// triggers database backup scheduling
// scheduleTasks();

// configure the app
const app = express();

// CORS setup
const corsOptions = {
  origin: process.env.CORS_DOMAINS ?? '*',
};

// Use bodySanitizer for all requests
app.use(bodySanitizer);

// Middlewares setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routers
app.use(router);

// configuration of documentation
swagger(app, path.join(__dirname, 'routers'));
app.use('/docs', express.static(path.join(__dirname, '../documentation')));

// app export
module.exports = app;
