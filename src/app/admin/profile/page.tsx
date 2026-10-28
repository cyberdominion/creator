import { db } from "@/lib/db";
import AdminLayout from "@/app/admin/layout";
import { User, Image as ImageIcon, Edit } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function AdminProfile() {
  const creator = await db.creator.findFirst();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
            Profile & Branding
          </h1>
          <p className="text-gray-600">
            Manage your public creator profile and branding settings.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-burgundy/10 mb-4 overflow-hidden border border-gray-200">
                  <img
                    src={creator?.imageUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Profile image
                </p>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Stage Name
                  </label>
                  <input
                    type="text"
                    defaultValue={creator?.displayName || ""}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Biography
                  </label>
                  <textarea
                    defaultValue={creator?.bio || ""}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Time Zone
                  </label>
                  <input
                    type="text"
                    defaultValue={creator?.timezone || "UTC"}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Currency
                  </label>
                  <select
                    defaultValue={creator?.currency || "USD"}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-burgundy"
                  >
                    <option value="USD">USD — US Dollar</option>
                    <option value="NGN">NGN — Nigerian Naira</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="EUR">EUR — Euro</option>
                  </select>
                </div>

                <button className="btn-primary w-full">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}