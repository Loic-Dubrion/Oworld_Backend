class Error409 extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateKeyError';
    this.httpStatusCode = 409;
  }
}

module.exports = Error409;
