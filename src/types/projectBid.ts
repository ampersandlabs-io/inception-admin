import { DeveloperProfile } from "./developer";

export interface ProjectBid {
    id: string;
    name: string;
    project_id: string;
    developer_id: string;
    proposed_hourly_rate: string;
    proposed_fixed_price: string;
    estimated_hours: number;
    estimated_duration_days: number;
    cover_letter: string;
    status: string;
    submitted_at: string;
    reviewed_at: string;
    approved_at: string;
    rejected_at: string;
    reviewed_by: string;
    rejection_reason: string;
    client_message: string;
    developer: DeveloperProfile;
    created_at: string;
    updated_at: string;
  }