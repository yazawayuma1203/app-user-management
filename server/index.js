const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());

const db = mysql.createPool({
  host: 'mytraining-instance-1.c2gi8p2sqn7z.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'YZWa1203',
  database: 'mytraining_users',
  port: '3306',
});

app.get("/api/get/users", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(`err:${err}`);
    } else {
      res.send(result);
    };
  });
});

app.get("/api/update/users", (req, res) => {
    const sqlUpdate = `UPDATE users SET username="testQ" WHERE id=1`;
    db.query(sqlUpdate, (err, result) => {
    res.send(result)
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});