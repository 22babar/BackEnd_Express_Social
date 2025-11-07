import express from 'express';
import cors from 'cors';
import db from './db.js';
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log(__dirname);




// const express = require('express');
// const cors = require('cors');
// const db = require('./db.js');




const Port = 3000;
const app = express();
app.use(express.json());
app.use(cors());



// get all users
app.get("/api/user", (req, res) => {
  db.query("select * from users", (err, data) => {
    if (err) throw res.json(err);
    return res.send(data);
  });
});

//get user by parameter
app.get("/api/user/:id", (req, res) => {
  const para = req.params.id;
  db.query('select * from users where id = ?', [para],(err, data))
  // const user = sql.find((u) => u.id === parseInt(req.params.id));
  if (!data) return res.status(404).json({ message: "User not found" });
  res.json(data);
});

app.post("/api/user", (req, res) => {
  const { name, email } = req.body;
  const q = "insert into users (name , email) values (  ? , ?)";
  db.query(q, [name, email], (err, data) => {
    if (err) throw err;
    return res.json("User add Success fully");
  });
});

app.delete("/api/user/:id", (req, res) => {
  const userId = req.params.id;

  db.query("delete from users where id = ?", [userId], (err, data) => {
    if (err) throw err;
    return res.json("User Delected Successfully");
  });
});

app.listen(Port, () => {
  console.log(`Server Running on: http://localhost:${Port}/api/user`);
});
