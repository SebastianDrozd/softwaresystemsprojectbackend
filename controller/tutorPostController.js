const tutorPostRepo = require('../repo/TutorPostsRepo')


const createNewTutorPost = async (req, res) => {
    console.log("hit create pst")
    const post = req.body
    try {
        const res = await tutorPostRepo.createTutorPost(post)
        res.status(200).send("post made")
    } catch (error) {
        
    }
}




module.exports = {
    createNewTutorPost
}