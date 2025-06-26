const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


// Get all users
router.get('/', userController.getAllUsers);
// User signup
router.post('/signup', userController.signupUser);
//verify token
router.get("/me",userController.verifyToken)
//logout user 
router.post('/logout', userController.logout)
//login user 
router.post("/login",userController.loginUser)



module.exports = router;