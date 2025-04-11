// Based on Plane.so API documentation (might need adjustments)

export interface PlaneIssue {
  id: string;
  name: string;
  description: string | null; // Or use description_html if preferred
  description_html: string | null;
  priority: string | null; // e.g., "urgent", "high", "medium", "low", "none"
  state: string; // Refers to state id
  state_detail: PlaneState | null; // Assuming we fetch state details
  project: string; // Project ID
  workspace: string; // Workspace ID
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  created_by: string; // User ID
  updated_by: string; // User ID
  assignees: string[]; // Array of user IDs
  assignee_details: PlaneUser[] | null; // Assuming we fetch user details
  labels: string[]; // Array of label IDs
  label_details: PlaneLabel[] | null; // Assuming we fetch label details
  parent: string | null; // Parent issue ID
  // Add other relevant fields as needed from the API docs
  // e.g., estimate_point, start_date, target_date, sequence_id, etc.
}

// Basic interfaces for related entities (expand as needed)
export interface PlaneState {
  id: string;
  name: string;
  color: string;
  group: string; // e.g., "backlog", "unstarted", "started", "completed", "cancelled"
  // ... other state fields
}

export interface PlaneUser {
  id: string;
  display_name: string;
  avatar: string | null;
  // ... other user fields
}

export interface PlaneLabel {
  id: string;
  name: string;
  color: string | null;
  // ... other label fields
}

// Interface for creating an issue
export interface CreatePlaneIssuePayload {
  name: string;
  description?: string | null;
  description_html?: string | null;
  priority?: string | null;
  state?: string | null; // Allow null
  assignees?: string[];
  labels?: string[];
  parent?: string | null;
  project: string; // Required according to API docs for creation
  // Add other create-specific fields if necessary
}

// Interface for updating an issue
export interface UpdatePlaneIssuePayload {
  name?: string;
  description?: string | null;
  description_html?: string | null;
  priority?: string | null;
  state?: string | null; // Allow null
  assignees?: string[];
  labels?: string[];
  parent?: string | null;
  // Add other update-specific fields
} 