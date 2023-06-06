const logger = require('../../services/logger');
const CoreController = require('./CoreController');
const userDataMapper = require('../../models/UserDataMapper');

/** Class representing a user controller. */
class UserController extends CoreController {
  static dataMapper = userDataMapper;

  /**
   * create a user controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    logger.info('userController created');
  }

  /**
   * responds with favorite countries of a user
   *
   * @param {Object} request
   * @param {Object} response
   */
  async getFavoriteCountries(request, response) {
    logger.info(`${this.constructor.name} getFavoriteCountries`);
    const { userId } = request.params;
    const results = await this.constructor.dataMapper.executeFunction('favorite_countries', userId);
    response.json(results);
  }
}

module.exports = new UserController();
