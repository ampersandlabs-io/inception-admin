"use client"

import { useState } from "react"
import { Plus, CheckCircle, Clock, AlertCircle, MoreHorizontal, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Project } from "@/types"

const sampleMilestones = [
  {
    id: 1,
    title: "Project Setup & Planning",
    description: "Initial project setup, environment configuration, and planning phase",
    status: "completed",
    dueDate: "2024-01-15",
    assignedTo: "John Doe",
    progress: 100,
    tasks: [
      { id: 1, title: "Set up development environment", completed: true },
      { id: 2, title: "Create project repository", completed: true },
      { id: 3, title: "Define project requirements", completed: true }
    ]
  },
  {
    id: 2,
    title: "UI/UX Design Implementation",
    description: "Implement the user interface and user experience design",
    status: "in_progress",
    dueDate: "2024-02-28",
    assignedTo: "Jane Smith",
    progress: 65,
    tasks: [
      { id: 4, title: "Create wireframes", completed: true },
      { id: 5, title: "Design mockups", completed: true },
      { id: 6, title: "Implement responsive design", completed: false },
      { id: 7, title: "User testing", completed: false }
    ]
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Develop the backend API and database structure",
    status: "pending",
    dueDate: "2024-03-15",
    assignedTo: "Mike Johnson",
    progress: 0,
    tasks: [
      { id: 8, title: "Set up database schema", completed: false },
      { id: 9, title: "Create API endpoints", completed: false },
      { id: 10, title: "Implement authentication", completed: false }
    ]
  }
]

interface MilestonesTabProps {
  project: Project
}

export function MilestonesTab({ project }: MilestonesTabProps) {

  console.log(project);

  const [activeView, setActiveView] = useState<'milestones' | 'tasks'>('milestones')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-600" />
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveView('milestones')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'milestones'
                ? 'bg-[#4318ff] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Milestones
          </button>
          <button
            onClick={() => setActiveView('tasks')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeView === 'tasks'
                ? 'bg-[#4318ff] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tasks
          </button>
        </div>
        <Button className="bg-[#4318ff] hover:bg-[#3a0fe6] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add {activeView === 'milestones' ? 'Milestone' : 'Task'}
        </Button>
      </div>

      {/* Milestones View */}
      {activeView === 'milestones' && (
        <div className="space-y-4">
          {sampleMilestones.map((milestone) => (
            <div key={milestone.id} className="bg-white border border-[#e0e5f2] rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(milestone.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-[#2b3674]">{milestone.title}</h3>
                    <p className="text-[#8f9bba] text-sm">{milestone.description}</p>
                  </div>
                </div>
                <button className="p-2 text-[#8f9bba] hover:text-[#2b3674] transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#8f9bba]" />
                  <span className="text-sm text-[#8f9bba]">Due:</span>
                  <span className="text-sm font-medium text-[#2b3674]">{formatDate(milestone.dueDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#8f9bba]" />
                  <span className="text-sm text-[#8f9bba]">Assigned:</span>
                  <span className="text-sm font-medium text-[#2b3674]">{milestone.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                    {milestone.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#2b3674]">Progress</span>
                  <span className="text-sm text-[#8f9bba]">{milestone.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#4318ff] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Tasks Preview */}
              <div className="border-t border-[#e0e5f2] pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#2b3674]">Tasks</span>
                  <span className="text-sm text-[#8f9bba]">
                    {milestone.tasks.filter(task => task.completed).length} of {milestone.tasks.length} completed
                  </span>
                </div>
                <div className="space-y-2">
                  {milestone.tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-[#4318ff] border-[#4318ff]'
                          : 'border-gray-300'
                      }`}>
                        {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${
                        task.completed ? 'text-[#8f9bba] line-through' : 'text-[#2b3674]'
                      }`}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                  {milestone.tasks.length > 3 && (
                    <p className="text-xs text-[#8f9bba] ml-7">
                      +{milestone.tasks.length - 3} more tasks
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tasks View */}
      {activeView === 'tasks' && (
        <div className="space-y-4">
          {sampleMilestones.flatMap(milestone =>
            milestone.tasks.map(task => ({
              ...task,
              milestoneTitle: milestone.title,
              milestoneStatus: milestone.status
            }))
          ).map((task) => (
            <div key={task.id} className="bg-white border border-[#e0e5f2] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    task.completed
                      ? 'bg-[#4318ff] border-[#4318ff]'
                      : 'border-gray-300'
                  }`}>
                    {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      task.completed ? 'text-[#8f9bba] line-through' : 'text-[#2b3674]'
                    }`}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-[#8f9bba]">{task.milestoneTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.milestoneStatus === 'completed' ? 'bg-green-100 text-green-800' :
                    task.milestoneStatus === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {task.milestoneStatus.replace('_', ' ').toUpperCase()}
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
    </div>
  )
}
