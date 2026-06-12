// app/packages/[slug]/page.tsx

import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/client";
import { PACKAGE_BY_SLUG_QUERY, ALL_PACKAGE_SLUGS_QUERY } from "@/lib/sanity/queries";
import { PackageDetail } from "@/types";
import PackageHero from "@/components/packages/detail/PackageHero";
import PackageTabs from "@/components/packages/detail/PackageTabs";
import PackageSidebar from "@/components/packages/detail/PackageSidebar";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(ALL_PACKAGE_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await sanityFetch<PackageDetail | null>(PACKAGE_BY_SLUG_QUERY, { slug });
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.title} | Fantastic Adventure Nepal`,
    description: pkg.shortIntro,
    openGraph: {
      title: pkg.title,
      description: pkg.shortIntro,
      images: pkg.bannerImage?.url ? [pkg.bannerImage.url] : [],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await sanityFetch<PackageDetail | null>(PACKAGE_BY_SLUG_QUERY, { slug });

  if (!pkg) notFound();

  return (
    <main className="min-h-screen bg-white">
      <PackageHero pkg={pkg} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 min-w-0">
            <PackageTabs pkg={pkg} />
          </div>
          <div className="w-full lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24">
              <PackageSidebar pkg={pkg} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}