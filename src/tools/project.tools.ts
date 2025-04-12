import {
  CreateProjectToolSchema,
  ProjectIdentifierSchema,
  UpdateProjectToolSchema,
} from "@/schemas/project.schemas";
import { projectService } from "@/services/project.service";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { z } from "zod";

// Shared type for handler results
type HandlerResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
  _meta?: Record<string, unknown>;
};

// Handler for listing projects
const handleListProjects = async (): Promise<HandlerResult> => {
  const projects = await projectService.listProjects();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(projects, null, 2),
      },
    ],
  };
};

// Handler for getting a specific project
const handleGetProject = async (
  args: z.infer<typeof ProjectIdentifierSchema>,
): Promise<HandlerResult> => {
  const { project_id } = args;
  const project = await projectService.getProject(project_id);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(project, null, 2),
      },
    ],
  };
};

// Handler for creating a new project
const handleCreateProject = async (
  args: z.infer<typeof CreateProjectToolSchema>,
): Promise<HandlerResult> => {
  const { payload } = args;
  const newProject = await projectService.createProject(payload);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(newProject, null, 2),
      },
    ],
  };
};

// Handler for updating a project
const handleUpdateProject = async (
  args: z.infer<typeof UpdateProjectToolSchema>,
): Promise<HandlerResult> => {
  const { project_id, payload } = args;
  const updatedProject = await projectService.updateProject(project_id, payload);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(updatedProject, null, 2),
      },
    ],
  };
};

// Handler for deleting a project
const handleDeleteProject = async (
  args: z.infer<typeof ProjectIdentifierSchema>,
): Promise<HandlerResult> => {
  const { project_id } = args;
  await projectService.deleteProject(project_id);
  return {
    content: [
      {
        type: "text",
        text: `Project with ID ${project_id} has been deleted.`,
      },
    ],
  };
};

// Function to register all project tools with the MCP server
export function registerProjectTools(server: McpServer) {
  server.tool("plane_list_projects", ProjectIdentifierSchema.shape, handleListProjects);
  server.tool("plane_get_project", ProjectIdentifierSchema.shape, handleGetProject);
  server.tool("plane_create_project", CreateProjectToolSchema.shape, handleCreateProject);
  server.tool("plane_update_project", UpdateProjectToolSchema.shape, handleUpdateProject);
  server.tool("plane_delete_project", ProjectIdentifierSchema.shape, handleDeleteProject);
}
