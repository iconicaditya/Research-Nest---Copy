import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";

const PgSession = pgSession(session);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : undefined,
});

export const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: "sessions",
  }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
