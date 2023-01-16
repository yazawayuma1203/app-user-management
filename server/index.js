const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const fileupload = require("express-fileupload");

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = mysql.createConnection({
  host: 'mytraining.cluster-c2gi8p2sqn7z.ap-northeast-1.rds.amazonaws.com',
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
  const userIconName = req.body.userIcon;
  const sqlInsert = "INSERT INTO users (username, name, email, phone, userIconName) VALUES (?, ?, ?, ?, ?);";
  db.query(sqlInsert, [username, name, email, phone, userIconName], (err, result, fields) => {
    res.send(result);
  });
});

app.post("/api/update/user", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const userIconName = req.body.userIcon;
  const sqlUpdate = "UPDATE users SET username = ? , name = ? , email = ? , phone = ?, userIconName = ? WHERE id = ?;";
  db.query(sqlUpdate, [username, name, email, phone, userIconName, id], (err, result, fields) => {
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

app.post("/api/image", (req, res) => {
  const newpath = 'C:/Users/yazaw/OneDrive/デスクトップ/git_local/App_useradmin/app-user-management/client/public/';
  const file = req.files.userIcon;
  console.log(file);
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (result, err) => {
    if (err) {
      res.status(500).send(result);
      
    }
    res.status(200).send(result);
    console.log("正しく完了")
  });
});


app.listen(3001, () => {
    console.log('running on port 3001');
});