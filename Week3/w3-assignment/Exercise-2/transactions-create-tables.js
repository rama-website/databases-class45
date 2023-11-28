const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'my_database',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');

  const createAccountTable = `
    CREATE TABLE IF NOT EXISTS account (
      account_number INT PRIMARY KEY,
      balance DECIMAL(10, 2) NOT NULL
    )
  `;

  const createAccountChangesTable = `
    CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
   )
  `;

  connection.query(createAccountTable, (err) => {
    if (err) throw err;
    console.log('Created account table');

    connection.query(createAccountChangesTable, (err) => {
      if (err) throw err;
      console.log('Created account_changes table');

      connection.end();
    });
  });
});
