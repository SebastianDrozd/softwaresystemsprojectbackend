const ConnectionError = require("../error/ConnectionError");
const InternalServerError = require("../error/InternalServerError");
const UserNotFoundError = require("../error/UserNotFoundError");
const pool = require("../util/dbconfig");

const getAllUsers = async () => {
  try {
    const [results, fields] = await pool.query("SELECT * FROM users");
    return results;
  } catch (error) {
    if (error.code == "ECONNREFUSED") {
      console.error("Database connection refused");
      throw new ConnectionError(
        "Database connection refused. Please check your database server."
      );
    }
  }
};

const getUserByEmail = async (email) => {
  try {
    const [results, fields] = await pool.query(
      "SELECT * FROM users WHERE Email = ?",
      [email]
    );
   return results[0] || null; // Return the first user found, or undefined if none
  } catch (error) {
    if (error.code == "ECONNREFUSED") {
      console.error("Database connection refused");
      throw new ConnectionError(
        "Database connection refused. Please check your database server."
      );
    }
    console.log(error)
    throw new InternalServerError(
      "An error occurred while retrieving the user by email."
    );
  }
};

const createNewUser = async (userData) => {
  const { password, email, role, firstname, lastname } = userData;
  try {
    const [result] = await pool.query(
      "INSERT INTO users (FirstName,LastName,Email,Password,Role) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, password, role]
    );
    
    return result;
  } catch (error) {
    if (error.code == "ECONNREFUSED") {
      console.error("Database connection refused");
      throw new ConnectionError(
        "Database connection refused. Please check your database server."
      );
    } else {
      throw new InternalServerError(
        "An error occurred while retrieving the user by email."
      );
    }
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createNewUser,
};
