import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";

// Mütləq yolu Linux mühiti üçün birbaşa təyin edirik
const dbPath = "/var/www/abbasoglu/admin/sqlite.db";
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });


