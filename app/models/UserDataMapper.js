const logger = require('../services/logger');
const CoreDataMapper = require('./CoreDataMapper');

/** Class representing a user data mapper. */
class UserDataMapper extends CoreDataMapper {
  static tableName = 'users';

  constructor() {
    super();
    logger.info('user data mapper created');
  }
}

module.exports = new UserDataMapper();
