const CoreDataMapper = require('./CoreDataMapper');

/** Class representing a user data mapper. */
class UserDataMapper extends CoreDataMapper {
  static tableName = 'user';

  constructor() {
    super();
  }
}

module.exports = new UserDataMapper();
