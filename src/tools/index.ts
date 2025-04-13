#!/usr/bin/env node

import {
  CreateIssueArgsSchema,
  IssueIdSchema,
  ProjectAndIssueIdSchema,
  UpdateIssueArgsSchema,
} from "@/schemas/issue.schema.js";
import {
  CreateProjectArgsSchema,
  ProjectIdSchema,
  UpdateProjectArgsSchema,
} from "@/schemas/project.schema.js";
import { ValidationError, validateWithSchema } from "@/schemas/tools.schema.js";
import { issueService } from "@/services/issue.service.js";
import { projectService } from "@/services/project.service.js";
import type { CreateIssuePayload, UpdateIssuePayload } from "@/types/issue.types.js";
import type { CreateProjectPayload, UpdateProjectPayload } from "@/types/project.types.js";
import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { ISSUE_IDENTIFIER_TOOL, ISSUE_TOOLS } from "./issue.tools.js";
import { PROJECT_IDENTIFIER_TOOL, PROJECT_TOOLS } from "./project.tools.js";

/**
 * Registers all tools with the server to make them available to clients.
 *
 * @param server - The MCP server instance
 */
export function registerAllTools(server: Server) {
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      // Project tools
      PROJECT_TOOLS.LIST_PROJECTS_TOOL,
      PROJECT_TOOLS.GET_PROJECT_TOOL,
      PROJECT_TOOLS.CREATE_PROJECT_TOOL,
      PROJECT_TOOLS.UPDATE_PROJECT_TOOL,
      PROJECT_TOOLS.DELETE_PROJECT_TOOL,

      // Issue tools
      ISSUE_TOOLS.CREATE_ISSUE_TOOL,
      ISSUE_TOOLS.GET_ISSUE_TOOL,
      ISSUE_TOOLS.UPDATE_ISSUE_TOOL,
      ISSUE_TOOLS.DELETE_ISSUE_TOOL,
    ],
  }));
}

/**
 * Registers the handlers for tool calls.
 *
 * @param server - The MCP server instance
 */
export function registerToolHandlers(server: Server) {
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name: originalName, arguments: args } = request.params;

    let name = originalName;

    if (name.includes("_")) {
      const parts = name.split("_");
      if (parts.length > 3) {
        const operationParts = parts.slice(3);
        name = operationParts.join("_");
      }
    }

    name = name.replace(/_/g, "-");

    try {
      if (!args) {
        throw new ValidationError("Missing arguments for tool call");
      }

      switch (name) {
        // Project tools
        case PROJECT_IDENTIFIER_TOOL.listProjects:
          return await projectService.listProjects();
        case PROJECT_IDENTIFIER_TOOL.getProject: {
          const validArgs = validateWithSchema(ProjectIdSchema, args);
          return await projectService.getProject(validArgs);
        }
        case PROJECT_IDENTIFIER_TOOL.createProject: {
          const validArgs = validateWithSchema(CreateProjectArgsSchema, args);
          const payload: CreateProjectPayload = validArgs;
          return await projectService.createProject(payload);
        }
        case PROJECT_IDENTIFIER_TOOL.updateProject: {
          const validArgs = validateWithSchema(UpdateProjectArgsSchema, args);
          const payload: UpdateProjectPayload = validArgs;
          return await projectService.updateProject(payload);
        }
        case PROJECT_IDENTIFIER_TOOL.deleteProject: {
          const validArgs = validateWithSchema(ProjectIdSchema, args);
          return await projectService.deleteProject(validArgs);
        }

        // Issue tools
        case ISSUE_IDENTIFIER_TOOL.createIssue: {
          const validArgs = validateWithSchema(CreateIssueArgsSchema, args);

          // Transform project_id to project for Plane API compatibility
          const createIssuePayload: CreateIssuePayload = {
            ...validArgs,
            project: validArgs.project_id,
          };

          return await issueService.createIssue(createIssuePayload);
        }
        case ISSUE_IDENTIFIER_TOOL.getIssue: {
          const validArgs = validateWithSchema(IssueIdSchema, args);
          return await issueService.getIssue(validArgs.project_id, validArgs.issue_id);
        }
        case ISSUE_IDENTIFIER_TOOL.updateIssue: {
          const validArgs = validateWithSchema(UpdateIssueArgsSchema, args);
          const payload: UpdateIssuePayload = validArgs;
          return await issueService.updateIssue(payload);
        }
        case ISSUE_IDENTIFIER_TOOL.deleteIssue: {
          const validArgs = validateWithSchema(ProjectAndIssueIdSchema, args);
          return await issueService.deleteIssue(validArgs.project_id, validArgs.issue_id);
        }

        default:
          throw new ValidationError(`Unknown tool: ${originalName} (normalized to ${name})`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  });
}
