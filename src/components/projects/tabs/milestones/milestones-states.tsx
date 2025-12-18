"use client"

import { AlertCircle, Calendar } from "lucide-react"

export function MilestonesLoadingState() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white border border-[#e0e5f2] rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function MilestonesErrorState() {
  return (
    <div className="bg-white border border-[#e0e5f2] rounded-lg p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-[#2b3674] mb-2">Failed to load milestones</h3>
        <p className="text-[#8f9bba]">Please try again later</p>
      </div>
    </div>
  )
}

export function MilestonesEmptyState() {
  return (
    <div className="bg-white border border-[#e0e5f2] rounded-lg p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-[#2b3674] mb-2">No milestones yet</h3>
        <p className="text-[#8f9bba]">Create your first milestone to start tracking project progress</p>
      </div>
    </div>
  )
}
