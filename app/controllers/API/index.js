const adminController = require('./AdminController');
const userController = require('./UserController');

const apiController = {
  /**
   * responds with api documentation url
   *
   * @param {Object} request
   * @param {Object} response
   */
  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/docs'}`;
    response.redirect(fullURL);
  },
};

module.exports = { apiController, adminController, userController };
