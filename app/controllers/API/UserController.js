const bcrypt = require('bcrypt');

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
    const results = await this.constructor.dataMapper.executeFunction('insert_favorite', userId, countryISO);
    response.json(results);
  }

  async deleteFavorite(request, response) {
    logger.info(`${this.constructor.name} deleteFavorite`);
    const { userId, countryISO } = request.params;
    const results = await this.constructor.dataMapper.executeFunction('delete_favorite', userId, countryISO);
    response.json(results);
  }

  async addUser(request, response) {
    logger.info(`${this.constructor.name} addUser`);
    const dataUser = request.body;
    const { password, ...userWithoutPassword } = dataUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const modifiedDataUser = { ...userWithoutPassword, password: hashedPassword };
    const results = await this.constructor.dataMapper.executeFunction('insert_user', modifiedDataUser);
    response.json(results);
  }
}

module.exports = new UserController();
