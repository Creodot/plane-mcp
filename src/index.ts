import { registerAllTools } from "@/register-tools.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import packageJson from "../package.json" with { type: "json" };

dotenv.config();

const server = new Server(
  {
    name: "plane-mcp-server",
    version: packageJson.version,
    description: "Provides MCP tools to interact with the Plane.so API",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

registerAllTools(server);

async function runServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.info("Plane MCP Server running on stdio");
  } catch (error) {
    console.error("Fatal error running server:", error);
    process.exit(1);
  }
}

// Start the server
runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
