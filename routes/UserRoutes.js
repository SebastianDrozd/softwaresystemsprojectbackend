const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


// Define routes for user operations

// Get all users
router.get('/', userController.getAllUsers);
// User signup
router.post('/signup', userController.signupUser);




module.exports = router;