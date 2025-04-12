import { WORKSPACE_SLUG } from "@/configs/env.js";
import { planeClient } from "@/plane-client.js";
import type { CreateIssuePayload, Issue, UpdateIssuePayload } from "@/types/issue.types.js";

const BASE_ISSUE_PATH = `/workspaces/${WORKSPACE_SLUG}/projects/{project_id}/issues`;

/**
 * Service class for interacting with Plane.so Issue endpoints.
 */
export class IssueService {
  /**
   * Retrieves a specific issue.
   *
   * @param projectId - The ID of the project.
   * @param issueId - The ID of the issue to retrieve.
   * @returns The PlaneIssue object.
   */
  async getIssue(projectId: string, issueId: string): Promise<Issue> {
    const endpoint = `${BASE_ISSUE_PATH}/{issue_id}`;
    return planeClient.request<Issue>(
      endpoint,
      { method: "GET" },
      {
        project_id: projectId,
        issue_id: issueId,
      },
    );
  }

  /**
   * Creates a new issue.
   *
   * @param projectId - The ID of the project where the issue will be created.
   * @param payload - The data for the new issue.
   * @returns The newly created PlaneIssue object.
   */
  async createIssue(projectId: string, payload: CreateIssuePayload): Promise<Issue> {
    // Ensure project ID is in the payload as it seems required by Plane API for creation
    if (!payload.project) {
      payload.project = projectId;
    }
    return planeClient.request<Issue>(
      BASE_ISSUE_PATH,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { project_id: projectId },
    );
  }

  /**
   * Updates an existing issue.
   *
   * @param projectId - The ID of the project containing the issue.
   * @param issueId - The ID of the issue to update.
   * @param payload - The data to update the issue with.
   * @returns The updated PlaneIssue object.
   */
  async updateIssue(
    projectId: string,
    issueId: string,
    payload: UpdateIssuePayload,
  ): Promise<Issue> {
    const endpoint = `${BASE_ISSUE_PATH}/{issue_id}`;
    return planeClient.request<Issue>(
      endpoint,
      { method: "PATCH", body: JSON.stringify(payload) },
      { project_id: projectId, issue_id: issueId },
    );
  }
}

export const issueService = new IssueService();
