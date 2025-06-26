const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Load the CA certificate
const caCert = fs.readFileSync(path.join(__dirname, 'ca.pem'));

const pool = mysql.createPool({
  host: 'mysqltutor-tutorapp.i.aivencloud.com',
  port: 19160,
  user: 'avnadmin',
  password: 'AVNS_K5vz7EYP5Iv6uRmk0Pf',
  database: 'tutorapp', // change if needed
  ssl: {
    ca: caCert,
  },
});

module.exports = pool;