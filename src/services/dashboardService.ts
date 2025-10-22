import { apiClient } from "@/lib/apiClient";
import { DashboardStats } from "@/types";

export async function getDashboardStats() {
  return apiClient<DashboardStats>(`/admin/analytics`, {
    method: "GET",
  });
}