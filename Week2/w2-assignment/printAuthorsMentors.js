// printAuthorsMentors.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'rama_database',
});

// Query to print names of all authors and their corresponding mentors
connection.query(
  `SELECT A1.author_name AS author, A2.author_name AS mentor
   FROM authors A1
   LEFT JOIN authors A2 ON A1.mentor = A2.author_id`,
  function (err, results) {
    if (err) throw err;
    console.log('Authors and their mentors:');
    console.table(results);
    connection.end();
  }
);
