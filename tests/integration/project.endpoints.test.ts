#!/usr/bin/env node

import { planeClient } from "@/plane-client.js";
import { projectService } from "@/services/project.service.js";
import type { CreateProjectPayload, Project } from "@/types/project.types.js";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// These tests will actually call the Plane API
// They are designed to verify that the API is functioning correctly
describe("Project Endpoints Integration Tests", () => {
  // Store created project ID for later tests
  let createdProjectId: string;
  const testProjectIdentifier = `TEST${Date.now().toString().slice(-4)}`;

  // Test data
  const projectData: CreateProjectPayload = {
    name: "Integration Test Project",
    identifier: testProjectIdentifier,
    description: "Project created for integration testing",
    network: 0, // Secret
  };

  // Clean up after all tests
  afterAll(async () => {
    // Delete the test project if it was created
    if (createdProjectId) {
      try {
        await projectService.deleteProject({ project_id: createdProjectId });
        console.log(`Test project ${createdProjectId} deleted successfully`);
      } catch (error) {
        console.error(`Failed to delete test project: ${error}`);
      }
    }
  });

  // Test the create project endpoint
  it("should create a project successfully", async () => {
    const response = await projectService.createProject(projectData);

    expect(response.isError).toBe(false);
    expect(response.content).toHaveLength(1);

    // Parse the response
    if (response.content[0]) {
      const content = JSON.parse(response.content[0].text);
      expect(content.name).toBe(projectData.name);
      expect(content.identifier).toBe(projectData.identifier);
      expect(content.id).toBeDefined();

      // Save the project ID for later tests
      createdProjectId = content.id;
    }
  });

  // Test the get project endpoint
  it("should retrieve a project by ID", async () => {
    // Skip if we don't have a project ID
    if (!createdProjectId) {
      console.warn("Skipping test because no project was created");
      return;
    }

    const response = await projectService.getProject({ project_id: createdProjectId });

    expect(response.isError).toBe(false);
    expect(response.content).toHaveLength(1);

    // Parse the response
    if (response.content[0]) {
      const content = JSON.parse(response.content[0].text);
      expect(content.id).toBe(createdProjectId);
      expect(content.name).toBe(projectData.name);
      expect(content.identifier).toBe(projectData.identifier);
    }
  });

  // Test the list projects endpoint
  it("should list all projects including the test project", async () => {
    // Skip if we don't have a project ID
    if (!createdProjectId) {
      console.warn("Skipping test because no project was created");
      return;
    }

    const response = await projectService.listProjects();

    expect(response.isError).toBe(false);
    expect(response.content).toHaveLength(1);

    // Parse the response
    if (response.content[0]) {
      const content = JSON.parse(response.content[0].text);
      expect(Array.isArray(content)).toBe(true);

      // Find our test project in the list
      const testProject = content.find((project: Project) => project.id === createdProjectId);
      expect(testProject).toBeDefined();
      expect(testProject.name).toBe(projectData.name);
      expect(testProject.identifier).toBe(projectData.identifier);
    }
  });

  // Test the update project endpoint
  it("should update a project successfully", async () => {
    // Skip if we don't have a project ID
    if (!createdProjectId) {
      console.warn("Skipping test because no project was created");
      return;
    }

    const updatedName = "Updated Integration Test Project";
    const response = await projectService.updateProject({
      project_id: createdProjectId,
      name: updatedName,
    });

    expect(response.isError).toBe(false);
    expect(response.content).toHaveLength(1);

    // Parse the response
    if (response.content[0]) {
      const content = JSON.parse(response.content[0].text);
      expect(content.id).toBe(createdProjectId);
      expect(content.name).toBe(updatedName);
      expect(content.identifier).toBe(projectData.identifier);
    }
  });
});
