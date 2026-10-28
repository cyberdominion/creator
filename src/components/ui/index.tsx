import { PropsWithChildren } from "react";

export function SectionTitle({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <div className={`text-center mb-12 ${className || ""}`}>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
        {children}
      </h2>
      <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
  className,
}: PropsWithChildren & { variant?: "default" | "gold" | "burgundy"; className?: string }) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    gold: "bg-gold/10 text-gold border border-gold/30",
    burgundy: "bg-burgundy/10 text-burgundy border border-burgundy/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className || ""}`}>
      {children}
    </span>
  );
}

export function EventCard({
  event,
}: {
  event: {
    id: string;
    slug: string;
    title: string;
    description: string;
    startsAt: Date | string;
    endsAt: Date | string;
    timezone: string;
    price: number;
    currency: string;
    capacity?: number | null;
    status: string;
  };
}) {
  const startsAt = new Date(event.startsAt);
  const dateStr = startsAt.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = startsAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: event.timezone,
  });

  return (
    <article className="card group">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <Badge variant="burgundy">{event.status}</Badge>
            <Badge variant="gold">{event.timezone}</Badge>
          </div>
          <span className="font-bold text-lg">{event.currency}{(event.price / 100).toFixed(2)}</span>
        </div>
        <h3 className="font-serif font-bold text-xl text-charcoal mb-2 leading-tight">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {dateStr} {timeStr}
          </span>
          {event.capacity && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {event.capacity} tickets
            </span>
          )}
        </div>
        <a
          href={`/events/${event.slug}`}
          className="btn-primary w-full text-sm"
        >
          View Event
        </a>
      </div>
    </article>
  );
}