import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../shared/schema";

// Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}

// Create Postgres connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon + Vercel require SSL in production
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Initialize Drizzle ORM with schema
export const db = drizzle(pool, {
  schema,
  logger: process.env.NODE_ENV !== "production",
});
