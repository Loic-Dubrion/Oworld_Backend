const logger = require('../services/logger');
const client = require('../services/clientdb');

/** Class representing an abstract data mapper. */
class CoreDataMapper {
  static tableName;

  static viewName;

  async findAll() {
    logger.info(`${this.constructor.name} findAll`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}"`,
    };
    logger.info(preparedQuery);
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  async findByPk(id) {
    logger.info(`${this.constructor.name} findByPk(${id})`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" WHERE id=$1`,
      values: [id],
    };
    logger.info(preparedQuery);
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  async executeFunction(functionName, param) {
    logger.info(`${this.constructor.name} executeFunction(${functionName}, ${param})`);
    const preparedQuery = {
      text: `SELECT * FROM ${functionName}($1)`,
      values: [param],
    };
    logger.info(preparedQuery);
    const results = await client.query(preparedQuery);
    return results.rows;
  }
}

module.exports = CoreDataMapper;
