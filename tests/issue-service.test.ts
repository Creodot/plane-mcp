import { planeClient } from "@/plane-client.js";
import { createSuccessResponse } from "@/schemas/tools.schema.js";
import { issueService } from "@/services/issue.service.js";
import type { CreateIssuePayload, Issue, UpdateIssuePayload } from "@/types/issue.types.js";
import { Priority } from "@/types/issue.types.js";
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

describe("IssueService", () => {
  const mockProjectId = "4af68566-94a4-4eb3-94aa-50dc9427067b";
  const mockIssueId = "e1c25c66-5bb8-465e-a818-92a483423443";

  const mockIssue: Issue = {
    id: mockIssueId,
    name: "First Issue",
    description: "Issue description",
    description_html: "<p>Issue description</p>",
    priority: Priority.medium,
    state: "f3f045db-7e74-49f2-b3b2-0b7dee4635ae",
    state_detail: null,
    project: mockProjectId,
    workspace: "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
    created_at: "2023-11-19T11:56:55.176802Z",
    updated_at: "2023-11-19T11:56:55.176809Z",
    created_by: "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    updated_by: "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    assignees: ["797b5aea-3f40-4199-be84-5f94e0d04501"],
    assignee_details: [],
    labels: [],
    label_details: [],
    parent: null,
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getIssue should call planeClient with correct parameters", async () => {
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockIssue);

    const result = await issueService.getIssue(mockIssueId);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(`/issues/${mockIssueId}`, "GET");
    expect(result).toEqual(createSuccessResponse(mockIssue));
  });

  it("createIssue should call planeClient with correct parameters", async () => {
    const payload: CreateIssuePayload = {
      name: "New Issue",
      project: mockProjectId,
    };
    const mockCreatedIssue: Issue = {
      ...mockIssue,
      id: "new-issue-789",
      name: "New Issue",
    };
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockCreatedIssue);

    const result = await issueService.createIssue(payload);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith("/issues", "POST", payload);
    expect(result).toEqual(createSuccessResponse(mockCreatedIssue));
  });

  it("updateIssue should call planeClient with correct parameters", async () => {
    const payload: UpdateIssuePayload = {
      issue_id: mockIssueId,
      name: "Updated Issue Name",
    };
    const mockUpdatedIssue: Issue = {
      ...mockIssue,
      name: "Updated Issue Name",
    };
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(mockUpdatedIssue);

    const result = await issueService.updateIssue(payload);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(`/issues/${mockIssueId}`, "PATCH", {
      name: payload.name,
    });
    expect(result).toEqual(createSuccessResponse(mockUpdatedIssue));
  });

  it("deleteIssue should call planeClient with correct parameters", async () => {
    (planeClient as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

    const result = await issueService.deleteIssue(mockProjectId, mockIssueId);

    expect(planeClient).toHaveBeenCalledTimes(1);
    expect(planeClient).toHaveBeenCalledWith(
      `/projects/${mockProjectId}/issues/${mockIssueId}`,
      "DELETE",
    );
    expect(result).toEqual(createSuccessResponse({ message: "Issue successfully deleted" }));
  });

  it("should handle errors properly", async () => {
    const errorMessage = "API Error";
    (planeClient as ReturnType<typeof vi.fn>).mockRejectedValue(new Error(errorMessage));

    const result = await issueService.getIssue(mockIssueId);

    expect(result).toEqual({
      content: [{ type: "text", text: errorMessage }],
      isError: true,
    });
  });
});
