const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/services/controllerHandler');
const { adminController } = require('../../controllers/API');

/**
 * a error type
 *
 * @typedef {object} Error
 * @property {number} status - HTTP status code of the error
 * @property {string} error - HTTP error message
 * @property {string} message - Detailed error message
 */

/**
 * GET /api/admin/stat
 *
 * @summary Get statistics
 * @tags Admin - management administration
 *
 * @return {array<object>} 200 - success response -
 * an array of objects where each object represents the statistics for a particular country
 * @property {string} country_origin - The country of origin
 * @property {number} average_age - The average age of users
 * @property {string} user_count - The count of users
 * @property {string} favorite_count - The count of favorites
 * @return {Error} 500 - Internal server error
 *
 */

router.get(
  '/stat',
  controllerHandler(adminController.getAll.bind(adminController)),
);

module.exports = router;
