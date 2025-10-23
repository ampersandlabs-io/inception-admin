"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";

import {
  Loader2,
  GroupIcon,
} from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { CreateSquadModal } from "@/sections/squad/create-company-modal";
import { SquadCard } from "@/components/projects/cards/squad-card";
import { useSquad } from "@/hooks/useSquad";

export default function SquadPage() {

  const [open, setOpen] = useState(false);
  const { squads: developers, loading } = useSquad();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (

    <div className="min-h-screen">
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#2b3674]">Squad</h3>
          <Button onClick={() => setOpen(true)}>Create Squad</Button>
        </div>

        {loading ? (
          <div
            role="status"
            className="min-h-screen flex items-center justify-center"
          >
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        ) : developers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {developers.map((developer) => (
              <SquadCard key={developer.id} developer={developer} />
              // <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={GroupIcon}
            title="You have no squads"
            description=""
            actionText="Create Squad"
            onAction={() => setOpen(true)}
          />
        )}
      </div>
    </div>

    {/* Create Content Content */}
    <CreateSquadModal open={open} setOpen={setOpen} />
  </div>
  );
}
