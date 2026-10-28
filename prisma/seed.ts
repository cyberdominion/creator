import { db } from "@/lib/db";
import { ContentType } from "@prisma/client";

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.default.hash("admin123", 12);

  const adminUser = await db.user.upsert({
    where: { email: "admin@thecreatoredit.com" },
    update: {},
    create: {
      email: "admin@thecreatoredit.com",
      password: hashedPassword,
      role: "OWNER",
      status: "ACTIVE",
    },
  });

  console.log("✅ Admin user created:", adminUser.email);

  // Create creator profile
  const creator = await db.creator.upsert({
    where: { slug: "the-creator-edit" },
    update: {},
    create: {
      slug: "the-creator-edit",
      displayName: "The Creator Edit",
      bio: "Premium creator platform for live events, memberships, and community. Join us for exclusive streams and events.",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      timezone: "Africa/Lagos",
      currency: "USD",
      userId: adminUser.id,
    },
  });

  console.log("✅ Creator profile created:", creator.displayName);

  // Create official links
  await db.creatorLink.createMany({
    data: [
      { creatorId: creator.id, type: "STREAMING", url: "https://youtube.com/thecreatoredit", isActive: true },
      { creatorId: creator.id, type: "SOCIAL", url: "https://instagram.com/thecreatoredit", isActive: true },
      { creatorId: creator.id, type: "SOCIAL", url: "https://twitter.com/thecreatoredit", isActive: true },
      { creatorId: creator.id, type: "TICKETING", url: "https://eventbrite.com/thecreatoredit", isActive: true },
      { creatorId: creator.id, type: "WISHLIST", url: "https://amazon.com/wishlist/thecreatoredit", isActive: true },
      { creatorId: creator.id, type: "COMMUNITY", url: "https://discord.gg/thecreatoredit", isActive: true },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Creator links created");

  // Create wishlist links
  await db.wishlistLink.createMany({
    data: [
      { creatorId: creator.id, provider: "Amazon", url: "https://amazon.com/wishlist/thecreatoredit", isActive: true },
      { creatorId: creator.id, provider: "Ko-fi", url: "https://ko-fi.com/thecreatoredit", isActive: true },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Wishlist links created");

  // Create legal pages
  const legalPages: {
      slug: string;
      title: string;
      content: string;
      type: ContentType;
      isPublished: boolean;
    }[] = [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      content: "<p>At The Creator Edit, we value your privacy...</p>",
      type: "PRIVACY",
      isPublished: true,
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      content: "<p>Welcome to The Creator Edit. By accessing...</p>",
      type: "TERMS",
      isPublished: true,
    },
    {
      slug: "refund-policy",
      title: "Refund & Cancellation Policy",
      content: "<p>We want you to be satisfied with your purchase...</p>",
      type: "REFUND_POLICY",
      isPublished: true,
    },
  ];

  for (const pageData of legalPages) {
    await db.page.upsert({
      where: { slug: pageData.slug },
      update: {},
      create: { ...pageData, creatorId: creator.id },
    });
  }

  console.log("✅ Legal pages created");

  // Create FAQ pages
  const faqPages: {
      slug: string;
      title: string;
      content: string;
      type: ContentType;
      isPublished: boolean;
    }[] = [
    {
      slug: "how-do-i-buy-tickets",
      title: "How do I buy tickets?",
      content: "<p>You can purchase tickets directly from the event page. Select the event, enter your details, and complete checkout.</p>",
      type: "FAQ",
      isPublished: true,
    },
    {
      slug: "can-i-get-a-refund",
      title: "Can I get a refund?",
      content: "<p>Refunds may be available up to 24 hours before the event, subject to the event's cancellation terms.</p>",
      type: "FAQ",
      isPublished: true,
    },
    {
      slug: "how-do-i-access-member-content",
      title: "How do I access member content?",
      content: "<p>Once you have an active membership, you'll receive an invitation to access member-only content.</p>",
      type: "FAQ",
      isPublished: true,
    },
  ];

  for (const pageData of faqPages) {
    await db.page.upsert({
      where: { slug: pageData.slug },
      update: {},
      create: { ...pageData, creatorId: creator.id },
    });
  }

  console.log("✅ FAQ pages created");

  // Create sample events
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate() + 7);

  await db.event.create({
    data: {
      slug: "premiere-live-stream",
      title: "Premiere Live Stream",
      description: "Join us for our premiere live stream event. An exclusive experience for our community.",
      startsAt: futureDate,
      endsAt: new Date(futureDate.getTime() + 2 * 60 * 60 * 1000),
      timezone: "Africa/Lagos",
      price: 5000, // $50.00
      currency: "USD",
      capacity: 100,
      status: "PUBLISHED",
      refundPolicy: "Refunds available up to 24 hours before the event start time.",
      checkoutType: "external",
      checkoutUrl: "https://eventbrite.com/thecreatoredit/premiere",
      creatorId: creator.id,
    },
  });

  console.log("✅ Sample events created");

  console.log("🎉 Database seed completed successfully!");
  console.log("\n📋 Login credentials:");
  console.log("   Email: admin@thecreatoredit.com");
  console.log("   Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });