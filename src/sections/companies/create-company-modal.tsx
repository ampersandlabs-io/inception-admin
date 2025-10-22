"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Briefcase, Globe, Loader2, MapPin, Save, Users } from "lucide-react";
import { Company, CompanySize } from "@/types";
import FileUpload from "@/components/file-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createCompany, updateCompany } from "@/services/companyService"

export function CreateCompanyModal({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {

  // const router = useRouter();

  // const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [company] = useState<Company | null>(null);
  const [companySizes] = useState<CompanySize[]>([]);
  const [businessTypes] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    size_id: "",
    business_type_id: "",
    location_country: "",
    state_region: "",
    city: "",
    website: "",
    description: "",
  });

  const [uploadedLogo, setUploadedLogo] = useState<string[]>([]);
  const [error] = useState(null);

  const handleLogoUpload = async (files: File[]) => {
    // In a real app, this would upload to a backend service
    console.log("Uploading logo:", files);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add file names to uploaded list (only one logo allowed)
    const fileName = files[0]?.name;
    if (fileName) {
      setUploadedLogo([fileName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data: unknown = {
        name: formData.name,
        description: formData.description || "",
        website: formData.website || "",
        location_country: formData.location_country || "",
        state_region: formData.state_region || "",
        city: formData.city || "",
        size_id: ""
      };

      // Only add these fields if they have values
      // if (formData.size_id) {
      //   data.size_id = parseInt(formData.size_id);
      // }
      // if (formData.business_type_id) {
      //   data.business_type_id = parseInt(formData.business_type_id);
      // }
      // if (uploadedLogo[0]) {
      //   data.logo = uploadedLogo[0];
      // }

      console.log("Saving company with data:", data);

      if (company) {
        // Update existing company
        // await api.companies.update(company.id, data);
        await updateCompany(company.id, data as Company);
      } else {
        // Create new company
       const response = await createCompany(data as Company);
       console.log(`response ==> ${JSON.stringify(response)}`);

       setOpen(false);
      }

    } catch (error: any) {
      console.log(error.message || "Failed to save company profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="max-w-lg max-h-[90vh] sm:max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Company</DialogTitle>
        </DialogHeader>
        <div className="mx-auto">

            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Company Logo Upload */}
              <FileUpload
                label="Company Logo "
                description="Upload your company logo (PNG, JPG, SVG)"
                accept="image/*"
                maxSize={2}
                multiple={false}
                onUpload={handleLogoUpload}
                uploadedFiles={uploadedLogo}
              />

              {/* Company Name */}
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-2">
                  Company Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border-gray rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-400"
                  placeholder="TechCorp Inc."
                />
              </div>

              {/* Company Size and Business Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="size_id"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    <Users className="inline w-4 h-4 mr-1" />
                    Company Size{" "}
                    <span className="text-gray-500 text-xs"></span>
                  </Label>

                  <select
                    id="size_id"
                    value={formData.size_id}
                    onChange={(e) =>
                      setFormData({ ...formData, size_id: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-400 [&>option]:bg-gray-900"
                  >
                    <option value="" className="bg-gray-900 text-gray-400">
                      Select size
                    </option>
                    {companySizes.map((size) => (
                      <option
                        key={size.id}
                        value={size.id}
                        className="bg-gray-900 "
                      >
                        {size.display_name || size.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="business_type_id"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    <Briefcase className="inline w-4 h-4 mr-1" />
                    Business Type{" "}
                    <span className="text-gray-500 text-xs"></span>
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
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-400 [&>option]:bg-gray-900"
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
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <Label >
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Location{" "}
                  <span className="text-gray-500 text-xs"></span>
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
              </div>

              {/* Website */}
              <div>
                <Label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  <Globe className="inline w-4 h-4 mr-1" />
                  Website{" "}
                  <span className="text-gray-500 text-xs"></span>
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
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Company Description{" "}
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
                  // onClick={ }
                  className="px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800  font-medium rounded-lg transition-colors"
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

        <DialogFooter>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
