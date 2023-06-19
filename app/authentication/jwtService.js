const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../services/clientdb');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

const Error401 = require('../errors/Error401');
const Error403 = require('../errors/Error403');

const auth = {
  // Retrieves roles and functions
  async getUserRolesAndPermissions(userId) {
    const query = `
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
        u.id = $1
    `;
    const values = [userId];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const { roles, permissions } = result.rows[0];
      return { roles, permissions };
    }
    return null;
  },

  // Checks whether the user exists with the correct password returns true or false
  async authentify(username, password) {
    const query = 'SELECT * FROM "user" WHERE username=$1';
    const values = [username];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const foundUser = result.rows[0];

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

  // Generates access token Stores ip and nickname
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

  // Generates the refresh token with just the nickname as a parameter
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

  authorize(request, response, next) {
    try {
      const token = auth.getAccessJWT(request);
      const decodedToken = jwt.verify(token, JWT_SECRET);

      // const tokenIPSegments = decodedToken.data.ip.split('.').slice(0, 3);
      // const requestIPSegments = request.ip.split('.').slice(0, 3);
      // if (tokenIPSegments.join('.') === requestIPSegments.join('.')) {
      //   return next();
      // }

      if (decodedToken) {
        next();
      } else {
        throw new Error('401: Invalid token');
      }

      // throw new Error401('Invalid token');
    } catch (err) {
      throw new Error401(err.message);
    }
  },

  async getAccessTokenUser(request) {
    const token = auth.getAccessJWT(request);
    const decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    const query = 'SELECT * FROM "user" WHERE username=$1';
    const values = [decodedToken.data.username];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error401('User not found');
    }

    const user = result.rows[0];

    if (decodedToken.data.username !== user.username) {
      throw new Error401('Mismatching usernames');
    }
    return user;
  },

  getAccessJWT(request) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    throw new Error401('No token provided');
  },

  async isValidRefreshToken(request, user) {
    const { refreshToken } = request.body;
    if (!refreshToken) {
      throw new Error401('No refresh token found');
    }

    let decodedRefreshToken;

    try {
      decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error401('Invalid refresh token');
    }

    const query = 'SELECT * FROM "user" WHERE id=$1';
    const values = [decodedRefreshToken.data.id];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const foundUser = result.rows[0];
      if (foundUser.username === user.username && refreshToken === foundUser.refresh_token) {
        return true;
      }

      throw new Error403('Unmatching users between access and refresh tokens');
    }

    throw new Error401('User not found');
  },
};

module.exports = auth;
