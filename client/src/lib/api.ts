// client/src/lib/api.ts

const BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.NEXT_PUBLIC_API_URL || ""; 
// Vite uses import.meta.env; fallback to empty string if frontend & backend are same domain

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}/api/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    credentials: "include", // include cookies for session-based auth
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.error || errorBody.message || `Failed to fetch ${endpoint}`
    );
  }

  return response.json();
}

// -------------------------
// Public API functions
// -------------------------

export const fetchTeamMembers = () => fetchAPI("team");
export const fetchResearchAreas = () => fetchAPI("research");
export const fetchPublications = () => fetchAPI("publications");
export const fetchProjects = () => fetchAPI("projects");
export const fetchActivities = () => fetchAPI("activities");
export const fetchGalleryImages = () => fetchAPI("gallery");

// -------------------------
// Authentication
// -------------------------

export const login = (data: { username: string; password: string }) =>
  fetchAPI("auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logout = () =>
  fetchAPI("auth/logout", {
    method: "POST",
  });

export const fetchCurrentUser = () => fetchAPI("auth/me");
