import { z } from "zod";

// Simple project ID schema
export const ProjectIdSchema = z.object({
  project_id: z.string().uuid(),
});

// Base Project Validation Schema
export const ProjectBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  identifier: z.string().min(1, "Identifier is required"),
  description: z.string().optional(),
  network: z.number().int().min(0).max(2).optional(),
  emoji: z.string().nullable().optional(),
  icon_prop: z.record(z.unknown()).nullable().optional(),
  module_view: z.boolean().optional(),
  cycle_view: z.boolean().optional(),
  issue_views_view: z.boolean().optional(),
  page_view: z.boolean().optional(),
  inbox_view: z.boolean().optional(),
  archive_in: z.number().int().min(0).max(12).optional(),
  close_in: z.number().int().min(0).max(12).optional(),
  default_assignee: z.string().uuid().nullable().optional(),
  project_lead: z.string().uuid().nullable().optional(),
  estimate: z.string().uuid().nullable().optional(),
  default_state: z.string().uuid().nullable().optional(),
});

// Project Creation Schema (for API)
export const CreateProjectSchema = ProjectBaseSchema;

// Project Update Schema (for API)
export const UpdateProjectSchema = ProjectBaseSchema.partial().extend({
  project_id: z.string().uuid(),
});

// Response schema for Project API responses
export const ProjectResponseSchema = ProjectBaseSchema.extend({
  id: z.string().uuid(),
  total_members: z.number().int(),
  total_cycles: z.number().int(),
  total_modules: z.number().int(),
  is_member: z.boolean(),
  member_role: z.number().int(),
  is_deployed: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
  updated_by: z.string().uuid(),
  workspace: z.string().uuid(),
});

// Tool argument schemas
export const CreateProjectArgsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  identifier: z.string().min(1, "Identifier is required"),
  description: z.string().optional(),
  network: z.number().int().min(0).max(2).optional(),
  emoji: z.string().nullable().optional(),
  module_view: z.boolean().optional(),
  cycle_view: z.boolean().optional(),
  issue_views_view: z.boolean().optional(),
  page_view: z.boolean().optional(),
  inbox_view: z.boolean().optional(),
});

export const UpdateProjectArgsSchema = z.object({
  project_id: z.string().uuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  network: z.number().int().min(0).max(2).optional(),
  emoji: z.string().nullable().optional(),
  module_view: z.boolean().optional(),
  cycle_view: z.boolean().optional(),
  issue_views_view: z.boolean().optional(),
  page_view: z.boolean().optional(),
  inbox_view: z.boolean().optional(),
});
