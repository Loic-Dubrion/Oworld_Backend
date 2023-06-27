/**
 * @module client_postgres
 */

require('dotenv').config();

const { Pool } = require('pg');
const logger = require('../logger');

/**
 * Initialize a new connection pool to the PostgreSQL database.
 * @type {Pool}
 */
const client = new Pool();

/**
 * Connect to the PostgreSQL database using the connection pool.
 * If there is an error during connection, log it; otherwise, log a success message.
 */

client.connect((err) => {
  if (err) {
    logger.error(`Database connection error: ${err.stack}`);
  } else {
    logger.info('Database connection successful 🎉');
  }
});

module.exports = client;
