import { db } from "@/lib/db";
import AdminLayout from "@/app/admin/layout";
import { Ticket, Plus, Trash2, Edit2, Euro, Clock } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function AdminEvents() {
  const creator = await db.creator.findFirst();
  const events = await db.event.findMany({
    where: { creatorId: creator?.id || "" },
    orderBy: { startsAt: "desc" },
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
              Events & Tickets
            </h1>
            <p className="text-gray-600">
              Create and manage your ticketed events.
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={16} strokeWidth={2} />
            New Event
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-b border-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Event</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {events.length > 0 ? (
                  events.map((event) => {
                    const price = (event.price / 100).toFixed(2);
                    return (
                      <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-charcoal">{event.title}</p>
                          <p className="text-sm text-gray-500">
                            {event.description.slice(0, 60)}...
                          </p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(event.startsAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-charcoal">
                          {event.currency} {price}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === "PUBLISHED"
                              ? "bg-green-100 text-green-700"
                              : event.status === "DRAFT"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-red-100 text-red-700"
                          }`}>
                            {event.status}
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
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No events created yet.
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