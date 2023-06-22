const memoizee = require('memoizee');
const client = require('../services/clientDB/clientPostgres');

/**
 * Class representing an abstract data mapper. This class should be extended by other
 * data mapper classes, and it contains common CRUD operations.
 *
 * @property {string} tableName - The name of the table that this data mapper operates on.
 * @property {string} viewName - The name of the view that this data mapper operates on.
 */
class CoreDataMapper {
  constructor() {
    /**
     * Constructs a new instance of the CoreDataMapper class and memoizes the findAll method
     * to improve performance.
     */
    this.findAll = memoizee(this.findAll.bind(this), { promise: true, maxAge: 30 * 1000 });
  }

  /**
   * Fetches all records from a table or view.
   *
   * @param {boolean} useView - If true, selects from the view, otherwise selects from the table.
   * @returns {Promise<Array>} The result set from the database query.
   */
  async findAll(useView) {
    const tableName = useView ? this.constructor.viewName : this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * Fetches a single record from the table based on a specific field and value.
   *
   * @param {string} field - The field to filter on.
   * @param {string|number} value - The value to search for in the specified field.
   * @returns {Promise<Object>} The first matching record from the database query.
   */
  async findOneByField(field, value) {
    const { tableName } = this.constructor;
    const query = {
      text: `SELECT * FROM "${tableName}" WHERE ${field} = $1`,
      values: [value],
    };
    const results = await client.query(query);
    return results.rows[0];
  }

  /**
   * Executes a sql function with the provided parameters.
   *
   * @param {string} functionName - The name of the database function to execute.
   * @param {...*} params - The parameters to pass to the database function.
   * @returns {Promise<Array>} The result set from the database function.
   */
  async executeFunction(functionName, ...params) {
    const preparedQuery = {
      text: `SELECT * FROM ${functionName}(${params.map((_, i) => `$${i + 1}`).join(', ')})`,
      values: params,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }
}

module.exports = CoreDataMapper;
