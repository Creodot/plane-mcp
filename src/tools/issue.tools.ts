import { Priority } from "@/types/issue.types.js";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const ISSUE_IDENTIFIER_TOOL = {
  getIssue: "get-issue",
  createIssue: "create-issue",
  updateIssue: "update-issue",
  deleteIssue: "delete-issue",
};

const GET_ISSUE_TOOL: Tool = {
  name: ISSUE_IDENTIFIER_TOOL.getIssue,
  description: "Get an issue by its ID",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "The ID of the project",
      },
      issue_id: {
        type: "string",
        description: "The ID of the issue",
      },
    },
    required: ["project_id", "issue_id"],
  },
};

const CREATE_ISSUE_TOOL: Tool = {
  name: ISSUE_IDENTIFIER_TOOL.createIssue,
  description: "Create a new issue",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "The ID of the project where the issue will be created",
      },
      name: {
        type: "string",
        description: "Name of the issue",
      },
      description: {
        type: "string",
        description: "Description of the issue",
      },
      description_html: {
        type: "string",
        description: "HTML description of the issue",
      },
      priority: {
        type: "string",
        enum: Object.values(Priority),
        description: "Priority of the issue (urgent, high, medium, low, none)",
      },
      state: {
        type: "string",
        description: "ID of the state for this issue",
      },
      assignees: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Array of user IDs to assign to this issue",
      },
      labels: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Array of label IDs to apply to this issue",
      },
      parent: {
        type: "string",
        description: "ID of the parent issue, if this is a sub-issue",
      },
      start_date: {
        type: "string",
        format: "date",
        description: "Start date in YYYY-MM-DD format",
      },
      target_date: {
        type: "string",
        format: "date",
        description: "Target completion date in YYYY-MM-DD format",
      },
    },
    required: ["project_id", "name"],
  },
};

const UPDATE_ISSUE_TOOL: Tool = {
  name: ISSUE_IDENTIFIER_TOOL.updateIssue,
  description: "Update an issue",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "The ID of the project",
      },
      issue_id: {
        type: "string",
        description: "The ID of the issue to update",
      },
      name: {
        type: "string",
        description: "Updated name of the issue",
      },
      description: {
        type: "string",
        description: "Updated description of the issue",
      },
      description_html: {
        type: "string",
        description: "Updated HTML description of the issue",
      },
      priority: {
        type: "string",
        enum: Object.values(Priority),
        description: "Updated priority of the issue (urgent, high, medium, low, none)",
      },
      state: {
        type: "string",
        description: "Updated ID of the state for this issue",
      },
      assignees: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Updated array of user IDs to assign to this issue",
      },
      labels: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Updated array of label IDs to apply to this issue",
      },
      parent: {
        type: "string",
        description: "Updated ID of the parent issue, if this is a sub-issue",
      },
      start_date: {
        type: "string",
        format: "date",
        description: "Updated start date in YYYY-MM-DD format",
      },
      target_date: {
        type: "string",
        format: "date",
        description: "Updated target completion date in YYYY-MM-DD format",
      },
    },
    required: ["project_id", "issue_id"],
  },
};

const DELETE_ISSUE_TOOL: Tool = {
  name: ISSUE_IDENTIFIER_TOOL.deleteIssue,
  description: "Delete an issue",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "The ID of the project",
      },
      issue_id: {
        type: "string",
        description: "The ID of the issue to delete",
      },
    },
    required: ["project_id", "issue_id"],
  },
};

export const ISSUE_TOOLS = {
  CREATE_ISSUE_TOOL,
  DELETE_ISSUE_TOOL,
  GET_ISSUE_TOOL,
  UPDATE_ISSUE_TOOL,
};
