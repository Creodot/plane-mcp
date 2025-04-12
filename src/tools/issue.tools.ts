import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { z } from "zod";
import {
  CreateIssueToolSchema,
  IssueIdentifierSchema,
  UpdateIssueToolSchema,
} from "../schemas/issue.schemas.js";
import { issueService } from "../services/issue.service.js";

type HandlerResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
  _meta?: Record<string, unknown>;
};

const handleGetIssue = async (
  args: z.infer<typeof IssueIdentifierSchema>,
): Promise<HandlerResult> => {
  const { workspace_slug, project_id, issue_id } = args;

  const issue = await issueService.getIssue(workspace_slug, project_id, issue_id);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(issue, null, 2),
      },
    ],
  };
};

const handleCreateIssue = async (
  args: z.infer<typeof CreateIssueToolSchema>,
): Promise<HandlerResult> => {
  const { workspace_slug, project_id, payload } = args;

  const issueData = { ...payload, project: project_id };

  const newIssue = await issueService.createIssue(workspace_slug, project_id, issueData);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(newIssue, null, 2),
      },
    ],
  };
};

const handleUpdateIssue = async (
  args: z.infer<typeof UpdateIssueToolSchema>,
): Promise<HandlerResult> => {
  const { workspace_slug, project_id, issue_id, payload } = args;

  const updatedIssue = await issueService.updateIssue(
    workspace_slug,
    project_id,
    issue_id,
    payload,
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(updatedIssue, null, 2),
      },
    ],
  };
};

export function registerIssueTools(server: McpServer) {
  server.tool("plane_create_issue", CreateIssueToolSchema.shape, handleCreateIssue);
  server.tool("plane_get_issue", IssueIdentifierSchema.shape, handleGetIssue);
  server.tool("plane_update_issue", UpdateIssueToolSchema.shape, handleUpdateIssue);
}
