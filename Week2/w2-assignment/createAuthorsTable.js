// createAuthorsTable.js
const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'rama_database',
});

// Execute the query to create the authors table
connection.query(
  `CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM ('M', 'F', 'X') -- Using ENUM to restrict gender values to 'M', 'F', or 'X'
  )`,
  function (err, results) {
    if (err) throw err;
    console.log('Authors table created successfully!');
    // Close the connection
    connection.end();
  }
);

