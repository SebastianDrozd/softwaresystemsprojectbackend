const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: "root",
    password: "",
    database: "tutorapp"
   
});

module.exports = pool;