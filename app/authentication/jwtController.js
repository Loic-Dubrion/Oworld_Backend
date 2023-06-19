const jwt = require('jsonwebtoken');

const auth = require('./jwtService');
const sendReset = require('./sendPasswordReset');
const Error400 = require('../errors/Error400');
const Error403 = require('../errors/Error403');

const UserDataMapper = require('../models/UserDataMapper');

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
  },

  async resetPassword(request, response) {
    const { email } = request.body;

    const user = await UserDataMapper.findOneByField('email', email);
    if (email !== user.email) {
      throw new Error400('Email not valide');
    }

    // Generate a password reset token
    const resetToken = jwt.sign({}, process.env.JWT_SECRET, {
      subject: user.id.toString(),
      expiresIn: '20m',
    });

    await sendReset(user.email, resetToken);

    response.status(200).json({
      status: 'success',
      message: 'Password reset email sent',
    });
  },
};

module.exports = jwtController;
