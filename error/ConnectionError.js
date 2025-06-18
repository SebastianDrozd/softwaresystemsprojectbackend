class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConnectionError';
    this.statusCode = 503; // Internal Server Error
  }
}

module.exports = ConnectionError;