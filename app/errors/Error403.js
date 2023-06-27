class Error403 extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.httpStatusCode = 403;
  }
}

module.exports = Error403;
