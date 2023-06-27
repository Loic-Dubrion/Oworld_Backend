const adminController = require('./AdminController');
const userController = require('./UserController');
const oworldController = require('./OworldController');
const jwtController = require('./JwtController');
const externalApiController = require('./externalApiController');
const apiController = {
  /**
   * Responds with the API documentation URL and redirects to it.
   *
   * @param {Object} request - The request object.
   * @param {Object} response - The response object.
   */
  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/docs'}`;
    response.redirect(fullURL);
  },
};

module.exports = {
  apiController,
  adminController,
  userController,
  oworldController,
  jwtController,
  externalApiController,
};
