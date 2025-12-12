import { useState, useCallback } from "react";
import { updateProjectVisibilityRequest } from "@/services/projectService";

export function useProjectSettings() {

  const [loading, setLoading] = useState(false);

  const updateProjectVisibility = useCallback(async (projectId: string, visibilty: string) => {
    setLoading(true);
    try {
      await updateProjectVisibilityRequest(projectId, visibilty);
    } catch (error) {
      console.error("Failed to update project visibilty:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // const fetchProjectById = useCallback(async (projectId: string) => {
  //   setLoading(true);
  //   try {
  //     const project = await getProjectById(projectId);
  //     setSelectedProject(project);
  //   } catch (error) {
  //     console.error(`Failed to fetch project with id ${projectId}:`, error);
  //     setSelectedProject(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

  return {
    loading,
    updateProjectVisibility
  };
}