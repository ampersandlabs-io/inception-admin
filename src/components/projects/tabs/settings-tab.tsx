"use client"

import { Project } from "@/types"
import { MoreHorizontal } from "lucide-react"

const notificationSettings = [
  { label: "Visibility", enabled: true },
  { label: "Item comment notifications", enabled: false },
  { label: "Buyer review notifications", enabled: true },
  { label: "Rating reminders notifications", enabled: false },
  { label: "Meetups near you notifications", enabled: false },
  { label: "Company news notifications", enabled: true },
  { label: "New launches and projects", enabled: true },
  { label: "Monthly product changes", enabled: false },
  { label: "Subscribe to newsletter", enabled: false },
  { label: "Email me when someone follows me", enabled: true }
]

interface ToggleSwitchProps {
  enabled: boolean
}

function ToggleSwitch({ enabled }: ToggleSwitchProps) {
  return (
    <div className="relative">
      <input type="checkbox" className="sr-only" defaultChecked={enabled} />
      <div className={`w-12 h-6 rounded-full shadow-inner ${enabled ? 'bg-[#4318ff]' : 'bg-gray-300'}`}></div>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${enabled ? 'right-1' : 'left-1'}`}></div>
    </div>
  )
}


interface SettingsTabProps {
  project: Project
}

export function SettingsTab({ project }: SettingsTabProps) {

  console.log(project);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[#2b3674] text-xl font-bold">Settings</h3>
        <button className="p-2 text-[#8f9bba] hover:text-[#2b3674] transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {notificationSettings.map((setting, index) => (
          <div key={index} className="flex items-center gap-4">
            <ToggleSwitch enabled={setting.enabled} />
            <div>
              <h4 className="font-medium text-[#2b3674] text-[15px]">{setting.label}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
