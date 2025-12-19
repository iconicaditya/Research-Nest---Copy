// api/index.ts
import serverless from "serverless-http";
import app from "../server/index"; // your Express app

// Wrap Express app for Vercel serverless
export default serverless(app);
