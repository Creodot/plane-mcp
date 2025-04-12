import { API_KEY, WORKSPACE_SLUG } from "./configs/env.js";

/**
 * Calls the Plane API with appropriate headers and error handling
 * @param endpoint - API endpoint to call (without base URL)
 * @param method - HTTP method (GET, POST, PATCH, DELETE)
 * @param body - Optional request body for POST/PATCH requests
 * @returns Response data from the API
 */
export async function planeClient<T>(
  endpoint: string,
  method: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const baseUrl = `https://api.plane.so/api/v1/workspaces/${WORKSPACE_SLUG}`;
  const url = `${baseUrl}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
  };

  if (body && (method === "POST" || method === "PATCH")) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorText: string;
      try {
        errorText = await response.text();
      } catch (parseError) {
        errorText = "Unable to parse error response";
      }
      throw new Error(`Plane API error: ${response.status} ${response.statusText}\n${errorText}`);
    }

    if (response.status === 204) {
      return { success: true } as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    throw new Error(
      `Error calling Plane API: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
