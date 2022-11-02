const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());

const db = mysql.createConnection({
  host: 'mytraining-instance-1.c2gi8p2sqn7z.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'YZWa1203',
  database: 'mytraining_users',
  port : '3306',
  connectTimeout: '60000',
});

app.get("/api/get/user", (req, res) => {
  db.connect();
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(`${err.message}`);
    } else {
      res.send(result);
    };
  });
  db.end();
});

app.get("/api/update/user", (req, res) => {
  db.connect();
  const id = req.body.id;
  const username = req.body.username;
  const sqlUpdate = "UPDATE users SET username = ? WHERE id = ?" 
  db.query(sqlUpdate, [username, id], (err, result) => {
    res.send(result)
  });
  db.end();
});

app.listen(3001, () => {
    console.log('running on port 3001');
});