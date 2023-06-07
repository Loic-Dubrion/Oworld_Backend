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

  async getFavoriteCountries(request, response) {
    logger.info(`${this.constructor.name} getFavoriteCountries`);
    const { userId } = request.params;
    const results = await this.constructor.dataMapper.executeFunction('favorite_countries', userId);
    response.json(results);
  }

  async addFavorite(request, response) {
    logger.info(`${this.constructor.name} addFavorite`);
    const { userId, countryISO } = request.params;
    console.log(userId, countryISO);
    const results = await this.constructor.dataMapper.executeFunction('insert_favorite', userId, countryISO);
    response.json(results);
  }
}

module.exports = new UserController();
