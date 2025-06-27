const pool = require("../util/dbconfig");
const subjectRepo = require("../repo/SubjectRepo");
const InternalServerError = require("../error/InternalServerError");

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
    profileImage,
  } = data.post;
  console.log("this is data", data);
  const con = await pool.getConnection();
  try {
    await con.beginTransaction();
    //insert into tutoring post
    const [postResult] = await con.query(
      `INSERT INTO TutorPosts
        (TutorId, Title, Description, HourlyRate, Experience, Qualifications, ProfileImage) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        tutor,
        title,
        description,
        Number(hourlyRate),
        experience,
        qualifications,
        "hello",
      ]
    );
    const postId = postResult.insertId;
    if (subjects.length > 0) {
      for (const subject of subjects) {
        const sub = await subjectRepo.getSubjectIdByName(subject);
        const subId = sub[0].SubjectId;
        console.log("this is subid", subId);
        await subjectRepo.createSubjectPostMapping(subId, postId);
      }

    }

    for (const slot of availability) {
      console.log(slot)
      const sql = `INSERT INTO TutorAvailability (TutorId,DayOfWeek,StartTime,EndTime) values (?,?,?,?)`

      await con.query(sql, [tutor, slot.day, slot.start, slot.end])
    }

    const result = await con.commit();
    return result
  } catch (error) {
    if (error.code == "ERCONNREFUSED") {
      console.error("Database connection refused");
      throw new ConnectionError(
        "Database connection refused. Please check your database server."
      );
    } else {
      throw new InternalServerError(
        "An Error occurred while trying to save the post."
      );
    }
  } finally {
    con.release();
  }
};


const getTutorPosts = async () => {
  try {
    const sql = `SELECT 
  u.id AS user_id,
  u.FirstName as FirstName,
  u.LastName as LastName,
  u.Email as Email,
  p.PostId AS post_id,
  p.Title as PostTitle,
  p.Description as PostDescription,
  p.HourlyRate,
  p.Experience,
  p.Qualifications,
  GROUP_CONCAT(DISTINCT s.SubjectName ORDER BY s.SubjectName SEPARATOR '||') AS subjects,
  GROUP_CONCAT(
    DISTINCT CONCAT(a.DayOfWeek, ' ', a.StartTime, '-', a.EndTime)
    ORDER BY FIELD(a.DayOfWeek, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    a.StartTime
    SEPARATOR '||'
  ) AS availability
FROM users u
INNER JOIN TutorPosts p ON u.id = p.TutorId
INNER JOIN TutorPostSubjects ps ON p.PostId = ps.PostId
INNER JOIN Subjects s ON ps.SubjectId = s.SubjectId
INNER JOIN TutorAvailability a ON p.TutorId = a.TutorId
GROUP BY p.PostId;`
    const [results] = await pool.query(sql)
    console.log(results)
    return results;
  } catch (error) {
    console.log(error)
  }

}

const getTutorPostById = async (id) => {
  const sql = `SELECT 
  u.id AS user_id,
  u.FirstName as FirstName,
  u.LastName as LastName,
  u.Email as Email,
  p.PostId AS post_id,
  p.Title as PostTitle,
  p.Description as PostDescription,
  p.HourlyRate,
  p.Experience,
  p.Qualifications,
  GROUP_CONCAT(DISTINCT s.SubjectName ORDER BY s.SubjectName SEPARATOR '||') AS subjects,
  GROUP_CONCAT(
    DISTINCT CONCAT(a.DayOfWeek, ' ', a.StartTime, '-', a.EndTime)
    ORDER BY FIELD(a.DayOfWeek, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    a.StartTime
    SEPARATOR '||'
  ) AS availability
FROM users u
INNER JOIN TutorPosts p ON u.id = p.TutorId
INNER JOIN TutorPostSubjects ps ON p.PostId = ps.PostId
INNER JOIN Subjects s ON ps.SubjectId = s.SubjectId
INNER JOIN TutorAvailability a ON p.TutorId = a.TutorId
WHERE p.PostId = ? 
GROUP BY p.PostId`
  try {
    const [results] = await pool.query(sql, [id])
    return results
  } catch (error) {
    console.log(error)
  }


}

module.exports = {
  createTutorPost,
  getTutorPosts,
  getTutorPostById
};
