// createResearchPapersTable.js
const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'rama_database',
});

const createResearchPapersTable = `
CREATE TABLE IF NOT EXISTS research_papers (
  paper_id INT AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255),
  conference VARCHAR(255),
  publish_date DATE
);`;

const authorsPapersTable = `
CREATE TABLE IF NOT EXISTS authors_papers (
  author_id INT,
  paper_id INT,
  PRIMARY KEY (author_id, paper_id),
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);`;

// ... (existing insert queries for authors and research_papers)

const insertAuthorsPapers = `INSERT INTO authors_papers (author_id, paper_id)
VALUES (1, 1),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 8),
  (5, 9),
  (6, 10),
  (7, 11),
  (8, 12),
  (11, 27),
  (13, 28),
  (14, 29),
  (15, 20);`;

// Connect to the database and execute queries using async/await
async function executeQuery(query) {
  try {
    const result = await connection.promise().query(query);
    console.log('Query executed successfully:', result);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Connect to the database
connection.connect(async (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Connection successful
  console.log('Connected to the database');

  try {
    // Execute queries
    await executeQuery(createResearchPapersTable);
    await executeQuery(authorsPapersTable);
    // ... (existing insert queries for authors and research_papers)
    await executeQuery(insertAuthorsPapers);

    console.log('All queries executed successfully');
    // Close the connection
    connection.end();
  } catch (error) {
    console.error('Error executing queries:', error);
    // Close the connection
    connection.end();
  }
});
