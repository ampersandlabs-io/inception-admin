import { useEffect, useState, useCallback } from "react";
import { getDevelopersAssignedToProject } from "@/services/projectService";
import { ActiveSquadResponse } from "@/types";

export function useProjectSquad(projectId: string) {

  const [loading, setLoading] = useState(true);
  
  const [projectSquads, setProjectSquads] = useState<ActiveSquadResponse[]>([]);

  const [totalItems, setTotalItems] = useState(0);

  const fetchDevelopersAssignedToProject = useCallback(async () => {
    setLoading(true);
    try {
      const projectSquads = await getDevelopersAssignedToProject(projectId);
      setProjectSquads(projectSquads.developers);
      setTotalItems(projectSquads.total)
    } catch (error) {
      console.error(`Failed to fetch squads for project with id ${projectId}:`, error);
      setProjectSquads([]);
    } finally {
      setLoading(false);
    }
  }, [projectId])

  

  useEffect(() => {
    fetchDevelopersAssignedToProject();
  }, [fetchDevelopersAssignedToProject]);

  return {
    loading,
    totalItems,
    refreshProjects: fetchDevelopersAssignedToProject,
  
    projectSquads,
    fetchDevelopersAssignedToProject
  };
}