"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, FolderOpen, Settings, BriefcaseBusinessIcon, UserCog, GroupIcon, ChevronDown, ChevronRight, Book } from "lucide-react"
import { AmpersandLogo } from "@/components/ampersand-logo"
import { useState } from "react"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Companies", href: "/companies", icon: BriefcaseBusinessIcon },
  { name: "Squad", href: "/squad", icon: GroupIcon },
  { name: "Users", href: "/users", icon: UserCog },
  {
    name: "References",
    href: "/references",
    icon: Book,
    // children: [
    //   { name: "Tech Stack", href: "/references/tech-stacks" },
    //   { name: "Project Categories", href: "/references/project-categories" },
    //   { name: "Experience Levels", href: "/references/experience-levels" },
    //   { name: "Project Scope", href: "/references/project-scope" }
    // ]
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {

  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<string[]>([])

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    )
  }

  return (
    <div className="w-64 bg-white border-r border-[#e0e5f2] h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-[#e0e5f2]">
        <div className="flex items-center gap-2">
          <AmpersandLogo />
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href

          const isGroup = !!item.children
          const isOpen = isGroup && openGroups.includes(item.name)

          if (!isGroup) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#4318ff] text-white"
                    : "text-[#8f9bba] hover:text-[#2b3674] hover:bg-[#f4f7fe]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          }

          // return (
          //   <Link
          //     key={item.name}
          //     href={item.href}
          //     className={cn(
          //       "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
          //       isActive ? "bg-[#4318f f] text-white" : "text-[#8f9bba] hover:text-[#2b3674] hover:bg-[#f4f7fe]",
          //     )}
          //   >
          //     <item.icon className="w-5 h-5" />
          //     {item.name}
          //   </Link>
          // )

          return (
            <div key={item.name}>
              {/* Group header */}
              <button
                onClick={() => toggleGroup(item.name)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isOpen
                    ? "bg-[#4318ff] text-white"
                    : "text-[#8f9bba] hover:text-[#2b3674] hover:bg-[#f4f7fe]"
                )}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </span>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Children links */}
              {isOpen && (
                <div className="ml-9 mt-1 space-y-1">
                  {item.children?.map((child) => {
                    const childActive = pathname === child.href
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-sm transition-colors",
                          childActive
                            ? "bg-[#e9eefe] text-[#4318ff]"
                            : "text-[#8f9bba] hover:text-[#2b3674] hover:bg-[#f4f7fe]"
                        )}
                      >
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )

        })}
      </nav>
    </div>
    
  )
}
