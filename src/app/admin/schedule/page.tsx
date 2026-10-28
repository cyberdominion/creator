import { db } from "@/lib/db";
import AdminLayout from "@/app/admin/layout";
import { Clock, Plus, Trash2, Edit2 } from "lucide-react";
import { format } from "date-fns";
export const dynamic = "force-dynamic";

export default async function AdminSchedule() {
  const creator = await db.creator.findFirst();
  const sessions = await db.session.findMany({
    where: { creatorId: creator?.id || "" },
    orderBy: { startsAt: "asc" },
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
              Streaming Schedule
            </h1>
            <p className="text-gray-600">
              Create, edit, and manage your live streaming sessions.
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} strokeWidth={2} />
            New Session
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-b border-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Date & Time</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Timezone</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Visibility</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-charcoal">{session.title}</p>
                        <p className="text-sm text-gray-500">{session.description.slice(0, 80)}...</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-charcoal">
                          {format(new Date(session.startsAt), "MMM d, yyyy h:mm a")}
                        </p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(session.endsAt), "h:mm a")} end
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {session.timezone}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          session.visibility === "public"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}>
                          {session.visibility}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          session.status === "SCHEDULED"
                            ? "bg-blue-100 text-blue-700"
                            : session.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                        }`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button className="p-2 text-gray-400 hover:text-burgundy transition-colors" title="Edit">
                          <Edit2 size={16} strokeWidth={2} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Cancel">
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No sessions scheduled yet.
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