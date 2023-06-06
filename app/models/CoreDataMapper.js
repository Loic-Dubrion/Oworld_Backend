const logger = require('../services/clientdb');
const client = require('../services/clientdb');

/** Class representing an abstract data mapper. */

class CoreDataMapper {
  static tableName;

  static viewName; // if viewName is defined, it will be used for find methods

  /**
   * fetch all entries
   *
   * @returns {array} array of entries
   */
  async findAll() {
    logger.info(`${this.constructor.name} findAll`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" ORDER BY "id"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }
}
