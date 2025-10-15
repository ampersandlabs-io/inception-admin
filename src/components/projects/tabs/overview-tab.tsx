"use client"

import { Project } from "@/types"
import { formatBudget, formatDate } from "@/utils/util"

interface OverviewTabProps {
  project: Project
}

export function OverviewTab({ project }: OverviewTabProps) {

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-[#8f9bba] text-sm font-medium mb-1">Project Budget</h3>
          <p className="text-[#2b3674] text-[32px] font-bold">
            {formatBudget(project.budget_amount || 0, project.budget_currency || "$")}
          </p>
        </div>

        <div>
          <h3 className="text-[#8f9bba] text-sm font-medium mb-1">Experience Level</h3>
          <p className="text-[#2b3674] text-[32px] font-bold">{project.experience_level!!.name}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tech Stack Section */}
        <div>
          <h3 className="text-[#2b3674] text-xl font-bold mb-6">Tech Stack</h3>

          <div className="space-y-4">
            {project.tech_stacks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.tech_stacks.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-3 py-1 bg-[#f4f7fe] text-[#4318ff] rounded-full text-sm font-medium"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#8f9bba] text-sm">No tech stack specified</p>
            )}
          </div>

          {/* Project Types */}
          <div className="mt-6">
            <h4 className="text-[#2b3674] font-semibold mb-3">Project Types</h4>
            <div className="flex flex-wrap gap-2">
              {project.project_types!!.map((type) => (
                <span
                  key={type.id}
                  className="px-3 py-1 bg-[#e9edf7] text-[#2b3674] rounded-full text-sm"
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-[#8f9bba] text-sm">Deadline:</span>
              <span className="text-[#2b3674] font-medium text-sm">{formatDate(project.deadline || "")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8f9bba] text-sm">Budget Type:</span>
              <span className="text-[#2b3674] font-medium text-sm">{project.budget_type.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8f9bba] text-sm">Scope:</span>
              <span className="text-[#2b3674] font-medium text-sm">{project.scope!!.display_name}</span>
            </div>
            {project.is_urgent && (
              <div className="flex justify-between">
                <span className="text-[#8f9bba] text-sm">Priority:</span>
                <span className="text-red-600 font-medium text-sm">Urgent</span>
              </div>
            )}
          </div>
        </div>

        {/* Project Description */}
        <div>
          <h3 className="text-[#2b3674] text-xl font-bold mb-4">Project Description</h3>
          <p className="text-[#8f9bba] leading-relaxed text-[15px]">
            {project.description || 'No description provided for this project.'}
          </p>

          {/* Category Information */}
          <div className="mt-6">
            <h4 className="text-[#2b3674] font-semibold mb-2">Category</h4>
            <p className="text-[#8f9bba] text-sm">{project.category!!.name}</p>
            {project.category!!.description && (
              <p className="text-[#8f9bba] text-xs mt-1">{project.category!!.description}</p>
            )}
          </div>

          {/* Project Metadata */}
          <div className="mt-6 pt-6 border-t border-[#e0e5f2]">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#8f9bba]">Created:</span>
                <p className="text-[#2b3674] font-medium">{formatDate(project.created_at)}</p>
              </div>
              <div>
                <span className="text-[#8f9bba]">Last Updated:</span>
                <p className="text-[#2b3674] font-medium">{formatDate(project.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
