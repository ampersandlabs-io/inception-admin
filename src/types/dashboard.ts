export interface DashboardStats {
  total_users: number;
  total_projects: number;
  total_companies: number;
  total_developers: number;

  users_by_type: Record<string, string>[];
  projects_by_status: Record<string, string>[];
  projects_by_category: Record<string, string>[];
  budget_distribution: Record<string, string>[];
  popular_tech_stacks: Record<string, string>[];
  new_users_timeline: Record<string, string>[];
  new_projects_timeline: Record<string, string>[];
  recent_activities: Record<string, string>[];
  companies_by_size: Record<string, string>[];
  companies_by_type: Record<string, string>[];

  total_project_value: number;
  average_project_value: number;
  growth_rate_users: number;
  growth_rate_projects: number;
  active_projects_count: number;
  pending_projects_count: number;
  completed_projects_count: number;

  generated_at: string;
}
