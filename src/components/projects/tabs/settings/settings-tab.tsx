"use client";

import { Project } from "@/types";
import { useState, useEffect } from "react";
import { MoreHorizontal, Globe, Lock, Check, Loader2 } from "lucide-react";
import { useSnackbar } from "@/contexts/snackbar-context";
import { useProjectSettings } from "@/hooks/useProjectSettings";

interface SettingsTabProps {
  project: Project;
}

type VisibilityOption = "public" | "private";

const notificationSettings = [{ label: "Email Notifications", enabled: true, onChange: {} }];

const squadSettings = [{ label: "Invite Only", enabled: true }];

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`w-12 h-6 rounded-full shadow-inner ${
          enabled ? "bg-[#258BBC]" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
          enabled ? "right-1" : "left-1"
        }`}
      ></div>
    </div>
  );
}

const visibilityOptions: {
  value: VisibilityOption;
  label: string;
  description: string;
  icon: typeof Globe;
  color: string;
}[] = [
  {
    value: "public",
    label: "Public",
    description: "Anyone can view and bid on this project",
    icon: Globe,
    color: "green",
  },
  {
    value: "private",
    label: "Private",
    description: "Only you can see this project",
    icon: Lock,
    color: "gray",
  },
];

export function SettingsTab({ project }: SettingsTabProps) {
  const [selectedVisibility, setSelectedVisibility] =
    useState<VisibilityOption>(
      (project.visibility?.toLowerCase() as VisibilityOption) || "public"
    );
  const { showSuccess, showError } = useSnackbar();
  const { updateProjectVisibility } = useProjectSettings();

  const [inviteOnly, setInviteOnly] = useState<boolean>(
    project.invite_only ?? false
  );

  const [loadingVisibility, setLoadingVisibility] = useState<VisibilityOption | null>(null);

  // Sync visibility state when project data changes
  useEffect(() => {
    if (project.visibility) {
      const normalizedVisibility =
        project.visibility.toLowerCase() as VisibilityOption;
      setSelectedVisibility(normalizedVisibility);
    }

    // Display invite only status
    setInviteOnly(!!project.invite_only);
  }, [project.visibility, project.invite_only]);

  const handleVisibilityChange = async (visibility: VisibilityOption) => {
    if (visibility === selectedVisibility) return;

    setLoadingVisibility(visibility);

    try {
      await updateProjectVisibility(project.id, visibility);
      setSelectedVisibility(visibility);
      showSuccess("Success", "Project visibility updated successfully");
      setSelectedVisibility(visibility);
    } catch (error: any) {
      showError(
        "Error",
        error.message || "Failed to update project visibility"
      );
    } finally {
      setLoadingVisibility(null);
    }
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = "border-2 transition-all duration-200";

    if (!isSelected) {
      return `${baseClasses} border-gray-200 bg-white hover:border-gray-300`;
    }

    switch (color) {
      case "green":
        return `${baseClasses} border-green-500 bg-green-50`;
      case "blue":
        return `${baseClasses} border-blue-500 bg-blue-50`;
      case "gray":
        return `${baseClasses} border-gray-500 bg-gray-50`;
      default:
        return `${baseClasses} border-[#258BBC] bg-blue-50`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[#2b3674] text-xl font-bold">Settings</h3>
        <button className="p-2 text-[#8f9bba] hover:text-[#2b3674] transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Project Visibility Section */}
      <div className="space-y-4">
        <div>
          <h4 className="text-[#2b3674] text-lg font-semibold mb-2">
            Project Visibility
          </h4>
          <p className="text-[#8f9bba] text-sm mb-4">
            Control who can view and bid on this project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibilityOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedVisibility === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleVisibilityChange(option.value)}
                className={`relative p-4 rounded-lg text-left ${getColorClasses(
                  option.color,
                  isSelected
                )} ${
                  loadingVisibility && !isSelected
                  ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? option.color === "green"
                          ? "bg-green-100"
                          : option.color === "blue"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isSelected
                          ? option.color === "green"
                            ? "text-green-600"
                            : option.color === "blue"
                            ? "text-blue-600"
                            : "text-gray-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold text-[#2b3674] text-sm">
                        {option.label}
                      </h5>
                      {isSelected && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                      {loadingVisibility === option.value && (
                        <Loader2 className="w-4 h-4 text-[#258BBC] animate-spin" />
                      )}
                    </div>
                    <p className="text-[#8f9bba] text-xs">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Invite only */}
      <div className="space-y-6 mt-8">
        <div>
          <h4 className="text-[#2b3674] text-lg font-semibold mb-2">
            Squad Settings
          </h4>
          <p className="text-[#8f9bba] text-sm mb-4"></p>
        </div>

        <div className="space-y-6">
          {squadSettings.map((setting, index) => (
            <div key={index} className="flex items-center gap-4">
              <ToggleSwitch
                enabled={inviteOnly}
                onChange={(val) => setInviteOnly(val)}
              />{" "}
              <div>
                <h4 className="font-medium text-[#2b3674] text-[15px]">
                  {setting.label}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="space-y-6 mt-8">
        <div>
          <h4 className="text-[#2b3674] text-lg font-semibold mb-2">
            Notifications
          </h4>
          <p className="text-[#8f9bba] text-sm mb-4">
            Manage your notification preferences
          </p>
        </div>

        <div className="space-y-6">
          {notificationSettings.map((setting, index) => (
            <div key={index} className="flex items-center gap-4">
              <ToggleSwitch enabled={setting.enabled} onChange={setting.onChange} />
              <div>
                <h4 className="font-medium text-[#2b3674] text-[15px]">
                  {setting.label}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
