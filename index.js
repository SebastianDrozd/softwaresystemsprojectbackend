const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoutes = require("./routes/UserRoutes")
const TutorPostsRoutes = require("./routes/TutorPostsRoutes")
const SubjectRoutes = require("./routes/SubjectRoutes")
const cookieParser = require('cookie-parser');


const origins = [
  'http://localhost:3000',
  'http://192.168.56.1:3000'
]
// Middleware
app.use(cookieParser());
app.use(cors({
  origin: origins, // or your frontend origin
  credentials: true               // 🔥 required to allow cookies
})); // Allow all origins, you can specify specific origins if needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', UserRoutes);
app.use("/api/tutorposts",TutorPostsRoutes)
app.use("/api/subjects",SubjectRoutes)



app.listen(5000 , () => {
  console.log(`Server is running on port ${5000} `);
});