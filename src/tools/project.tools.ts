#!/usr/bin/env node

import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const PROJECT_IDENTIFIER_TOOL = {
  listProjects: "list-projects",
  getProject: "get-project",
  createProject: "create-project",
  updateProject: "update-project",
  deleteProject: "delete-project",
};

const LIST_PROJECTS_TOOL: Tool = {
  name: PROJECT_IDENTIFIER_TOOL.listProjects,
  description: "List all projects in the workspace",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

const GET_PROJECT_TOOL: Tool = {
  name: PROJECT_IDENTIFIER_TOOL.getProject,
  description: "Get detailed information about a specific project",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "ID of the project to retrieve",
      },
    },
    required: ["project_id"],
  },
};

const CREATE_PROJECT_TOOL: Tool = {
  name: PROJECT_IDENTIFIER_TOOL.createProject,
  description: "Create a new project",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the project",
      },
      identifier: {
        type: "string",
        description: "Unique identifier for the project (e.g., PROJ)",
      },
      description: {
        type: "string",
        description: "Description of the project",
      },
      network: {
        type: "number",
        enum: [0, 2],
        description: "Project visibility (0 = Secret, 2 = Public)",
      },
      emoji: {
        type: "string",
        description: "HTML emoji DEX code without the '&#'",
      },
      module_view: {
        type: "boolean",
        description: "Enable/disable module view for the project",
      },
      cycle_view: {
        type: "boolean",
        description: "Enable/disable cycle view for the project",
      },
      issue_views_view: {
        type: "boolean",
        description: "Enable/disable issue views for the project",
      },
      page_view: {
        type: "boolean",
        description: "Enable/disable page view for the project",
      },
      inbox_view: {
        type: "boolean",
        description: "Enable/disable inbox view for the project",
      },
      archive_in: {
        type: "number",
        description: "Months in which to auto-archive issues (0-12)",
      },
      close_in: {
        type: "number",
        description: "Months in which to auto-close issues (0-12)",
      },
      default_assignee: {
        type: "string",
        description: "UUID of user to auto-assign issues to",
      },
      project_lead: {
        type: "string",
        description: "UUID of the project lead user",
      },
    },
    required: ["name", "identifier"],
  },
};

const UPDATE_PROJECT_TOOL: Tool = {
  name: PROJECT_IDENTIFIER_TOOL.updateProject,
  description: "Update a project",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "ID of the project to update",
      },
      name: {
        type: "string",
        description: "Updated name of the project",
      },
      description: {
        type: "string",
        description: "Updated description of the project",
      },
      network: {
        type: "number",
        enum: [0, 2],
        description: "Updated project visibility (0 = Secret, 2 = Public)",
      },
      emoji: {
        type: "string",
        description: "Updated HTML emoji DEX code without the '&#'",
      },
      module_view: {
        type: "boolean",
        description: "Updated module view setting",
      },
      cycle_view: {
        type: "boolean",
        description: "Updated cycle view setting",
      },
      issue_views_view: {
        type: "boolean",
        description: "Updated issue views setting",
      },
      page_view: {
        type: "boolean",
        description: "Updated page view setting",
      },
      inbox_view: {
        type: "boolean",
        description: "Updated inbox view setting",
      },
      archive_in: {
        type: "number",
        description: "Updated months for auto-archiving (0-12)",
      },
      close_in: {
        type: "number",
        description: "Updated months for auto-closing (0-12)",
      },
      default_assignee: {
        type: "string",
        description: "Updated UUID of default assignee",
      },
      project_lead: {
        type: "string",
        description: "Updated UUID of project lead",
      },
    },
    required: ["project_id"],
  },
};

const DELETE_PROJECT_TOOL: Tool = {
  name: PROJECT_IDENTIFIER_TOOL.deleteProject,
  description: "Delete a project",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "ID of the project to delete",
      },
    },
    required: ["project_id"],
  },
};

export const PROJECT_TOOLS = {
  CREATE_PROJECT_TOOL,
  DELETE_PROJECT_TOOL,
  GET_PROJECT_TOOL,
  LIST_PROJECTS_TOOL,
  UPDATE_PROJECT_TOOL,
};
