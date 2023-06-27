class Error404 extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.httpStatusCode = 404;
  }
}

module.exports = Error404;
