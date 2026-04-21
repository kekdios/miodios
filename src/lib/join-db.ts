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
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      ip TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT '',
      referrer TEXT NOT NULL DEFAULT '',
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

export function insertVisit(row: {
  path: string;
  ip: string;
  userAgent: string;
  referrer: string;
}): void {
  const db = getJoinDb();
  const stmt = db.prepare(
    `INSERT INTO visits (path, ip, user_agent, referrer) VALUES (@path, @ip, @userAgent, @referrer)`,
  );
  stmt.run({
    path: row.path,
    ip: row.ip,
    userAgent: row.userAgent,
    referrer: row.referrer,
  });
}

export type VisitRow = {
  id: number;
  path: string;
  ip: string;
  user_agent: string;
  referrer: string;
  created_at: string;
};

const VISIT_LIST_LIMIT = 500;

export function listVisitsRecent(limit: number = VISIT_LIST_LIMIT): VisitRow[] {
  const db = getJoinDb();
  const cap = Math.min(Math.max(1, limit), 2000);
  const stmt = db.prepare(
    `SELECT id, path, ip, user_agent, referrer, created_at
     FROM visits
     ORDER BY id DESC
     LIMIT ?`,
  );
  return stmt.all(cap) as VisitRow[];
}
