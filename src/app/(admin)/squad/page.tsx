"use client";
import { useState } from "react";

import { Loader2, GroupIcon } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { CreateSquadModal } from "@/sections/squad/create-company-modal";
import { SquadCard } from "@/components/squad/squad-card";
import { useSquad } from "@/hooks/useSquad";
import { PaginatedList } from "@/components/paginated-list";
import { usePagination } from "@/hooks/usePagination";
import { useSnackbar } from "@/contexts/snackbar-context"
import { Button } from "@/components/ui/button";

export default function SquadPage() {
  
  const { page, pageSize, handlePageChange } = usePagination({ defaultPage: 1, defaultPageSize: 9 });
  const [open, setOpen] = useState(false);
  const { squads: developers, loading, totalItems, approveSquad, rejectSquad } = useSquad(page, pageSize);
  const { showSuccess, showError } = useSnackbar()

  const handleApprove = async (developerId: string) => {
    try {
      await approveSquad(developerId);
      // optional toast here, if you use a snackbar
      showSuccess("Approved", "Developer successfully approved");
      
    } catch (error: any) {
      showError("Approval failed", error.message || "Failed to approve");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectSquad(id);
      showSuccess("Rejected", "Developer was rejected");
    } catch (error: any) {
      showError("Reject failed", error.message || "Unable to reject developer");
    }
  };

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
          <PaginatedList
            items={developers}
            loading={loading}
            totalItems={totalItems}
            page={page}
            pageSize={pageSize}
            setPage={handlePageChange}
            onPageChange={handlePageChange}
            renderItem={(developer) => (
              <SquadCard 
                key={developer.id} 
                developer={developer}
                onApprove={() => handleApprove(developer.id)}
                onReject={() => handleReject(developer.id)}
              />
            )}
            emptyState={
              <EmptyState
                icon={GroupIcon}
                title="You have no squads"
                description=""
                actionText="Create Squad"
                onAction={() => setOpen(true)}
              />
            }
            renderLayout={(items, pagination) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items}
                </div>
                <div className="mt-4 flex justify-center w-full">
                  {pagination}
                </div>
              </>
            )}
          />
        </div>
      </div>

      {/* Create Content Content */}
      <CreateSquadModal open={open} setOpen={setOpen} />
    </div>
  );
}
