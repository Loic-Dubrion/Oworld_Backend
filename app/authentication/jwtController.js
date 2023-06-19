const auth = require('./jwtService');
const Error403 = require('../errors/Error403');
const Error401 = require('../errors/Error401');

const jwtController = {
  async logUser(request, response) {
    const { username, password } = request.body;

    const user = await auth.authentify(username, password);

    if (user) {
      const accessToken = auth.generateAccessToken(request.ip, user);
      const refreshToken = await auth.generateRefreshToken(user);

      return response.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken },
      });
    }

    throw new Error403('Forbidden');
  },

  async refreshToken(request, response) {
    try {
      const user = await auth.getAccessTokenUser(request);
      if (user && (await auth.isValidRefreshToken(request, user))) {
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
      throw new Error401(err.message);
    }
  },
};

module.exports = jwtController;
