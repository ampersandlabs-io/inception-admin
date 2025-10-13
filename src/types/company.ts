import { BusinessType, CompanySize } from "./reference";

export interface Company {
  id: string;
  name: string;
  owner_id: string;
  size?: CompanySize;
  business_type: BusinessType;
  business_type_id?: number;
  location_country?: string;
  location_state?: string;
  city?: string;
  website?: string;
  description?: string;
  logo_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}
