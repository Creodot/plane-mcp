import { z } from "zod";

// Schema for identifying a workspace, used in several project operations
export const WorkspaceIdentifierSchema = z.object({
  workspace_slug: z.string().describe("The slug of the workspace."),
});

// Schema for identifying a specific project within a workspace
export const ProjectIdentifierSchema = WorkspaceIdentifierSchema.extend({
  project_id: z.string().uuid().describe("The unique ID of the project."),
});

// Schema for the payload when creating a new project
export const CreatePlaneProjectPayloadSchema = z.object({
  name: z.string().min(1).describe("The name of the project (required)."),
  identifier: z
    .string()
    .min(1)
    .describe("Unique identifier for the project within the workspace (required)."),
  description: z.string().optional().describe("The description of the project."),
  network: z
    .union([z.literal(0), z.literal(2)])
    .optional()
    .describe("Project network type: 0 for Secret, 2 for Public."),
  emoji: z.string().nullish().optional().describe("HTML emoji DEX code without the '&#'."),
  icon_prop: z.record(z.unknown()).nullish().optional().describe("Data for the project icon."),
  module_view: z.boolean().optional().describe("Enable/disable module view in UI."),
  cycle_view: z.boolean().optional().describe("Enable/disable cycle view in UI."),
  issue_views_view: z.boolean().optional().describe("Enable/disable project views in UI."),
  page_view: z.boolean().optional().describe("Enable/disable pages view in UI."),
  inbox_view: z.boolean().optional().describe("Enable/disable inbox view in UI."),
  cover_image: z.string().url().nullish().optional().describe("URL for the project cover image."),
  archive_in: z
    .number()
    .int()
    .min(0)
    .max(12)
    .optional()
    .describe("Months to auto-archive issues (0-12)."),
  close_in: z
    .number()
    .int()
    .min(0)
    .max(12)
    .optional()
    .describe("Months to auto-close issues (0-12)."),
  default_assignee: z.string().uuid().nullish().optional().describe("Default assignee user ID."),
  project_lead: z.string().uuid().nullish().optional().describe("Project lead user ID."),
  estimate: z.string().uuid().nullish().optional().describe("Estimate ID for the project."),
  default_state: z
    .string()
    .uuid()
    .nullish()
    .optional()
    .describe("Default state ID for auto-closed issues."),
});

// Schema for the complete tool input when creating a project
export const CreateProjectToolSchema = WorkspaceIdentifierSchema.extend({
  payload: CreatePlaneProjectPayloadSchema.describe("The data for the new project."),
});

// Schema for the payload when updating an existing project (all fields are optional)
export const UpdatePlaneProjectPayloadSchema = CreatePlaneProjectPayloadSchema.partial();

// Schema for the complete tool input when updating a project
export const UpdateProjectToolSchema = ProjectIdentifierSchema.extend({
  payload: UpdatePlaneProjectPayloadSchema.describe("The data to update the project with."),
});

export type ZodSchemaType<T extends z.ZodTypeAny> = z.infer<T>;
