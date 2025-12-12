import { MoreVertical } from "lucide-react";
import { Dropdown } from "../ui/dropdown";
import { Button } from "../ui/button";

interface ProjectAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function ProjectActionsMenu({ actions }: { actions: ProjectAction[] }) {
  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="icon" className="text-[#a3aed0]">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </Button>
      }
      items={actions.map((action) => ({
        label: action.label,
        icon: action.icon,
        className: action.className,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => action.onClick(e),
      }))}
    />
  );
}
