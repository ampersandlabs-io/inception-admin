"use client"

import { useEffect, useState } from "react"
// import { OutlineButton } from "@/components/ui/outline-button"
// import { BidsCard } from "@/components/client/projects/cards/bids-card"
// import { SquadCard } from "@/components/client/projects/cards/squad-card"
// import { FilledButton } from "@/components/ui/filled-button"
// import { useBids, useAcceptBid, useRejectBid } from "@/lib/queries/bids"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  Star,
  MessageSquare,
  Loader2
} from "lucide-react"

import { Project } from "@/types"
import { useSquad } from "@/hooks/useSquad"
import { useProjects } from "@/hooks/useProjects"
import { formatCurrency } from "@/utils/util"
import { useProjectBid } from "@/hooks/useProjectBid"

interface SquadTabProps {
  project: Project
}

export function SquadTab({ project }: SquadTabProps) {

  const [activeSection, setActiveSection] = useState('Bids')

  // Real bidding data from API
  const { projectSquads, fetchDevelopersAssignedToProject, loading } = useProjects()

  const { projectBids, loading: isLoadingBids, bidsError } = useProjectBid(project.id);

  // const acceptBidMutation = useAcceptBid()
  // const rejectBidMutation = useRejectBid()

  useEffect(() => {
    fetchDevelopersAssignedToProject(project.id)
  }, [])

  // Real active squad data from API

  const handleAcceptBid = async (bidId: string) => {
    try {
      // await acceptBidMutation.mutateAsync({ projectId: project.id, bidId })
      // showSuccess('Bid accepted!', 'The developer has been notified')
    } catch (error) {
      // showError('Failed to accept bid', 'Please try again later')
    }
  }

  const handleRejectBid = async (bidId: string) => {
    try {
      // await rejectBidMutation.mutateAsync({ projectId: project.id, bidId })
      // showSuccess('Bid rejected', 'The developer has been notified')
    } catch (error) {
      // showError('Failed to reject bid', 'Please try again later')
    }
  }

  return (
    <div className="flex gap-8">
      {/* Left Sidebar Navigation */}
      <div className="w-48">
        <div className="space-y-2">
          <button
            onClick={() => setActiveSection('Active Squad')}
            className={`w-full text-left px-0 py-2 text-sm font-medium transition-colors ${
              activeSection === 'Active Squad'
                ? 'text-[#2b3674] font-semibold'
                : 'text-[#8f9bba] hover:text-[#2b3674]'
            }`}
          >
            Active Squad
          </button>
          <button
            onClick={() => setActiveSection('Bids')}
            className={`w-full text-left px-0 py-2 text-sm font-medium transition-colors ${
              activeSection === 'Bids'
                ? 'text-[#2b3674] font-semibold'
                : 'text-[#8f9bba] hover:text-[#2b3674]'
            }`}
          >
            Bids
          </button>
          <button
            onClick={() => setActiveSection('Requested')}
            className={`w-full text-left px-0 py-2 text-sm font-medium transition-colors ${
              activeSection === 'Requested'
                ? 'text-[#2b3674] font-semibold'
                : 'text-[#8f9bba] hover:text-[#2b3674]'
            }`}
          >
            Requested
          </button>
        </div>

        {/* Browse Squad Button */}
      </div>

      {/* Right Content Area */}
      <div className="flex-1">
        {activeSection === 'Active Squad' && (
          <div className="space-y-6">
            <h3 className="text-[#2b3674] text-xl font-bold">Active Squad</h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : projectSquads && projectSquads.length > 0 ? (
              <div className="space-y-4">
                {projectSquads.map((squad) => (
                  <div key={squad.id} className="bg-white border border-[#e0e5f2] rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#4318ff] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2b3674] text-lg">
                            {squad.first_name}
                          </h4>
                          <p className="text-sm text-[#8f9bba]">
                            {squad.role_name} • {squad.experience_level}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        squad.status === 'active'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {squad.status.charAt(0).toUpperCase() + squad.status.slice(1)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#4318ff]" />
                        <span className="text-sm text-[#8f9bba]">Rate:</span>
                        <span className="font-semibold text-[#2b3674]">
                          {formatCurrency(squad.hourly_rate)}/hour
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#4318ff]" />
                        <span className="text-sm text-[#8f9bba]">Joined:</span>
                        <span className="font-semibold text-[#2b3674]">
                          {new Date(squad.assigned_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-[#4318ff]" />
                        <span className="text-sm text-[#8f9bba]">Status:</span>
                        <span className="font-semibold text-[#2b3674]">
                          {squad.availability_status}
                        </span>
                      </div>
                    </div>

                    {squad.bio && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-[#2b3674]">Bio:</span>
                        <p className="text-[#8f9bba] text-sm leading-relaxed mt-1">{squad.bio}</p>
                      </div>
                    )}

                    {squad.tech_stacks && squad.tech_stacks.length > 0 && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-[#2b3674]">Tech Stack:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {squad.tech_stacks.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#f8f9ff] text-[#4318ff] text-xs rounded-full border border-[#e0e5f2]"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>

                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#f8f9ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <User className="w-8 h-8 text-[#4318ff]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2b3674] mb-2">No active squad members</h3>
                <p className="text-[#8f9bba]">Accept bids to build your squad</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'Bids' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
            <h3 className="text-[#2b3674] text-xl font-bold">Bids</h3>
            </div>


            {/* Bids List */}
            {isLoadingBids ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : bidsError ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-[#2b3674] mb-2">Failed to load bids</h3>
                <p className="text-[#8f9bba]">Please try again later</p>
              </div>
            ) : projectBids && projectBids.length > 0 ? (
              <div className="space-y-4">
                {/* {bidsData.bids.map((bid) => (
                  <div key={bid.id} className="bg-white border border-[#e0e5f2] rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#4318ff] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2b3674]">
                            {bid.developer?.full_name || 'Anonymous Developer'}
                          </h4>
                          <p className="text-sm text-[#8f9bba]">
                            {bid.developer?.experience_level || 'Developer'}
                          </p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(bid.status)}`}>
                        {getStatusIcon(bid.status)}
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#4318ff]" />
                        <span className="text-sm text-[#8f9bba]">Rate:</span>
                        <span className="font-semibold text-[#2b3674]">
                          {formatCurrency(bid.proposed_rate)}/hour
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#4318ff]" />
                        <span className="text-sm text-[#8f9bba]">Duration:</span>
                        <span className="font-semibold text-[#2b3674]">{bid.estimated_duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-[#4318ff]" />
                        <span className="text-sm text-[#8f9bba]">Experience:</span>
                        <span className="font-semibold text-[#2b3674]">
                          {bid.developer?.hourly_rate ? formatCurrency(bid.developer.hourly_rate) : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-[#4318ff]" />
                        <span className="text-sm font-medium text-[#2b3674]">Cover Letter:</span>
                      </div>
                      <p className="text-[#8f9bba] text-sm leading-relaxed">{bid.cover_letter}</p>
                    </div>

                    {bid.developer?.tech_stacks && bid.developer.tech_stacks.length > 0 && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-[#2b3674]">Tech Stack:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {bid.developer.tech_stacks.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#f8f9ff] text-[#4318ff] text-xs rounded-full border border-[#e0e5f2]"
                            >
                              {tech}
                            </span>
              ))}
            </div>
                      </div>
                    )}

                    {bid.status === 'pending' && (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleAcceptBid(bid.id)}
                          disabled={acceptBidMutation.isPending}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {acceptBidMutation.isPending ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          )}
                          Accept Bid
                        </Button>
                        <Button
                          onClick={() => handleRejectBid(bid.id)}
                          disabled={rejectBidMutation.isPending}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          {rejectBidMutation.isPending ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-2" />
                          )}
                          Reject Bid
                        </Button>
                      </div>
                    )}
                  </div>
                ))} */}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#f8f9ff] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="w-8 h-8 text-[#4318ff]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2b3674] mb-2">No bids yet</h3>
                <p className="text-[#8f9bba]">Be the first to submit a bid for this project</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'Requested' && (
          <div className="space-y-6">
            <h3 className="text-[#2b3674] text-xl font-bold">Requested</h3>
            <div className="text-center py-12">
              <p className="text-[#8f9bba]">No requested developers</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
