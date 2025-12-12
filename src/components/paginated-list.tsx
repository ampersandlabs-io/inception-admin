"use client";

import React from "react";
import Pagination from "./ui/pagination";

interface PaginatedListProps<T> {
  items: T[];
  loading: boolean;
  totalItems: number;
  page: number;
  setPage: (p: number) => void;
  onPageChange?: (p: number) => void;
  pageSize: number;
  renderItem: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  listType?: "table" | "grid" | "stack";
  childrenBeforeItems?: React.ReactNode;
  renderLayout?: (
    items: React.ReactNode,
    pagination: React.ReactNode
  ) => React.ReactNode;
  paginationClassName?: string;
}

export function PaginatedList<T>(props: PaginatedListProps<T>) {
  const {
    items,
    loading,
    totalItems,
    page,
    setPage,
    onPageChange,
    pageSize,
    renderItem,
    emptyState,
    listType,
    childrenBeforeItems,
    renderLayout,
    paginationClassName,
  } = props;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <>{emptyState}</>;
  }

  const totalPages = Math.ceil(totalItems / pageSize);

  const itemsNode = <>{items.map((item) => renderItem(item))}</>;

  const handleChange = onPageChange ?? setPage;

  const paginationNode = (
    <div className={paginationClassName || "mt-4 flex justify-center w-full"}>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => handleChange(p)}
      />
    </div>
  );

  if (renderLayout) {
    return (
      <>
        {childrenBeforeItems}
        {renderLayout(itemsNode, paginationNode)}
      </>
    );
  }

  // 🟡 Otherwise auto-generate based on listType
  if (listType === "table") {
    return (
      <>
        {/* only rows in body */}
        <tbody>{itemsNode}</tbody>
        {/* pagination MUST be outside table by consumer */}
        {paginationNode}
      </>
    );
  }

  return (
    <>
      {childrenBeforeItems}

      {itemsNode}

      {paginationNode}
    </>
  );
}
