import { useState, useCallback, useEffect } from "react";
import { approveMilestoneRequest, milestoneChangesRequest } from "@/services/milestoneService";
import { getAlProjectMilestonesRequest } from "@/services/projectService"
import { Milestone } from "@/types";

export function useProjectMilestones(projectId: string) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const fetchProjectMilestones = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAlProjectMilestonesRequest(projectId);
      setMilestones(response.items || []);
    } catch (error) {
      console.error("Failed to fetchProjectMilestones:", error);
      setError(error)
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const approveMilestone = useCallback(async (milestoneId: string) => {
    try {
      await approveMilestoneRequest(milestoneId);
      // setMilestones(response || []);
    } catch (error) {
      console.error("Failed to fetchProjectMilestones:", error);
      setError(error)
    }
  }, [])
  
  const requestMilestoneChanges = useCallback(async (milestoneId: string) => {
    try {
      await milestoneChangesRequest(milestoneId);
      // setMilestones(response || []);
    } catch (error) {
      console.error("Failed to fetchProjectMilestones:", error);
      setError(error)
    }
  }, [])

  useEffect(() => {
    fetchProjectMilestones();
  }, [fetchProjectMilestones]);

  return {
    loading,
    error,
    milestones,
    refresh: fetchProjectMilestones,

    approveMilestone,
    requestMilestoneChanges
  };
}