function controllerHandler(controller) {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = controllerHandler;
