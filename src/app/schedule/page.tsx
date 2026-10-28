import Link from "next/link";
import { Clock, Ticket, ChevronRight, Play } from "lucide-react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle, Badge } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Streaming Schedule — The Creator Edit",
  description: "View upcoming live streams and sessions.",
};

export default async function Schedule() {
  const sessions = await db.session.findMany({
    where: {
      status: "SCHEDULED",
      endsAt: { gt: new Date() },
    },
    orderBy: { startsAt: "asc" },
  });

  const creator = await db.creator.findFirst();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div>
              <SectionTitle className="text-left">Streaming Schedule</SectionTitle>
              <p className="text-gray-600 mb-6 max-w-lg">
                All times are shown in {creator?.timezone || "UTC"}. Sessions may be public or member-only.
              </p>
            </div>
            <div className="hidden md:flex gap-4">
              <Link href="/" className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-charcoal hover:bg-gray-50 transition-colors">
                All Events
              </Link>
              <Link href="/events" className="px-4 py-2 border border-burgundy/20 rounded-lg text-sm font-medium text-burgundy hover:bg-burgundy/5 transition-colors">
                Ticketed Events
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <div key={session.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Badge variant="burgundy">{session.visibility}</Badge>
                    <Badge variant="gold">{session.timezone}</Badge>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-charcoal mb-2 leading-tight">
                    {session.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {session.description}
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Clock size={18} strokeWidth={2} className="text-gray-400" />
                      <span>
                        {new Date(session.startsAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="font-medium text-charcoal">
                        {new Date(session.startsAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: session.timezone,
                        })}
                      </span>
                      <span className="font-medium text-charcoal">
                        -
                      </span>
                      <span className="font-medium text-charcoal">
                        {new Date(session.endsAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: session.timezone,
                        })}
                      </span>
                    </div>
                  </div>
                  {session.streamingUrl && (
                    <a
                      href={session.streamingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy text-white text-sm font-medium rounded-lg hover:bg-burgundy-dark transition-colors"
                    >
                      <Play size={16} strokeWidth={2} />
                      Join Stream
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-gray-100 rounded-xl p-12 text-center">
                <p className="text-gray-500 text-lg">No upcoming streams scheduled.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}