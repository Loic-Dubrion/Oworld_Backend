/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const session = require('express-session');
const logger = require('../../services/logger');
const CoreController = require('./CoreController');
const userDataMapper = require('../../models/UserDataMapper');
const Error403 = require('../../errors/Error403');

/** Class representing a session controller. */
class SessionController extends CoreController {
  static dataMapper = userDataMapper;

  /**
   * Create a session controller.
   *
   * @augments CoreController
   */
  constructor() {
    super();
    logger.info('SessionController created');
  }

  async login(request, response) {
    const { email, password } = request.body;
    logger.info(request.body);
    const user = await SessionController.dataMapper.findOneByField('email', email);

    if (!user) {
      throw new Error403('Utilisateur ou mot de passe incorrect');
    }

    const isGoodPassword = await bcrypt.compare(password, user.password);

    if (!isGoodPassword) {
      throw new Error403('Utilisateur ou mot de passe incorrect');
    }

    request.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.id_role,
    };

    return response.status(200).json({ message: 'Utilisateur connecté avec succès', user: request.session.user });
  }

  logout(request, response) {
    request.session.user = null;
    return response.status(200).json({ message: 'Déconnexion réussie' });
  }
}

module.exports = new SessionController();
