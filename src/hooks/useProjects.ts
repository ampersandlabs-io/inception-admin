import { useEffect, useState, useCallback } from "react";
import { deleteProjectRequest, getProjectById, getProjects, publishProjectRequest, updateProjectStatusRequest } from "@/services/projectService";
import { Project } from "@/types";

export function useProjects(page: number = 1, pageSize: number = 9, status?: string) {

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [totalItems, setTotalItems] = useState(0);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const projectsData = await getProjects(page, pageSize, status);
      console.log(`${JSON.stringify(projectsData)}`);
      setProjects(projectsData.projects);
      setTotalItems(projectsData.total);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, status]);

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

  const approveProject = useCallback(async (projectId: string) => {
    try {
      // await approveProjectRequest(projectId);
      await updateProjectStatusRequest(projectId, "PENDING")
      setProjects(prev =>
        prev.map(p =>
          p.id === projectId ? { ...p, status: "PENDING" } : p
        )
      );
    } catch (error) {
      console.error("Failed to publish project:", error);
    }
  }, [])

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
    totalItems,
    selectedProject,
    refreshProjects: fetchProjects,
    getProjectById: fetchProjectById,
  
    publishProject,
    approveProject,
    deleteProject,
    editProject,
  };
}