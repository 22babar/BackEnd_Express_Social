
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database : 'classicmodels'
});

db.connect(err =>{
    if(err) throw err;
    console.log('My Sql is connected');
});

export default db;
