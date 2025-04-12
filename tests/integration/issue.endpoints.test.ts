#!/usr/bin/env node

import { planeClient } from "@/plane-client.js";
import { issueService } from "@/services/issue.service.js";
import { projectService } from "@/services/project.service.js";
import { Priority } from "@/types/issue.types.js";
import type { CreateIssuePayload, Issue } from "@/types/issue.types.js";
import type { CreateProjectPayload, Project } from "@/types/project.types.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// These tests will actually call the Plane API
// They are designed to verify that the API is functioning correctly
describe("Issue Endpoints Integration Tests", () => {
  // Store IDs for cleanup
  let testProjectId: string;
  let createdIssueId: string;
  const testProjectIdentifier = `TEST${Date.now().toString().slice(-4)}`;

  // Test data
  const projectData: CreateProjectPayload = {
    name: "Integration Test Project for Issues",
    identifier: testProjectIdentifier,
    description: "Project created for issue integration testing",
    network: 0, // Secret
  };

  // Setup test project first
  beforeAll(async () => {
    // Create a test project for our issues
    const response = await projectService.createProject(projectData);

    if (response.isError || !response.content[0]) {
      throw new Error("Failed to create test project for issue tests");
    }

    const content = JSON.parse(response.content[0].text);
    testProjectId = content.id;
    console.log(`Created test project with ID: ${testProjectId}`);
  });

  // Clean up after all tests
  afterAll(async () => {
    // Clean up the issue if it was created
    if (createdIssueId && testProjectId) {
      try {
        await issueService.deleteIssue(testProjectId, createdIssueId);
        console.log(`Test issue ${createdIssueId} deleted successfully`);
      } catch (error) {
        console.error(`Failed to delete test issue: ${error}`);
      }
    }

    // Clean up the test project
    if (testProjectId) {
      try {
        await projectService.deleteProject({ project_id: testProjectId });
        console.log(`Test project ${testProjectId} deleted successfully`);
      } catch (error) {
        console.error(`Failed to delete test project: ${error}`);
      }
    }
  });

  // Test issue creation endpoint
  it("should create an issue successfully", async () => {
    // Skip if we don't have a project ID
    if (!testProjectId) {
      console.warn("Skipping test because test project couldn't be created");
      return;
    }

    const issueData: CreateIssuePayload = {
      name: "Test Issue",
      description: "This is a test issue for integration testing",
      project: testProjectId,
      priority: Priority.medium,
    };

    const response = await issueService.createIssue(issueData);

    expect(response.isError).toBe(false);
    expect(response.content).toHaveLength(1);

    // Parse the response
    if (response.content[0]) {
      const content = JSON.parse(response.content[0].text);
      expect(content.name).toBe(issueData.name);
      expect(content.description).toBe(issueData.description);
      expect(content.id).toBeDefined();

      // Save the issue ID for later tests
      createdIssueId = content.id;
    }
  });

  // Test get issue endpoint
  it("should retrieve an issue by ID", async () => {
    // Skip if we don't have an issue ID
    if (!createdIssueId) {
      console.warn("Skipping test because no issue was created");
      return;
    }

    const response = await issueService.getIssue(createdIssueId);

    expect(response.isError).toBe(false);
    expect(response.content).toHaveLength(1);

    // Parse the response
    if (response.content[0]) {
      const content = JSON.parse(response.content[0].text);
      expect(content.id).toBe(createdIssueId);
    }
  });

  // Test update issue endpoint
  it("should update an issue successfully", async () => {
    // Skip if we don't have an issue ID
    if (!createdIssueId) {
      console.warn("Skipping test because no issue was created");
      return;
    }

    const updatedName = "Updated Test Issue";
    const response = await issueService.updateIssue({
      issue_id: createdIssueId,
      name: updatedName,
    });

    expect(response.isError).toBe(false);
    expect(response.content).toHaveLength(1);

    // Parse the response
    if (response.content[0]) {
      const content = JSON.parse(response.content[0].text);
      expect(content.id).toBe(createdIssueId);
      expect(content.name).toBe(updatedName);
    }
  });

  // Log detailed error information if the issue creation fails
  it("should log detailed information when issue creation fails", async () => {
    if (!testProjectId) {
      console.warn("Skipping test because test project couldn't be created");
      return;
    }

    // Create an intentionally malformed issue to test error handling
    const invalidIssueData = {
      // Missing required 'name' field
      project: testProjectId,
      priority: "invalid_priority", // Invalid enum value
    };

    try {
      // We expect this to fail, but want to see how it fails
      // @ts-ignore - intentionally passing invalid data
      const response = await issueService.createIssue(invalidIssueData);
      console.log("Issue creation response:", JSON.stringify(response, null, 2));

      // If it gets here, it means the API didn't reject our malformed request
      // which could be part of the problem
      expect(response.isError).toBe(true);
    } catch (error) {
      // Log the error in detail to help understand the issue
      console.error("Issue creation error details:", error);
      throw error;
    }
  });
});
