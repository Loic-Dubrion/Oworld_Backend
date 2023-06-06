const logger = require('../../services/logger');

/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  /**
   * responds with all entries from a table
   *
   * @param {Object} _
   * @param {Object} response
   */
  async getAll(_, response) {
    logger.info(`${this.constructor.name} getAll`);
    const results = await this.constructor.dataMapper.findAll();
    response.json(results);
  }

}

module.exports = CoreController;