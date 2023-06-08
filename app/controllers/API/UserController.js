const bcrypt = require('bcrypt');

const logger = require('../../services/logger');
const CoreController = require('./CoreController');
const userDataMapper = require('../../models/UserDataMapper');
const Error400 = require('../../errors/Error400');

/** Class representing a user controller. */
class UserController extends CoreController {
  static dataMapper = userDataMapper;

  /**
   * create a user controller
  *
  * @augments CoreController
  */

  async getFavoriteCountries(request, response) {
    const { userId } = request.params;
    const results = await this.constructor.dataMapper.executeFunction('favorite_countries', userId);
    response.json(results);
  }

  async addFavorite(request, response) {
    const { userId, countryISO } = request.params;
    const results = await this.constructor.dataMapper.executeFunction('insert_favorite', userId, countryISO);
    response.json(results);
  }

  async deleteFavorite(request, response) {
    const { userId, countryISO } = request.params;
    const results = await this.constructor.dataMapper.executeFunction('delete_favorite', userId, countryISO);
    response.json(results);
  }

  async addUser(request, response) {
    const dataUser = request.body;
    const user = await UserController.dataMapper.findOneByField('username', dataUser.username);
    if (user) {
      throw new Error400('existing user');
    }
    const email = await UserController.dataMapper.findOneByField('email', dataUser.email);
    if (email) {
      throw new Error400('existing email address');
    }
    const { password, ...userWithoutPassword } = dataUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const modifiedDataUser = { ...userWithoutPassword, password: hashedPassword };
    const results = await this.constructor.dataMapper.executeFunction('insert_user', modifiedDataUser);
    response.json(results);
  }

  async updateUser(request, response) {
    const { userId } = request.params;
    const { ...objData } = request.body;
    logger.debug(objData);
    const results = await this.constructor.dataMapper.executeFunction('update_user', userId, objData);
    response.json(results);
  }

  async deleteUser(request, response) {
    const { userId } = request.params;
    const results = await this.constructor.dataMapper.executeFunction('delete_user', userId);
    response.json(results);
  }
}

module.exports = new UserController();
