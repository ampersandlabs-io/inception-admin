import { getProjectStatusColor, getProjectStatusText } from "@/utils/util";
import { CheckCircle, Clock } from "lucide-react";

interface ProjectStatusProps {
  status: string;
}

export function ProjectStatus({ status }: ProjectStatusProps) {
  const color = getProjectStatusColor(status);
  return (
    <div
      className={`inline-flex px-4 py-2 rounded-[10px] text-[11px] font-bold uppercase tracking-wide gap-2 ${color}`}
    >
      {getStatusIcon(status, color)}
      <span className="font-medium text-[#2B3674] text-sm">
        {getProjectStatusText(status)}
      </span>
    </div>
  );
}

const getStatusIcon = (status: string, color: string) => {
  switch (status.toLowerCase()) {
    case "published":
    case "active":
      return <CheckCircle className={`h-5 w-5  text-${color}`} />;
    case "in_review":
      return <Clock className={`h-5 w-5 text-${color}`} />;
    default:
      return <CheckCircle className={`h-5 w-5 text-${color}`} />;
  }
};
