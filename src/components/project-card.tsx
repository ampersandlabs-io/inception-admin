import { Project } from "@/types"
import { getProjectStatusColor } from "@/utils/util";
import { useRouter } from "next/navigation";
import { ProjectStatus } from "./projects/project-status";

interface ProjectCardProps {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {

  const router = useRouter();

  return (
    <div
    className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer hover:border-[#4318ff]/20 min-h-[180px] flex flex-col"
    onClick={() => router.push(`projects/${project.id}`)}>

    <div className="flex-1 space-y-4">
      <h3 className="font-bold text-[#2b3674] text-[20px] leading-7">{project.title}</h3>
      <p className="text-[#8f9bba] text-[14px]">
        By  <span
      className="text-[#A3AED0] hover:underline cursor-pointer"
      onClick={() => router.push(`company/${project.company_id}`)}
    >
      {project.company?.name}
    </span>
      </p>
    </div>

    <div className="mt-6 flex justify-end">
        <ProjectStatus status={project.status} />
    </div>
  </div>
  )
}
