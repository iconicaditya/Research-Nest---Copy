import express from "express";
import serverless from "serverless-http";

import authRoutes from "./auth";
import teamRoutes from "./team";
import researchRoutes from "./research";
import projectsRoutes from "./activities";
import publicationsRoutes from "./publications";
import activitiesRoutes from "./activities";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/team", teamRoutes);
app.use("/research", researchRoutes);
app.use("/projects", projectsRoutes);
app.use("/publications", publicationsRoutes);
app.use("/activities", activitiesRoutes);

// Root
app.get("/", (_req, res) => res.status(200).send("🚀 Research-Nest API is running"));

// Export for Vercel
export const handler = serverless(app);
