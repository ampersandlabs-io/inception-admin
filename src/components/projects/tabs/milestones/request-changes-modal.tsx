"use client"

import { useState } from "react"
import { X, AlertTriangle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Milestone } from "@/types"
import { useProjectMilestones } from "@/hooks/useProjectMilestones"

interface RequestChangesModalProps {
  milestone: Milestone
  projectId: string
  isOpen: boolean
  onClose: () => void
}

export function RequestChangesModal({
  milestone,
  projectId,
  isOpen,
  onClose
}: RequestChangesModalProps) {

  const [reason, setReason] = useState("")
  const [detailedNotes, setDetailedNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { requestMilestoneChanges } = useProjectMilestones(projectId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason.trim() || !detailedNotes.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await requestMilestoneChanges()

      // Reset form and close modal
      setReason("")
      setDetailedNotes("")
      onClose()
    } catch (error) {
      console.error("Failed to request changes:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setReason("")
      setDetailedNotes("")
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e0e5f2]">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <div>
              <h2 className="text-lg font-semibold text-[#2b3674]">Request Changes</h2>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="p-6 space-y-4 flex-1">
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-[#2b3674] mb-2">
                Reason for Changes *
              </label>
              <input
                id="reason"
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Brief reason for requesting changes..."
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-[#e0e5f2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#258BBC] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label htmlFor="detailedNotes" className="block text-sm font-medium text-[#2b3674] mb-2">
                Detailed Notes *
              </label>
              <textarea
                id="detailedNotes"
                value={detailedNotes}
                onChange={(e) => setDetailedNotes(e.target.value)}
                placeholder="Provide detailed explanation of what changes are needed..."
                rows={6}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-[#e0e5f2] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#258BBC] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
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
              type="submit"
              disabled={!reason.trim() || !detailedNotes.trim() || isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Request Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
