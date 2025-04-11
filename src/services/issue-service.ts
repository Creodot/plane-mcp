import { planeClient } from "./plane-client.js";
import type { CreatePlaneIssuePayload, PlaneIssue, UpdatePlaneIssuePayload } from "../types/plane-types.js";

const BASE_ISSUE_PATH = "/workspaces/{workspace_slug}/projects/{project_id}/issues";

/**
 * Service class for interacting with Plane.so Issue endpoints.
 */
export class IssueService {
  /**
   * Retrieves a specific issue.
   *
   * @param workspaceSlug - The slug of the workspace.
   * @param projectId - The ID of the project.
   * @param issueId - The ID of the issue to retrieve.
   * @returns The PlaneIssue object.
   */
  async getIssue(workspaceSlug: string, projectId: string, issueId: string): Promise<PlaneIssue> {
    const endpoint = `${BASE_ISSUE_PATH}/{issue_id}`;
    return planeClient.request<PlaneIssue>(
      endpoint,
      { method: "GET" },
      { workspace_slug: workspaceSlug, project_id: projectId, issue_id: issueId }
    );
  }

  /**
   * Creates a new issue.
   *
   * @param workspaceSlug - The slug of the workspace.
   * @param projectId - The ID of the project where the issue will be created.
   * @param payload - The data for the new issue.
   * @returns The newly created PlaneIssue object.
   */
  async createIssue(workspaceSlug: string, projectId: string, payload: CreatePlaneIssuePayload): Promise<PlaneIssue> {
    // Ensure project ID is in the payload as it seems required by Plane API for creation
    if (!payload.project) {
      payload.project = projectId;
    }
    return planeClient.request<PlaneIssue>(
      BASE_ISSUE_PATH,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { workspace_slug: workspaceSlug, project_id: projectId }
    );
  }

  /**
   * Updates an existing issue.
   *
   * @param workspaceSlug - The slug of the workspace.
   * @param projectId - The ID of the project containing the issue.
   * @param issueId - The ID of the issue to update.
   * @param payload - The data to update the issue with.
   * @returns The updated PlaneIssue object.
   */
  async updateIssue(
    workspaceSlug: string,
    projectId: string,
    issueId: string,
    payload: UpdatePlaneIssuePayload
  ): Promise<PlaneIssue> {
    const endpoint = `${BASE_ISSUE_PATH}/{issue_id}`;
    return planeClient.request<PlaneIssue>(
      endpoint,
      {
        method: "PATCH", // Or PUT depending on the API design
        body: JSON.stringify(payload),
      },
      { workspace_slug: workspaceSlug, project_id: projectId, issue_id: issueId }
    );
  }
}

// Export a singleton instance
export const issueService = new IssueService(); 