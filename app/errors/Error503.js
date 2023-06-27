class Error503 extends Error {
  constructor(message) {
    super(message);
    this.name = 'Service Unavailable';
    this.httpStatusCode = 503;
  }
}

module.exports = Error503;
