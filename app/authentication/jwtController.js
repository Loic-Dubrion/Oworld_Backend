const auth = require('./jwtService');

const jwtController = {
  async logUser(request, response) {
    const { username, password } = request.body;
    console.log(username + ':' + password);

    const user = await auth.authentify(username, password);

    if (user) {
      const accessToken = await auth.generateAccessToken(request.ip, user);
      const refreshToken = await auth.generateRefreshToken(user);

      return response.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    }

    return response.status(403).json({ status: 'error', message: 'Forbidden' });
  },

  async refreshToken(request, response) {
    try {
      // Récupère le token du header
      const user = await auth.getAccessTokenUser(request);
      // Je vérifie la validité du token de refresh
      if (user && await auth.isValidRefreshToken(request, user)) {
        // Si oui je régénère des tokens
        const rolesAndPermissions = await auth.getUserRolesAndPermissions(user.id);
        const accessToken = auth.generateAccessToken(
          request.ip,
          { ...user, ...rolesAndPermissions },
        );
        const refreshToken = await auth.generateRefreshToken(user);
        auth.generateRefreshToken(user);
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
