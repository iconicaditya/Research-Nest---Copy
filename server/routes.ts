import type { Express } from "express";
import { storage } from "./storage";
import { 
  insertTeamMemberSchema, 
  insertResearchAreaSchema, 
  insertPublicationSchema, 
  insertProjectSchema, 
  insertActivitySchema, 
  insertGalleryImageSchema
} from "../shared/schema"; // <-- changed to relative import for backend
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<void> {

  // ==================== Authentication ====================
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ error: "Username and password required" });

      const user = await storage.getUserByUsername(username);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials" });

      (req.session as any).userId = user.id;
      res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => res.json({ success: true }));
  });

  app.get("/api/auth/me", async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const user = await storage.getUser(userId);
    if (!user) return res.status(401).json({ error: "User not found" });

    res.json({ id: user.id, username: user.username, email: user.email });
  });

  // Middleware to check authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!(req.session as any).userId) return res.status(401).json({ error: "Authentication required" });
    next();
  };

  // ==================== Team Members ====================
  app.get("/api/team", async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.post("/api/team", requireAuth, async (req, res) => {
    try {
      const validated = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validated);
      res.status(201).json(member);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/team/:id", requireAuth, async (req, res) => {
    try {
      const member = await storage.updateTeamMember(req.params.id, req.body);
      if (!member) return res.status(404).json({ error: "Team member not found" });
      res.json(member);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/team/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteTeamMember(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Team member not found" });
    res.json({ success: true });
  });

  // ==================== Research Areas ====================
  app.get("/api/research", async (req, res) => {
    try {
      const areas = await storage.getAllResearchAreas();
      res.json(areas);
    } catch {
      res.status(500).json({ error: "Failed to fetch research areas" });
    }
  });

  app.post("/api/research", requireAuth, async (req, res) => {
    try {
      const validated = insertResearchAreaSchema.parse(req.body);
      const area = await storage.createResearchArea(validated);
      res.status(201).json(area);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/research/:id", requireAuth, async (req, res) => {
    try {
      const area = await storage.updateResearchArea(req.params.id, req.body);
      if (!area) return res.status(404).json({ error: "Research area not found" });
      res.json(area);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/research/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteResearchArea(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Research area not found" });
    res.json({ success: true });
  });

  // ==================== Publications ====================
  app.get("/api/publications", async (req, res) => {
    try {
      const pubs = await storage.getAllPublications();
      res.json(pubs);
    } catch {
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.post("/api/publications", requireAuth, async (req, res) => {
    try {
      const validated = insertPublicationSchema.parse(req.body);
      const pub = await storage.createPublication(validated);
      res.status(201).json(pub);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/publications/:id", requireAuth, async (req, res) => {
    try {
      const pub = await storage.updatePublication(req.params.id, req.body);
      if (!pub) return res.status(404).json({ error: "Publication not found" });
      res.json(pub);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/publications/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deletePublication(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Publication not found" });
    res.json({ success: true });
  });

  // ==================== Projects ====================
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const validated = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validated);
      res.status(201).json(project);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/projects/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.json({ success: true });
  });

  // ==================== Activities ====================
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getAllActivities();
      res.json(activities);
    } catch {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", requireAuth, async (req, res) => {
    try {
      const validated = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validated);
      res.status(201).json(activity);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/activities/:id", requireAuth, async (req, res) => {
    try {
      const activity = await storage.updateActivity(req.params.id, req.body);
      if (!activity) return res.status(404).json({ error: "Activity not found" });
      res.json(activity);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/activities/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteActivity(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Activity not found" });
    res.json({ success: true });
  });

  // ==================== Gallery ====================
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", requireAuth, async (req, res) => {
    try {
      const validated = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validated);
      res.status(201).json(image);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/gallery/:id", requireAuth, async (req, res) => {
    try {
      const image = await storage.updateGalleryImage(req.params.id, req.body);
      if (!image) return res.status(404).json({ error: "Gallery image not found" });
      res.json(image);
    } catch {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/gallery/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteGalleryImage(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Gallery image not found" });
    res.json({ success: true });
  });

}
