import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import packageJson from "../package.json" assert { type: "json" };
import { registerAllTools } from "./register-tools.js";

export const BASE_URL = process.env.PLANE_API_BASE_URL;
export const API_KEY = process.env.PLANE_API_KEY;

if (!BASE_URL) {
  throw new Error("PLANE_API_BASE_URL environment variable is not set.");
}

if (!API_KEY) {
  throw new Error("PLANE_API_KEY environment variable is not set.");
}

const server = new McpServer({
  name: "plane-mcp-server",
  version: packageJson.version,
  description: "Provides MCP tools to interact with the Plane.so API",
});

registerAllTools(server);
