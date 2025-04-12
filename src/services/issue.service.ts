#!/usr/bin/env node

import { planeClient } from "@/plane-client.js";
import { CreateIssueSchema, UpdateIssueSchema } from "@/schemas/issue.schema.js";
import {
  createErrorResponse,
  createSuccessResponse,
  validateWithSchema,
} from "@/schemas/tools.schema.js";
import type { CreateIssuePayload, Issue, UpdateIssuePayload } from "@/types/issue.types.js";
import type { ToolResponse } from "@/types/tools.types.js";

/**
 * Service class for interacting with Plane.so Issue endpoints.
 */
export class IssueService {
  /**
   * Retrieves a specific issue.
   *
   * @param issueId - The ID of the issue to retrieve.
   * @returns The PlaneIssue object.
   */
  async getIssue(issueId: string): Promise<ToolResponse> {
    const endpoint = `/issues/${issueId}`;

    try {
      const issue = await planeClient<Issue>(endpoint, "GET");

      return createSuccessResponse(issue);
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }
  /**
   * Creates a new issue.
   *
   * @param payload - The data for the new issue.
   * @returns The newly created PlaneIssue object.
   */
  async createIssue(payload: CreateIssuePayload): Promise<ToolResponse> {
    // Validate payload
    const validPayload = validateWithSchema(CreateIssueSchema, payload);
    const endpoint = "/issues";

    try {
      const issue = await planeClient<Issue>(endpoint, "POST", validPayload);

      return createSuccessResponse(issue);
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Updates an existing issue.
   *
   * @param payload - The data to update the issue with.
   * @returns The updated PlaneIssue object.
   */
  async updateIssue(payload: UpdateIssuePayload): Promise<ToolResponse> {
    // Validate payload
    const validPayload = validateWithSchema(UpdateIssueSchema, payload);
    const { issue_id, ...updateData } = validPayload;
    const endpoint = `/issues/${issue_id}`;

    try {
      const issue = await planeClient<Issue>(endpoint, "PATCH", updateData);

      return createSuccessResponse(issue);
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Deletes an issue.
   *
   * @param projectId - The ID of the project containing the issue.
   * @param issueId - The ID of the issue to delete.
   * @returns A success response or error.
   */
  async deleteIssue(projectId: string, issueId: string): Promise<ToolResponse> {
    const endpoint = `/projects/${projectId}/issues/${issueId}`;

    try {
      await planeClient(endpoint, "DELETE");

      return createSuccessResponse({ message: "Issue successfully deleted" });
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }
}

export const issueService = new IssueService();
