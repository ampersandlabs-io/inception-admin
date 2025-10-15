"use client"

import { ProjectDetails } from "@/components/projects/project-details"
import { useParams } from "next/navigation"

export default function ProjectDetailsPage() {
  const params = useParams()
  const id = params.id as string

  return (
    <div className="max-w-8xl mx-auto">
      <ProjectDetails projectId={id} />
    </div>
  )
}
