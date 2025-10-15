"use client"

import { Project } from "@/types"
import { MoreHorizontal, Eye, Download } from "lucide-react"

const documents = [
  {
    title: "High Fidelity Mockups",
    description: "Describes the features, user needs, and goals."
  },
  {
    title: "Functional Specification Document (FSD)",
    description: "Breaks down system functions, screens, and behavior."
  },
  {
    title: "User Stories / Use Cases",
    description: "Scenarios describing how different users interact with the system."
  },
  {
    title: "User Journey / Flow Diagrams",
    description: "Visual flow of how users interact with the product."
  },
  {
    title: "Architecture Diagram",
    description: "High-level system components and how they interact."
  }
]


interface LegalTabProps {
  project: Project
}

export function LegalTab({ project }: LegalTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#2b3674] text-xl font-bold">Documents</h3>
        <button className="p-2 text-[#8f9bba] hover:text-[#2b3674] transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="p-0">
            <div className="mb-4">
              <h4 className="font-medium text-[#2b3674] text-[15px] mb-1">{doc.title}</h4>
              <p className="text-[#8f9bba] text-sm">{doc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
