import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerAllTools } from "@/tools/index.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";

dotenv.config();

// Get package.json data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

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

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
