"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Save, Users } from "lucide-react";
import { Project } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createProject, updateProject } from "@/services/projectService";

export function CreateProjectModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {

  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [project] = useState<Project | null>(null);
  const [categories] = useState<unknown[]>([]);
  // const [businessTypes, setBusinessTypes] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    scope: "6+ months",
    experience_level: "Senior",
    budget_type: "fixed",
    budget_amount: 0,
    budget_currency: "USD",
    tech_stack_ids: [],
    project_type_ids: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data: any = {
        title: formData.title,
        description: formData.description || "",
      };

      console.log("Saving project with data:", data);

      if (project) {
        // Update existing project
        await updateProject(project.id, data);
      } else {
        // Create new project
        // await api.companies.create(data);
        createProject(data);
      }

      // router.push("/client/dashboard");
    } catch (error: any) {
      setError(error);
      //   alert(error.message || "Failed to save project profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[90vh] sm:max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto">

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Logo Upload */}
            {/* <FileUpload
              label="Company Logo "
              description="Upload your company logo (PNG, JPG, SVG)"
              accept="image/*"
              maxSize={2}
              multiple={false}
              onUpload={handleLogoUpload}
              uploadedFiles={uploadedLogo}
            /> */}

            {/* Project Title */}
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Project Name <span className="text-red-400">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border-gray rounded-lg placeholder-gray-500 focus:outline-none"
                placeholder=""
              />
            </div>

            {/* Category and Business Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="size_id"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  <Users className="inline w-4 h-4 mr-1" />
                  Category <span className="text-gray-500 text-xs"></span>
                </Label>

                <select
                  id="category_id"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg border-gray focus:outline-none focus:border-purple-400 [&>option]:bg-gray-900"
                >
                  <option value="" className="bg-gray-900 text-gray-400">
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="bg-gray-900 "
                    >
                      {category.display_name || category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div>
                <Label
                  htmlFor="business_type_id"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  <Briefcase className="inline w-4 h-4 mr-1" />
                  Business Type <span className="text-gray-500 text-xs"></span>
                </Label>
                <select
                  id="business_type_id"
                  value={formData.business_type_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      business_type_id: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg border-gray focus:outline-none focus:border-purple-400 [&>option]:bg-gray-900"
                >
                  <option value="" className="bg-gray-900 text-gray-400">
                    Select type
                  </option>
                  {businessTypes.map((type) => (
                    <option
                      key={type.id}
                      value={type.id}
                      className="bg-gray-900 "
                    >
                      {type.name}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>

            {/* Location */}
            {/* <div className="space-y-4">
              <Label>
                <MapPin className="inline w-4 h-4 mr-1" />
                Location <span className="text-gray-500 text-xs"></span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="text"
                  placeholder="Country"
                  value={formData.location_country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location_country: e.target.value,
                    })
                  }
                  className="px-4 py-2  rounded-lg  placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
                <Input
                  type="text"
                  placeholder="State/Province"
                  value={formData.state_region}
                  onChange={(e) =>
                    setFormData({ ...formData, state_region: e.target.value })
                  }
                  className="px-4 py-2  rounded-lg  placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
                <Input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="px-4 py-2  rounded-lg  placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div> */}

            {/* Website */}
            {/* <div>
              <Label
                htmlFor="website"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                <Globe className="inline w-4 h-4 mr-1" />
                Website <span className="text-gray-500 text-xs"></span>
              </Label>
              <Input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-4 py-2  rounded-lg  placeholder-gray-500 focus:outline-none focus:border-purple-400"
                placeholder="https://example.com"
              />
            </div> */}

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Description{" "}
                <span className="text-gray-500 text-xs"></span>
              </label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg  placeholder-gray-500 focus:outline-none focus:border-purple-400"
                placeholder="Tell us about your company, what you do, and what makes you unique..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800  font-medium rounded-lg transition-colors"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
