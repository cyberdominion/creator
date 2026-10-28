import Link from "next/link";
import { ArrowRight, Play, User as UserIcon } from "lucide-react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle, Badge, EventCard } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Creator Edit — Live Events & Community",
  description: "Discover upcoming streams, events, and community access from your favorite creator.",
};

export default async function Home() {
  const creator = await db.creator.findFirst({
    include: {
      links: { where: { isActive: true } },
      sessions: {
        where: { status: "SCHEDULED", endsAt: { gt: new Date() } },
        orderBy: { startsAt: "asc" },
        take: 4,
      },
      events: {
        where: { status: "PUBLISHED", endsAt: { gt: new Date() } },
        orderBy: { startsAt: "asc" },
        take: 4,
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {creator ? (
          <>
            {/* Hero Section */}
            <section className="relative bg-charcoal text-white overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225253731-176953346687?w=1920&q=80')] bg-cover bg-center opacity-20" />
              <div className="relative section pt-20 pb-24 text-center">
                <Badge variant="gold" className="inline-block mb-6">
                  Premium Creator Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
                  Welcome to {creator.displayName}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  {creator.bio}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/schedule"
                    className="btn-gold w-full sm:w-auto text-sm px-8"
                  >
                    View Schedule <ArrowRight size={20} className="ml-2" />
                  </Link>
                  <Link
                    href="/events"
                    className="btn-text w-full sm:w-auto text-sm px-8"
                  >
                    Browse Events
                  </Link>
                </div>
              </div>
            </section>

            {/* Creator Info */}
            <section className="section">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                    <h2 className="font-serif font-bold text-2xl text-charcoal mb-4">About</h2>
                    <p className="text-gray-600 leading-relaxed">{creator.bio}</p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                    <h2 className="font-serif font-bold text-2xl text-charcoal mb-4">
                      Official Links
                    </h2>
                    <div className="space-y-4">
                      {creator.links.map((link) => (
                        <div key={link.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <span className="text-sm font-medium text-charcoal">{link.type}</span>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-burgundy hover:underline flex items-center gap-2"
                          >
                            Visit {link.type} <ArrowRight size={16} />
                          </a>
                        </div>
                      ))}
                      {creator.links.length === 0 && (
                        <p className="text-gray-400 text-sm">No official links configured yet.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                    <h3 className="font-serif font-bold text-lg text-charcoal mb-6">Creator Profile</h3>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-burgundy/10 flex items-center justify-center overflow-hidden">
                        <img
                          src={creator.imageUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"}
                          alt={creator.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-xl text-charcoal">
                          {creator.displayName}
                        </h3>
                        <p className="text-gray-500 text-sm">{creator.timezone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Sessions */}
                  <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                    <h3 className="font-serif font-bold text-lg text-charcoal mb-6">
                      Upcoming Streams
                    </h3>
                    <div className="space-y-4">
                      {creator.sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                          <div>
                            <h4 className="font-medium text-charcoal">{session.title}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(session.startsAt).toLocaleDateString()}
                              {", "}
                              {new Date(session.startsAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: session.timezone,
                              })}
                            </p>
                          </div>
                          <Badge variant="gold">{session.status}</Badge>
                        </div>
                      ))}
                      {creator.sessions.length === 0 && (
                        <p className="text-gray-400 text-sm">No upcoming streams scheduled.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Events */}
            {creator.events.length > 0 && (
              <section className="section bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <SectionTitle>Featured Events</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creator.events.map((event) => (
                      <EventCard key={event.id} event={event as any} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="section py-24 text-center">
            <SectionTitle>The Creator Edit</SectionTitle>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Creator profile coming soon. Please check back later.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}