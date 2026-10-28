import Link from "next/link";
import { Gift, Mail, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/ui";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wishlist & Gifts — The Creator Edit",
  description: "Support the creator through approved gifting and wishlist platforms.",
};

export default async function Wishlist() {
  const creator = await db.creator.findFirst({
    include: {
      wishlistLinks: { where: { isActive: true } },
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <SectionTitle>Wishlist & Gifts</SectionTitle>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Support {creator?.displayName || "the creator"} through our approved
            gifting and wishlist partners.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creator?.wishlistLinks.length ? (
              creator.wishlistLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                    <Gift size={24} strokeWidth={2} className="text-gold" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-charcoal mb-2">
                    {link.provider}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Support the creator through {link.provider}.
                  </p>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    External link
                  </span>
                </a>
              ))
            ) : (
              <div className="col-span-full bg-white border border-gray-100 rounded-xl p-16 text-center">
                <Gift size={48} strokeWidth={2} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No wishlist links configured yet.</p>
              </div>
            )}
          </div>

          <div className="mt-16 bg-white border border-gray-100 rounded-xl p-8">
            <h3 className="font-serif font-bold text-xl text-charcoal mb-6">
              How Gifting Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <ShieldCheck size={32} strokeWidth={2} className="text-burgundy mb-4" />
                <h4 className="font-bold text-charcoal mb-2">Secure & Verified</h4>
                <p className="text-sm text-gray-600">
                  All gifts are processed through approved third-party providers.
                </p>
              </div>
              <div>
                <Mail size={32} strokeWidth={2} className="text-burgundy mb-4" />
                <h4 className="font-bold text-charcoal mb-2">Direct Delivery</h4>
                <p className="text-sm text-gray-600">
                  Gifts are sent directly to the creator through the provider.
                </p>
              </div>
              <div>
                <Link href="/" className="text-sm text-burgundy hover:underline flex items-center gap-2">
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}