// server/routes.ts
import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import {
  insertTeamMemberSchema,
  insertResearchAreaSchema,
  insertPublicationSchema,
  insertProjectSchema,
  insertActivitySchema,
  insertGalleryImageSchema,
} from "../shared/schema"; // backend relative import
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<void> {
  /* ----------------------------------------------------
     Authentication routes
  ---------------------------------------------------- */
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).json({ error: "Username and password required" });

      const user = await storage.getUserByUsername(username);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

      (req.session as any).userId = user.id;
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy(() => res.json({ success: true }));
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await storage.getUser(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ id: user.id, username: user.username, email: user.email });
  });

  // Middleware to require authentication
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!(req.session as any).userId) return res.status(401).json({ error: "Authentication required" });
    next();
  };

  /* ----------------------------------------------------
     Generic CRUD route generator
  ---------------------------------------------------- */
  const setupCrudRoutes = <T>(
    basePath: string,
    schema: any,
    storageMethods: {
      getAll: () => Promise<T[]>;
      create: (data: any) => Promise<T>;
      update: (id: string, data: any) => Promise<T | null>;
      delete: (id: string) => Promise<boolean>;
    }
  ) => {
    app.get(basePath, async (_req: Request, res: Response) => {
      try {
        const items = await storageMethods.getAll();
        res.json(items);
      } catch (err) {
        res.status(500).json({ error: `Failed to fetch ${basePath.slice(5)}` });
      }
    });

    app.post(basePath, requireAuth, async (req: Request, res: Response) => {
      try {
        const validated = schema.parse(req.body);
        const item = await storageMethods.create(validated);
        res.status(201).json(item);
      } catch (err) {
        res.status(400).json({ error: "Invalid data" });
      }
    });

    app.patch(`${basePath}/:id`, requireAuth, async (req: Request, res: Response) => {
      try {
        const item = await storageMethods.update(req.params.id, req.body);
        if (!item) return res.status(404).json({ error: `${basePath.slice(5)} not found` });
        res.json(item);
      } catch (err) {
        res.status(400).json({ error: "Invalid data" });
      }
    });

    app.delete(`${basePath}/:id`, requireAuth, async (req: Request, res: Response) => {
      const deleted = await storageMethods.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: `${basePath.slice(5)} not found` });
      res.json({ success: true });
    });
  };

  /* ----------------------------------------------------
     Register CRUD routes
  ---------------------------------------------------- */
  setupCrudRoutes("/api/team", insertTeamMemberSchema, {
    getAll: storage.getAllTeamMembers,
    create: storage.createTeamMember,
    update: storage.updateTeamMember,
    delete: storage.deleteTeamMember,
  });

  setupCrudRoutes("/api/research", insertResearchAreaSchema, {
    getAll: storage.getAllResearchAreas,
    create: storage.createResearchArea,
    update: storage.updateResearchArea,
    delete: storage.deleteResearchArea,
  });

  setupCrudRoutes("/api/publications", insertPublicationSchema, {
    getAll: storage.getAllPublications,
    create: storage.createPublication,
    update: storage.updatePublication,
    delete: storage.deletePublication,
  });

  setupCrudRoutes("/api/projects", insertProjectSchema, {
    getAll: storage.getAllProjects,
    create: storage.createProject,
    update: storage.updateProject,
    delete: storage.deleteProject,
  });

  setupCrudRoutes("/api/activities", insertActivitySchema, {
    getAll: storage.getAllActivities,
    create: storage.createActivity,
    update: storage.updateActivity,
    delete: storage.deleteActivity,
  });

  setupCrudRoutes("/api/gallery", insertGalleryImageSchema, {
    getAll: storage.getAllGalleryImages,
    create: storage.createGalleryImage,
    update: storage.updateGalleryImage,
    delete: storage.deleteGalleryImage,
  });
}
