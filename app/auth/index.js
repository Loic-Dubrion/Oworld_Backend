const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../services/clientdb');

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION ?? '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION ?? '7d';

const auth = {
  //! OK POUR CETTE FONCTION
  // Vérifie si l'utilisateur existe avec le bon mot de passe retourne true or false
  async authentify(username, password) {
    console.log('**** Fonction authentify *****');

    const query = 'SELECT * FROM "user" WHERE username=$1';
    const values = [username];
    const result = await client.query(query, values);

    // Vérification qu'un utilisateur a été trouvé
    if (result.rows.length > 0) {
      const foundUser = result.rows[0];

      // Si j'ai un user je check le mot de passe
      if (foundUser) {
        console.log('foundUser est true');

        // Compare le mot de passe fourni avec le hash enregistré dans la base de données
        const isGoodPassword = await bcrypt.compare(password, foundUser.password);

        if (isGoodPassword) {
          console.log('password est true');
          return true;
        }
      }
    }
    console.log('foundUser est false');
    return false;
  },

  // Génère le token d'accès stocke l'ip et le pseudo
  generateAccessToken(ip, username) {
    console.log('******* Fonction generateAccessToken *******');
    // Codage du token et valeur de retour avec TTL
    return jwt.sign(
      {
        data: {
          ip,
          username,
        },
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION },
    );
  },

  // Génère le token de refresh avec juste le pseudo en param
  async generateRefreshToken(username) {
    console.log('****** Fonction generateRefreshToken ********');

    const query = 'SELECT * FROM "user" WHERE username=$1';
    const values = [username];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      const foundUser = result.rows[0];
      const refreshToken = jwt.sign(
        {
          data: {
            id: foundUser.id,
          },
        },
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRATION },
      );
      foundUser.refreshToken = refreshToken;
      return refreshToken;
    }
  },


  authorize(request, response, next) {
    console.log('authorize');
    try {
      // try to get token
      const token = auth.getAccessJWT(request);
      debug(token);
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

  /**
   * gets access JWT
   *
   * @param {*} request
   * @returns {(string | false)} the JWT or false if there is no jwt
   */
  getAccessJWT(request) {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    throw (new Error('jwt must be provided'));
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
