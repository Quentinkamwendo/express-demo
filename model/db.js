const mysql = require('mysql2');
require('dotenv').config();

// Replace with your own DB connection details
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

let sql = "SELECT * FROM users;";

connection.execute(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
});

// const userSchema = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )
// `;
//
// connection.query(userSchema, function(error, results, fields) {
//     if (error) throw error;
//     console.log('User table created successfully');
// });

module.exports = connection;
