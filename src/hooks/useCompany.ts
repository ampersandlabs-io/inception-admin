import { getCompanies } from "@/services/companyService";
import { Company } from "@/types";
import { useCallback, useEffect, useState } from "react";

export function useCompany(page: number, pageSize: number) {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    const [totalItems, setTotalItems] = useState(0);
  
    const fetchCompanies = useCallback(async () => {
      setLoading(true);
      try {
        const companiesData = await getCompanies(page, pageSize);
        console.log(`${JSON.stringify(companiesData)}`);
        setCompanies(companiesData.companies);
        setTotalItems(companiesData.total);
      } catch (error) {
        console.error("Failed to fetch comapnies:", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }, [page, pageSize]);
  
    useEffect(() => {
      fetchCompanies();
    }, [fetchCompanies]);
  
    return {
      companies,
      loading,
      totalItems,
      refreshProjects: fetchCompanies,
    };

}