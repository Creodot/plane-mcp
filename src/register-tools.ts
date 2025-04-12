import type { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { registerIssueTools } from "./tools/issue.tools.js";
import { registerProjectTools } from "./tools/project.tools.js";

/**
 * Registers all available MCP tools with the server instance.
 * @param server The McpServer instance.
 */
export function registerAllTools(server: Server) {
  console.log("Registering tools...");

  registerIssueTools(server);
  registerProjectTools(server);

  console.log("Tools registered.");
}
