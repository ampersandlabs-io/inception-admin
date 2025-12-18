"use client";

import { useState } from "react";
import { Plus, CheckCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Milestone, Project } from "@/types";
import { useProjectMilestones } from "@/hooks/useProjectMilestones";
import {
  MilestonesEmptyState,
  MilestonesErrorState,
  MilestonesLoadingState,
} from "./milestones-states";
import { MilestoneCard } from "../../cards/milestone-card";
import { RequestChangesModal } from "./request-changes-modal";
import { ActivateMilestoneModal } from "./activate-milestone-modal";
import { CommentsModal } from "./comments-modal";

interface MilestonesTabProps {
  project: Project;
}

export function MilestonesTab({ project }: MilestonesTabProps) {

  const { milestones, loading, error, approveMilestone } = useProjectMilestones(project.id);

  const [activeView, setActiveView] = useState<"milestones" | "tasks">(
    "milestones"
  );

  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(
    new Set()
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [commentsModal, setCommentsModal] = useState<{
    isOpen: boolean;
    milestone: Milestone | null;
  }>({
    isOpen: false,
    milestone: null,
  });
  const [requestChangesModal, setRequestChangesModal] = useState<{
    isOpen: boolean;
    milestone: Milestone | null;
  }>({
    isOpen: false,
    milestone: null,
  });
  const [activateModal, setActivateModal] = useState<{
    isOpen: boolean;
    milestone: Milestone | null;
  }>({
    isOpen: false,
    milestone: null,
  });

  const toggleMilestoneExpansion = (milestoneId: string) => {
    setExpandedMilestones((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(milestoneId)) {
        newSet.delete(milestoneId);
      } else {
        newSet.add(milestoneId);
      }
      return newSet;
    });
  };

  const toggleDropdown = (milestoneId: string) => {
    setOpenDropdown((prev) => (prev === milestoneId ? null : milestoneId));
  };

  const handleAction = (action: string, milestoneId: string) => {
    const milestone = milestones.find((m) => m.id === milestoneId);

    if (action === "comment") {
      setCommentsModal({
        isOpen: true,
        milestone: milestone || null,
      });
    } else if (action === "request changes") {
      setRequestChangesModal({
        isOpen: true,
        milestone: milestone || null,
      });
    } else if (action === "activate") {
      setActivateModal({
        isOpen: true,
        milestone: milestone || null,
      });
    } else if (action === "approve") {
      handleApproveMilestone(milestoneId);
    } else {
      console.log(`${action} clicked for milestone ${milestoneId}`);
    }
    setOpenDropdown(null);
  };

  const handleActivateMilestone = () => {}

  const handleTaskAction = (action: string, taskId: string) => {
    console.log(`${action} clicked for task ${taskId}`);
  };

  const handleApproveMilestone = async (milestoneId: string) => {
    try {
      await approveMilestone(milestoneId);
    } catch (error) {
      console.error("Failed to approve milestone:", error);
    }
  };

  if (loading) {
    return <MilestonesLoadingState />;
  }

  if (error) {
    return <MilestonesErrorState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveView("milestones")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "milestones"
                ? "bg-[#4318ff] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Milestones
          </button>
          <button
            onClick={() => setActiveView("tasks")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === "tasks"
                ? "bg-[#4318ff] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tasks
          </button>
        </div>
        <Button className="bg-[#4318ff] hover:bg-[#3a0fe6] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add {activeView === "milestones" ? "Milestone" : "Task"}
        </Button>
      </div>

      {/* Milestones View */}
      {activeView === "milestones" && (
        <div className="space-y-4">
          {milestones.length === 0 ? (
            <MilestonesEmptyState />
          ) : (
            milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                expandedMilestones={expandedMilestones}
                openDropdown={openDropdown}
                onToggleExpansion={toggleMilestoneExpansion}
                onToggleDropdown={toggleDropdown}
                onAction={handleAction}
                onTaskAction={handleTaskAction}
                onApprove={handleApproveMilestone}
              />
            ))
          )}
        </div>
      )}

      {/* Tasks View */}
      {activeView === "tasks" && (
        <div className="space-y-4">
          {milestones
            .flatMap((milestone) =>
              milestone.tasks.map((task) => ({
                ...task,
                milestoneTitle: milestone.title,
                milestoneStatus: milestone.status,
              }))
            )
            .map((task) => (
              <div
                key={task.id}
                className="bg-white border border-[#e0e5f2] rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed
                          ? "bg-[#4318ff] border-[#4318ff]"
                          : "border-gray-300"
                      }`}
                    >
                      {task.completed && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`font-medium ${
                          task.completed
                            ? "text-[#8f9bba] line-through"
                            : "text-[#2b3674]"
                        }`}
                      >
                        {task.title}
                      </h4>
                      <p className="text-sm text-[#8f9bba]">
                        {task.milestoneTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : task.milestoneStatus === "TODO"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {task.status}
                    </span>
                    <button className="p-1 text-[#8f9bba] hover:text-[#2b3674] transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {commentsModal.milestone && (
        <CommentsModal
          milestone={commentsModal.milestone}
          isOpen={commentsModal.isOpen}
          onClose={() => setCommentsModal({ isOpen: false, milestone: null })}
          onCommentAdded={refreshMilestones}
        />
      )}

      {requestChangesModal.milestone && (
        <RequestChangesModal
          milestone={requestChangesModal.milestone}
          projectId={project.id}
          isOpen={requestChangesModal.isOpen}
          onClose={() =>
            setRequestChangesModal({ isOpen: false, milestone: null })
          }
        />
      )}

      {/* Activate Milestone Modal */}
      {activateModal.milestone && (
        <ActivateMilestoneModal
          milestone={activateModal.milestone}
          projectId={project.id}
          isOpen={activateModal.isOpen}
          onActivate={handleActivateMilestone}
          onClose={() => setActivateModal({ isOpen: false, milestone: null })}
        />
      )}
    </div>
  );
}
