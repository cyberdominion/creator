import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Terms of Service — The Creator Edit",
};

export default async function Terms() {
  const page = await db.page.findFirst({
    where: { type: "TERMS", isPublished: true },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="max-w-3xl mx-auto">
            <SectionTitle>Terms of Service</SectionTitle>
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
                    Welcome to The Creator Edit. By accessing and using our website,
                    you agree to these Terms of Service. Please read them carefully.
                  </p>
                  <p className="mb-4">
                    These terms govern your use of our platform, including browsing
                    events, purchasing tickets, and accessing member content.
                  </p>
                  <p className="mb-4">
                    All content on this site is owned by the creator or their
                    licensors and is protected by copyright and other intellectual
                    property laws.
                  </p>
                  <p className="mb-4">
                    We reserve the right to modify these terms at any time. Continued
                    use of the site constitutes acceptance of any changes.
                  </p>
                  <p className="mb-4">
                    For questions, contact us at support@thecreatoredit.com.
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