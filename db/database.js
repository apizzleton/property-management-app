const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'properties.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to the database.");
    db.run(`
      CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        rent REAL,
        bedrooms INTEGER,
        bathrooms REAL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (createTableErr) => {
      if (createTableErr) {
        console.error("Error creating properties table", createTableErr.message);
      } else {
        console.log("Properties table created or already exists.");
      }
    });
  }
});

module.exports = db;