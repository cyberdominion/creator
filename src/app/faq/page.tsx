import Link from "next/link";
import { HelpCircle, Mail } from "lucide-react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAQ & Support — The Creator Edit",
  description: "Frequently asked questions and support information.",
};

export default async function FAQ() {
  const creator = await db.creator.findFirst();
  const pages = await db.page.findMany({
    where: { type: "FAQ", isPublished: true },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Find answers to common questions about events, memberships, and more.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {pages.length > 0 ? (
              pages.map((page) => (
                <div key={page.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <h3 className="font-serif font-bold text-lg text-charcoal">
                      {page.title}
                    </h3>
                    <HelpCircle size={20} strokeWidth={2} className="text-gray-400" />
                  </button>
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                    {page.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
                <HelpCircle size={48} strokeWidth={2} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No FAQ articles available yet.</p>
              </div>
            )}
          </div>

          <div className="mt-16 bg-charcoal rounded-xl p-8 text-white">
            <h3 className="font-serif font-bold text-xl mb-6">Still need help?</h3>
            <p className="text-gray-300 mb-6 max-w-lg">
              Reach out to our support team and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:support@thecreatoredit.com`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-charcoal rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail size={18} strokeWidth={2} />
                support@thecreatoredit.com
              </a>
              {creator && (
                <Link
                  href="/admin"
                  className="px-6 py-3 bg-burgundy text-white rounded-lg font-medium hover:bg-burgundy-dark transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}