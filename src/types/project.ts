import { Company } from "./company";
import { ProjectType, ReferenceData, Scope, TechStack } from "./reference";

export interface Project {
  id: string;
  title: string;
  code_name: string;
  description: string;
  status: string;
  category?: ReferenceData;
  scope?: Scope;
  experience_level?: {
    id: string,
    name: string
  };
  budget_type: ReferenceData;
  budget_amount?: number;
  budget_currency?: string;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  currency: string;
  tech_stack?: string[];
  project_types?: ProjectType[];
  client_id: string;
  company_id?: number;
  company: Company
  attachments?: string[];
  is_featured: boolean;
  is_urgent: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  deadline?: string;
  bid_count?: number;
  tech_stacks: TechStack[];
}
