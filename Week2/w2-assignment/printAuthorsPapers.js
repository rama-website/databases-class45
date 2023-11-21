// printAuthorsPapers.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'rama_database',
});

// Query to print all columns of authors and their published paper_title
connection.query(
  `SELECT A.*, RP.paper_title
   FROM authors A
   LEFT JOIN research_Papers RP ON A.author_id = RP.author_id`,
  function (err, results) {
    if (err) throw err;
    console.log('Authors and their published papers:');
    console.table(results);
    connection.end();
  }
);
