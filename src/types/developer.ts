import { TechStack } from "./reference";

export interface DeveloperProfile {
    id: string;
    user_id: string;
    first_name?: string;
    role_name: string;
    last_name?: string;
    primary_role: string;
    years_experience: number;
    tech_stacks: TechStack[];
    github_username?: string;
    linkedin_url?: string;
    portfolio_url?: string;
    hourly_rate?: number;
    bio?: string;
    country?: string;
    availability_status: 'available' | 'busy' | 'not_available';
    vetting_status: 'pending' | 'approved' | 'rejected';
    vetting_notes?: string;
    years_of_experience?: string;
    completed_projects?:string;
    rating?:string;
    vetted_by?: string;
    vetted_at?: string;
    created_at: string;
    updated_at: string;
  }