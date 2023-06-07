const logger = require('../services/logger');
const client = require('../services/clientdb');

/** Class representing an abstract data mapper. */
class CoreDataMapper {
  static tableName;

  static viewName;

  async findAll(useView = false) {
    logger.info(`${this.constructor.name} findAll`);
    const tableName = useView ? this.constructor.viewName : this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}"`,
    };
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
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  // async create(createObj) {
  //   logger.info(`${this.constructor.name} create`);
  //   const preparedQuery = {
  //     text: `
  //         SELECT * FROM create_post_from_json($1)
  //       `,
  //     values: [createObj],
  //   };
  //   const results = await client.query(preparedQuery);
  //   return results.rows[0];
  // }

  async executeFunction(functionName, ...params) {
    logger.info(`${this.constructor.name} executeFunction(${functionName}, ${params})`);
    const preparedQuery = {
      text: `SELECT * FROM ${functionName}(${params.map((_, i) => `$${i + 1}`).join(', ')})`,
      values: params,
    };
    logger.info(preparedQuery);
    const results = await client.query(preparedQuery);
    return results.rows;
  }
}

module.exports = CoreDataMapper;
