const logger = require('../../services/logger');
const CoreController = require('./CoreController');
const adminDataMapper = require('../../models/AdminDataMapper');

/** Class representing a category controller. */
class AdminController extends CoreController {
  static dataMapper = adminDataMapper;

  /**
   * create a category controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    logger.info('adminController created');
  }
}

module.exports = new AdminController();
