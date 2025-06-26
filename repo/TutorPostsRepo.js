const pool = require("../util/dbconfig")



const createTutorPost = async (data) => {
    const {
        tutor,
        title,
        description,
        hourlyRate,
        experience,
        qualifications,
        subjects,
        availability,
        profileImage
    } = data.post
    console.log("this is data", data)
    const con = await pool.getConnection()
    try {

        await con.beginTransaction()
        
        //insert into tutoring post 
        const [postResult] = await pool.query(
            `INSERT INTO TutorPosts
        (TutorId, Title, Description, HourlyRate, Experience, Qualifications, ProfileImage) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [tutor, title, description, Number(hourlyRate), experience, qualifications, "hello"]
        );
        console.log("this is result",postResult)






        await con.commit()
        con.release()
    }
    catch (error) {
        if (error.code == "ERCONNREFUSED") {
            console.error("Database connection refused");
            throw new ConnectionError(
                "Database connection refused. Please check your database server."
            );
        }
        else {
            console.log(error)
            con.release()
        }
    }
    finally {
        con.release()
    }
}

module.exports = {
    createTutorPost
}