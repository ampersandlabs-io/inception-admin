import { PagedResponse } from "@/types";
import { apiClient } from "@lib/apiClient";

export async function fetchReference(key: string) {
  return apiClient<PagedResponse<unknown>>(`/admin/reference/${key}`, {
    method: "GET",
  });
}

export async function createReference(key: string, referenceData: object) {
  return apiClient<unknown>(`/admin/reference/${key}`, {
    method: "POST",
    body: referenceData,
  });
}
