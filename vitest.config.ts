import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Use global APIs like describe, it, expect
    environment: 'node', // Specify Node.js environment
    coverage: {
      provider: 'v8', // Use v8 for coverage
      reporter: ['text', 'json', 'html'], // Coverage reporters
      include: ['src/**/*.ts'], // Files to include in coverage
      exclude: [
        'src/types/**/*.ts',
        'src/**/*.test.ts',
        'src/mcp-server.ts', // Exclude server entry point from unit test coverage
      ],
    },
  },
}) 