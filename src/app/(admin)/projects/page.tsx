"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/empty-state";
import { Folder, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateProjectModal } from "@/sections/projects/create-project-modal";
import { useProjects } from "@/hooks/useProjects";

export default function ProjectPage() {

  const { projects, loading } = useProjects();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#2b3674]">Projects</h3>
            <Button onClick={() => setOpen(true)}>Create Project</Button>
          </div>

          {loading ? (
            <div
              role="status"
              className="min-h-screen flex items-center justify-center"
            >
              <Loader2 className="w-12 h-12 animate-spin" />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Folder}
              title="You have no projects"
              description="No projects have been created"
              actionText="Create Project"
              onAction={() => setOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Create Content Content */}
      <CreateProjectModal open={open} setOpen={setOpen} />
    </div>
  );
}
