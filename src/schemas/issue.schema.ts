#!/usr/bin/env node

import { Priority } from "@/types/issue.types.js";
import { z } from "zod";

// Simple issue ID schema
export const IssueIdSchema = z.object({
  issue_id: z.string().uuid(),
});

// Combined project and issue ID schema
export const ProjectAndIssueIdSchema = z.object({
  project_id: z.string().uuid(),
  issue_id: z.string().uuid(),
});

// Define Priority enum as a Zod enum
export const PriorityEnum = z.nativeEnum(Priority);

// Base Issue Validation Schema
export const IssueBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
  description_html: z.string().nullable().optional(),
  priority: PriorityEnum.nullable().optional(),
  state: z.string().uuid().nullable().optional(),
  assignees: z.array(z.string().uuid()).optional(),
  labels: z.array(z.string().uuid()).optional(),
  parent: z.string().uuid().nullable().optional(),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  target_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

// Issue Creation Schema
export const CreateIssueSchema = IssueBaseSchema.extend({
  project: z.string().uuid(),
});

// Issue Update Schema
export const UpdateIssueSchema = IssueBaseSchema.partial().extend({
  issue_id: z.string().uuid(),
});

// Response schema for Issue API responses
export const IssueResponseSchema = IssueBaseSchema.extend({
  id: z.string().uuid(),
  sequence_id: z.number().int(),
  sort_order: z.number(),
  completed_at: z.string().datetime().nullable(),
  archived_at: z.string().datetime().nullable(),
  is_draft: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
  updated_by: z.string().uuid(),
  project: z.string().uuid(),
  workspace: z.string().uuid(),
});

// Tool argument schemas
export const CreateIssueArgsSchema = z.object({
  project_id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
  description_html: z.string().nullable().optional(),
  priority: PriorityEnum.nullable().optional(),
  state: z.string().uuid().nullable().optional(),
  assignees: z.array(z.string().uuid()).optional(),
  labels: z.array(z.string().uuid()).optional(),
  parent: z.string().uuid().nullable().optional(),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  target_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

export const UpdateIssueArgsSchema = z.object({
  issue_id: z.string().uuid(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  description_html: z.string().nullable().optional(),
  priority: PriorityEnum.nullable().optional(),
  state: z.string().uuid().nullable().optional(),
  assignees: z.array(z.string().uuid()).optional(),
  labels: z.array(z.string().uuid()).optional(),
  parent: z.string().uuid().nullable().optional(),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  target_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});
