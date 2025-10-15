import { getCompanies } from "@/services/companyService";
import { Company } from "@/types";
import { useCallback, useEffect, useState } from "react";

export function useCompany() {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchCompanies = useCallback(async () => {
      setLoading(true);
      try {
        const companiesData = await getCompanies();
        console.log(`${JSON.stringify(companiesData)}`);
        setCompanies(companiesData.companies);
      } catch (error) {
        console.error("Failed to fetch comapnies:", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchCompanies();
    }, []);
  
    return {
      companies,
      loading,
      refreshProjects: fetchCompanies,
    };

}