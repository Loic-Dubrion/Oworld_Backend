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
  }
}

module.exports = new AdminController();
