import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/projects", label: "Projects" },
  { href: "/activities", label: "Activities" },
  { href: "/gallery", label: "Gallery" },
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Dr. Eleanor Vance",
    role: "Principal Investigator",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    email: "e.vance@university.edu",
    bio: "Dr. Vance leads the Quantum Research Group with over 15 years of experience in quantum mechanics and materials science."
  },
  {
    id: 2,
    name: "Dr. James Chen",
    role: "Postdoctoral Researcher",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop",
    email: "j.chen@university.edu",
    bio: "Specializing in computational modeling of complex systems."
  },
  {
    id: 3,
    name: "Sarah Miller",
    role: "PhD Candidate",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    email: "s.miller@university.edu",
    bio: "Focusing on renewable energy applications of nanomaterials."
  },
  {
    id: 4,
    name: "David Park",
    role: "PhD Candidate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    email: "d.park@university.edu",
    bio: "Investigating AI-driven drug discovery pipelines."
  },
];

export const RESEARCH_AREAS = [
  {
    id: 1,
    title: "Quantum Materials",
    description: "Exploring the properties of novel quantum materials for next-generation electronics.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Sustainable Energy",
    description: "Developing efficient catalysts for hydrogen production and carbon capture.",
    image: "https://images.unsplash.com/photo-1473341304170-5799ed41387e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Bio-Computation",
    description: "Intersecting biology and computer science to model cellular processes.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop"
  }
];

export const PUBLICATIONS = [
  {
    id: 1,
    title: "Topological Insulators in High-Temperature Regimes",
    authors: "E. Vance, J. Chen",
    journal: "Nature Physics",
    year: 2024,
    doi: "10.1038/nature12345"
  },
  {
    id: 2,
    title: "Efficient Hydrogen Evolution using MoS2 Nanostructures",
    authors: "S. Miller, E. Vance",
    journal: "Journal of Materials Chemistry A",
    year: 2023,
    doi: "10.1039/C9TA12345A"
  },
  {
    id: 3,
    title: "Machine Learning Approaches to Protein Folding",
    authors: "D. Park, J. Chen, E. Vance",
    journal: "Bioinformatics",
    year: 2023,
    doi: "10.1093/bioinformatics/btz123"
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "Project Helios",
    summary: "Next-generation solar cells using perovskite materials.",
    funding: "NSF",
    status: "Ongoing"
  },
  {
    id: 2,
    title: "Neural Link Interface",
    summary: "Direct brain-computer interface for motor cortex decoding.",
    funding: "NIH",
    status: "Completed"
  },
  {
    id: 3,
    title: "Ocean Clean-up Drone",
    summary: "Autonomous swarm robotics for microplastic collection.",
    funding: "Internal",
    status: "Ongoing"
  }
];

export const ACTIVITIES = [
  {
    id: 1,
    title: "Annual Symposium on Quantum Tech",
    date: "October 15, 2024",
    description: "We hosted over 200 researchers for our annual symposium.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Outreach at Local High School",
    date: "September 10, 2024",
    description: "Our PhD students demonstrated physics experiments to 10th graders.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?q=80&w=800&auto=format&fit=crop"
  }
];
