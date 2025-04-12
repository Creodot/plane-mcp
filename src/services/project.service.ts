import { WORKSPACE_SLUG } from "@/configs/env";
import { planeClient } from "@/plane-client";
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "@/types/project.types";

const BASE_PROJECT_PATH = `/workspaces/${WORKSPACE_SLUG}/projects`;

/**
 * Service class for interacting with Plane.so Project endpoints.
 */
export class ProjectService {
  /**
   * Lists all projects within the workspace.
   *
   * @returns An array of Project objects.
   */
  async listProjects(): Promise<Project[]> {
    return planeClient.request<Project[]>(BASE_PROJECT_PATH, { method: "GET" }, {});
  }

  /**
   * Retrieves a specific project.
   *
   * @param projectId - The ID of the project to retrieve.
   * @returns The Project object.
   */
  async getProject(projectId: string): Promise<Project> {
    const endpoint = `${BASE_PROJECT_PATH}/{project_id}`;
    return planeClient.request<Project>(endpoint, { method: "GET" }, { project_id: projectId });
  }

  /**
   * Creates a new project.
   *
   * @param payload - The data for the new project.
   * @returns The newly created Project object.
   */
  async createProject(payload: CreateProjectPayload): Promise<Project> {
    return planeClient.request<Project>(
      BASE_PROJECT_PATH,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      {},
    );
  }

  /**
   * Updates an existing project.
   *
   * @param projectId - The ID of the project to update.
   * @param payload - The data to update the project with.
   * @returns The updated Project object.
   */
  async updateProject(projectId: string, payload: UpdateProjectPayload): Promise<Project> {
    const endpoint = `${BASE_PROJECT_PATH}/{project_id}`;
    return planeClient.request<Project>(
      endpoint,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      { project_id: projectId },
    );
  }

  /**
   * Deletes a project.
   *
   * @param projectId - The ID of the project to delete.
   * @returns An empty promise (or potentially status info, depending on API response).
   */
  async deleteProject(projectId: string): Promise<void> {
    const endpoint = `${BASE_PROJECT_PATH}/{project_id}`;
    // The request method likely returns void or a specific status object upon successful deletion.
    // Adjust the return type if the API provides a specific response body on DELETE.
    await planeClient.request<void>(endpoint, { method: "DELETE" }, { project_id: projectId });
  }
}

export const projectService = new ProjectService();
