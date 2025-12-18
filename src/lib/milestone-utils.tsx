import React from "react"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export const getStatusIcon = (statusName: string) => {
  switch (statusName.toLowerCase()) {
    case 'completed':
    case 'done':
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case 'in progress':
    case 'in_progress':
      return <Clock className="h-5 w-5 text-blue-600" />
    case 'to do':
    case 'todo':
    case 'pending':
      return <AlertCircle className="h-5 w-5 text-orange-500" />
    default:
      return <Clock className="h-5 w-5 text-gray-400" />
  }
}

export const getStatusColor = (statusName: string) => {
  switch (statusName.toLowerCase()) {
    case 'completed':
    case 'done':
      return 'bg-green-100 text-green-800'
    case 'in progress':
    case 'in_progress':
      return 'bg-blue-100 text-blue-800'
    case 'to do':
    case 'todo':
    case 'pending':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getTaskStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'done':
      return <CheckCircle className="w-3 h-3 text-white" />
    default:
      return null
  }
}

export const calculateProgress = (tasks: Task[]) => {
  if (tasks.length === 0) return 0
  const completedTasks = tasks.filter(task =>
    task.status.toLowerCase() === 'completed' || task.status.toLowerCase() === 'done'
  )
  return Math.round((completedTasks.length / tasks.length) * 100)
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getPriorityColor = (priorityName: string) => {
  switch (priorityName.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
