import { z } from "zod";
import { issueService } from "../services/issue-service.js";
import {
  IssueIdentifierSchema,
  CreateIssueToolSchema,
  UpdateIssueToolSchema,
} from "./schemas/issue-schemas.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import type { ToolResult, ToolResultContent } from "@modelcontextprotocol/sdk/types.js"; // Cannot import directly

// Define a compatible return type locally
type HandlerResult = {
  content: ({ type: "text"; text: string } 
    // Include other potential types if needed later, even if not used now
    // | { type: "image"; data: string; mimeType: string } 
    // | { type: "audio"; data: string; mimeType: string } 
    // | { type: "resource"; resource: { uri: string; text?: string; blob?: string; mimeType?: string } }
  )[];
  isError?: boolean;
  _meta?: Record<string, unknown>; // Allow optional metadata
};

// Define handlers with the local compatible return type
const handleGetIssue = async (args: z.infer<typeof IssueIdentifierSchema>): Promise<HandlerResult> => {
  const { workspace_slug, project_id, issue_id } = args;
  const issue = await issueService.getIssue(workspace_slug, project_id, issue_id);
  return {
    content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
  };
};

const handleCreateIssue = async (args: z.infer<typeof CreateIssueToolSchema>): Promise<HandlerResult> => {
  const { workspace_slug, project_id, payload } = args;
  const issueData = { ...payload, project: project_id };
  const newIssue = await issueService.createIssue(workspace_slug, project_id, issueData);
  return {
    content: [{ type: "text", text: JSON.stringify(newIssue, null, 2) }],
  };
};

const handleUpdateIssue = async (args: z.infer<typeof UpdateIssueToolSchema>): Promise<HandlerResult> => {
  const { workspace_slug, project_id, issue_id, payload } = args;
  const updatedIssue = await issueService.updateIssue(workspace_slug, project_id, issue_id, payload);
  return {
    content: [{ type: "text", text: JSON.stringify(updatedIssue, null, 2) }],
  };
};

// Registration function with direct calls
export function registerIssueTools(server: McpServer) {
  // Register Get Issue Tool
  if (IssueIdentifierSchema instanceof z.ZodObject) {
    server.tool(
      "plane_get_issue",
      IssueIdentifierSchema.shape, // Pass the specific shape
      handleGetIssue            // Pass the specific handler
    );
  } else {
    console.warn("Skipping tool plane_get_issue: Schema is not a ZodObject");
  }

  // Register Create Issue Tool
  if (CreateIssueToolSchema instanceof z.ZodObject) {
    server.tool(
      "plane_create_issue",
      CreateIssueToolSchema.shape, // Pass the specific shape
      handleCreateIssue         // Pass the specific handler
    );
  } else {
    console.warn("Skipping tool plane_create_issue: Schema is not a ZodObject");
  }

  // Register Update Issue Tool
  if (UpdateIssueToolSchema instanceof z.ZodObject) {
    server.tool(
      "plane_update_issue",
      UpdateIssueToolSchema.shape, // Pass the specific shape
      handleUpdateIssue         // Pass the specific handler
    );
  } else {
    console.warn("Skipping tool plane_update_issue: Schema is not a ZodObject");
  }
} 