import { useEffect, useState, useCallback } from "react";
import { getProjectBids } from "@/services/projectService";
import { ProjectBid } from "@/types/projectBid";

export function useProjectBid(projectId: string) {

  const [loading, setLoading] = useState(true);
  const [projectBids, setProjectBids] = useState<ProjectBid[]>([]);
  const [bidsError, setBidsError] = useState<string>("")

  const fetchProjectsBid = useCallback(async (projectId: string) => {
    setLoading(true);
    try {
      const projectBids = await getProjectBids(projectId);
      setProjectBids(projectBids);
    } catch (error) {
      console.error(`Failed to fetch project bids:`, error);
      setProjectBids([]);
      setBidsError(`${JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjectsBid(projectId);
  }, [fetchProjectsBid]);

  return {
    projectBids,
    loading,
    bidsError
  };
}