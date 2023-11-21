// addMentorColumn.js
const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'rama_database',
});

// Execute the query to add the mentor column
connection.query(
  `ALTER TABLE authors ADD COLUMN mentor INT, ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)`,
  function (err, results) {
    if (err) throw err;
    console.log('Mentor column added to authors table!');
    // Close the connection
    connection.end();
  }
);
