export interface Project {
  id: string;
  total_members: number;
  total_cycles: number;
  total_modules: number;
  is_member: boolean;
  member_role: number; // Consider defining an enum for roles if known (e.g., 20 = Admin?)
  is_deployed: boolean;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  description_text: string | null;
  description_html: string | null;
  network: number; // 0 = Secret, 2 = Public
  identifier: string;
  emoji: string | null;
  icon_prop: Record<string, unknown> | null; // Use a more specific type if the structure is known
  module_view: boolean;
  cycle_view: boolean;
  issue_views_view: boolean;
  page_view: boolean;
  inbox_view: boolean;
  cover_image: string | null;
  archive_in: number;
  close_in: number;
  created_by: string;
  updated_by: string;
  workspace: string;
  default_assignee: string | null;
  project_lead: string | null;
  estimate: string | null;
  default_state: string | null;
}

export type CreateProjectPayload = {
  name: string;
  identifier: string;
  description?: string;
  network?: number; // 0 = Secret, 2 = Public
  emoji?: string | null;
  icon_prop?: Record<string, unknown> | null;
  module_view?: boolean;
  cycle_view?: boolean;
  issue_views_view?: boolean;
  page_view?: boolean;
  inbox_view?: boolean;
  cover_image?: string | null;
  archive_in?: number;
  close_in?: number;
  default_assignee?: string | null;
  project_lead?: string | null;
  estimate?: string | null;
  default_state?: string | null;
};

export type UpdateProjectPayload = Partial<CreateProjectPayload>;
