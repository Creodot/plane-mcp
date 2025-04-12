export enum Priority {
  urgent = "urgent",
  high = "high",
  medium = "medium",
  low = "low",
  none = "none",
}

export interface State {
  id: string;
  name: string;
  color: string;
  group: string;
}

export interface User {
  id: string;
  display_name: string;
  avatar: string | null;
}

export interface Label {
  id: string;
  name: string;
  color: string | null;
}

export interface IssueBase {
  name: string;
  description: string | null;
  description_html: string | null;
  priority: Priority | null;
  state: string;
  assignees: string[];
  labels: string[];
  parent: string | null;
}

export interface Issue extends IssueBase {
  id: string;
  state_detail: State | null;
  project: string;
  workspace: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  assignee_details: User[] | null;
  label_details: Label[] | null;
}

export type CreateIssuePayload = {
  name: string;
  description?: string | null;
  description_html?: string | null;
  priority?: Priority | null;
  state?: string | null;
  assignees?: string[];
  labels?: string[];
  parent?: string | null;
  project: string;
};

export type UpdateIssuePayload = Partial<Omit<IssueBase, "state">> & {
  state?: string | null;
};
