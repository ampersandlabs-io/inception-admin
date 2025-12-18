"use client"

import { useRef, useEffect } from "react"
import { MoreHorizontal, Play, Edit, MessageSquare, Trash2 } from "lucide-react"

interface MilestoneActionsDropdownProps {
  milestoneId: string
  isOpen: boolean
  onToggle: (milestoneId: string) => void
  onAction: (action: string, milestoneId: string) => void
}

export function MilestoneActionsDropdown({
  milestoneId,
  isOpen,
  onToggle,
  onAction
}: MilestoneActionsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Only close if the dropdown is currently open
        if (isOpen) {
          onToggle(milestoneId)
        }
      }
    }

    if (isOpen) {
      // Only add event listener when dropdown is open
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [milestoneId, onToggle, isOpen])

  const handleAction = (action: string) => {
    onAction(action, milestoneId)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => onToggle(milestoneId)}
        className="p-2 text-[#8f9bba] hover:text-[#2b3674] transition-colors"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#e0e5f2] rounded-lg shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleAction('activate')
              }}
              className="w-full px-4 py-2 text-left text-sm text-[#2b3674] hover:bg-gray-50 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Activate
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleAction('request changes')
              }}
              className="w-full px-4 py-2 text-left text-sm text-[#2b3674] hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Request Changes
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleAction('comment')
              }}
              className="w-full px-4 py-2 text-left text-sm text-[#2b3674] hover:bg-gray-50 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Comment
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleAction('delete')
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
