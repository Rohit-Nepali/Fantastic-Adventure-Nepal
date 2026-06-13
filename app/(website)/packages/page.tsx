import PackagesClientView from "@/components/packages/PackagesView";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_PACKAGES_QUERY, ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries";
import { Category, PackageCard } from "@/lib/sanity/types";

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

  // Fetch from Sanity on the server side
  const [packages, categories] = await Promise.all([
    sanityFetch<PackageCard[]>(ALL_PACKAGES_QUERY),
    sanityFetch<Category[]>(ALL_CATEGORIES_QUERY),
  ]);

  return (
    <PackagesClientView
      packages={packages}
      categories={categories}
      categorySlug={categorySlug ?? null}
    />
  );
}