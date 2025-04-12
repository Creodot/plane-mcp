import { planeClient } from "@/plane-client";
import { issueService } from "@/services/issue.service";
import type { CreateIssuePayload, Issue, UpdateIssuePayload } from "@/types/issue.types";
import { Priority } from "@/types/issue.types";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the planeClient
vi.mock("@/plane-client", () => ({
  planeClient: {
    request: vi.fn(),
  },
}));

describe("IssueService", () => {
  const mockProjectId = "proj-123";
  const mockIssueId = "issue-456";

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getIssue should call planeClient.request with correct parameters", async () => {
    const mockIssue: Issue = {
      id: mockIssueId,
      name: "Test Issue",
      description: "Desc",
      description_html: "<p>Desc</p>",
      priority: Priority.medium,
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: "test-workspace",
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
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockIssue);

    const result = await issueService.getIssue(mockProjectId, mockIssueId);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/test-workspace/projects/{project_id}/issues/{issue_id}",
      { method: "GET" },
      {
        project_id: mockProjectId,
        issue_id: mockIssueId,
      },
    );
    expect(result).toEqual(mockIssue);
  });

  it("createIssue should call planeClient.request with correct parameters", async () => {
    const payload: CreateIssuePayload = {
      name: "New Issue",
      project: mockProjectId,
    };
    const mockCreatedIssue: Issue = {
      id: "new-issue-789",
      name: "New Issue",
      description: null,
      description_html: null,
      priority: null,
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: "test-workspace",
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
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockCreatedIssue);

    const result = await issueService.createIssue(mockProjectId, payload);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/test-workspace/projects/{project_id}/issues",
      {
        method: "POST",
        body: JSON.stringify(payload), // Service ensures project is in payload
      },
      { project_id: mockProjectId },
    );
    expect(result).toEqual(mockCreatedIssue);
  });

  it("createIssue should add project ID to payload if missing", async () => {
    const payload: Omit<CreateIssuePayload, "project"> = {
      name: "New Issue No Project",
    }; // Project missing
    const expectedPayloadWithProject: CreateIssuePayload = {
      ...payload,
      project: mockProjectId,
    };
    const mockCreatedIssue: Issue = {
      id: "new-issue-789",
      name: "New Issue No Project",
      description: null,
      description_html: null,
      priority: null,
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: "test-workspace",
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
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockCreatedIssue);

    await issueService.createIssue(mockProjectId, payload as CreateIssuePayload);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/test-workspace/projects/{project_id}/issues",
      {
        method: "POST",
        body: JSON.stringify(expectedPayloadWithProject), // Check if project was added
      },
      { project_id: mockProjectId },
    );
  });

  it("updateIssue should call planeClient.request with correct parameters", async () => {
    const payload: UpdateIssuePayload = { name: "Updated Issue Name" };
    const mockUpdatedIssue: Issue = {
      id: mockIssueId,
      name: "Updated Issue Name",
      description: "Desc",
      description_html: "<p>Desc</p>",
      priority: Priority.medium,
      state: "state-1",
      state_detail: null,
      project: mockProjectId,
      workspace: "test-workspace",
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
    (planeClient.request as ReturnType<typeof vi.fn>).mockResolvedValue(mockUpdatedIssue);

    const result = await issueService.updateIssue(mockProjectId, mockIssueId, payload);

    expect(planeClient.request).toHaveBeenCalledTimes(1);
    expect(planeClient.request).toHaveBeenCalledWith(
      "/workspaces/test-workspace/projects/{project_id}/issues/{issue_id}",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      },
      { project_id: mockProjectId, issue_id: mockIssueId },
    );
    expect(result).toEqual(mockUpdatedIssue);
  });
});
