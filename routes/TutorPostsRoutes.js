const express = require("express")
const router = express.Router()
const tutorPostsController = require('../controller/tutorPostController')

//create new Tutor Post
router.post("/",tutorPostsController.createNewTutorPost)

module.exports = router;