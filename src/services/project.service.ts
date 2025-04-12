#!/usr/bin/env node

import { planeClient } from "@/plane-client.js";
import { CreateProjectSchema, UpdateProjectSchema } from "@/schemas/project.schema.js";
import {
  createErrorResponse,
  createSuccessResponse,
  validateWithSchema,
} from "@/schemas/tools.schema.js";
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "@/types/project.types.js";
import type { ToolResponse } from "@/types/tools.types.js";

/**
 * Service class for interacting with Plane.so Project endpoints.
 */
export class ProjectService {
  /**
   * Lists all projects within the workspace.
   *
   * @returns An array of Project objects.
   */
  async listProjects(): Promise<ToolResponse> {
    const endpoint = "/projects";

    try {
      const projects = await planeClient<Project[]>(endpoint, "GET");

      return createSuccessResponse(projects);
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Retrieves a specific project.
   *
   * @param params - Object containing the project_id.
   * @returns The Project object.
   */
  async getProject(params: { project_id: string }): Promise<ToolResponse> {
    const endpoint = `/projects/${params.project_id}`;

    try {
      const project = await planeClient<Project>(endpoint, "GET");

      return createSuccessResponse(project);
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Creates a new project.
   *
   * @param payload - The data for the new project.
   * @returns The newly created Project object.
   */
  async createProject(payload: CreateProjectPayload): Promise<ToolResponse> {
    // Validate payload
    const validPayload = validateWithSchema(CreateProjectSchema, payload);
    const endpoint = "/projects";

    try {
      const project = await planeClient<Project>(endpoint, "POST", validPayload);

      return createSuccessResponse(project);
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Updates an existing project.
   *
   * @param payload - The data to update the project with, including project_id.
   * @returns The updated Project object.
   */
  async updateProject(payload: UpdateProjectPayload): Promise<ToolResponse> {
    // Validate payload
    const validPayload = validateWithSchema(UpdateProjectSchema, payload);
    const { project_id, ...updateData } = validPayload;
    const endpoint = `/projects/${project_id}`;

    try {
      const project = await planeClient<Project>(endpoint, "PATCH", updateData);

      return createSuccessResponse(project);
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }

  /**
   * Deletes a project.
   *
   * @param params - Object containing the project_id.
   * @returns A success response or error.
   */
  async deleteProject(params: { project_id: string }): Promise<ToolResponse> {
    const endpoint = `/projects/${params.project_id}`;

    try {
      await planeClient(endpoint, "DELETE");

      return createSuccessResponse({ message: "Project successfully deleted" });
    } catch (error) {
      return createErrorResponse(error instanceof Error ? error.message : String(error));
    }
  }
}

export const projectService = new ProjectService();
