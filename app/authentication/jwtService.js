const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../services/clientdb');
const logger = require('../services/logger');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

const auth = {
  // Récupère les rôles et fonctions
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

  // Vérifie si l'utilisateur existe avec le bon mot de passe retourne true or false
  async authentify(username, password) {
    const query = 'SELECT * FROM "user" WHERE username=$1';
    const values = [username];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const foundUser = result.rows[0];

      if (foundUser) {
        const isGoodPassword = await bcrypt.compare(password, foundUser.password);

        if (isGoodPassword) {
          // get user roles and permissions
          const rolesAndPermissions = await this.getUserRolesAndPermissions(foundUser.id);

          // return user info along with roles and permissions
          return { ...foundUser, ...rolesAndPermissions };
        }
      }
    }
    return false;
  },

  // Génère le token d'accès stocke l'ip et le pseudo
  generateAccessToken(ip, user) {
    const token = jwt.sign(
      {
        data: {
          ip,
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

  // Génère le token de refresh avec juste le pseudo en param
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
    // mise à jour du refresh_token dans la base de données
    const query = 'UPDATE "user" SET refresh_token=$1 WHERE id=$2';
    const values = [refreshToken, user.id];
    await client.query(query, values);

    return refreshToken;
  },

  authorize(request, response, next) {
    try {
      // Récupère la partie du token via la fonction ** getAccessJWT **
      const token = auth.getAccessJWT(request);
      // Vérifie l'intégrité du Token
      const decodedToken = jwt.verify(token, JWT_SECRET);
      // if token is valid, check for matching authentification and request ip
      if (decodedToken.data.ip === request.ip) {
        // it's a go, you are now authorized !
        return next();
      }
      throw (new Error('invalid token'));
    } catch (err) {
      // if an error occurs (invalid token, or unmatching ips)
      return response.status(401).json({ status: 'error', message: err.message });
    }
  },

  async getAccessTokenUser(request) {
    // Je récupère le Token
    const token = auth.getAccessJWT(request);
    // Je le décode en forçant pour ne pas tenir compte de l'expiration
    const decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    const query = 'SELECT * FROM "user" WHERE username=$1';
    const values = [decodedToken.data.username];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];

    if (decodedToken.data.username !== user.username) {
      throw new Error('Mismatching usernames');
    }
    return user;
  },

  // Vérifie si j'ai bien un header dans la requête
  getAccessJWT(request) {
    // Récupère le token
    const authHeader = request.headers.authorization;
    if (authHeader) {
      // Isole la partie du token qui nous intéresse
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    throw (new Error('Vous ne passerez pas !!!'));
  },

  // Vérifie la validation du token de refresh
  async isValidRefreshToken(request, user) {
    // Récupère le token de refresh dans le body
    const { refreshToken } = request.body;
    // Si pas de token de refresh on stop
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // Je déclare ma variable
    let decodedRefreshToken;

    try {
      // Je décode mon Token avec mes variables d'environnement
      decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }

    // Je check en bdd l'user correspondant à l'id
    const query = 'SELECT * FROM "user" WHERE id=$1';
    const values = [decodedRefreshToken.data.id];
    const result = await client.query(query, values);

    // S'il y a match
    if (result.rows.length > 0) {
      const foundUser = result.rows[0];
      // Je check le pseudo et le token de refresh
      if (foundUser.username === user.username && refreshToken === foundUser.refresh_token) {
        return true;
      }

      throw new Error('Unmatching users between access and refresh tokens');
    }

    throw new Error('User not found');
  },

};

module.exports = auth;
