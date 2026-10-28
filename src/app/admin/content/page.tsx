import { db } from "@/lib/db";
import AdminLayout from "@/app/admin/layout";
import { FileText, HelpCircle, Plus, Trash2, Edit2 } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function AdminContent() {
  const creator = await db.creator.findFirst();
  const pages = await db.page.findMany({
    where: { creatorId: creator?.id || "" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
              Content & FAQ
            </h1>
            <p className="text-gray-600">
              Manage your public page content, FAQs, and legal pages.
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} strokeWidth={2} />
            New Page
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-b border-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Slug</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Published</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pages.length > 0 ? (
                  pages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-charcoal">{page.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          page.type === "FAQ"
                            ? "bg-blue-100 text-blue-700"
                            : page.type === "TERMS"
                              ? "bg-purple-100 text-purple-700"
                              : page.type === "PRIVACY"
                                ? "bg-green-100 text-green-700"
                                : page.type === "REFUND_POLICY"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-100 text-gray-700"
                        }`}>
                          {page.type.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{page.slug}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          page.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {page.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="p-2 text-gray-400 hover:text-burgundy transition-colors" title="Edit">
                          <Edit2 size={16} strokeWidth={2} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No pages created yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}