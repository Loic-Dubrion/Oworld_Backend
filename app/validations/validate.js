const Error400 = require('../errors/Error400');

/**
 * Return validation middlewares according to
 * a dataSource and a schema
 *
 * @param {Object} schema - A Joi validation schema
 * @param {'body'} dataSource - The source of data to validate
 * @returns {function} - A middleware function
 */
function validate(schema, dataSource) {
  return (request, response, next) => {
    const { error } = schema.validate(request[dataSource]);
    if (error) {
      next(new Error400(error.details[0].message));
    } else {
      next();
    }
  };
}

module.exports = validate;
