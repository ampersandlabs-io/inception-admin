import { apiClient } from "@/lib/apiClient";
import { PagedResponse, Project } from "@/types";

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

export async function getProjects() {
  return apiClient<PagedResponse<Project, "projects">>(`/projects/`, {
    method: "GET",
  });
}
