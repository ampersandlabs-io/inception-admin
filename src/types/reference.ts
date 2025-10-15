export interface ReferenceData {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface CompanySize extends ReferenceData {
  employee_range?: string;
  size_range: string,
  display_name : string,
  is_active: true,
  created_at: string,
  updated_at: string
}
export interface BusinessType extends ReferenceData {
  category?: string;
}

export interface TechStack extends ReferenceData {
  category?: string;
  popularity_score?: number;
}

export interface ProjectType extends ReferenceData {
}

export interface Scope extends ReferenceData {
  display_name: string;
}

