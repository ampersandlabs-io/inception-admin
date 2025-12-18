export interface Task {
    id: string;
    milestone_id: string;
    project_id: string;
    title: string;
    description: string;
    status: string;
    priority_id: number;
    priority_name: string;
    assigned_to: string | null;
    order_index: number;
    due_date: string | null;
    started_at: string | null;
    completed_at: string | null;
    is_blocked: boolean;
    blocked_reason: string | null;
    created_at: string;
    updated_at: string;
    created_by: string;
  }