"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface UsePaginationOptions {
  defaultPage?: number;
  defaultPageSize?: number;
}

export function usePagination(opts?: UsePaginationOptions) {
    
  const defaultPage = opts?.defaultPage ?? 1;
  const defaultPageSize = opts?.defaultPageSize ?? 10;

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [page, setPage] = useState<number>(defaultPage);
  const [pageSize] = useState<number>(defaultPageSize);

  const pageFromUrl = useMemo(() => {
    const sp = searchParams.get("page");
    const num = sp ? Number(sp) : NaN;
    return !Number.isNaN(num) && num > 0 ? num : defaultPage;
  }, [searchParams, defaultPage]);

  // Sync from URL ?page=… on mount & when searchParams changes
  useEffect(() => {
    if (pageFromUrl !== page) {
      setPage(pageFromUrl);
    }
  }, [pageFromUrl, page]);

  const totalPages = (totalItems: number) => {
    return Math.ceil(totalItems / pageSize);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { page, pageSize, totalPages, handlePageChange, setPage };
}