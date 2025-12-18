import { defineConfig } from "drizzle-kit";

// Prevent running migrations on Vercel
if (process.env.VERCEL) {
  console.log("Skipping Drizzle configuration on Vercel");
  process.exit(0);
}

// Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is required. Make sure the database is provisioned and the environment variable is set."
  );
}

export default defineConfig({
  // Folder where migration files will be generated
  out: "./migrations",

  // Path to your Drizzle schema
  schema: "./shared/schema.ts",

  // Database dialect
  dialect: "postgresql",

  // Credentials for connecting to the database
  dbCredentials: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  },
});
