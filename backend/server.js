require('dotenv').config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database with threadId:', db.threadId);
});

// GET route to fetch all data from stdmark table
app.get('/stdmark', (req, res) => {
    db.query('SELECT * FROM stdmark', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(200).json(results);
    });
});

// POST route for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM stdmark WHERE NAME = ? AND ROLL = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful', rollno: results[0].ROLL });
        } else {
            res.status(401).json({ message: 'Invalid username or roll number' });
        }
    });
});

// GET route to fetch data for a specific roll number
app.get('/stdmark/:rollno', (req, res) => {
    const rollno = req.params.rollno;

    db.query('SELECT * FROM stdmark WHERE ROLL = ?', [rollno], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'No data found for this roll number' });
        }
    });
});

const PORT = 500;
const HOST = 'localhost';
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});