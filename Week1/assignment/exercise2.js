
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Rama-Mysql',
  password: 'rama-Mysql@',
  database: 'world',
});

connection.connect((err) => {
  if (err) throw err;

  // Query 1: Countries with population greater than 8 million
  connection.query('SELECT Name FROM country WHERE Population > 8000000', (err, results) => {
    if (err) throw err;
    console.log('Countries with population greater than 8 million:');
    results.forEach((row) => {
      console.log(row.Name);
    });
  });

  // Query 2: Countries with "land" in their names
  connection.query('SELECT Name FROM country WHERE Name LIKE "%land%"', (err, results) => {
    if (err) throw err;
    console.log('Countries with "land" in their names:');
    results.forEach((row) => {
      console.log(row.Name);
    });
  });

  // Query 3: Other queries...
  connection.query('SELECT Name FROM country WHERE Continent = "Europe"', (err, results) => {
    if (err) throw err;
    console.log('Countries in Europe:');
    results.forEach((row) => {
      console.log(row.Name);
    });
  });

  // Query 4: More queries...
  connection.query('SELECT Name FROM country WHERE Population < 500000', (err, results) => {
    if (err) throw err;
    console.log('Countries with population less than 500,000:');
    results.forEach((row) => {
      console.log(row.Name);
    });
  });

  connection.end();
});

