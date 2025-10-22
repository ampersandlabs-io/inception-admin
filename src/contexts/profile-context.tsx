"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WorkExperience {
  title: string
  company: string
  city: string
  country: string
  startDate: string
  endDate: string
  description: string
}

interface ProfileData {
  selectedRole: string
  workExperiences: WorkExperience[]
  yearsOfExperience: string
  techStack: string[]
  educationBackground: string[]
}

interface ProfileContextType {
  profileData: ProfileData
  updateProfileData: (updates: Partial<ProfileData>) => void
  addWorkExperience: (experience: WorkExperience) => void
  addTechToStack: (tech: string) => void
  removeTechFromStack: (tech: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData>({
    selectedRole: "",
    workExperiences: [],
    yearsOfExperience: "",
    techStack: [],
    educationBackground: [],
  })

  const updateProfileData = (updates: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...updates }))
  }

  const addWorkExperience = (experience: WorkExperience) => {
    setProfileData((prev) => ({
      ...prev,
      workExperiences: [...prev.workExperiences, experience],
    }))
  }

  const addTechToStack = (tech: string) => {
    setProfileData((prev) => ({
      ...prev,
      techStack: [...prev.techStack, tech],
    }))
  }

  const removeTechFromStack = (tech: string) => {
    setProfileData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }))
  }

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        updateProfileData,
        addWorkExperience,
        addTechToStack,
        removeTechFromStack,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
