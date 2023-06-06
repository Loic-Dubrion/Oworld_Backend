const debug = require('debug')('oblog:controllers');
const CoreController = require('./CoreController');
const adminDataMapper = require('../../models/adminDataMapper');

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
    debug('adminController created');
  }
}

module.exports = new AdminController();