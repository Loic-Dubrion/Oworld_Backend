/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */

const bcrypt = require('bcrypt');
const CoreController = require('./CoreController');
const userDataMapper = require('../../models/UserDataMapper');
const Error403 = require('../../errors/Error403');
const clientdb = require('../../services/clientdb');

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
  }

  /**
   * Handles the login functionality.
   *
   * @param {Object} request - Object with email and password.
   * @param {Object} response - The response object.
   * @returns {Object} The response object.
   * @throws {Error403} Throws an error if the user or password is incorrect.
   */
  async login(request, response) {
    const { email, password } = request.body;

    // checks that the email exists
    const user = await SessionController.dataMapper.findOneByField('email', email);

    if (!user) {
      throw new Error403('Incorrect user or password');
    }

    // checks that the password matches
    const isGoodPassword = await bcrypt.compare(password, user.password);

    if (!isGoodPassword) {
      throw new Error403('Incorrect user or password');
    }

    // retrieves roles and permissions
    const result = await clientdb.query(
      `
      SELECT 
      array_agg(DISTINCT role.name) AS roles, 
      array_agg(DISTINCT authorisation.name) AS permissions
    FROM 
      "user" AS u
    JOIN 
      user_has_role ON u.id = user_has_role.user_id
    JOIN 
      role ON user_has_role.role_id = role.id
    JOIN 
      role_has_authorisation ON role.id = role_has_authorisation.role_id
    JOIN 
      authorisation ON role_has_authorisation.authorisation_id = authorisation.id
    WHERE 
      u.id = $1`,
      [user.id],
    );

    const userRolesAndPermissions = result.rows[0];

    // Save roles and permissions in the session
    request.session.user = {
      id: user.id,
      username: user.username,
      role: user.id_role,
      roles: userRolesAndPermissions.roles,
      permissions: userRolesAndPermissions.permissions,
    };

    return response.status(200).json({
      httpCode: 200,
      status: 'success',
      message: 'successful connection',
      session: request.session.user,
    });
  }

  /**
   * Handles the logout functionality.
   *
   * @param {Object} request
   * @param {Object} response - The response object.
   * @returns {Object} The response object.
   */
  logout(request, response) {
    request.session.user = null;
    return response.status(200).json({ httpCode: 200, status: 'success', message: 'Successful disconnection' });
  }
}

module.exports = new SessionController();
