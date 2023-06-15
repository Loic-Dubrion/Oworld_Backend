const auth = require('../../auth/index');
const logger = require('../../services/logger');

const jwtController = {
  //! Fonction OK
  async logUser(request, response) {
    const { username, password } = request.body;

    const user = await auth.authentify(username, password);

    if (user) {
      console.log('user authentified');
      const accessToken = await auth.generateAccessToken(request.ip, user);
      const refreshToken = await auth.generateRefreshToken(user);

      return response.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    }

    console.log('  - user not authentified');
    return response.status(403).json({ status: 'error', message: 'Forbidden' });
  },

  getAuthorizedInfo(request, response) {
    console.log('getAuthorizedInfo');
    response.json({ status: 'success', data: 'You are officialy authorized to see this content' });
  },

  //! Fonction OK
  async refreshToken(request, response) {
    console.log('***** Début du refreshToken *****');
    try {
      // Récupère le token du header
      logger.warn('1 -je déclenche getAccesTokenUser en await pour récupérer l\'user de la bbd ');
      const user = await auth.getAccessTokenUser(request);
      // Je vérifie la validité du token de refresh
      logger.warn('5 - je déclenche isValidRefreshToken(request, user) ');
      if (user && await auth.isValidRefreshToken(request, user)) {
        // Si oui je régénère des tokens
        logger.warn('Le refresh Token est bon pour : ', user);
        logger.warn('6 - je redéclenche la création de token pour ', user.username);
        const accessToken = await auth.generateAccessToken(request.ip, user);
        const refreshToken = await auth.generateRefreshToken(user);
        logger.warn('7 - je n\'ai plus qu\'à renvoyer la réponse avec les tokens');
        response.status(200).json({
          status: 'success',
          data: { accessToken, refreshToken },
        });
      }
    } catch (err) {
      response.status(401).json({ status: 'error', message: err.message });
    }
  },
};

module.exports = jwtController;
