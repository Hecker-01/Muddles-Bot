const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor(dbFile = "database.db") {
    this.db = new sqlite3.Database(dbFile, (err) => {
      if (err) console.error("Database connection error:", err.message);
      else console.log("Connected to the SQLite database.");
    });
  }

  async initialize() {
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            )`,
      `CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL
            )`,
    ];
    for (const query of queries) {
      await this.run(query);
    }
  }

  run(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  get(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  close() {
    this.db.close((err) => {
      if (err) console.error("Error closing database:", err.message);
      else console.log("Closed the database connection.");
    });
  }
}
const db = new Database();

module.exports = db;
