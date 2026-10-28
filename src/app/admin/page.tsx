import { db } from "@/lib/db";
import AdminLayout from "@/app/admin/layout";
import { BarChart3, Ticket, User, Clock } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const creator = await db.creator.findFirst();
  const upcomingStreams = creator
    ? await db.session.count({ where: { creatorId: creator.id, status: "SCHEDULED" } })
    : 0;
  const publishedEvents = creator
    ? await db.event.count({ where: { creatorId: creator.id, status: "PUBLISHED" } })
    : 0;
  const totalOrders = creator
    ? await db.order.count({ where: { event: { creatorId: creator.id } } })
    : 0;
  const revenueAgg = creator
    ? await db.order.aggregate({ where: { event: { creatorId: creator.id }, status: "PAID" }, _sum: { amount: true } })
    : null;
  const revenue = revenueAgg?._sum?.amount ? revenueAgg._sum.amount / 100 : 0;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your creator platform content, events, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Streams</p>
                <p className="text-2xl font-bold text-charcoal">{upcomingStreams}</p>
              </div>
              <Clock size={24} strokeWidth={2} className="text-gray-300" />
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published Events</p>
                <p className="text-2xl font-bold text-charcoal">{publishedEvents}</p>
              </div>
              <Ticket size={24} strokeWidth={2} className="text-gray-300" />
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-charcoal">{totalOrders}</p>
              </div>
              <User size={24} strokeWidth={2} className="text-gray-300" />
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-charcoal">USD {revenue.toFixed(2)}</p>
              </div>
              <BarChart3 size={24} strokeWidth={2} className="text-gray-300" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif font-bold text-xl text-charcoal mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="/admin/schedule" className="flex items-center gap-3 px-4 py-3 bg-charcoal text-white rounded-lg hover:bg-burgundy transition-colors text-sm font-medium">
              <Clock size={18} strokeWidth={2} />
              Manage Schedule
            </a>
            <a href="/admin/events" className="flex items-center gap-3 px-4 py-3 bg-charcoal text-white rounded-lg hover:bg-burgundy transition-colors text-sm font-medium">
              <Ticket size={18} strokeWidth={2} />
              Manage Events
            </a>
            <a href="/admin/profile" className="flex items-center gap-3 px-4 py-3 bg-charcoal text-white rounded-lg hover:bg-burgundy transition-colors text-sm font-medium">
              <User size={18} strokeWidth={2} />
              Edit Profile
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}