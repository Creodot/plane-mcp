#!/usr/bin/env node

import { execSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

/**
 * Utility script to run all integration tests
 * Can be used to test individual endpoints or all endpoints
 */

// Default configuration
const config = {
  verbose: true,
  exitOnFailure: false,
  testFiles: [] as string[],
  timeoutSeconds: 30,
};

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(
    "Usage: node run-tests.js [options] [testfiles...]\n\n" +
      "Options:\n" +
      "  --help, -h        Show this help\n" +
      "  --exit-on-failure Exit immediately if any test fails\n" +
      "  --timeout=N       Set test timeout in seconds (default: 30)\n" +
      "  --quiet           Reduce verbosity\n\n" +
      "Examples:\n" +
      "  node run-tests.js                     # Run all integration tests\n" +
      "  node run-tests.js project.endpoints   # Run only project endpoint tests",
  );
  process.exit(0);
}

// Process args
for (const arg of args) {
  if (arg === "--exit-on-failure") {
    config.exitOnFailure = true;
  } else if (arg === "--quiet") {
    config.verbose = false;
  } else if (arg.startsWith("--timeout=")) {
    const timeoutPart = arg.split("=")[1];
    if (timeoutPart) {
      const timeout = Number.parseInt(timeoutPart, 10);
      if (!Number.isNaN(timeout)) {
        config.timeoutSeconds = timeout;
      }
    }
  } else if (!arg.startsWith("--")) {
    config.testFiles.push(arg);
  }
}

// Find test files if none specified
if (config.testFiles.length === 0) {
  const integrationDir = path.join(process.cwd(), "tests", "integration");
  const files = fs.readdirSync(integrationDir);
  config.testFiles = files
    .filter((file) => file.endsWith(".test.ts") || file.endsWith(".endpoints.test.ts"))
    .map((file) => file.replace(".ts", ""));
}

// Run tests
console.log(`Running integration tests with timeout of ${config.timeoutSeconds}s`);
console.log(`Tests to run: ${config.testFiles.join(", ")}`);

let failures = 0;

for (const testFile of config.testFiles) {
  const command = `npx vitest run tests/integration/${testFile} --timeout=${config.timeoutSeconds * 1000}`;

  if (config.verbose) {
    console.log("\n\n=======================================");
    console.log(`Executing: ${command}`);
    console.log("=======================================\n");
  }

  try {
    execSync(command, { stdio: "inherit" });
    if (config.verbose) {
      console.log(`✅ ${testFile} passed!`);
    }
  } catch (error) {
    failures++;
    console.error(`❌ ${testFile} failed!`);

    if (config.exitOnFailure) {
      console.error("Exiting due to test failure and --exit-on-failure flag");
      process.exit(1);
    }
  }
}

// Final results
if (failures === 0) {
  console.log("\n\n✅ All integration tests passed!");
  process.exit(0);
} else {
  console.error(`\n\n❌ ${failures} test file(s) failed`);
  process.exit(1);
}
