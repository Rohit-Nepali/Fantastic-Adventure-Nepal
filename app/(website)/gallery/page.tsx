import { sanityFetch } from "@/lib/sanity/client";
import { ALL_GALLERY_ITEMS_QUERY } from "@/lib/sanity/queries";
import { GalleryItem } from "@/lib/sanity/types";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | Fantastic Adventure Nepal",
  description: "Explore moments from Nepal's mountains, heritage sites, wildlife safaris, and traveler journeys.",
};

export default async function GalleryPage() {
  const galleryItems = await sanityFetch<GalleryItem[]>(ALL_GALLERY_ITEMS_QUERY);

  return (
    <main className="min-h-screen bg-[#f4f1ea]">
      <section className="relative overflow-hidden px-6 pb-10 pt-32 text-center md:px-10 md:pb-14 md:pt-36">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-[#00b5c4]/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-black/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-[11px] font-light uppercase tracking-[0.3em] text-black/40">
            Gallery
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-black md:text-7xl">
            Stories From Every Frame
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-black/60 md:text-[17px]">
            A curated visual journey through Himalayan trails, ancient temples,
            wildlife encounters, and the warm moments that make Nepal unforgettable.
          </p>
        </div>
      </section>

      <GalleryGrid items={galleryItems} layout="page" eyebrow="All Moments" />
    </main>
  );
}