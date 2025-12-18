import { apiClient } from "@/lib/apiClient";
import { Milestone } from "@/types";

export async function approveMilestoneRequest(
    milestoneId: string,
  ) {
    return apiClient<Milestone>(`/milestones/${milestoneId}/approve`, {
      method: "GET"
    });
  }
  
  export async function milestoneChangesRequest(
    milestoneId: string,
  ) {
    return apiClient<Milestone>(`/milestones/${milestoneId}/request-changes`, {
      method: "GET"
    });
  }