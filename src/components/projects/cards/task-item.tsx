"use client"

import { getPriorityColor, getTaskStatusIcon } from "@/lib/milestone-utils"
import { Task } from "@/types/task"
import { MoreHorizontal } from "lucide-react"

interface TaskItemProps {
  task: Task
  onAction?: (action: string, taskId: string) => void
}

export function TaskItem({ task, onAction }: TaskItemProps) {
  const isCompleted = task.status.toLowerCase() === 'completed' || task.status.toLowerCase() === 'done'

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
        isCompleted
          ? 'bg-[#258BBC] border-[#258BBC]'
          : 'border-gray-300'
      }`}>
        {isCompleted && getTaskStatusIcon(task.status)}
      </div>

      <div className="flex-1">
        <span className={`text-sm ${
          isCompleted ? 'text-[#8f9bba] line-through' : 'text-[#2b3674]'
        }`}>
          {task.title}
        </span>
        {task.priority_name && (
          <span className={`ml-2 px-1.5 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority_name)}`}>
            {task.priority_name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isCompleted
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {task.status}
        </span>
        <button
          className="p-1 text-[#8f9bba] hover:text-[#2b3674] transition-colors"
          onClick={() => onAction?.('more', task.id)}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
