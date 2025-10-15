import { useEffect, useState, useCallback } from "react";
import { getDevelopersAssignedToProject, getProjectById, getProjects } from "@/services/projectService";
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
    fetchDevelopersAssignedToProject
  };
}