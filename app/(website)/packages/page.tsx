// app/packages/page.tsx

import { sanityFetch } from "@/lib/sanity/client";
import { ALL_PACKAGES_QUERY, ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries";
import { PackageCard, Category } from "@/types";
import PackageGrid from "@/components/packages/PackageGrid";
import CategoryTabs from "@/components/packages/CategoryTabs";

export const revalidate = 60;

export const metadata = {
  title: "Tours & Packages | Fantastic Adventure Nepal",
  description:
    "Explore trekking, cultural tours, wildlife safaris, and adventure packages across Nepal.",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PackagesPage({ searchParams }: PageProps) {
  const { category: categorySlug } = await searchParams;

  const [packages, categories] = await Promise.all([
    sanityFetch<PackageCard[]>(ALL_PACKAGES_QUERY),
    sanityFetch<Category[]>(ALL_CATEGORIES_QUERY),
  ]);

  // Client-side filter from full list — avoids extra fetch per tab
  const filtered = categorySlug
    ? packages.filter((p) => p.category?.slug?.current === categorySlug)
    : packages;

  return (
    <main className="min-h-screen bg-[#f5f3ef]">
      {/* Hero */}
      <section className="pt-32 pb-12 px-6 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[#00b5c4] mb-3">
          Tours &amp; Packages
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#111] leading-tight mb-4">
          Explore Nepal Your Way
        </h1>
        <p className="text-[#555] max-w-xl mx-auto text-lg">
          Every traveler is unique, and so is every journey. Choose from a wide
          range of experiences designed for your interests and adventure level.
        </p>
      </section>

      {/* Category Filter Tabs */}
      <CategoryTabs categories={categories} activeSlug={categorySlug ?? null} />

      {/* Package Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#888]">
            <p className="text-2xl font-display mb-2">No packages found</p>
            <p className="text-sm">Try selecting a different category.</p>
          </div>
        ) : (
          <PackageGrid packages={filtered} />
        )}
      </section>
    </main>
  );
}