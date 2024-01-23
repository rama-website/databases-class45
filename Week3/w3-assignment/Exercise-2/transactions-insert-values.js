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

  // Start a transaction
  connection.beginTransaction((err) => {
    if (err) throw err;

    const insertAccountData = `
      INSERT INTO account (account_number, balance)
      VALUES
        (101, 8000.00),
        (102, 4000.00)
    `;

    const insertAccountChangesData = `
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES
        (101, 8000.00, 'Initial deposit'),
        (102, 4000.00, 'Initial deposit')
    `;

    connection.query(insertAccountData, (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      console.log('Inserted data into account table');

      connection.query(insertAccountChangesData, (err) => {
        if (err) {
          return connection.rollback(() => {
            throw err;
          });
        }
        console.log('Inserted data into account_changes table');

        // Commit the transaction
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }
          console.log('Transaction committed successfully');
          connection.end();
        });
      });
    });
  });
});

