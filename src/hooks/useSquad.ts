import { useEffect, useState, useCallback } from "react";
import { DeveloperProfile } from "@/types";
import { getDeveloperById, getDevelopers } from "@/services/developerService";

export function useSquad() {

  const [squads, setSquads] = useState<DeveloperProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSquad, setSelectedSquad] = useState<DeveloperProfile | null>(null);

  const fetchSquads = useCallback(async () => {
    setLoading(true);
    try {
      const squadsData = await getDevelopers();
      console.log(`squadsData ==> ${JSON.stringify(squadsData)}`);
      setSquads(squadsData.developers);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setSquads([]);
    } finally {
      setLoading(false);
    }
  }, []);

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


  useEffect(() => {
    fetchSquads();
  }, [fetchSquads]);

  return {
    squads,
    loading,
    selectedSquad,
    refreshSquad: fetchSquads,
    getSquadById: fetchSquadById,
  };
}