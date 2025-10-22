import { useProjects } from "@/hooks/useProjects";
import { Calendar, Clock, Coins, Currency } from "lucide-react";
import { useEffect, useState } from "react";
import { DocumentsTab } from "./tabs/documents-tab";
import { TeamTab } from "./tabs/team-tab";
import { MilestonesTab } from "./tabs/milestones-tab";
import { SquadTab } from "./tabs/squad-tab";
import { OverviewTab } from "./tabs/overview-tab";
import { DEFAULT_CURRENCY } from "@/constants";
import { formatBudget, formatDate } from "@/utils/util";
import { ProjectStatus } from "./project-status";
import { SettingsTab } from "./tabs/settings-tab";

interface ProjectDetailsProps {
  projectId: string;
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {

  const { selectedProject: project, getProjectById, loading } = useProjects();
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    getProjectById(projectId);
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#e0e5f2] p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="text-center py-4">
          <p className="text-[#8f9bba] text-sm">
            Loading project data and related information...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-white rounded-2xl border border-[#e0e5f2] p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <div className="w-8 h-8 bg-red-500 rounded opacity-50" />
          </div>
          <h3 className="text-lg font-semibold text-[#2b3674] mb-2">
            Failed to load project
          </h3>
          <p className="text-[#8f9bba]">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e0e5f2] overflow-hidden">
      {/* Project Header */}
      <div className="p-8 pb-0">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-1 h-8 bg-[#4318ff] rounded-full"></div>
              <h1 className="text-[26px] font-bold text-[#2b3674]">
                {project.title}
              </h1>

                <ProjectStatus status={project.status} />

            </div>
            <p className="text-[#8f9bba] text-[14px] mb-4">
              {/* <CompanyName companyId={project.company_id} /> */}
            </p>

            {/* Project Details Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Coins className="h-5 w-5 text-[#4318ff]" />
                {/* {project.currency || "$"} */}
                <div>
                  <p className="text-sm text-[#8f9bba]">Budget</p>
                  <p className="font-semibold text-[#2b3674]">
                    {formatBudget(
                      project.budget_amount || 0,
                      project.budget_currency || DEFAULT_CURRENCY
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#4318ff]" />
                <div>
                  <p className="text-sm text-[#8f9bba]">Scope</p>
                  <p className="font-semibold text-[#2b3674]">
                    {project.scope?.display_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#4318ff]" />
                <div>
                  <p className="text-sm text-[#8f9bba]">Deadline</p>
                  <p className="font-semibold text-[#2b3674]">
                    {formatDate(project.deadline || "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="w-full border-b border-[#e0e5f2]">
          <div className="flex">
            {[
              "Overview",
              "Squad",
              "Documents",
              "Team",
              "Milestones",
              "Settings",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 pb-4 font-medium text-sm transition-colors ${
                  tab === activeTab
                    ? "text-[#4318ff] border-b-2 border-[#4318ff]"
                    : "text-[#E535AB] hover:text-[#2b3674]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8 pt-6">
        {activeTab === "Overview" && <OverviewTab project={project} />}
        {activeTab === "Squad" && <SquadTab project={project} />}
        {activeTab === "Documents" && <DocumentsTab project={project} />}
        {activeTab === "Team" && <TeamTab project={project} />}
        {activeTab === "Milestones" && <MilestonesTab project={project} />}
        {activeTab === "Settings" && <SettingsTab project={project} />}
      </div>
    </div>
  );
}
