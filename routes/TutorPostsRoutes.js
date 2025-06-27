const express = require("express")
const router = express.Router()
const tutorPostsController = require('../controller/tutorPostController')

//create new Tutor Post
router.post("/",tutorPostsController.createNewTutorPost)

//get Posts
router.get('/',tutorPostsController.getAllPosts)

module.exports = router;