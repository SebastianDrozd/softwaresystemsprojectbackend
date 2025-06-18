class SqlError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'SqlError';
    this.code = code;
  }
}