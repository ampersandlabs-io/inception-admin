import { Loader2, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { createReference } from "@/services/referenceService";

type AddReferenceModalProps = {
  title: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  activeKey: string;
  onCreated: (item: any) => void;
};

export function AddReferenceModal({
  title,
  open,
  setOpen,
  activeKey,
  onCreated
}: AddReferenceModalProps) {

  const [formData, setFormData] = useState({ name: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await createReference(activeKey, { name: formData.name, description: formData.name });

      // if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res;
      onCreated(json); // push item back to parent
      setFormData({ name: "" });
      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent aria-describedby="" className="max-w-lg max-h-[90vh] sm:max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create {title}</DialogTitle>
        </DialogHeader>

        <div className="">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="">
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
            Name <span className="text-red-400">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 border-gray rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-400"
                placeholder=""
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* <Label
                  htmlFor="size_id"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  <Users className="inline w-4 h-4 mr-1" />
                  Company Size <span className="text-gray-500 text-xs"></span>
                </Label> */}

                {/* <select
                  id="size_id"
                  value={formData.size_id}
                  onChange={(e) =>
                    setFormData({ ...formData, size_id: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg  focus:outline-none focus:border-purple-400 [&>option]:bg-gray-900"
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
                </select> */}
              </div>
            </div>

            <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
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
            </button>
          </div>

          </form>
        </div>

        <DialogFooter>
          {/* Submit Button */}
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
