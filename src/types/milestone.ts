export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  due_date: string;
  description: string;
  amount: number;
  progress: number;
  budget_allocation: string;
  currency: string;
  status: "pending" | "in_progress" | "completed" | "approved";
  status_id: number;
  status_name: string;
  assigned_to: string;
  created_at: string;
  updated_at: string;
  order_index: number;
  created_by: string;
  delivered_at: string,
  approved_at: string,
  tasks: any[],
  deliverables: any[],
  comments: any[]
}
