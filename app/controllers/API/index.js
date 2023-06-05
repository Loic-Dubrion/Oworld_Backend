const apiController = {

  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs'}`;
    response.json({ documentation_url: fullURL });
  },

};

module.exports = { apiController };
