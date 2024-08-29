/*
 * initierar databasen och skapar tabeller första gången projektet körs
 * installationsfil för SQLite3 */

require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

// Anslut till databasen med en lokal fil
const db = new sqlite3.Database(process.env.DATABASE_URL || './default_database.sqlite');

// Skapa tabellen 'courses'
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      coursecode TEXT NOT NULL,
      coursename TEXT NOT NULL,
      syllabus TEXT,
      progression TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Databasen och tabellen 'courses' har skapats.");
});

db.close();

