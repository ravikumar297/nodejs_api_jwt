const mysql = require('mysql2');

const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'personal'
});

pool.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = pool;
