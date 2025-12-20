// server/index.ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import helmet from "helmet";
import pgSession from "connect-pg-simple";

import { registerRoutes } from "./routes";
import { pool } from "./db";

const app = express();

/* ----------------------------------------------------
   Type augmentation for rawBody
---------------------------------------------------- */
declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

/* ----------------------------------------------------
   Security headers
---------------------------------------------------- */
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:
        process.env.NODE_ENV !== "production"
          ? ["'self'", "'unsafe-inline'", "http://localhost:3000"]
          : ["'self'"],
      connectSrc:
        process.env.NODE_ENV !== "production"
          ? ["'self'", "http://localhost:3000"]
          : ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'"],
    },
  })
);

/* ----------------------------------------------------
   Body parsers
---------------------------------------------------- */
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

/* ----------------------------------------------------
   Session configuration with PostgreSQL
---------------------------------------------------- */
const PgSession = pgSession(session);

app.use(
  session({
    store: new PgSession({ pool, tableName: "session" }),
    name: "connect.sid",
    secret: process.env.SESSION_SECRET || "supersecret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/* ----------------------------------------------------
   Logger middleware
---------------------------------------------------- */
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  let responseBody: unknown;

  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    responseBody = body;
    return originalJson(body);
  };

  res.on("finish", () => {
    if (!req.path.startsWith("/api")) return;
    const duration = Date.now() - start;
    console.log(
      `${new Date().toLocaleTimeString()} [express] ${req.method} ${
        req.path
      } ${res.statusCode} in ${duration}ms${
        responseBody ? ` :: ${JSON.stringify(responseBody)}` : ""
      }`
    );
  });

  next();
});

/* ----------------------------------------------------
   Root route
---------------------------------------------------- */
app.get("/", (_req, res) => {
  res.status(200).send("🚀 Research-Nest API is running");
});

/* ----------------------------------------------------
   Register API routes
---------------------------------------------------- */
registerRoutes(app).catch((err) => {
  console.error("❌ Route registration failed:", err);
  process.exit(1);
});

/* ----------------------------------------------------
   Global error handler
---------------------------------------------------- */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
});

/* ----------------------------------------------------
   Local dev server
---------------------------------------------------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
}

/* ----------------------------------------------------
   Export app for Vercel serverless
---------------------------------------------------- */
export default app;
