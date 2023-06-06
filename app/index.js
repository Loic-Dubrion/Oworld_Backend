require('dotenv').config();
const path = require('path');
const express = require('express');

const router = require('./routers');

const swagger = require('./services/swagger');

const app = express();

// Session setup

// Swagger setup
swagger(app, path.join(__dirname, 'routers'));

// CORS setup

// Use bodySanitizer for all requests

// Middlewares setup
app.use(express.json());

// Routers
app.use(router);

app.use('/docs', express.static('../documentation'));

module.exports = app;
