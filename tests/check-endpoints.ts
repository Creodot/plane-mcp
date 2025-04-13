#!/usr/bin/env node

import { planeClient } from "../src/plane-client.js";
import { issueService } from "../src/services/issue.service.js";
import { projectService } from "../src/services/project.service.js";
import { Priority } from "../src/types/issue.types.js";

/**
 * Simple script to test all endpoints and verify that they're working correctly
 * This can be run directly to check if there are API issues
 */

// Colors for the console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
  bright: "\x1b[1m",
};

// Helper functions
const logSuccess = (message: string) => console.log(`${colors.green}✓ ${message}${colors.reset}`);
const logError = (message: string) => console.error(`${colors.red}✗ ${message}${colors.reset}`);
const logInfo = (message: string) => console.log(`${colors.blue}ℹ ${message}${colors.reset}`);
const logWarning = (message: string) => console.log(`${colors.yellow}⚠ ${message}${colors.reset}`);
const logHeader = (message: string) =>
  console.log(`\n${colors.bright}${colors.blue}${message}${colors.reset}\n`);

// Results of the endpoint checks
const results = {
  success: 0,
  failure: 0,
  skipped: 0,
};

/**
 * Run a test and log the result
 */
async function runTest(
  name: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  testFunction: () => Promise<any>,
  skipIf?: () => boolean,
): Promise<boolean> {
  try {
    if (skipIf?.()) {
      logWarning(`SKIPPED: ${name}`);
      results.skipped++;
      return false;
    }

    await testFunction();
    logSuccess(`PASSED: ${name}`);
    results.success++;
    return true;
  } catch (error) {
    logError(`FAILED: ${name} - ${error instanceof Error ? error.message : String(error)}`);
    results.failure++;
    return false;
  }
}

// Temporary storage for test data
const testData = {
  projectId: "",
  issueId: "",
};

/**
 * Main function to run all tests
 */
async function checkAllEndpoints() {
  logHeader("CHECKING PLANE API ENDPOINTS");
  logInfo("Starting endpoint validation");

  // Testing project endpoints
  logHeader("PROJECT ENDPOINTS");

  await runTest("List Projects", async () => {
    const response = await projectService.listProjects();
    if (response.isError) {
      throw new Error(`Failed to list projects: ${response.content[0]?.text}`);
    }
  });

  // Create a test project
  const testProjectIdentifier = `TEST${Date.now().toString().slice(-4)}`;
  await runTest("Create Project", async () => {
    const response = await projectService.createProject({
      name: "API Test Project",
      identifier: testProjectIdentifier,
      description: "Project created for endpoint testing",
      network: 0, // Secret
    });

    if (response.isError) {
      throw new Error(`Failed to create project: ${response.content[0]?.text}`);
    }

    const content = JSON.parse(response.content[0]?.text || "{}");
    testData.projectId = content.id;
    logInfo(`Created test project with ID: ${testData.projectId}`);
  });

  // Get the test project
  await runTest(
    "Get Project",
    async () => {
      const response = await projectService.getProject({
        project_id: testData.projectId,
      });

      if (response.isError) {
        throw new Error(`Failed to get project: ${response.content[0]?.text}`);
      }
    },
    () => !testData.projectId,
  );

  // Update the test project
  await runTest(
    "Update Project",
    async () => {
      const response = await projectService.updateProject({
        project_id: testData.projectId,
        name: "Updated API Test Project",
      });

      if (response.isError) {
        throw new Error(`Failed to update project: ${response.content[0]?.text}`);
      }
    },
    () => !testData.projectId,
  );

  // Testing issue endpoints
  logHeader("ISSUE ENDPOINTS");

  // Create a test issue
  await runTest(
    "Create Issue",
    async () => {
      const response = await issueService.createIssue({
        name: "Test Issue",
        project: testData.projectId,
        description: "Issue for testing endpoints",
        priority: Priority.medium,
      });

      if (response.isError) {
        throw new Error(`Failed to create issue: ${response.content[0]?.text}`);
      }

      const content = JSON.parse(response.content[0]?.text || "{}");
      testData.issueId = content.id;
      logInfo(`Created test issue with ID: ${testData.issueId}`);
    },
    () => !testData.projectId,
  );

  // Get the test issue
  await runTest(
    "Get Issue",
    async () => {
      const response = await issueService.getIssue(testData.projectId, testData.issueId);

      if (response.isError) {
        throw new Error(`Failed to get issue: ${response.content[0]?.text}`);
      }
    },
    () => !testData.issueId,
  );

  // Update the test issue
  await runTest(
    "Update Issue",
    async () => {
      const response = await issueService.updateIssue({
        issue_id: testData.issueId,
        project: testData.projectId,
        name: "Updated Test Issue",
      });

      if (response.isError) {
        throw new Error(`Failed to update issue: ${response.content[0]?.text}`);
      }
    },
    () => !testData.issueId,
  );

  // Delete the test issue
  await runTest(
    "Delete Issue",
    async () => {
      const response = await issueService.deleteIssue(testData.projectId, testData.issueId);

      if (response.isError) {
        throw new Error(`Failed to delete issue: ${response.content[0]?.text}`);
      }

      testData.issueId = "";
    },
    () => !testData.issueId || !testData.projectId,
  );

  // Delete the test project
  await runTest(
    "Delete Project",
    async () => {
      const response = await projectService.deleteProject({
        project_id: testData.projectId,
      });

      if (response.isError) {
        throw new Error(`Failed to delete project: ${response.content[0]?.text}`);
      }

      testData.projectId = "";
    },
    () => !testData.projectId,
  );

  // Print summary
  logHeader("TEST SUMMARY");
  console.log(`${colors.green}Passed: ${results.success}${colors.reset}`);
  console.log(`${colors.red}Failed: ${results.failure}${colors.reset}`);
  console.log(`${colors.yellow}Skipped: ${results.skipped}${colors.reset}`);

  if (results.failure > 0) {
    console.log(
      `\n${colors.red}Some endpoints failed. Please check the logs above.${colors.reset}`,
    );
    process.exit(1);
  } else {
    console.log(`\n${colors.green}All tested endpoints are working!${colors.reset}`);
    process.exit(0);
  }
}

// Run the tests
checkAllEndpoints().catch((error) => {
  console.error(`${colors.red}ERROR: ${error}${colors.reset}`);
  process.exit(1);
});
