const express = require('express');

const router = express.Router();

// Controllers
const controllerHandler = require('../../controllers/services/controllerHandler');
const { adminController } = require('../../controllers/API');

// Middlewares
const { checkRole, checkPermission } = require('../../controllers/services/checkRBAC');
const { authorize } = require('../../controllers/services/jwtService');

router.use('/:userId', authorize);

/**
 * @typedef {object} Error
 * @property {number} status - HTTP status code of the error
 * @property {string} error - HTTP error message
 * @property {string} message - Detailed error message
 */

/**
 * @typedef {object} Stat
 * @property {string} country_origin - Country of origin
 * @property {string} iso2 - ISO 2-letter country code
 * @property {string} iso3 - ISO 3-letter country code
 * @property {number} average_age - Average age
 * @property {string} user_count - Number of users
 * @property {string} favorite_count - Number of favorites
 */

/**
 * GET /api/admin/{userId}/stat
 *
 * @summary Get statistics
 * @tags Admin - Management Administration
 * @description
 * This route returns user statistics data
 * **Requires authentication and role with permission.**
 *
 * @param {boolean} useView.query.required - Whether to use a SQL view or not.
 * Use `?useView=true` as a required query parameter.
 *
 * @return {Array.<Stat>} 200 - Success response.
 * An array of objects where each object represents the statistics for a particular country.
 *
 * @throws {Error}
 */

router.get(
  '/:userId/stat',
  checkRole('Admin'),
  checkPermission('View_stats'),
  controllerHandler(adminController.getAll.bind(adminController)),
);

module.exports = router;
