const pool = require("../util/dbconfig")


const getAllSubjects = async() => {
    try{
        const sql = `SELECT * from Subjects`
        const [results] = await  pool.query(sql)
        return results

    }catch(error){

    }
}

const getSubjectIdByName = async(name) => {
    try{
        const sql = `Select * from Subjects where SubjectName = ?`
        const [results] = await pool.query(sql,[name]) 
        return results
    }catch(error){
        console.log(error)
    }
}

const createSubjectPostMapping = async (subject,post) => {
    console.log("this is sub and post id",subject,post)
    try{
        const sql= `Insert into TutorPostSubjects(SubjectId,PostId) values (?,?)`
        const [results] = await pool.query(sql,[subject,post])
        return results;
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    getAllSubjects,
    getSubjectIdByName,
    createSubjectPostMapping
}