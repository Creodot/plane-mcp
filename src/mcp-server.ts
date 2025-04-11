import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "./register-tools.js";

async function main() {
  console.log("Starting Plane.so MCP Server...");

  const server = new McpServer({
    name: "plane-mcp-server",
    version: "0.1.0", // Consider reading from package.json
    description: "Provides MCP tools to interact with the Plane.so API",
  });

  // Register all defined tools
  registerAllTools(server);

  // Setup the transport (Standard I/O in this case)
  const transport = new StdioServerTransport();

  try {
    // Connect the server to the transport
    await server.connect(transport);
    console.log("Plane.so MCP Server connected via Standard I/O.");
  } catch (error) {
    console.error("Failed to connect MCP server:", error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unhandled error during server startup:", err);
  process.exit(1);
});
