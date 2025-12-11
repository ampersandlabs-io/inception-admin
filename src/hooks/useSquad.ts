import { useEffect, useState, useCallback } from "react";
import { DeveloperProfile } from "@/types";
import { approveDeveloper, getDeveloperById, getDevelopers, rejectDeveloper } from "@/services/developerService";

export function useSquad(page: number, pageSize: number) {

  const [squads, setSquads] = useState<DeveloperProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSquad, setSelectedSquad] = useState<DeveloperProfile | null>(null);

  const [totalItems, setTotalItems] = useState(0);

  const fetchSquads = useCallback(async () => {
    setLoading(true);
    try {
      const squadsData = await getDevelopers(page, pageSize);
      console.log(`squadsData ==> ${JSON.stringify(squadsData)}`);
      setSquads(squadsData.items);
      setTotalItems(squadsData.total);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setSquads([]);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  const fetchSquadById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const squad = await getDeveloperById(id);
      setSelectedSquad(squad);
    } catch (error) {
      console.error(`Failed to fetch project with id ${id}:`, error);
      setSelectedSquad(null);
    } finally {
      setLoading(false);
    }
  }, []);

   const approveSquad = useCallback(async (developerId: string) => {
    // Save a snapshot for rollback
    const previous = [...squads];

    // Optimistically mark approved
    setSquads((prev) =>
      prev.map((dev) =>
        dev.id === developerId
          ? { ...dev, vetting_status: "approved" }
          : dev
      )
    );

    try {
      await approveDeveloper(developerId, "", "");
      return true;
    } catch (error) {
      console.error("Approve failed, rolling back:", error);
      // rollback
      setSquads(previous);
      throw error;
    }
  }, [squads]);

  const rejectSquad = useCallback(
    async (developerId: string) => {
      const previous = [...squads];

      // You may want to use a separate status, like 'rejected'
      setSquads((prev) =>
        prev.map((dev) =>
          dev.id === developerId
            ? { ...dev, vetting_status: "rejected" }
            : dev
        )
      );

      try {
        await rejectDeveloper(developerId, "", "");
        return true;
      } catch (error) {
        // rollback
        setSquads(previous);
        throw error;
      }
    },
    [squads]
  );

  useEffect(() => {
    fetchSquads();
  }, [fetchSquads]);

  return {
    squads,
    loading,
    selectedSquad,
    refreshSquad: fetchSquads,
    getSquadById: fetchSquadById,

    totalItems,
    approveSquad,
    rejectSquad
  };
}