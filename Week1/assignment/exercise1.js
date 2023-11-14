const mysql = require('mysql');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Rama-Mysql', 
  password: 'rama-Mysql@', 
});

// Create database, tables, and insert data
connection.connect((err) => {
  if (err) throw err;

  // Create and use the meetup database
  connection.query('DROP DATABASE IF EXISTS meetup', (err) => {
    if (err) throw err;

    connection.query('CREATE DATABASE meetup', (err) => {
      if (err) throw err;

      connection.query('USE meetup', (err) => {
        if (err) throw err;

        // Create Invitee table
        connection.query(
          'CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name VARCHAR(255), invited_by VARCHAR(255))',
          (err) => {
            if (err) throw err;

            // Create Room table
            connection.query(
              'CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)',
              (err) => {
                if (err) throw err;

                // Create Meeting table
                connection.query(
                  'CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no))',
                  (err) => {
                    if (err) throw err;

                    // Insert data into tables
                    const insertQueries = [
                      'INSERT INTO Invitee (invitee_name, invited_by) VALUES ("John Doe", "Jane Smith")',
                      // Add more INSERT queries here for Invitee table
                      'INSERT INTO Room (room_name, floor_number) VALUES ("Conference Room A", 1)',
                      // Add more INSERT queries here for Room table
                      'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ("Project Meeting", "2023-11-14 09:00:00", "2023-11-14 10:00:00", 1)',
                      // Add more INSERT queries here for Meeting table
                    ];

                    // Execute all insert queries
                    connection.query(insertQueries.join(';'), (err) => {
                      if (err) throw err;
                      console.log('Data inserted successfully');
                      connection.end(); // Close the MySQL connection
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  });
});
