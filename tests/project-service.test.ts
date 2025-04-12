import { beforeEach, describe, expect, it, vi } from "vitest";
import { planeClient } from "../src/plane-client.js";
import { projectService } from "../src/services/project.service.js";
import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from "../src/types/project.types.js";

// Mock the planeClient
vi.mock("../src/plane-client.js", () => ({
  planeClient: {
    request: vi.fn(),
  },
}));

describe("ProjectService", () => {
  const mockWorkspaceSlug = "test-workspace";
  const mockProjectId = "proj-789";
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
    created_by: "user-1",
    updated_by: "user-1",
    workspace: mockWorkspaceSlug,
    default_assignee: null,
    project_lead: "user-1",
    estimate: null,
    default_state: null,
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("listProjects should call planeClient.request with correct parameters", async () => {
    const mockProjectsList: Project[] = [mockProjectData];
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockProjectsList);

    const result = await projectService.listProjects(mockWorkspaceSlug);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects",
      { method: "GET" },
      { workspace_slug: mockWorkspaceSlug },
    );
    expect(result).toEqual(mockProjectsList);
  });

  it("getProject should call planeClient.request with correct parameters", async () => {
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockProjectData);

    const result = await projectService.getProject(mockWorkspaceSlug, mockProjectId);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects/{project_id}",
      { method: "GET" },
      {
        workspace_slug: mockWorkspaceSlug,
        project_id: mockProjectId,
      },
    );
    expect(result).toEqual(mockProjectData);
  });

  it("createProject should call planeClient.request with correct parameters", async () => {
    const payload: CreateProjectPayload = {
      name: "New Test Project",
      identifier: "NEWPROJ",
      network: 0,
    };
    const mockCreatedProject = { ...mockProjectData, ...payload, id: "new-proj-123" };
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockCreatedProject);

    const result = await projectService.createProject(mockWorkspaceSlug, payload);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { workspace_slug: mockWorkspaceSlug },
    );
    expect(result).toEqual(mockCreatedProject);
  });

  it("updateProject should call planeClient.request with correct parameters", async () => {
    const payload: UpdateProjectPayload = { name: "Updated Project Name", description: "New Desc" };
    const mockUpdatedProject = { ...mockProjectData, ...payload };
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockUpdatedProject);

    const result = await projectService.updateProject(mockWorkspaceSlug, mockProjectId, payload);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects/{project_id}",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      {
        workspace_slug: mockWorkspaceSlug,
        project_id: mockProjectId,
      },
    );
    expect(result).toEqual(mockUpdatedProject);
  });

  it("deleteProject should call planeClient.request with correct parameters", async () => {
    // Mock resolves to void/undefined for DELETE success
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    await projectService.deleteProject(mockWorkspaceSlug, mockProjectId);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects/{project_id}",
      { method: "DELETE" },
      {
        workspace_slug: mockWorkspaceSlug,
        project_id: mockProjectId,
      },
    );
  });
});
