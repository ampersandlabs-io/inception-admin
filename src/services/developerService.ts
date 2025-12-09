import { apiClient } from "@/lib/apiClient";
import { DeveloperProfile, PagedResponse } from "@/types";

export async function getDevelopers(page = 1, pageSize = 10) {
  return apiClient<PagedResponse<DeveloperProfile, "items">>(`/admin/developers?page=${page}&page_size=${pageSize}`, {
    method: "GET",
  });
}

export async function getDeveloperById(developerId: string) {
  return apiClient<DeveloperProfile>(`/admin/developers/${developerId}/`, {
    method: "GET",
  });
}

export async function approveDeveloper(
  developerId: string,
  reason: string,
  notes: string
) {
  return apiClient<unknown>(`/admin/developers/${developerId}/approve/`, {
    method: "POST",
    body: { reason: reason, notes: notes },
  });
}

export async function rejectDeveloper(
  developerId: string,
  reason: string,
  notes: string
) {
  return apiClient<unknown>(`/admin/developers/${developerId}/approve/`, {
    method: "POST",
    body: { reason: reason, notes: notes },
  });
}

export async function createDeveloper(
  data: string
) {
  return apiClient<unknown>(`/admin/developers/`, {
    method: "POST",
    body: data,
  });
}

export async function updateDeveloper(developerId: string, data: DeveloperProfile) {
  return apiClient<unknown>(`/projects/${developerId}/`, {
    method: "PUT",
    body: data,
  });
}
