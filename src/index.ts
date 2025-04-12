import { registerAllTools } from "@/register-tools";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import packageJson from "../package.json" with { type: "json" };

const server = new McpServer({
  name: "plane-mcp-server",
  version: packageJson.version,
  description: "Provides MCP tools to interact with the Plane.so API",
});

registerAllTools(server);
