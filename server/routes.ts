import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTeamMemberSchema, 
  insertResearchAreaSchema, 
  insertPublicationSchema, 
  insertProjectSchema, 
  insertActivitySchema, 
  insertGalleryImageSchema,
  insertUserSchema
} from "@shared/schema";
import bcrypt from "bcrypt";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ==================== Authentication ====================
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Store user session
      (req.session as any).userId = user.id;
      
      res.json({ 
        success: true, 
        user: { id: user.id, username: user.username, email: user.email } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.json({ id: user.id, username: user.username, email: user.email });
  });

  // Middleware to check authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!(req.session as any).userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    next();
  };

  // ==================== Team Members ====================
  app.get("/api/team", async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.post("/api/team", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating team member:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/team/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const member = await storage.updateTeamMember(id, req.body);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error updating team member:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/team/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTeamMember(id);
      if (!deleted) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  // ==================== Research Areas ====================
  app.get("/api/research", async (req, res) => {
    try {
      const areas = await storage.getAllResearchAreas();
      res.json(areas);
    } catch (error) {
      console.error("Error fetching research areas:", error);
      res.status(500).json({ error: "Failed to fetch research areas" });
    }
  });

  app.post("/api/research", requireAuth, async (req, res) => {
    try {
      const validatedData = insertResearchAreaSchema.parse(req.body);
      const area = await storage.createResearchArea(validatedData);
      res.status(201).json(area);
    } catch (error) {
      console.error("Error creating research area:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/research/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const area = await storage.updateResearchArea(id, req.body);
      if (!area) {
        return res.status(404).json({ error: "Research area not found" });
      }
      res.json(area);
    } catch (error) {
      console.error("Error updating research area:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/research/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteResearchArea(id);
      if (!deleted) {
        return res.status(404).json({ error: "Research area not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting research area:", error);
      res.status(500).json({ error: "Failed to delete research area" });
    }
  });

  // ==================== Publications ====================
  app.get("/api/publications", async (req, res) => {
    try {
      const pubs = await storage.getAllPublications();
      res.json(pubs);
    } catch (error) {
      console.error("Error fetching publications:", error);
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.post("/api/publications", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPublicationSchema.parse(req.body);
      const publication = await storage.createPublication(validatedData);
      res.status(201).json(publication);
    } catch (error) {
      console.error("Error creating publication:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/publications/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const publication = await storage.updatePublication(id, req.body);
      if (!publication) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(publication);
    } catch (error) {
      console.error("Error updating publication:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/publications/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deletePublication(id);
      if (!deleted) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting publication:", error);
      res.status(500).json({ error: "Failed to delete publication" });
    }
  });

  // ==================== Projects ====================
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.updateProject(id, req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // ==================== Activities ====================
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getAllActivities();
      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", requireAuth, async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/activities/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const activity = await storage.updateActivity(id, req.body);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      console.error("Error updating activity:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/activities/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteActivity(id);
      if (!deleted) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting activity:", error);
      res.status(500).json({ error: "Failed to delete activity" });
    }
  });

  // ==================== Gallery ====================
  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getAllGalleryImages();
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", requireAuth, async (req, res) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(validatedData);
      res.status(201).json(image);
    } catch (error) {
      console.error("Error creating gallery image:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.patch("/api/gallery/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const image = await storage.updateGalleryImage(id, req.body);
      if (!image) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.json(image);
    } catch (error) {
      console.error("Error updating gallery image:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/gallery/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteGalleryImage(id);
      if (!deleted) {
        return res.status(404).json({ error: "Gallery image not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });

  return httpServer;
}
