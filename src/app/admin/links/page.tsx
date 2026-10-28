import { db } from "@/lib/db";
import AdminLayout from "@/app/admin/layout";
import { Link as LinkIcon, Gift, Plus, Trash2, Edit2 } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function AdminLinks() {
  const creator = await db.creator.findFirst();
  const links = await db.creatorLink.findMany({
    where: { creatorId: creator?.id || "" },
    orderBy: { createdAt: "desc" },
  });
  const wishlistLinks = await db.wishlistLink.findMany({
    where: { creatorId: creator?.id || "" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
            Links & Wishlist
          </h1>
          <p className="text-gray-600">
            Manage your official links and wishlist destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-charcoal mb-4 flex items-center gap-2">
              <LinkIcon size={20} strokeWidth={2} className="text-burgundy" />
              Official Links
            </h3>
            <div className="space-y-3">
              {links.length > 0 ? (
                links.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                      <p className="font-medium text-charcoal">{link.type}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{link.url}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-burgundy transition-colors" title="Edit">
                        <Edit2 size={14} strokeWidth={2} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">No links configured.</p>
              )}
              <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors">
                <Plus size={14} strokeWidth={2} className="mr-2" /> Add Link
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-charcoal mb-4 flex items-center gap-2">
              <Gift size={20} strokeWidth={2} className="text-gold" />
              Wishlist Links
            </h3>
            <div className="space-y-3">
              {wishlistLinks.length > 0 ? (
                wishlistLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div>
                      <p className="font-medium text-charcoal">{link.provider}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{link.url}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-burgundy transition-colors" title="Edit">
                        <Edit2 size={14} strokeWidth={2} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">No wishlist links configured.</p>
              )}
              <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors">
                <Plus size={14} strokeWidth={2} className="mr-2" /> Add Wishlist Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}