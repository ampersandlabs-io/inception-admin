"use client"

import { useState } from "react"
import { Plus, MoreHorizontal, User, Mail, Loader2 } from "lucide-react"
// import { useProjectCollaborators, useProjectInvitations, useInviteCollaborator, useCancelInvitation } from "@/lib/queries/collaborators"
import { Project } from "@/types"

interface TeamTabProps {
  project: Project
}

export function TeamTab({ project }: TeamTabProps) {

  const [activeView, setActiveView] = useState<'members' | 'invitations'>('members')

  // Fetch collaborators (active team members)
  // const {
  //   data: collaborators = [],
  //   isLoading: collaboratorsLoading,
  //   error: collaboratorsError
  // } = useProjectCollaborators(project.id, undefined, true, false)

  // Fetch pending invitations
  // const {
  //   data: invitations = [],
  //   isLoading: invitationsLoading,
  //   error: invitationsError
  // } = useProjectInvitations(project.id, 'pending', false)

  // Mutations
  // const inviteCollaboratorMutation = useInviteCollaborator()
  // const cancelInvitationMutation = useCancelInvitation()

  // const handleCancelInvitation = async (invitationId: number) => {
  //   try {
  //     await cancelInvitationMutation.mutateAsync({ projectId: project.id, invitationId })
  //   } catch (error: any) {
  //   }
  // }

  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName?.charAt(0) || ''
    const last = lastName?.charAt(0) || ''
    return `${first}${last}`.toUpperCase()
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#ffffff] text-xl font-bold">Team</h3>
        <button className="flex items-center gap-2 px-6 py-1 bg-gray-100 text-[#000000] rounded-lg hover:bg-gray-200 transition-colors">
          Invite
        </button>
      </div>

    

    </div>
  )
}
