const logger = require('../services/logger');
const CoreDataMapper = require('./CoreDataMapper');

/** Class representing a oWorld data mapper. */
class OworldDataMapper extends CoreDataMapper {
  static tableName = 'planets';

  static viewName = 'country_list';

  /**
   * create a oWorld data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    logger.info('admin data mapper created');
  }
}

module.exports = new OworldDataMapper();
