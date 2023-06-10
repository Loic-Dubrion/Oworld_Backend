const adminController = require('./AdminController');
const userController = require('./UserController');
const oworldController = require('./OworldController');
const sessionController = require('./SessionController');

/**
 * Controller for API endpoints.
 */
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
  sessionController,
};
