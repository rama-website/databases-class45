const mysql = require('mysql');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Rama-Mysql', 
  password: 'rama-Mysql@', 
  database: 'world',
});

// Connect to the world database
connection.connect((err) => {
  if (err) throw err;

  // Query 1: Countries with population greater than 8 million
  connection.query(
    'SELECT Name FROM country WHERE Population > 8000000',
    (err, results) => {
      if (err) throw err;
      console.log('Countries with population greater than 8 million:');
      console.log(results);
    }
  );

  // Query 2: Countries with "land" in their names
  connection.query(
    'SELECT Name FROM country WHERE Name LIKE "%land%"',
    (err, results) => {
      if (err) throw err;
      console.log('Countries with "land" in their names:');
      console.log(results);
    }
  );

  // Add more queries for other questions following the same pattern

  // Close the MySQL connection
  connection.end();
});
