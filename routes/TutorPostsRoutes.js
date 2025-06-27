const express = require("express")
const router = express.Router()
const tutorPostsController = require('../controller/tutorPostController')

//create new Tutor Post
router.post("/",tutorPostsController.createNewTutorPost)

//get Posts
router.get('/',tutorPostsController.getAllPosts)
//get individual Post
router.get("/:id",tutorPostsController.getTutorPostById)

module.exports = router;