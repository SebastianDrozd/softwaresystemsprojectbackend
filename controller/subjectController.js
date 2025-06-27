const subjectRepo  = require("../repo/SubjectRepo")




const getAllSubjects = async (req,res) => {
    console.log("endpoiun hit")
    try{
        const results = await subjectRepo.getAllSubjects()
        res.status(200).json(results)
    }catch(error){
        console.log(error)
    }
}




module.exports = {
    getAllSubjects
}