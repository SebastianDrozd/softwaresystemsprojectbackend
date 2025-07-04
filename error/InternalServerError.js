class InternalServerError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;