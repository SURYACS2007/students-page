require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database with threadId:', connection.threadId);
  connection.release();
});

// Get all student marks
app.get('/stdmark', (req, res) => {
  db.query('SELECT * FROM submark', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});

// ✅ Fixed login route (username + rollno)
app.post('/login', (req, res) => {
  const { username, rollno } = req.body;

  db.query(
    'SELECT * FROM submark WHERE NAME = ? AND ROLL = ?',
    [username, rollno],
    (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (results.length > 0) {
        res.status(200).json({ 
          message: 'Login successful',
          rollno: results[0].ROLL 
        });
      } else {
        res.status(401).json({ message: 'Invalid username or roll number' });
      }
    }
  );
});

// Get marks for a single student
app.get('/stdmark/:rollno', (req, res) => {
  const rollno = req.params.rollno;
  db.query('SELECT * FROM submark WHERE ROLL = ?', [rollno], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);  // includes TOTAL column too
    } else {
      res.status(404).json({ message: 'No data found for this roll number' });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
