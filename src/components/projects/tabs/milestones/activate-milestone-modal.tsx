"use client"

import { useState } from "react"
import { X, Play, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Milestone } from "@/types"

interface ActivateMilestoneModalProps {
  milestone: Milestone
  projectId: string
  onActivate: () => void
  isOpen: boolean
  onClose: () => void
}

export function ActivateMilestoneModal({
  milestone,
  projectId,
  onActivate,
  isOpen,
  onClose
}: ActivateMilestoneModalProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleActivate = async () => {
    // if (isSubmitting) return

    // setIsSubmitting(true)
    // try {
    //   await activateMilestoneMutation.mutateAsync({
    //     milestoneId: milestone.id,
    //     requestData: {}
    //   })

    //   onClose()
    // } catch (error) {
    //   console.error("Failed to activate milestone:", error)
    // } finally {
    //   setIsSubmitting(false)
    // }
    onActivate()
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e0e5f2]">
          <div className="flex items-center gap-3">
            <Play className="w-5 h-5 text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-[#2b3674]">Activate Milestone</h2>
              <p className="text-sm text-[#8f9bba]">{milestone.title}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-[#8f9bba] hover:text-[#2b3674] transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-[#2b3674] mb-1">Are you sure?</h3>
              <p className="text-sm text-[#8f9bba]">
                This will activate the milestone and mark it as &quot;In Progress&quot;.
                This action will notify the development team to begin working on this milestone.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-[#2b3674] mb-2">Milestone Details:</h4>
            <div className="space-y-1 text-sm text-[#8f9bba]">
              <p><span className="font-medium">Title:</span> {milestone.title}</p>
              <p><span className="font-medium">Description:</span> {milestone.description}</p>
              <p><span className="font-medium">Budget:</span> {milestone.currency} {milestone.budget_allocation}</p>
              <p><span className="font-medium">Due Date:</span> {new Date(milestone.due_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#e0e5f2] flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleActivate}
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Activating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Activate Milestone
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
