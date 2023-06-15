const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../services/clientdb');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

const auth = {
  //! OK POUR CETTE FONCTION
  // Récupère les rôles et fonctions
  async getUserRolesAndPermissions(userId) {
    console.log('**** Fonction getUserRolesAndPermissions *****');

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

  //! OK POUR CETTE FONCTION
  // Vérifie si l'utilisateur existe avec le bon mot de passe retourne true or false
  async authentify(username, password) {
    console.log('**** Fonction authentify *****');

    const query = 'SELECT * FROM "user" WHERE username=$1';
    const values = [username];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const foundUser = result.rows[0];

      if (foundUser) {
        console.log('foundUser est true');
        const isGoodPassword = await bcrypt.compare(password, foundUser.password);

        if (isGoodPassword) {
          console.log('password est true');

          // get user roles and permissions
          const rolesAndPermissions = await this.getUserRolesAndPermissions(foundUser.id);

          // return user info along with roles and permissions
          return { ...foundUser, ...rolesAndPermissions };
        }
      }
    }
    console.log('foundUser est false');
    return false;
  },

  //! OK POUR CETTE FONCTION
  // Génère le token d'accès stocke l'ip et le pseudo
  generateAccessToken(ip, user) {
    console.log('******* Fonction generateAccessToken *******');
    return jwt.sign(
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
  },

  //! OK POUR CETTE FONCTION
  // Génère le token de refresh avec juste le pseudo en param
  async generateRefreshToken(user) {
    console.log('****** Fonction generateRefreshToken ********');

    const refreshToken = jwt.sign(
      {
        data: {
          id: user.id,
        },
      },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION },
    );
    user.refreshToken = refreshToken;
    return refreshToken;
  },

  //! OK POUR CETTE FONCTION
  authorize(request, response, next) {
    console.log('**** Fonction authorize ****');
    try {
      // Récupère la partie du token via la fonction ** getAccessJWT **
      const token = auth.getAccessJWT(request);
      console.log('TOKEN = ', token);
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

  /**
   * Gets user from access token
   *
   * @param {request} request
   * @returns the user the jwt was issued for
   */
  getAccessTokenUser(request) {
    const token = auth.getAccessJWT(request);
    const decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    const user = users.find((value) => decodedToken.data.username === value.username);
    return user;
  },

  //! OK POUR CETTE FONCTION
  // Vérifie si j'ai bien un header dans la requête
  getAccessJWT(request) {
    console.log('***** Fonction getAccessJWT *****');
    // Récupère le token
    const authHeader = request.headers.authorization;
    if (authHeader) {
      // Isole la partie du token qui nous intéresse
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    throw (new Error('Vous ne passerez pas !!!'));
  },

  /**
   * Checks validity of a refresh token
   *
   * @param {object} request
   * @param {object} user
   * @returns {boolean} token is valid
   */
  isValidRefreshToken(request, user) {
    const { refreshToken } = request.body;
    if (refreshToken) {
      const decodedRefreshToken = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      const foundUser = users.find((value) => decodedRefreshToken.data.id === value.id);
      if (foundUser.username === user.username && refreshToken === foundUser.refreshToken) {
        return true;
      }
      throw (new Error('Unmatching users between acess an refresh tokens'));
    }
    throw (new Error('No refresh token found'));
  },
};

module.exports = auth;
