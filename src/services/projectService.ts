import { apiClient } from "@/lib/apiClient";
import { DeveloperProfile, PagedResponse, Project } from "@/types";
import { ProjectBid } from "@/types/projectBid";

export async function createProject(project: Project) {
  return apiClient<unknown>(`/projects`, {
    method: "POST",
    body: project,
  });
}

export async function updateProject(projectId: string, project: Project) {
  return apiClient<unknown>(`/projects/${projectId}`, {
    method: "PUT",
    body: project,
  });
}

export async function getProjects(page = 1, pageSize = 10, status?: string) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  if (status) {
    params.set("status", status);
  }

  return apiClient<PagedResponse<Project, "projects">>(`/projects/?${params.toString()}`, {
    method: "GET",
  });
}

export async function getProjectById(projectId: string) {
  return apiClient<Project>(`/projects/${projectId}`, {
    method: "GET",
  });
}

export async function getDevelopersAssignedToProject(projectId: string) {
  return apiClient<DeveloperProfile[]>(`/projects/${projectId}/developers`, {
    method: "GET",
  });
}

export async function getProjectBids(projectId: string) {
  return apiClient<ProjectBid[], "bids">(`/projects/${projectId}/bids`, {
    method: "GET",
  });
}

export async function publishProjectRequest(projectId: string) {
  return apiClient<Project>(`/projects/${projectId}/publish`, {
    method: "POST",
  });
}

export async function deleteProjectRequest(projectId: string) {
  return apiClient<Project>(`/projects/${projectId}`, {
    method: "DELETE",
  });
}

export async function approveProjectRequest(projectId: string, reason: string = "") {
  return apiClient<Project>(`/admin/projects/${projectId}/approve`, {
    method: "POST",
    body: {
        "approved": true,
        "rejection_reason": reason
    }
  })
}

export async function updateProjectStatusRequest(projectId: string, status: string) {
  return apiClient<Project>(`/projects/${projectId}`, {
    method: "PUT",
    body: { status: status },
  });
}

export async function updateProjectVisibilityRequest(projectId: string, visibility: string) {
  return apiClient<Project>(`/projects/${projectId}/visibility`, { 
    method: "PATCH",
    body: { visibility: visibility },
  });
}
