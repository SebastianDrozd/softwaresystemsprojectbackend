class UserAlreadyExistsError extends Error {
  constructor(message = "User already exists") {
    super(message);
    this.name = "UserAlreadyExistsError";
    this.statusCode = 409; // Bad Request
  }
}

module.exports = UserAlreadyExistsError;