import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/ui";
export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const page = await db.page.findUnique({ where: { slug: params.slug } });
  if (!page) return { title: "Page Not Found" };
  return {
    title: `${page.title} — The Creator Edit`,
    description: page.content.slice(0, 160),
  };
};

export default async function PublicPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await db.page.findUnique({
    where: { slug: params.slug },
    include: { creator: { select: { displayName: true } } },
  });

  if (!page || !page.isPublished) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="section">
          <div className="max-w-3xl mx-auto">
            <SectionTitle>{page.title}</SectionTitle>
            <div className="bg-white border border-gray-100 rounded-xl p-8 text-gray-600 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{ __html: page.content }}
                className="prose prose-gray max-w-none"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}