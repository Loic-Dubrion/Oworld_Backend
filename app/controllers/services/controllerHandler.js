/**
 * This is a middleware function that handles controllers.
 * It is an express middleware that wraps the controller function and catches any errors it throws,
 * passing them to the next middleware (usually an error handling middleware).
 *
 * @param {Function} controller - The controller function to wrap. This function should accept
 * the standard express parameters: req, res, and next.
 *
 * @returns {Function} - Returns an async function that accepts req, res, and next.
 * This function calls the passed in controller function and catches any errors it throws,
 * passing them to the next middleware.
 */
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
