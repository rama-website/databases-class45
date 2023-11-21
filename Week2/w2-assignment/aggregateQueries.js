// aggregateQueries.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'rama_database',
});

// Queries for aggregate functions
const queries = [
  `SELECT RP.paper_title, COUNT(*) AS num_authors
   FROM research_Papers RP
   LEFT JOIN authors A ON RP.author_id = A.author_id
   GROUP BY RP.paper_title`,
  `SELECT SUM(RP.paper_id) AS total_papers
   FROM research_Papers RP
   JOIN authors A ON RP.author_id = A.author_id
   WHERE A.gender = 'female'`,
  // Add other aggregate queries as per Exercise 4 specifications
];

// Execute each query and print results
queries.forEach((query, index) => {
  connection.query(query, function (err, results) {
    if (err) throw err;
    console.log(`Query ${index + 1} result:`);
    console.table(results);
    if (index === queries.length - 1) {
      connection.end();
    }
  });
});
