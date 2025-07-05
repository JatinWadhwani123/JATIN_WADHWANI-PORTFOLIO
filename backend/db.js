const mysql = require('mysql2');
require('dotenv').config();

let db;

function handleConnection() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });

  db.connect((err) => {
    if (err) {
      console.error('❌ MySQL connection error:', err);
      setTimeout(handleConnection, 2000); // Retry after 2 sec
    } else {
      console.log('✅ MySQL connected');
    }
  });

  db.on('error', (err) => {
    console.error('🔥 MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection(); // Reconnect on connection loss
    } else {
      throw err;
    }
  });
}

handleConnection();

module.exports = db;
