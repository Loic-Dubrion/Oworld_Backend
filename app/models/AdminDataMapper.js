const logger = require('../services/logger');
const CoreDataMapper = require('./CoreDataMapper');

/** Class representing a category data mapper. */
class AdminDataMapper extends CoreDataMapper {
  static viewName = 'stat_admin';

  /**
   * create a category data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    logger.info('admin data mapper created');
  }
}

module.exports = new AdminDataMapper();
