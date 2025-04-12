import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/types/**/*.ts", "src/**/*.test.ts", "src/mcp-server.ts"],
    },
    env: {
      PLANE_API_BASE_URL: "https://app.plane.so/api/v1",
      PLANE_API_KEY: "test-api-key",
      PLANE_WORKSPACE_SLUG: "test-workspace",
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
