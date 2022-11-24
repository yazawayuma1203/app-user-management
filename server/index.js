const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = mysql.createConnection({
  host: 'mytraining-instance-1.c2gi8p2sqn7z.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'YZWa1203',
  database: 'mytraining_users',
  port : '3306',
  connectTimeout: '60000',
});

db.connect();

app.get("/api/get/user", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(`${err.message}`);
    } else {
      res.send(result);
    };
  });
});

app.post("/api/insert/user", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const created_at = Date(Date.now());
  console.log(created_at);
  const sqlInsert = "INSERT INTO users (username, name, email, phone, created_at) VALUES (?, ?, ?, ?, ?);";
  db.query(sqlInsert, [username, name, email, phone, created_at], (err, result, fields) => {
    res.send(result);
  });
});

app.post("/api/update/user", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const sqlUpdate = "UPDATE users SET username = ? , name = ? , email = ? , phone = ? WHERE id = ?;";
  db.query(sqlUpdate, [username, name, email, phone, id], (err, result, fields) => {
    res.send(result);
  });
});

app.post("/api/delete/user", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const sqlDelete = "DELETE FROM users WHERE id = ?;";
  db.query(sqlDelete, [id], (err, result, fields) => {
    res.send(result);
  });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});