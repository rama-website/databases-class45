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
   LEFT JOIN authors_papers AP ON A.author_id = AP.author_id
   LEFT JOIN research_papers RP ON AP.paper_id = RP.paper_id`,
  function (err, results) {
    if (err) throw err;
    console.log('Authors and their published papers:');
    console.table(results);
    connection.end();
  }
);
