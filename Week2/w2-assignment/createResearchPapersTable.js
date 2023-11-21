// createResearchPapersTable.js
const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'rama_database',
});

// Execute the query to create the research_Papers table
connection.query(
  `CREATE TABLE research_Papers (
    paper_id INT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE
  )`,
  function (err, results) {
    if (err) throw err;
    console.log('Research_Papers table created successfully!');
    // Close the connection
    connection.end();
  }
);
