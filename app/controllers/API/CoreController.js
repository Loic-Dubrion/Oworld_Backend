const logger = require('../../services/logger');

/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  /**
   * responds with all entries from a table
   *
   * @param {Object} _
   * @param {Object} request
   */
  async getAll(request, response) {
    logger.info(`${this.constructor.name} getAll`);
    const useView = request.query.useView === 'true';
    const results = await this.constructor.dataMapper.findAll(useView);
    response.json(results);
  }

  /**
   * responds with one entry from a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  async getOne(request, response) {
    logger.info(`${this.constructor.name} getOne`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findByPk(id);
    response.json(results);
  }

  /**
   * create one entry in a table
   *
   * @param {Object} request
   * @param {Object} response
   */
  async create(request, response) {
    logger.info(`${this.constructor.name} create`);
    const results = await this.constructor.dataMapper.create(request.body);
    response.json(results);
  }
}

module.exports = CoreController;
