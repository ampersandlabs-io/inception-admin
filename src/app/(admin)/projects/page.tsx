"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/empty-state";
import { Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateProjectModal } from "@/sections/projects/create-project-modal";
import { useProjects } from "@/hooks/useProjects";
import { PaginatedList } from "@/components/paginated-list";
import { usePagination } from "@/hooks/usePagination";

export default function ProjectPage() {
  
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"All" | "Draft" | "Pending" | "Active" | "Completed">("All");
  const { page, pageSize, handlePageChange } = usePagination({
    defaultPage: 1,
    defaultPageSize: 9,
  });
  const statusParam =
    statusFilter === "All" ? undefined : statusFilter.toUpperCase();

  const { projects, loading, totalItems, publishProject, deleteProject, editProject, approveProject } =
    useProjects(page, pageSize, statusParam);

  const onFilterChange = (value: "All" | "Draft" | "Pending" | "Active" | "Completed") => {
    setStatusFilter(value);
    handlePageChange(1);
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2b3674]">Projects</h3>
            <div className="flex items-center gap-2">
              {(["All", "Draft", "Pending", "Active", "Completed"] as const).map((value) => {
                const isActive = statusFilter === value;
                return (
                  <Button
                    key={value}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => onFilterChange(value)}
                  >
                    {value}
                  </Button>
                );
              })}
            </div>
            <Button onClick={() => setOpen(true)}>Create Project</Button>
          </div>

          <PaginatedList
            items={projects}
            loading={loading}
            totalItems={totalItems}
            page={page}
            pageSize={pageSize}
            setPage={handlePageChange}
            onPageChange={handlePageChange}
            renderItem={(project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPublish={publishProject}
                onApprove={approveProject}
                onEdit={editProject}
                onDelete={deleteProject}
              />
            )}
            emptyState={
              <div className="bg-white rounded-2xl border border-[#e0e5f2]">
                <EmptyState
                  icon={Folder}
                  title="You have no projects"
                  description="No projects have been created"
                  actionText="Create Project"
                  onAction={() => setOpen(true)}
                />
              </div>
            }
            renderLayout={(items, pagination) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items}
                </div>
                <div className="mt-4 flex justify-center w-full">
                  {pagination}
                </div>
              </>
            )}
          />
        </div>
      </div>

      {/* Create Content Content */}
      <CreateProjectModal open={open} setOpen={setOpen} />
    </div>
  );
}
