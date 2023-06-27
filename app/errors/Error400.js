class Error400 extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.httpStatusCode = 400;
  }
}

module.exports = Error400;
