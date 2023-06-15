const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../services/clientdb');
const logger = require('../services/logger');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

const auth = {
  //! OK POUR CETTE FONCTION
  // Récupère les rôles et fonctions
  async getUserRolesAndPermissions(userId) {
    logger.info('***** Auth Fonction getUserRolesAndPermissions *****');

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
      logger.info('Return :', { roles, permissions });
      return { roles, permissions };
    }
    return null;
  },

  //! OK POUR CETTE FONCTION
  // Vérifie si l'utilisateur existe avec le bon mot de passe retourne true or false
  async authentify(username, password) {
    logger.info('***** Auth Fonction authentify *****');

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
          logger.info('authentify Return :', { ...foundUser, ...rolesAndPermissions });
          return { ...foundUser, ...rolesAndPermissions };
        }
      }
    }
    return false;
  },

  //! OK POUR CETTE FONCTION
  // Génère le token d'accès stocke l'ip et le pseudo
  generateAccessToken(ip, user) {
    logger.info('***** Auth Fonction generateAccessToken *****');
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
    logger.info('Token d\'accès  :', token);
    return token;
  },

  //! OK POUR CETTE FONCTION
  // Génère le token de refresh avec juste le pseudo en param
  async generateRefreshToken(user) {
    logger.info('***** Fonction generateRefreshToken *****');

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
    logger.info('TokenRefresh généré :', refreshToken);
    return refreshToken;
  },

  //! OK POUR CETTE FONCTION
  authorize(request, response, next) {
    logger.info('**** Fonction authorize ****');
    try {
      // Récupère la partie du token via la fonction ** getAccessJWT **
      const token = auth.getAccessJWT(request);
      // Vérifie l'intégrité du Token
      const decodedToken = jwt.verify(token, JWT_SECRET);
      // if token is valid, check for matching authentification and request ip
      if (decodedToken.data.ip === request.ip) {
        // it's a go, you are now authorized !
        logger.info('Return next(), c\'est juste un checkpoint');
        return next();
      }
      throw (new Error('invalid token'));
    } catch (err) {
      // if an error occurs (invalid token, or unmatching ips)
      return response.status(401).json({ status: 'error', message: err.message });
    }
  },

  //! OK POUR CETTE FONCTION
  async getAccessTokenUser(request) {
    console.log('**** Début de Auth getAccessTokenUser ****');
    // Je récupère le Token
    logger.warn('2- Je déclenche getAccesJWT(request)');
    const token = auth.getAccessJWT(request);
    // Je le décode en forçant pour ne pas tenir compte de l'expiration
    logger.warn('3- Je décode le token');
    const decodedToken = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    logger.warn('le token décodé = ', decodedToken);
    // Je check en bdd l'user correspondant à l'id
    logger.warn('4- Je cherche le user en bdd');
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
    logger.info('Je retourne le user : ', user);
    return user;
  },

  //! OK POUR CETTE FONCTION
  // Vérifie si j'ai bien un header dans la requête
  getAccessJWT(request) {
    console.log('***** Début de Auth getAccessJWT *****');
    // Récupère le token
    const authHeader = request.headers.authorization;
    if (authHeader) {
      // Isole la partie du token qui nous intéresse
      const token = authHeader.split('Bearer ')[1];
      logger.warn('getAccesJWT me retourne le playload du token  : ', token);
      return token;
    }
    throw (new Error('Vous ne passerez pas !!!'));
  },

  //! OK POUR CETTE FONCTION
  // Vérifie la validation du token de refresh
  async isValidRefreshToken(request, user) {
    console.log('***** Début de la fonction Auth isValidRefreshToken *****');

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

    logger.warn('Je récupère le refresh token : ', decodedRefreshToken);
    // Je check en bdd l'user correspondant à l'id
    const query = 'SELECT * FROM "user" WHERE id=$1';
    const values = [decodedRefreshToken.data.id];
    const result = await client.query(query, values);

    // S'il y a match
    if (result.rows.length > 0) {
      const foundUser = result.rows[0];
      logger.warn('Je check également :', refreshToken, 'et ', foundUser.refreshToken);
      // Je check le pseudo et le token de refresh
      if (foundUser.username === user.username && refreshToken === foundUser.refreshToken) {
        logger.info('Return : true');
        logger.warn('Je check l\'id avec la bdd et je retourne true');
        return true;
      }

      throw new Error('Unmatching users between access and refresh tokens');
    }

    throw new Error('User not found');
  },

};

module.exports = auth;
