// API helper functions for fetching data

export async function fetchTeamMembers() {
  const response = await fetch("/api/team");
  if (!response.ok) throw new Error("Failed to fetch team members");
  return response.json();
}

export async function fetchResearchAreas() {
  const response = await fetch("/api/research");
  if (!response.ok) throw new Error("Failed to fetch research areas");
  return response.json();
}

export async function fetchPublications() {
  const response = await fetch("/api/publications");
  if (!response.ok) throw new Error("Failed to fetch publications");
  return response.json();
}

export async function fetchProjects() {
  const response = await fetch("/api/projects");
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
}

export async function fetchActivities() {
  const response = await fetch("/api/activities");
  if (!response.ok) throw new Error("Failed to fetch activities");
  return response.json();
}

export async function fetchGalleryImages() {
  const response = await fetch("/api/gallery");
  if (!response.ok) throw new Error("Failed to fetch gallery images");
  return response.json();
}

export async function logout() {
  const response = await fetch("/api/auth/logout", { 
    method: "POST",
    credentials: "include" 
  });
  if (!response.ok) throw new Error("Logout failed");
  return response.json();
}
