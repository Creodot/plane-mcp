import { planeClient } from "../plane-client.js";
import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from "../types/project.types.js";

const BASE_PROJECT_PATH = "/workspaces/{workspace_slug}/projects";

/**
 * Service class for interacting with Plane.so Project endpoints.
 */
export class ProjectService {
  /**
   * Lists all projects within a workspace.
   *
   * @param workspaceSlug - The slug of the workspace.
   * @returns An array of Project objects.
   */
  async listProjects(workspaceSlug: string): Promise<Project[]> {
    return planeClient.request<Project[]>(
      BASE_PROJECT_PATH,
      { method: "GET" },
      { workspace_slug: workspaceSlug },
    );
  }

  /**
   * Retrieves a specific project.
   *
   * @param workspaceSlug - The slug of the workspace.
   * @param projectId - The ID of the project to retrieve.
   * @returns The Project object.
   */
  async getProject(workspaceSlug: string, projectId: string): Promise<Project> {
    const endpoint = `${BASE_PROJECT_PATH}/{project_id}`;
    return planeClient.request<Project>(
      endpoint,
      { method: "GET" },
      { workspace_slug: workspaceSlug, project_id: projectId },
    );
  }

  /**
   * Creates a new project.
   *
   * @param workspaceSlug - The slug of the workspace where the project will be created.
   * @param payload - The data for the new project.
   * @returns The newly created Project object.
   */
  async createProject(workspaceSlug: string, payload: CreateProjectPayload): Promise<Project> {
    return planeClient.request<Project>(
      BASE_PROJECT_PATH,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { workspace_slug: workspaceSlug },
    );
  }

  /**
   * Updates an existing project.
   *
   * @param workspaceSlug - The slug of the workspace.
   * @param projectId - The ID of the project to update.
   * @param payload - The data to update the project with.
   * @returns The updated Project object.
   */
  async updateProject(
    workspaceSlug: string,
    projectId: string,
    payload: UpdateProjectPayload,
  ): Promise<Project> {
    const endpoint = `${BASE_PROJECT_PATH}/{project_id}`;
    return planeClient.request<Project>(
      endpoint,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      { workspace_slug: workspaceSlug, project_id: projectId },
    );
  }

  /**
   * Deletes a project.
   *
   * @param workspaceSlug - The slug of the workspace.
   * @param projectId - The ID of the project to delete.
   * @returns An empty promise (or potentially status info, depending on API response).
   */
  async deleteProject(workspaceSlug: string, projectId: string): Promise<void> {
    const endpoint = `${BASE_PROJECT_PATH}/{project_id}`;
    // The request method likely returns void or a specific status object upon successful deletion.
    // Adjust the return type if the API provides a specific response body on DELETE.
    await planeClient.request<void>(
      endpoint,
      { method: "DELETE" },
      { workspace_slug: workspaceSlug, project_id: projectId },
    );
  }
}

export const projectService = new ProjectService();
