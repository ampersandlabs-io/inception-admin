"use client";

import { useCallback, useEffect, useState } from "react";
import { AddReferenceModal } from "@/sections/references/add-reference-modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Edit, Loader2, MoreHorizontal, Trash } from "lucide-react";
import { fetchReference } from "@/services/referenceService";
import { Dropdown } from "@/components/ui/dropdown";

const referenceColumns: Record<string, { label: string; key: string }[]> = {
  "tech-stacks": [
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Description", key: "description" },
    { label: "Is Active", key: "is_active" },
  ],
  "project-categories": [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Is Active", key: "is_active" },
  ],
  "experience-levels": [
    { label: "Name", key: "name" },
    { label: "Min Years", key: "min_years" },
    { label: "Max Years", key: "max_years" },
    { label: "Is Active", key: "is_active" },
  ],
  "project-scopes": [
    { label: "Display Name", key: "display_name" },
    { label: "Name", key: "name" },
    { label: "Min Months", key: "min_months" },
    { label: "Max Months", key: "max_months" },
    { label: "Is Active", key: "is_active" },
  ],
  "budget-types": [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Is Active", key: "is_active" },
  ],
  "project-types": [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Is Active", key: "is_active" },
  ],
};

export default function ReferencesPage() {
  const referenceData = [
    {
      title: "Tech Stacks",
      key: "tech-stacks",
      description: "View all available technologies and frameworks",
    },
    {
      title: "Project Categories",
      key: "project-categories",
      description: "Browse project categories and types",
    },
    {
      title: "Experience Levels",
      key: "experience-levels",
      description: "See developer experience level definitions",
    },
    {
      title: "Project Scopes",
      key: "project-scopes",
      description: "View project scope and duration options",
    },
    {
      title: "Budget Types",
      key: "budget-types",
      description: "Browse budget type options",
    },
    {
      title: "Project Types",
      key: "project-types",
      description: "View available project types",
    },
  ];

  const [activeKey, setActiveKey] = useState(referenceData[0].key);
  const [dataMap, setDataMap] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   if (dataMap[activeKey]) return;
  //   fetchData();
  // }, [activeKey, dataMap]);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     // const ep = referenceData.find((e) => e.key === activeKey)!;
  //     const json = await fetchReference(activeKey);
  //     console.log(`${activeKey} References ==> ${JSON.stringify(json)}`);
  //     setDataMap((prev) => ({ ...prev, [activeKey]: json }));
  //   } catch (e) {
  //     console.error(e);
  //     setDataMap((prev) => ({ ...prev, [activeKey]: [] }));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { 
      const json = await fetchReference(activeKey);
      const data = Array.isArray(json) ? json : json.items ?? [];
      console.log(`${activeKey} References ==> ${JSON.stringify(json)}`);
      setDataMap((prev) => ({ ...prev, [activeKey]: data }));
    } catch (e) {
      console.error(e);
      setDataMap((prev) => ({ ...prev, [activeKey]: [] }));
    } finally {
      setLoading(false);
    }
  }, [activeKey]);
  
  useEffect(() => {
    if (dataMap[activeKey]) return;
    fetchData();
  }, [activeKey, dataMap, fetchData]);

  function onEdit(item: any) {
    console.log("Edit:", item);
  }

  function onDelete(item: any) {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      console.log("Deleting:", item);
    }
  }

  // const activeEndpoint = referenceData.find((e) => e.key === activeKey);

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex flex-wrap gap-2 border-b mb-4">
        <nav className="flex space-x-8">
          {referenceData.map((e) => (
            <button
              key={e.key}
              onClick={() => setActiveKey(e.key)}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeKey === e.key
                  ? "border-[#4318ff] text-[#4318ff]"
                  : "border-transparent text-[#a3aed0] hover:text-[#2b3674] hover:border-[#e0e5f2]"
              )}
            >
              {e.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-[#e0e5f2]">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {referenceData.find((e) => e.key === activeKey)?.title}
          </h2>
          <Button onClick={() => setModalOpen(true)}>Add New</Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {(referenceColumns[activeKey] || []).map((col) => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {(dataMap[activeKey] || []).map((item) => (
                <TableRow key={item.id} className="border-[#e0e5f2]">
                  {(referenceColumns[activeKey] || []).map((col) => (
                    <TableCell key={col.key} className="text-[#2b3674]">
                      {item[col.key] ?? "-"}
                    </TableCell>
                  ))}

                  <TableCell>
                    <Dropdown
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#a3aed0]"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      }
                      items={[
                        {
                          label: "Edit",
                          icon: <Edit className="w-4 h-4 text-gray-500" />,
                          onClick: () => onEdit(dataMap[activeKey]),
                        },
                        {
                          label: "Delete",
                          icon: <Trash className="w-4 h-4 text-red-500" />,
                          className: "text-red-600 hover:bg-red-50",
                          onClick: () => onDelete(dataMap[activeKey]),
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Modal */}
      <AddReferenceModal
        title={"title"}
        open={modalOpen}
        setOpen={setModalOpen}
        activeKey={activeKey}
        onCreated={(item) =>
          setDataMap((prev) => ({
            ...prev,
            [activeKey]: [...(prev[activeKey] || []), item],
          }))
        }
      />
    </div>
  );
}
