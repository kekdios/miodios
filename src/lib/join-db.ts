import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const globalForDb = globalThis as unknown as { joinDb: Database.Database | undefined };

function openDb(): Database.Database {
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  const dbPath = path.join(dir, "join.db");
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS join_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

export function getJoinDb(): Database.Database {
  if (!globalForDb.joinDb) {
    globalForDb.joinDb = openDb();
  }
  return globalForDb.joinDb;
}

export function insertJoinSignup(row: {
  name: string;
  phone: string;
  email: string;
}): void {
  const db = getJoinDb();
  const stmt = db.prepare(
    `INSERT INTO join_signups (name, phone, email) VALUES (@name, @phone, @email)`,
  );
  stmt.run(row);
}
