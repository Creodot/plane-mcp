import { z } from "zod";
import { Priority } from "../types/issue.types.js";

export const IssueIdentifierSchema = z.object({
  workspace_slug: z.string().describe("The slug of the workspace containing the project."),
  project_id: z.string().describe("The ID of the project containing the issue."),
  issue_id: z.string().describe("The ID of the issue."),
});

export const CreatePlaneIssuePayloadSchema = z.object({
  name: z.string().min(1).describe("The name of the issue."),
  description: z.string().nullish().describe("The description of the issue (plain text)."),
  description_html: z.string().nullish().describe("The description of the issue (HTML)."),
  priority: z.nativeEnum(Priority).nullish().optional().describe("The priority of the issue."),
  state: z
    .string()
    .uuid()
    .nullish()
    .optional()
    .describe("The ID of the state to assign the issue to."),
  assignees: z
    .array(z.string().uuid())
    .optional()
    .describe("An array of user IDs to assign to the issue."),
  labels: z
    .array(z.string().uuid())
    .optional()
    .describe("An array of label IDs to assign to the issue."),
  parent: z.string().uuid().nullish().describe("The ID of the parent issue."),
});

export const CreateIssueToolSchema = z.object({
  workspace_slug: z.string().describe("The slug of the workspace containing the project."),
  project_id: z.string().describe("The ID of the project where the issue will be created."),
  payload: CreatePlaneIssuePayloadSchema.describe("The data for the new issue."),
});

export const UpdatePlaneIssuePayloadSchema = z.object({
  name: z.string().min(1).optional().describe("The new name for the issue."),
  description: z
    .string()
    .nullish()
    .optional()
    .describe("The new description for the issue (plain text)."),
  description_html: z
    .string()
    .nullish()
    .optional()
    .describe("The new description for the issue (HTML)."),
  priority: z.nativeEnum(Priority).nullish().optional().describe("The new priority for the issue."),
  state: z.string().uuid().nullish().optional().describe("The new state ID for the issue."),
  assignees: z.array(z.string().uuid()).optional().describe("The new array of assigned user IDs."),
  labels: z.array(z.string().uuid()).optional().describe("The new array of assigned label IDs."),
  parent: z.string().uuid().nullish().optional().describe("The new parent issue ID."),
});

export const UpdateIssueToolSchema = IssueIdentifierSchema.extend({
  payload: UpdatePlaneIssuePayloadSchema.describe("The data to update the issue with."),
});

export type ZodSchemaType<T extends z.ZodTypeAny> = z.infer<T>;
