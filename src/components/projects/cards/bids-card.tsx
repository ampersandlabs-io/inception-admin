"use client"

import { OutlineButton } from "@/components/ui/outline-button"
import { FilledButton } from "@/components/ui/filled-button"

interface BidsCardProps {
  developer: {
    name: string
    role: string
    initials: string
    skills: string[]
    stats: {
      projects: number
      tasksCompleted: string
      avgRate: string
    }
  }
  onAccept?: () => void
  onReject?: () => void
}

export function BidsCard({ developer, onAccept, onReject }: BidsCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {developer.initials}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-[#2b3674] mb-1">{developer.name}</h4>
          <p className="text-[#8f9bba] text-sm mb-3">{developer.role}</p>

          <div className="flex gap-2 mb-4">
            {developer.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-[#2b3674] text-white text-xs rounded-full">
                {skill}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <p className="text-[#8f9bba] text-xs mb-1">Projects</p>
              <p className="text-[#2b3674] font-bold text-lg">{developer.stats.projects}</p>
            </div>
            <div>
              <p className="text-[#8f9bba] text-xs mb-1">Tasks Completed</p>
              <p className="text-[#2b3674] font-bold text-lg">{developer.stats.tasksCompleted}</p>
            </div>
            <div>
              <p className="text-[#8f9bba] text-xs mb-1">Avg. Rate</p>
              <p className="text-[#2b3674] font-bold text-lg">{developer.stats.avgRate}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <FilledButton className="flex-1" onClick={onAccept}>
              Accept
            </FilledButton>
            <OutlineButton className="flex-1" onClick={onReject}>
              Reject
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  )
}
