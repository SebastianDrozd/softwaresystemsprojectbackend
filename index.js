const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoutes = require("./routes/UserRoutes")
const cookieParser = require('cookie-parser');



// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://192.168.56.1:3000', // or your frontend origin
  credentials: true               // 🔥 required to allow cookies
})); // Allow all origins, you can specify specific origins if needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', UserRoutes);



app.listen(5000 , () => {
  console.log(`Server is running on port ${5000} `);
});