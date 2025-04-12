#!/usr/bin/env node

import { z } from "zod";

// Custom validation error class
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// Basic content schema for tool responses
export const ContentSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

// Tool response schema
export const ToolResponseSchema = z.object({
  content: z.array(ContentSchema),
  isError: z.boolean(),
});

// Generic error response generator
export const createErrorResponse = (message: string) => ({
  content: [{ type: "text" as const, text: message }],
  isError: true,
});

// Generic success response generator
export const createSuccessResponse = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  isError: false,
});

// Helper function to validate with Zod and throw an error if validation fails
export function validateWithSchema<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(`Validation error: ${result.error.message}`);
  }
  return result.data;
}
