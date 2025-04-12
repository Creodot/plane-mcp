import { WORKSPACE_SLUG } from "@/configs/env.js";
import { planeClient } from "@/plane-client.js";
import { createSuccessResponse } from "@/schemas/tools.schema.js";
import { projectService } from "@/services/project.service.js";
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "@/types/project.types.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the planeClient and validateWithSchema
vi.mock("@/plane-client.js", () => ({
  planeClient: vi.fn(),
}));

vi.mock("@/schemas/tools.schema.js", () => ({
  validateWithSchema: vi.fn((_, data) => data),
  createSuccessResponse: vi.fn((data) => ({
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    isError: false,
  })),
  createErrorResponse: vi.fn((message) => ({
    content: [{ type: "text", text: message }],
    isError: true,
  })),
}));

describe("ProjectService", () => {
  const mockProjectId = "00918ea1-52f7-48bd-abe3-d3efe76ff7dd";
  const mockProjectData: Project = {
    id: mockProjectId,
    total_members: 5,
    total_cycles: 2,
    total_modules: 3,
    is_member: true,
    member_role: 20,
    is_deployed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: "Test Project",
    description: "Project Description",
    description_text: null,
    description_html: null,
    network: 2,
    identifier: "TESTPROJ",
    emoji: null,
    icon_prop: null,
    module_view: true,
    cycle_view: true,
    issue_views_view: true,
    page_view: true,
    inbox_view: false,
    cover_image: null,
    archive_in: 0,
    close_in: 0,
    created_by: "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    updated_by: "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    workspace: "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
    default_assignee: null,
    project_lead: "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    estimate: null,
    default_state: null,
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("listProjects should call planeClient with correct parameters", async () => {
    const mockProjectsList: Project[] = [mockProjectData];
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockProjectsList);

    const result = await projectService.listProjects();

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(`/workspaces/${WORKSPACE_SLUG}/projects`, "GET");
    expect(result).toEqual(createSuccessResponse(mockProjectsList));
  });

  it("getProject should call planeClient with correct parameters", async () => {
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockProjectData);

    const params = { project_id: mockProjectId };
    const result = await projectService.getProject(params);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(
      `/workspaces/${WORKSPACE_SLUG}/projects/${mockProjectId}`,
      "GET",
    );
    expect(result).toEqual(createSuccessResponse(mockProjectData));
  });

  it("createProject should call planeClient with correct parameters", async () => {
    const payload: CreateProjectPayload = {
      name: "New Test Project",
      identifier: "NEWPROJ",
      network: 0,
    };
    const mockCreatedProject = { ...mockProjectData, ...payload, id: "new-proj-123" };
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockCreatedProject);

    const result = await projectService.createProject(payload);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(
      `/workspaces/${WORKSPACE_SLUG}/projects`,
      "POST",
      payload,
    );
    expect(result).toEqual(createSuccessResponse(mockCreatedProject));
  });

  it("updateProject should call planeClient with correct parameters", async () => {
    const payload: UpdateProjectPayload = {
      project_id: mockProjectId,
      name: "Updated Project Name",
      description: "New Desc",
    };
    const mockUpdatedProject = {
      ...mockProjectData,
      name: payload.name,
      description: payload.description,
    };
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockUpdatedProject);

    const result = await projectService.updateProject(payload);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(
      `/workspaces/${WORKSPACE_SLUG}/projects/${mockProjectId}`,
      "PATCH",
      { name: payload.name, description: payload.description },
    );
    expect(result).toEqual(createSuccessResponse(mockUpdatedProject));
  });

  it("deleteProject should call planeClient with correct parameters", async () => {
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    const params = { project_id: mockProjectId };
    const result = await projectService.deleteProject(params);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(
      `/workspaces/${WORKSPACE_SLUG}/projects/${mockProjectId}`,
      "DELETE",
    );
    expect(result).toEqual(createSuccessResponse({ message: "Project successfully deleted" }));
  });

  it("should handle errors properly", async () => {
    const errorMessage = "API Error";
    (planeClient as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage));

    const result = await projectService.listProjects();

    expect(result).toEqual({
      content: [{ type: "text", text: errorMessage }],
      isError: true,
    });
  });
});
