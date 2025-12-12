"use client";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { DeveloperProfile } from "@/types";
import {
  Briefcase,
  CheckCircle,
  DollarSign,
  Github,
  Globe,
  MoreVertical,
  Star,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SquadCardProps {
  developer: DeveloperProfile;
  onApprove: () => void;
  onReject: () => void;
}

export function SquadCard({ developer, onApprove, onReject }: SquadCardProps) {
  const router = useRouter();

  return (
    <div
      key={developer.id}
      className="bg-white backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white transition-all"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {/* Name + check icon */}
          {/* First Name Last Name */}
          <h3 className="text-lg font-semibold text-[#2b3674]">
            {developer.first_name || "Unknown"}{" "}
            {developer.last_name || "Unknown"}
          </h3>
          {/* Vetting status */}
          {developer.vetting_status == "approved" && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          {developer.vetting_status == "rejected" && (
            // You will need to import XCircle (or similar) from your icon library
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>

        {/* More actions dropdown */}
        <span className="">
          <Dropdown
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="text-[#a3aed0] cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            }
            items={[
              {
                label: "Approve",
                onClick: onApprove,
              },
              {
                label: "Reject",
                onClick: onReject,
              },
            ]}
          />
        </span>
      </div>

      {/* Role */}
      <p className="text-sm text-gray-400">
        {developer.role_name || "Unknown role"}
      </p>

      {/* Email */}
      <p className="text-sm text-gray-400">
        {developer.email || "Email not available"}
      </p>

      {/* Bio */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {developer.bio || "No bio available"}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-xs mb-1">Experience</p>
          <span className="font-medium">
            {developer.years_experience || 0} years
          </span>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Hourly Rate</p>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="font-medium">
              {developer.hourly_rate || "Negotiable"}
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Rating</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{developer.rating || "-"}</span>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Projects</p>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="font-medium">
              {developer.completed_projects || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {developer.tech_stacks?.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-xs text-purple-300"
            >
              {tech.name}
            </span>
          ))}
          {developer.tech_stacks && developer.tech_stacks.length > 4 && (
            <span className="px-2 py-1 text-xs text-gray-400">
              +{developer.tech_stacks.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex gap-3">
          {developer.github_username && (
            <a
              href={`https://github.com/${developer.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {developer.portfolio_url && (
            <a
              href={developer.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
        <button
          onClick={() => router.push(`squad/${developer.id}`)}
          className="inline-flex items-center gap-2 cursor-pointer px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
