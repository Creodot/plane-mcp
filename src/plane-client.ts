import { API_KEY, BASE_URL } from "@/configs/env";
import { McpError } from "@modelcontextprotocol/sdk/types.js";

/**
 * A simple client to interact with the Plane.so API.
 * Handles base URL and authentication.
 */
export class PlaneClient {
  private baseUrl: string;
  private apiKey: string | undefined;

  constructor() {
    this.baseUrl = BASE_URL;
    this.apiKey = API_KEY;

    if (!this.apiKey) {
      throw new Error("PLANE_API_KEY environment variable is not set.");
    }
  }

  /**
   * Makes an authenticated request to the Plane.so API.
   *
   * @param endpoint - The API endpoint path (e.g., "/workspaces/{workspace_slug}/projects/{project_id}/issues").
   * @param options - Request options (method, body, etc.).
   * @param params - URL parameters to replace in the endpoint path (e.g., { workspace_slug: "my-workspace" }).
   * @returns The JSON response from the API.
   * @throws McpError if the request fails or the API returns an error status.
   */
  async request<T>(
    endpoint: string,
    options: RequestInit,
    params: Record<string, string> = {},
  ): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`;

    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    }

    const headers = new Headers(options.headers);
    if (this.apiKey) {
      headers.set("Authorization", `Bearer ${this.apiKey}`);
    }
    if (
      options.method &&
      options.method.toUpperCase() !== "GET" &&
      options.method.toUpperCase() !== "HEAD"
    ) {
      headers.set("Content-Type", "application/json");
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorBody: unknown;
        try {
          errorBody = await response.json();
        } catch (e) {
          errorBody = await response.text();
        }
        console.error(`Plane API Error (${response.status}):`, errorBody);
        throw new McpError(
          response.status,
          `Plane API request failed with status ${response.status}: ${JSON.stringify(errorBody) || response.statusText}`,
        );
      }

      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof McpError) {
        throw error;
      }
      console.error("Network or unexpected error during Plane API request:", error);
      throw new McpError(
        500,
        `Failed to make request to Plane API: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

export const planeClient = new PlaneClient();
