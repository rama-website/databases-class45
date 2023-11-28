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
  FROM research_papers RP
  LEFT JOIN authors_papers AP ON RP.paper_id = AP.paper_id
  GROUP BY RP.paper_title`,
 `SELECT COUNT(*) AS total_papers
  FROM research_papers RP
  WHERE RP.paper_id IN (SELECT DISTINCT paper_id FROM authors_papers)`,
  
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
