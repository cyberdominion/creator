import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Refund & Cancellation Policy — The Creator Edit",
};

export default async function Refund() {
  const page = await db.page.findFirst({
    where: { type: "REFUND_POLICY", isPublished: true },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="max-w-3xl mx-auto">
            <SectionTitle>Refund & Cancellation Policy</SectionTitle>
            <p className="text-sm text-gray-500 mb-8">
              Last updated: October 2026
            </p>
            <div className="bg-white border border-gray-100 rounded-xl p-8 text-gray-600 leading-relaxed">
              {page ? (
                <div
                  dangerouslySetInnerHTML={{ __html: page.content }}
                  className="prose prose-gray max-w-none"
                />
              ) : (
                <>
                  <p className="mb-4">
                    We want you to be satisfied with your purchase. If you need to
                    cancel or request a refund, please review our policy below.
                  </p>
                  <p className="mb-4">
                    <strong>Event Tickets:</strong> Refunds may be available up to
                    24 hours before the event start time, subject to the event's
                    published cancellation terms.
                  </p>
                  <p className="mb-4">
                    <strong>Memberships:</strong> Membership fees are non-refundable
                    unless otherwise stated in the membership terms. You may cancel
                    at any time, and your access will continue until the end of the
                    current billing period.
                  </p>
                  <p className="mb-4">
                    <strong>Process:</strong> To request a refund, contact
                    support@thecreatoredit.com with your order reference. Refunds
                    are processed within 5-10 business days once approved.
                  </p>
                  <p className="mb-4">
                    Refunded orders lose associated access to events and membership
                    benefits as required by our policy.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}