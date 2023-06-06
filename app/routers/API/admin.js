const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/services/controllerHandler');
const { adminController } = require('../../controllers/API');

/**
 * GET /api/admin/stat
 *
 * @summary get stat 
 * @tags Stat - Statistics on user origins and preferences
 *
 * @return {array} 200 - success response
 * @return {object} 500 - internal server error
 */
router.get(
  '/stat',
  controllerHandler(adminController.getAll.bind(adminController))
);

module.exports = router;