const logger = require('../services/clientdb');
const client = require('../services/clientdb');

/** Class representing an abstract data mapper. */

class CoreDataMapper {
  static tableName;

  static viewName; // if viewName is defined, it will be used for find methods

    /**
   * fetch an entry according to its id
   *
   * @param {number} id - id of the entry
   * @returns an entry
   */
    async findByPk(id) {
      debug(`${this.constructor.name} findByPk(${id})`);
      const tableName = this.constructor.viewName || this.constructor.tableName;
      const preparedQuery = {
        text: `SELECT * FROM "${tableName}" WHERE id=$1`,
        values: [id],
      };
      const results = await client.query(preparedQuery);
      return results.rows[0];
    }
}
