const logger = require('../../services/logger');
const CoreController = require('./CoreController');
const oworldDataMapper = require('../../models/OworldDataMapper');

/** Class representing a category controller. */
class OworldController extends CoreController {
  static dataMapper = oworldDataMapper;

  /**
   * create a category controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    logger.info('oworldController created');
  }
}

module.exports = new OworldController();
