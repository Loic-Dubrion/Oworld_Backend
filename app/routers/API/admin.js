const express = require('express');

const router = express.Router();

// Controllers
const controllerHandler = require('../../controllers/services/controllerHandler');
const { adminController } = require('../../controllers/API');

// Middlewares
const { checkRole, checkPermission } = require('../../authentication/checkRBAC');
const { authorize } = require('../../authentication/jwtService');

// Check Role
router.use('/:userId', authorize);

/**
 * @typedef {object} Error
 * @property {number} status - HTTP status code of the error
 * @property {string} error - HTTP error message
 * @property {string} message - Detailed error message
 */

/**
 * GET /api/admin/{userId}/stat
 *
 * @summary Get statistics
 * @tags Admin - Management Administration
 * @description
 * This route returns user statistics data
 *
 * @param {boolean} useView.query.required - Whether to use a SQL view or not.
 * Use `?useView=true` as a required query parameter.
 *
 * @return {object} 200 - Success response.
 * An array of objects where each object represents the statistics for a particular country.
 *
 * @throws {Error} 500 - Internal server error.
 */

router.get(
  '/:userId/stat',
  checkRole('admin'),
  checkPermission('View_stats'),
  controllerHandler(adminController.getAll.bind(adminController)),
);

module.exports = router;
