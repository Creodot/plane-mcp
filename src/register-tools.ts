import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerIssueTools } from "./tools/issue.tools.js";

/**
 * Registers all available MCP tools with the server instance.
 * @param server The McpServer instance.
 */
export function registerAllTools(server: McpServer) {
  console.log("Registering tools...");

  registerIssueTools(server);
  // ... register other tools

  console.log("Tools registered.");
}
