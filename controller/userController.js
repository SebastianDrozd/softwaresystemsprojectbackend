const e = require("express");
const userRepo = require("../repo/UserRepo");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hello";

const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode).json({name:error.name, message: error.message });
  }
};

const signupUser = async (req, res) => {
  console.log("Received signup request:", req.body);
  const { username, password, email, role, firstname, lastname } = req.body;
  try {
    const existingUser = await userRepo.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: `User with email ${email} already exists` });
    }
    const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: role
    };
    const createdUser = await userRepo.createNewUser(newUser);
    const payload = {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    res
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: 'Signup successful', user: newUser})

  } catch (error) {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    console.error("Error during signup:", error);
    return res.status(status).json({ name: error.name, message });
  }
};


const getUserByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await userRepo.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        res.status(status).json({ name: error.name, message: message });
    }
}

module.exports = {
  getAllUsers,
  signupUser,
  getUserByEmail
};
