import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerIssueTools } from "./tools/issue.tools";
import { registerProjectTools } from "./tools/project.tools";

/**
 * Registers all available MCP tools with the server instance.
 * @param server The McpServer instance.
 */
export function registerAllTools(server: McpServer) {
  console.log("Registering tools...");

  registerIssueTools(server);
  registerProjectTools(server);

  console.log("Tools registered.");
}
