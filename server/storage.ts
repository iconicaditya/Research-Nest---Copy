import { 
  type User, 
  type InsertUser,
  type TeamMember,
  type InsertTeamMember,
  type ResearchArea,
  type InsertResearchArea,
  type Publication,
  type InsertPublication,
  type Project,
  type InsertProject,
  type Activity,
  type InsertActivity,
  type GalleryImage,
  type InsertGalleryImage,
  users,
  teamMembers,
  researchAreas,
  publications,
  projects,
  activities,
  galleryImages
} from "../shared/schema"; // ✅ relative path for production

import { db } from "./db";
import { eq, asc, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Team Members
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;
  
  // Research Areas
  getAllResearchAreas(): Promise<ResearchArea[]>;
  getResearchArea(id: string): Promise<ResearchArea | undefined>;
  createResearchArea(area: InsertResearchArea): Promise<ResearchArea>;
  updateResearchArea(id: string, area: Partial<InsertResearchArea>): Promise<ResearchArea | undefined>;
  deleteResearchArea(id: string): Promise<boolean>;
  
  // Publications
  getAllPublications(): Promise<Publication[]>;
  getPublication(id: string): Promise<Publication | undefined>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: string, publication: Partial<InsertPublication>): Promise<Publication | undefined>;
  deletePublication(id: string): Promise<boolean>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Activities
  getAllActivities(): Promise<Activity[]>;
  getActivity(id: string): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity | undefined>;
  deleteActivity(id: string): Promise<boolean>;
  
  // Gallery
  getAllGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Team Members
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(asc(teamMembers.order));
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member || undefined;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [created] = await db.insert(teamMembers).values(member).returning();
    return created;
  }

  async updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const [updated] = await db.update(teamMembers).set(member).where(eq(teamMembers.id, id)).returning();
    return updated || undefined;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Research Areas
  async getAllResearchAreas(): Promise<ResearchArea[]> {
    return await db.select().from(researchAreas).orderBy(asc(researchAreas.order));
  }

  async getResearchArea(id: string): Promise<ResearchArea | undefined> {
    const [area] = await db.select().from(researchAreas).where(eq(researchAreas.id, id));
    return area || undefined;
  }

  async createResearchArea(area: InsertResearchArea): Promise<ResearchArea> {
    const [created] = await db.insert(researchAreas).values(area).returning();
    return created;
  }

  async updateResearchArea(id: string, area: Partial<InsertResearchArea>): Promise<ResearchArea | undefined> {
    const [updated] = await db.update(researchAreas).set(area).where(eq(researchAreas.id, id)).returning();
    return updated || undefined;
  }

  async deleteResearchArea(id: string): Promise<boolean> {
    const result = await db.delete(researchAreas).where(eq(researchAreas.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Publications
  async getAllPublications(): Promise<Publication[]> {
    return await db.select().from(publications).orderBy(desc(publications.year));
  }

  async getPublication(id: string): Promise<Publication | undefined> {
    const [pub] = await db.select().from(publications).where(eq(publications.id, id));
    return pub || undefined;
  }

  async createPublication(publication: InsertPublication): Promise<Publication> {
    const [created] = await db.insert(publications).values(publication).returning();
    return created;
  }

  async updatePublication(id: string, publication: Partial<InsertPublication>): Promise<Publication | undefined> {
    const [updated] = await db.update(publications).set(publication).where(eq(publications.id, id)).returning();
    return updated || undefined;
  }

  async deletePublication(id: string): Promise<boolean> {
    const result = await db.delete(publications).where(eq(publications.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updated || undefined;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Activities
  async getAllActivities(): Promise<Activity[]> {
    return await db.select().from(activities).orderBy(desc(activities.createdAt));
  }

  async getActivity(id: string): Promise<Activity | undefined> {
    const [activity] = await db.select().from(activities).where(eq(activities.id, id));
    return activity || undefined;
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [created] = await db.insert(activities).values(activity).returning();
    return created;
  }

  async updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity | undefined> {
    const [updated] = await db.update(activities).set(activity).where(eq(activities.id, id)).returning();
    return updated || undefined;
  }

  async deleteActivity(id: string): Promise<boolean> {
    const result = await db.delete(activities).where(eq(activities.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Gallery
  async getAllGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(galleryImages).orderBy(asc(galleryImages.order));
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    const [image] = await db.select().from(galleryImages).where(eq(galleryImages.id, id));
    return image || undefined;
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [created] = await db.insert(galleryImages).values(image).returning();
    return created;
  }

  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const [updated] = await db.update(galleryImages).set(image).where(eq(galleryImages.id, id)).returning();
    return updated || undefined;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
