const auth = require('../../auth/index');

const jwtController = {
  getHomePage(request, response) {
    console.log('getHomePage');
    response.render('home');
  },

  async logUser(request, response) {
    const { username, password } = request.body;
    console.log('logUser', request.body);
    if (await auth.authentify(username, password)) {
      console.log('user authentified');
      const accessToken = auth.generateAccessToken(request.ip, username);
      const refreshToken = await auth.generateRefreshToken(username);
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

  refreshToken(request, response) {
    console.log('refreshToken');
    try {
      const user = auth.getAccessTokenUser(request);
      if (user && auth.isValidRefreshToken(request, user)) {
        const accessToken = auth.generateAccessToken(request.ip, user.username);
        const refreshToken = auth.generateRefreshToken(user.username);
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
