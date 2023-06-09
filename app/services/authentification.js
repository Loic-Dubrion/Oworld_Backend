const Error401 = require('../errors/Error401');
const Error403 = require('../errors/Error403');

const auth = async (req, res, next) => {
  const userId = Number(req.params.userId);

  if (!req.session.user) {
    return next(new Error401('Access forbidden - please login'));
  }

  if (userId !== req.session.user.id) {
    return next(new Error403('Access forbidden'));
  }

  return next();
};

module.exports = auth;
