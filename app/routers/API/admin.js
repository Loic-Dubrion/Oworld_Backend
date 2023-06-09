const express = require('express');

const router = express.Router();

// Controllers
const controllerHandler = require('../../controllers/services/controllerHandler');
const { adminController } = require('../../controllers/API');

// Middlewares
const { checkRole, checkPermission } = require('../../services/checkRBAC');

// Check Role
router.use(checkRole('Admin'));

/**
 * @typedef {object} Error
 * @property {number} status - HTTP status code of the error
 * @property {string} error - HTTP error message
 * @property {string} message - Detailed error message
 */

/**
 * @typedef {object} Statistics
 * @property {string} country_origin - The country of origin.
 * @property {string} iso2 - The ISO 2-letter country code.
 * @property {string} iso3 - The ISO 3-letter country code.
 * @property {number} average_age - The average age of users.
 * @property {string} user_count - The count of users.
 * @property {string} favorite_count - The count of favorites.
 */

/**
 * GET /api/admin/stat
 *
 * @summary Get statistics
 * @tags Admin - Management Administration
 * @description
 * This route returns user statistics data
 *
 * @param {boolean} useView.query.required - Whether to use a SQL view or not.
 * Use `?useView=true` as a required query parameter.
 *
 * @return {Array.<Statistics>} 200 - Success response.
 * An array of objects where each object represents the statistics for a particular country.
 *
 * @throws {Error} 500 - Internal server error.
 */

router.get(
  '/stat',
  checkPermission('View_stats'),
  controllerHandler(adminController.getAll.bind(adminController)),
);

module.exports = router;
