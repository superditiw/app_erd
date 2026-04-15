const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Dtmp140202',
  database: 'app_erd'
});

module.exports = db;