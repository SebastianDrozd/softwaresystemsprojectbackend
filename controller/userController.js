const e = require("express");
const userRepo = require("../repo/UserRepo");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hello";

const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode).json({ name: error.name, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userRepo.getUserByEmail(email);
    if (!existingUser) {
       res.status(404).send("No user Found")
    }
    console.log("this is existing user", existingUser)

    if (password == existingUser.Password) {
      console.log("password match")
      const payload = {
        id: existingUser.id,
        firstname: existingUser.FirstName,
        email: existingUser.Email,
        role: existingUser.Role
      };
      console.log("this is payloard",payload)
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      res
        .status(201)
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS only in production
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({ message: 'Login successful', user: existingUser })
    }
    else{
      res.status(401).send("Password invalid")
    }

   
  } catch (error) {
    console.log(error)
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ name: error.name, message: message });
  }
}

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
      id: createdUser.insertId,
      firstname: newUser.firstname,
      email: newUser.email,
      role: newUser.role,
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
      .json({ message: 'Signup successful', user: newUser })

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
    console.log(error)
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ name: error.name, message: message });
  }
}


const verifyToken = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Not authenticated")
  }
  try {
    const user = jwt.verify(token, JWT_SECRET)
    res.json({ id: user.id, email: user.email, firstname: user.firstname, role: user.role })
  } catch (err) {
    console.log(err)
  }
}

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
}




module.exports = {
  getAllUsers,
  signupUser,
  getUserByEmail,
  verifyToken,
  logout,
  loginUser
};
