/**
 * @module Services_Controllers
 */

// import libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../../services/clientDB/clientPostgres');

// import environment variables
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

// import errors
const { Error401, Error403 } = require('../../errors');

// import models
const UserDataMapper = require('../../models/UserDataMapper');

const auth = {
  /**
 * Retrieves the roles and permissions of a specified user from the database.
 * This function executes a SQL function using a data mapper to get the roles and permissions.
 * If the user has roles and permissions,
 * they are returned in an object; otherwise, null is returned.
 *
 * @param {number} userId - The ID of the user whose roles and permissions are to be fetched.
 * @returns {Object|null} - An object containing the roles and permissions of the user
 * if they exist, null otherwise.
 * The object has the following structure: { roles: string[], permissions: string[] }
 */
  async getUserRolesAndPermissions(userId) {
    const result = await UserDataMapper.executeFunction('get_user_roles_and_permissions', userId);
    if (result.length > 0) {
      const { roles, permissions } = result[0];
      return { roles, permissions };
    }
    return null;
  },

  /**
 * Authenticates a user based on their username and password.
 * This function first looks for a user with the provided username in the database.
 * If a user is found,
 * it then checks whether the provided password matches the one stored in the database.
 * If the password is correct, it also fetches the user's roles and permissions.
 * The method finally returns an object with the user data and their roles and permissions.
 * If no user is found or if the password is incorrect, it returns false.
 *
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password provided by the user for authentication.
 * @returns {Object|boolean} - An object containing the user data and their roles and permissions.
 * The structure of the user object { user, roles: string[], permissions: string[] }
 */
  async authentify(username, password) {
    const result = await UserDataMapper.findOneByField('username', username);
    if (result) {
      const foundUser = result;

      if (foundUser) {
        const isGoodPassword = await bcrypt.compare(password, foundUser.password);

        if (isGoodPassword) {
          const rolesAndPermissions = await this.getUserRolesAndPermissions(foundUser.id);
          return { ...foundUser, ...rolesAndPermissions };
        }
      }
    }
    return false;
  },

  /**
 * Generates a JSON Web Token (JWT) for a user.
 * The token is signed with a secret and includes the user's IP address,
 * ID, username, roles, and permissions.
 * The JWT expires after a predetermined time period defined in ACCESS_TOKEN_EXPIRATION.
 * @param {string} ip - The IP address of the user.
 * @param {Object} user - The user object containing user details.
 * @returns {string} - A JWT for the user.
 */
  generateAccessToken(ip, user) {
    const token = jwt.sign(
      {
        data: {
          ip,
          id: user.id,
          username: user.username,
          roles: user.roles,
          permissions: user.permissions,
        },
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    );
    return token;
  },

  /**
 * Generates a JSON Web Token (JWT) as a refresh token for a user.
 * The refresh token is signed with a separate secret and only includes the user's ID.
 * The JWT expires after a predetermined time period defined in REFRESH_TOKEN_EXPIRATION.
 * The function also updates the refresh token in the user's record in the database.
 *
 * @param {Object} user - The user object containing user details.
 * @param {number} user.id - The ID of the user.
 * @returns {string} - A refresh JWT for the user, containing their ID.
 */
  async generateRefreshToken(user) {
    const refreshToken = jwt.sign(
      {
        data: {
          id: user.id,
        },
      },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION },
    );
    // update refresh_token in the database
    const query = 'UPDATE "user" SET refresh_token=$1 WHERE id=$2';
    const values = [refreshToken, user.id];
    await client.query(query, values);

    return refreshToken;
  },

  /**
 * The function retrieves the access JWT from the request,
 * decodes it, and verifies it against the JWT_SECRET.
 * It also checks if the IP address stored in the token matches the IP address of the request,
 * specifically the first three segments of the IP.
 * If the token is valid and the IP addresses match, the function proceeds to the next middleware.
 * If the token is invalid or the IP addresses do not match, it throws a 401 error.
 *
 * @param {Object} request - The Express request object.
 * @param {Object} response - The Express response object.
 * @param {Function} next - The next middleware function in the Express routing pipeline.
 * @throws {Error401} - If the token is invalid or the IP address of the token
 * and the request do not match.
 */
  authorize(request, response, next) {
    try {
      const token = auth.getAccessJWT(request);
      const decodedToken = jwt.verify(token, JWT_SECRET);

      const tokenIPSegments = decodedToken.data.ip.split('.').slice(0, 3);
      const requestIPSegments = request.ip.split('.').slice(0, 3);
      if (tokenIPSegments.join('.') === requestIPSegments.join('.')) {
        return next();
      }

      throw new Error401('Invalid token');
    } catch (err) {
      throw new Error401(err.message);
    }
  },

  /**
 * Retrieves the user associated with an access token.
 * The function retrieves the access JWT from the request, decodes it ignoring the expiration,
 * and verifies it against the JWT_SECRET.
 * It then fetches the user from the database based on the username from the decoded token.
 * If no user is found or the usernames do not match, it throws a 401 error.
 * @param {Object} request - The Express request object.
 * @returns {Object} - An object containing user details if found.
 * @throws {Error401} - If no user is found or the usernames from the token
 * and database do not match.
 */
  async getAccessTokenUser(request) {
    const token = auth.getAccessJWT(request);
    const decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    const user = await UserDataMapper.findOneByField('username', decodedToken.data.username);

    if (!user) {
      throw new Error401('User not found');
    }

    if (decodedToken.data.username !== user.username) {
      throw new Error401('Mismatching usernames');
    }
    return user;
  },

  /**
 * Retrieves the access JSON Web Token (JWT) from the request's authorization header.
 * The function checks if the authorization header is provided in the request.
 * @param {Object} request - contain an authorization header with the access JWT.
 * @returns {string} - The JWT string from the authorization header.
 * @throws {Error401} - If no authorization header is provided in the request.
 */
  getAccessJWT(request) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    throw new Error401('No token provided');
  },

  /**
 * Validates a user's refresh token.
 * The function first checks if a refresh token was provided in the request body.
 * If a refresh token is provided, it decodes and verifies the token.
 * The function then fetches the user from the database based
 * on the user ID from the decoded refresh token.
 * If the user is found, the function checks whether the username of
 * the found user matches the username of the provided user
 * and whether the provided refresh token matches the refresh token stored in the user's record.
 * If these conditions are met, the function returns true.
 * If the conditions are not met or no user is found, the function throws an error.
 * @param {Object} request - The request object, expected to contain a refresh token in the body.
 * @param {Object} user - An object containing user details.
 * @returns {boolean} - Returns true if the refresh token is valid; otherwise, an error is thrown.
 * @throws {Error401} - If no refresh token is provided or invalid, or if no user is found.
 * @throws {Error403} - If the usernames or refresh tokens between the request and db do not match.
 */
  async isValidRefreshToken(request, response, user) {
    const { refreshToken } = request.body;
    if (!refreshToken) {
      return response.status(401).json({ error: 'No refresh token found' });
    }

    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const foundUser = await UserDataMapper.findOneByField('id', decodedRefreshToken.data.id);

    if (foundUser) {
      if (foundUser.username === user.username && refreshToken === foundUser.refresh_token) {
        return true;
      }
      throw new Error403('Unmatching users between access and refresh tokens');
    }

    throw new Error401('User not found');
  },
};

module.exports = auth;
