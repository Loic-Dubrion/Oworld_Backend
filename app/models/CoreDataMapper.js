const memoizee = require('memoizee');
const logger = require('../services/logger');
const client = require('../services/clientdb');

/** Class representing an abstract data mapper. */
class CoreDataMapper {
  static tableName;

  static viewName;

  constructor() {
    // Mémoiser la méthode findAll
    this.findAll = memoizee(this.findAll.bind(this), { promise: true, maxAge: 30 * 1000 });
  }

  async findAll(useView) {
    const tableName = useView ? this.constructor.viewName : this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  async findOneByField(field, value) {
    const { tableName } = this.constructor;
    const query = {
      text: `SELECT * FROM "${tableName}" WHERE ${field} = $1`,
      values: [value],
    };
    const results = await client.query(query);
    return results.rows[0];
  }

  async executeFunction(functionName, ...params) {
    logger.info(`${this.constructor.name} executeFunction(${functionName}, ${params})`);
    // la syntaxe (_, i) est utilisée pour déstructurer les éléments du tableau params
    // seul le deuxième argument i (index) est utilisé, tandis que le premier argument _ est ignoré.
    const preparedQuery = {
      text: `SELECT * FROM ${functionName}(${params.map((_, i) => `$${i + 1}`).join(', ')})`,
      values: params,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }
}

module.exports = CoreDataMapper;
