import Link from "next/link";
import { Ticket, Calendar, MapPin, ChevronRight } from "lucide-react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle, Badge } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events — The Creator Edit",
  description: "Browse upcoming ticketed events.",
};

export default async function Events() {
  const events = await db.event.findMany({
    where: {
      status: "PUBLISHED",
      endsAt: { gt: new Date() },
    },
    orderBy: { startsAt: "asc" },
    include: {
      orders: { where: { status: "PAID" }, select: { id: true } },
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <SectionTitle>Upcoming Events</SectionTitle>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Join us for exclusive live events. Purchase tickets and secure your spot.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map((event) => {
                const sold = event.orders.length;
                const capacity = event.capacity;
                const isSoldOut = capacity && sold >= capacity;
                const startsAt = new Date(event.startsAt);

                return (
                  <div key={event.id} className="card group">
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <Badge variant={isSoldOut ? "default" : "gold"}>
                          {isSoldOut ? "Sold Out" : event.status}
                        </Badge>
                        <Badge variant="burgundy">{event.timezone}</Badge>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-charcoal mb-2 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Calendar size={18} strokeWidth={2} className="text-gray-400" />
                          <span>
                            {startsAt.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="font-bold text-charcoal">
                            {startsAt.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: event.timezone,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="font-bold text-burgundy">
                            {event.currency}{(event.price / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <a
                        href={`/events/${event.slug}`}
                        className={`w-full py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                          isSoldOut
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-burgundy text-white hover:bg-burgundy-dark"
                        }`}
                      >
                        {isSoldOut ? "Sold Out" : "Get Tickets"} {isSoldOut ? null : <ChevronRight size={16} strokeWidth={2} />}
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full bg-white border border-gray-100 rounded-xl p-12 text-center">
                <Ticket size={48} strokeWidth={2} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No upcoming events.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}