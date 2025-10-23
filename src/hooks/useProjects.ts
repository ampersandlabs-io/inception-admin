import { useEffect, useState, useCallback } from "react";
import { deleteProjectRequest, getDevelopersAssignedToProject, getProjectById, getProjects, publishProjectRequest } from "@/services/projectService";
import { DeveloperProfile, Project } from "@/types";

export function useProjects() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [projectSquads, setProjectSquads] = useState<DeveloperProfile[]>([]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const projectsData = await getProjects();
      console.log(`${JSON.stringify(projectsData)}`);
      setProjects(projectsData.projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjectById = useCallback(async (projectId: string) => {
    setLoading(true);
    try {
      const project = await getProjectById(projectId);
      setSelectedProject(project);
    } catch (error) {
      console.error(`Failed to fetch project with id ${projectId}:`, error);
      setSelectedProject(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDevelopersAssignedToProject = useCallback(async (projectId: string) => {
    setLoading(true);
    try {
      const projectSquads = await getDevelopersAssignedToProject(projectId);
      setProjectSquads(projectSquads);
    } catch (error) {
      console.error(`Failed to fetch squads for project with id ${projectId}:`, error);
      setProjectSquads([]);
    } finally {
      setLoading(false);
    }
  }, [])

  const publishProject = useCallback(async (projectId: string) => {
    try {
      await publishProjectRequest(projectId);
      setProjects(prev =>
        prev.map(p =>
          p.id === projectId ? { ...p, status: "ACTIVE" } : p
        )
      );
    } catch (error) {
      console.error("Failed to publish project:", error);
    }
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      await deleteProjectRequest(projectId); // ✅ create this API fn in services
      await fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }, [fetchProjects]);

  const editProject = useCallback((projectId: string) => {
    // navigation usually happens here — do NOT do API here.
    // we just expose it for UI
    // router.push(`/projects/${projectId}/edit`)
    console.log("Edit project:", projectId);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    selectedProject,
    refreshProjects: fetchProjects,
    getProjectById: fetchProjectById,
  
    projectSquads,
    fetchDevelopersAssignedToProject,

    publishProject,
    deleteProject,
    editProject,
  };
}