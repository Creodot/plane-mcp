export const API_KEY = process.env.PLANE_API_KEY;
export const WORKSPACE_SLUG = process.env.PLANE_WORKSPACE_SLUG;

if (!API_KEY) {
  throw new Error("PLANE_API_KEY environment variable is not set.");
}

if (!WORKSPACE_SLUG) {
  throw new Error("PLANE_WORKSPACE_SLUG environment variable is not set.");
}

export const BASE_URL = process.env.PLANE_API_BASE_URL || "https://app.plane.so/api/v1";
