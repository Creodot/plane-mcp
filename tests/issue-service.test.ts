import { beforeEach, describe, expect, it, vi } from "vitest";
import { issueService } from "../src/services/issue-service.js";
import { planeClient } from "../src/services/plane-client.js";
import type {
  CreatePlaneIssuePayload,
  PlaneIssue,
  UpdatePlaneIssuePayload,
} from "../src/types/plane-types.js";

// Mock the planeClient
vi.mock("../src/services/plane-client.js", () => ({
  planeClient: {
    request: vi.fn(),
  },
}));

describe("IssueService", () => {
  const mockWorkspaceSlug = "test-workspace";
  const mockProjectId = "proj-123";
  const mockIssueId = "issue-456";

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getIssue should call planeClient.request with correct parameters", async () => {
    const mockIssue: PlaneIssue = {
      id: mockIssueId,
      name: "Test Issue",
      description: "Desc",
      description_html: "<p>Desc</p>",
      priority: "medium",
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: mockWorkspaceSlug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "user-1",
      updated_by: "user-1",
      assignees: [],
      assignee_details: [],
      labels: [],
      label_details: [],
      parent: null,
    };
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockIssue,
    );

    const result = await issueService.getIssue(
      mockWorkspaceSlug,
      mockProjectId,
      mockIssueId,
    );

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects/{project_id}/issues/{issue_id}",
      { method: "GET" },
      {
        workspace_slug: mockWorkspaceSlug,
        project_id: mockProjectId,
        issue_id: mockIssueId,
      },
    );
    expect(result).toEqual(mockIssue);
  });

  it("createIssue should call planeClient.request with correct parameters", async () => {
    const payload: CreatePlaneIssuePayload = {
      name: "New Issue",
      project: mockProjectId,
    };
    const mockCreatedIssue: PlaneIssue = {
      id: "new-issue-789",
      name: "New Issue",
      description: null,
      description_html: null,
      priority: null,
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: mockWorkspaceSlug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "user-1",
      updated_by: "user-1",
      assignees: [],
      assignee_details: [],
      labels: [],
      label_details: [],
      parent: null,
    };
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockCreatedIssue,
    );

    const result = await issueService.createIssue(
      mockWorkspaceSlug,
      mockProjectId,
      payload,
    );

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects/{project_id}/issues",
      {
        method: "POST",
        body: JSON.stringify(payload), // Service ensures project is in payload
      },
      { workspace_slug: mockWorkspaceSlug, project_id: mockProjectId },
    );
    expect(result).toEqual(mockCreatedIssue);
  });

  it("createIssue should add project ID to payload if missing", async () => {
    const payload: Omit<CreatePlaneIssuePayload, "project"> = {
      name: "New Issue No Project",
    }; // Project missing
    const expectedPayloadWithProject: CreatePlaneIssuePayload = {
      ...payload,
      project: mockProjectId,
    };
    const mockCreatedIssue: PlaneIssue = {
      id: "new-issue-789",
      name: "New Issue No Project",
      description: null,
      description_html: null,
      priority: null,
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: mockWorkspaceSlug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "user-1",
      updated_by: "user-1",
      assignees: [],
      assignee_details: [],
      labels: [],
      label_details: [],
      parent: null,
    };
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockCreatedIssue,
    );

    await issueService.createIssue(
      mockWorkspaceSlug,
      mockProjectId,
      payload as CreatePlaneIssuePayload,
    );

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects/{project_id}/issues",
      {
        method: "POST",
        body: JSON.stringify(expectedPayloadWithProject), // Check if project was added
      },
      { workspace_slug: mockWorkspaceSlug, project_id: mockProjectId },
    );
  });

  it("updateIssue should call planeClient.request with correct parameters", async () => {
    const payload: UpdatePlaneIssuePayload = { name: "Updated Issue Name" };
    const mockUpdatedIssue: PlaneIssue = {
      id: mockIssueId,
      name: "Updated Issue Name",
      description: "Desc",
      description_html: "<p>Desc</p>",
      priority: "medium",
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: mockWorkspaceSlug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: "user-1",
      updated_by: "user-1",
      assignees: [],
      assignee_details: [],
      labels: [],
      label_details: [],
      parent: null,
    };
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockUpdatedIssue,
    );

    const result = await issueService.updateIssue(
      mockWorkspaceSlug,
      mockProjectId,
      mockIssueId,
      payload,
    );

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/{workspace_slug}/projects/{project_id}/issues/{issue_id}",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      {
        workspace_slug: mockWorkspaceSlug,
        project_id: mockProjectId,
        issue_id: mockIssueId,
      },
    );
    expect(result).toEqual(mockUpdatedIssue);
  });
});
