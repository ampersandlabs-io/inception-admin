import { Project } from "@/types";
import { useRouter } from "next/navigation";
import { ProjectStatus } from "./projects/project-status";
import { CheckCircle, Edit, Paintbrush, Trash } from "lucide-react";
import { ProjectActionsMenu } from "./projects/project-actions-menu";
interface ProjectCardProps {
  project: Project;
  onPublish: (projectId: string) => void;
  onApprove: (projectId: string) => void;
  onEdit: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({
  project,
  onPublish,
  onApprove,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const router = useRouter();
  const actions = [];

  if (project.status === "PENDING") {
    actions.push({
      label: "Publish",
      icon: <Paintbrush className="w-4 h-4 text-gray-500" />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onPublish(project.id);
      },
    });
  }

  if (project.status == "DRAFT") {
    actions.push({
      label: "Approve",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onApprove(project.id);
      },
    });
  }

  actions.push(
    {
      label: "Edit",
      icon: <Edit className="w-4 h-4 text-gray-500" />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(project.id);
      },
    },
    {
      label: "Delete",
      icon: <Trash className="w-4 h-4 text-red-500" />,
      className: "text-red-600 hover:bg-red-50",
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(project.id);
      },
    }
  );

  return (
    <div
      className="relative bg-white rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer hover:border-[#4318ff]/20 min-h-[180px] flex flex-col"
      onClick={() => router.push(`projects/${project.id}`)}
    >
      <div className="absolute top-4 right-4">
        <ProjectActionsMenu actions={actions} />
      </div>

      <div className="flex-1 space-y-4">
        <h3 className="font-bold text-[#2b3674] text-[20px] leading-7">
          {project.title}
        </h3>
        <p className="text-[#8f9bba] text-[14px]">
          By{" "}
          <span
            className="text-[#A3AED0] hover:underline cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`companies/${project.company_id}`);
            }}
          >
            {project.company?.name}
          </span>
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <ProjectStatus status={project.status} />
      </div>
    </div>
  );
}
