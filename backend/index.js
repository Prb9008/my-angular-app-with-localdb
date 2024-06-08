const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9008',
  database: 'mySQL',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('MySQL connected...');
  }
});

app.post('/add', (req, res) => {
  const { name, age, address, number, date } = req.body;
  const query = 'INSERT INTO form_data (name, age, address, number, date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, age, address, number, date], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).json({ error: err.message }); // Ensure JSON response
    } else {
      res.status(200).json({ message: 'Data inserted successfully' }); // Ensure JSON response
    }
  });
});

app.get('/data', (req, res) => {
  const query = 'SELECT * FROM form_data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).json({ error: err.message }); // Ensure JSON response
    } else {
      res.status(200).json(results); // Ensure JSON response
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
