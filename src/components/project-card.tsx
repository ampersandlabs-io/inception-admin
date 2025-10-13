import { Project } from "@/types"
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {

  const router = useRouter();

  return (
    // <div className="bg-white rounded-xl p-6 border border-[#e2e8f0] hover:shadow-sm transition-shadow">
    //   <div className="flex items-start justify-between mb-4">
    //     <div className="flex-1">
    //       <h3 className="font-semibold text-[#2b3674] text-lg mb-1">{title}</h3>
    //       <p className="text-[#8f9bba] text-sm">{title}</p>
    //     </div>

    //     <div className={`px-3 py-1 rounded-full text-xs font-medium text-white`}>
    //       {status}
    //     </div>
    //   </div>

    //   <div className="flex items-center gap-2 text-[#8f9bba] text-sm">
    //     <div className="w-2 h-2 bg-[#4318ff] rounded-full"></div>
    //     <span>In Progress</span>
    //   </div>
    // </div>

    <div
    className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer hover:border-[#4318ff]/20 min-h-[180px] flex flex-col"
    // onClick={router.push(`/client/projects/${project.id}`)}
  >

    <div className="flex-1 space-y-4">
      <h3 className="font-bold text-[#2b3674] text-[20px] leading-7">{project.title}</h3>
      <p className="text-[#8f9bba] text-[14px]">
        By  <span
      className="text-[#A3AED0] hover:underline cursor-pointer"
      // onClick={router.push(`company/${project.company_id}`)}
    >
      {project.company_id}
    </span>
      </p>
    </div>

    <div className="mt-6 flex justify-end">
      <div className={`inline-flex px-4 py-2 rounded-[10px] text-[11px] font-bold uppercase tracking-wider ${
        getStatusColor(project.status)
      }`}>
        {project.status}
      </div>
    </div>
  </div>
  )
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return "bg-[#4FC3F7] text-[#066093]";
    case "active":
    case "published":
      return "bg-[#4ade80] text-white";
    case "in_review":
      return "bg-[#F48FB1] text-[#C6302B]";
    case "completed":
      return "bg-[#10b981] text-white";
    case "cancelled":
      return "bg-[#ef4444] text-white";
    case "pending_funding":
      return "bg-[#FFB74D] text-white";
    default:
      return "bg-[#8f9bba] text-white";
  }
};
