const CoreDataMapper = require('./CoreDataMapper');

/** Class representing a admin data mapper. */
class AdminDataMapper extends CoreDataMapper {
  static viewName = 'stat_admin';

  /**
   * create a admin data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
  }
}

module.exports = new AdminDataMapper();
