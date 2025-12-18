// Load environment variables only in development
import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import session from "express-session";
import helmet from "helmet";
import { registerRoutes } from "./routes";

const app = express();

/* ----------------------------------------------------
   Type augmentation
---------------------------------------------------- */
declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

/* ----------------------------------------------------
   Middleware
---------------------------------------------------- */

// CSP middleware
if (process.env.NODE_ENV !== "production") {
  // Development: relaxed CSP to allow localhost and inline scripts/styles
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:3000"],
        connectSrc: ["'self'", "http://localhost:3000"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        fontSrc: ["'self'"],
      },
    })
  );
} else {
  // Production: strict CSP, only allow trusted sources
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'"],
        fontSrc: ["'self'"],
      },
    })
  );
}

// Parse JSON and capture raw body
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "supersecret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/* ----------------------------------------------------
   Root route (fix 404)
---------------------------------------------------- */
app.get("/", (_req, res) => {
  res.send("Welcome to Research-Nest API!");
});

/* ----------------------------------------------------
   Logging
---------------------------------------------------- */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// API request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: unknown;

  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    capturedJsonResponse = body;
    return originalJson(body);
  };

  res.on("finish", () => {
    if (!path.startsWith("/api")) return;
    const duration = Date.now() - start;
    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }
    log(logLine);
  });

  next();
});

/* ----------------------------------------------------
   Register API routes
---------------------------------------------------- */
registerRoutes(app).catch((err) => {
  console.error("❌ Failed to register routes:", err);
  process.exit(1);
});

/* ----------------------------------------------------
   Global error handler
---------------------------------------------------- */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ message });
});

/* ----------------------------------------------------
   Local dev server (ONLY in development)
---------------------------------------------------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

/* ----------------------------------------------------
   Export for Vercel serverless
---------------------------------------------------- */
export default app;
