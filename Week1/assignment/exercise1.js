const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Rama-Mysql',
  password: 'rama-Mysql@',
  database: 'meetup',
});

// Array of SQL queries
const queries = [
  'DROP DATABASE IF EXISTS meetup',
  'CREATE DATABASE meetup',
  'USE meetup',
  'CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name VARCHAR(255), invited_by INT)',
  'CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name VARCHAR(255), floor_number INT)',
  'CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, FOREIGN KEY (room_no) REFERENCES Room(room_no))',
];

connection.connect((err) => {
  if (err) throw err;

  // Execute each query
  queries.forEach((query) => {
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log('Query executed successfully:', result);
    });
  });

  connection.end();
});

