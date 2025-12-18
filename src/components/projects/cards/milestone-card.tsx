"use client"

import { Calendar, DollarSign, ChevronDown, ChevronRight } from "lucide-react"

import { TaskItem } from "./task-item"
import { formatDate } from "@/utils/util"
import { calculateProgress, getStatusColor, getStatusIcon } from "@/lib/milestone-utils"
import { Milestone } from "@/types"
import { MilestoneActionsDropdown } from "../tabs/milestones/milestone-actions-dropdown"
import { Button } from "@/components/ui/button"

interface MilestoneCardProps {
  milestone: Milestone
  expandedMilestones: Set<string>
  openDropdown: string | null
  onToggleExpansion: (milestoneId: string) => void
  onToggleDropdown: (milestoneId: string) => void
  onAction: (action: string, milestoneId: string) => void
  onTaskAction?: (action: string, taskId: string) => void
  onApprove?: (milestoneId: string) => void
}

export function MilestoneCard({
  milestone,
  expandedMilestones,
  openDropdown,
  onToggleExpansion,
  onToggleDropdown,
  onAction,
  onTaskAction,
  onApprove
}: MilestoneCardProps) {

  const progress = calculateProgress(milestone.tasks)
  const completedTasks = milestone.tasks.filter(task =>
    task.status.toLowerCase() === 'completed' || task.status.toLowerCase() === 'done'
  )
  const isExpanded = expandedMilestones.has(milestone.id)

  // Check if milestone can be approved (must be in "In Review" status)
  const canApprove = milestone.status_name.toLowerCase() !== 'in review'

  return (
    <div className="bg-white border border-[#e0e5f2] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon(milestone.status_name)}
          <div>
            <h3 className="text-lg font-semibold text-[#2b3674]">{milestone.title}</h3>
            <p className="text-[#8f9bba] text-sm">{milestone.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-72 bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#258BBC] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-[#8f9bba] font-medium">{progress}%</span>
          </div>

          {canApprove && onApprove && (
            <Button variant="outline"
              className="rounded-md py-1"
              onClick={() => onApprove(milestone.id)}
            >
              Approve and Pay
            </Button>
          )}

          <MilestoneActionsDropdown
            milestoneId={milestone.id}
            isOpen={openDropdown === milestone.id}
            onToggle={onToggleDropdown}
            onAction={onAction}
          />
        </div>
      </div>

      {/* Milestone Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#8f9bba]" />
          <span className="text-sm text-[#8f9bba]">Due:</span>
          <span className="text-sm font-medium text-[#2b3674]">{formatDate(milestone.due_date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-[#8f9bba]" />
          <span className="text-sm text-[#8f9bba]">Budget:</span>
          <span className="text-sm font-medium text-[#2b3674]">
            {milestone.currency} {milestone.budget_allocation}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status_name)}`}>
            {milestone.status_name.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="border-t border-[#e0e5f2] pt-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => onToggleExpansion(milestone.id)}
            className="flex items-center gap-2 text-sm font-medium text-[#2b3674] hover:text-[#258BBC] transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            Tasks ({milestone.tasks.length})
          </button>
          <span className="text-sm text-[#8f9bba]">
            {completedTasks.length} of {milestone.tasks.length} completed
          </span>
        </div>

        {isExpanded && (
          <div className="space-y-2 mt-3">
            {milestone.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onAction={onTaskAction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
