import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Privacy Policy — The Creator Edit",
};

export default async function Privacy() {
  const page = await db.page.findFirst({
    where: { type: "PRIVACY", isPublished: true },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="max-w-3xl mx-auto">
            <SectionTitle>Privacy Policy</SectionTitle>
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
                    At The Creator Edit, we value your privacy. This Privacy Policy
                    explains how we collect, use, and protect your information when
                    you visit our website, purchase tickets, or join our community.
                  </p>
                  <p className="mb-4">
                    We only collect the information necessary to operate our service,
                    including your email address when you create an account or make
                    a purchase. We do not sell your personal data to third parties.
                  </p>
                  <p className="mb-4">
                    Payment information is handled by our approved payment providers
                    and is never stored on our servers.
                  </p>
                  <p className="mb-4">
                    You have the right to access, correct, or delete your personal
                    information at any time. Contact us at
                    support@thecreatoredit.com for privacy-related inquiries.
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