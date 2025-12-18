import { db } from "./db";
import { users, teamMembers, researchAreas, publications, projects, activities, galleryImages } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  if (process.env.NODE_ENV === "production") {
    console.log("⚠️  Seeding is disabled in production!");
    return;
  }

  console.log("Starting database seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin", 10);
  await db.insert(users).values({
    username: "admin",
    password: hashedPassword,
    email: "admin@quantum-group.edu"
  }).onConflictDoNothing();
  console.log("✓ Admin user created");

  // Seed team members
  const teamData = [
    {
      name: "Dr. Eleanor Vance",
      role: "Principal Investigator",
      email: "e.vance@university.edu",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      bio: "Dr. Vance leads the Quantum Research Group with over 15 years of experience in quantum mechanics and materials science.",
      order: 1
    },
    {
      name: "Dr. James Chen",
      role: "Postdoctoral Researcher",
      email: "j.chen@university.edu",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop",
      bio: "Specializing in computational modeling of complex systems.",
      order: 2
    },
    {
      name: "Sarah Miller",
      role: "PhD Candidate",
      email: "s.miller@university.edu",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      bio: "Focusing on renewable energy applications of nanomaterials.",
      order: 3
    },
    {
      name: "David Park",
      role: "PhD Candidate",
      email: "d.park@university.edu",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      bio: "Investigating AI-driven drug discovery pipelines.",
      order: 4
    }
  ];
  
  await db.insert(teamMembers).values(teamData).onConflictDoNothing();
  console.log("✓ Team members seeded");

  // Seed research areas
  const researchData = [
    {
      title: "Quantum Materials",
      description: "Exploring the properties of novel quantum materials for next-generation electronics.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
      order: 1
    },
    {
      title: "Sustainable Energy",
      description: "Developing efficient catalysts for hydrogen production and carbon capture.",
      image: "https://images.unsplash.com/photo-1473341304170-5799ed41387e?q=80&w=800&auto=format&fit=crop",
      order: 2
    },
    {
      title: "Bio-Computation",
      description: "Intersecting biology and computer science to model cellular processes.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
      order: 3
    }
  ];
  
  await db.insert(researchAreas).values(researchData).onConflictDoNothing();
  console.log("✓ Research areas seeded");

  // Seed publications
  const publicationsData = [
    {
      title: "Topological Insulators in High-Temperature Regimes",
      authors: "E. Vance, J. Chen",
      journal: "Nature Physics",
      year: 2024,
      doi: "10.1038/nature12345"
    },
    {
      title: "Efficient Hydrogen Evolution using MoS2 Nanostructures",
      authors: "S. Miller, E. Vance",
      journal: "Journal of Materials Chemistry A",
      year: 2023,
      doi: "10.1039/C9TA12345A"
    },
    {
      title: "Machine Learning Approaches to Protein Folding",
      authors: "D. Park, J. Chen, E. Vance",
      journal: "Bioinformatics",
      year: 2023,
      doi: "10.1093/bioinformatics/btz123"
    }
  ];
  
  await db.insert(publications).values(publicationsData).onConflictDoNothing();
  console.log("✓ Publications seeded");

  // Seed projects
  const projectsData = [
    {
      title: "Project Helios",
      summary: "Next-generation solar cells using perovskite materials.",
      funding: "NSF",
      status: "Ongoing"
    },
    {
      title: "Neural Link Interface",
      summary: "Direct brain-computer interface for motor cortex decoding.",
      funding: "NIH",
      status: "Completed"
    },
    {
      title: "Ocean Clean-up Drone",
      summary: "Autonomous swarm robotics for microplastic collection.",
      funding: "Internal",
      status: "Ongoing"
    }
  ];
  
  await db.insert(projects).values(projectsData).onConflictDoNothing();
  console.log("✓ Projects seeded");

  // Seed activities
  const activitiesData = [
    {
      title: "Annual Symposium on Quantum Tech",
      date: "October 15, 2024",
      description: "We hosted over 200 researchers for our annual symposium.",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Outreach at Local High School",
      date: "September 10, 2024",
      description: "Our PhD students demonstrated physics experiments to 10th graders.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?q=80&w=800&auto=format&fit=crop"
    }
  ];
  
  await db.insert(activities).values(activitiesData).onConflictDoNothing();
  console.log("✓ Activities seeded");

  console.log("Database seed completed successfully!");
}

// Only run seed manually
if (require.main === module) {
  seed().catch((error) => {
    console.error("Seed failed:", error);
    throw error; // Do not use process.exit in serverless
  });
}
