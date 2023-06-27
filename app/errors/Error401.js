class Error401 extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.httpStatusCode = 401;
  }
}

module.exports = Error401;
