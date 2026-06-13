"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { GalleryItem } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";
import GalleryLightbox from "./GalleryLightBox";
import Button from "../ui/Button";

const fallbackGalleryItems: GalleryItem[] = [
  {
    _id: "fallback-prayer-flags",
    title: "Prayer Flags Above the Ridge",
    caption: "A high mountain pass where wind, color, and silence meet.",
    tags: ["Himalayas", "Trekking"],
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85",
    imageAlt: "Prayer flags in the Himalayas",
  },
  {
    _id: "fallback-heritage-courtyards",
    title: "Heritage Courtyards",
    caption: "Timeless temples and living culture in Kathmandu Valley.",
    tags: ["Heritage", "Culture"],
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&q=85",
    imageAlt: "Temple courtyard in Nepal",
  },
  {
    _id: "fallback-jungle-encounters",
    title: "Jungle Encounters",
    caption: "Wildlife moments from Nepal's protected lowland ecosystems.",
    tags: ["Wildlife", "Safari"],
    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1600&q=85",
    imageAlt: "Wildlife safari in Nepal",
  },
  {
    _id: "fallback-mountain-village",
    title: "Mountain Village Morning",
    caption: "Quiet stone paths, prayer wheels, and sunrise over the peaks.",
    tags: ["Village", "Mountains"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=85",
    imageAlt: "Mountain village in Nepal",
  },
  {
    _id: "fallback-lake-pokhara",
    title: "Pokhara Lake Reflections",
    caption: "Still waters reflecting the Annapurna range at golden hour.",
    tags: ["Pokhara", "Lake"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=85",
    imageAlt: "Lake reflection in Pokhara",
  },
  {
    _id: "fallback-trail",
    title: "Trails Into the Clouds",
    caption: "Every step reveals a new ridge, valley, and horizon.",
    tags: ["Trek", "Adventure"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=85",
    imageAlt: "Mountain trail in Nepal",
  },
];

// Asymmetric "hero" layout used only for the home-page teaser (layout="section")
function getGridSpanClass(index: number) {
  if (index === 0) return "md:col-span-2 md:row-span-2 min-h-[420px]";
  if (index === 1 || index === 3) return "md:row-span-2 min-h-[360px]";
  return "min-h-[260px]";
}

// Repeating 8-item rhythm for the full gallery page (layout="page")
// pattern across a cycle of 8: wide, square, square, tall, square, square, wide, square
function getPageSpanClass(index: number) {
  const pos = index % 8;
  if (pos === 0) return "sm:col-span-2 aspect-[16/10] sm:aspect-[16/9]"; // wide
  if (pos === 3) return "sm:row-span-2 aspect-square sm:aspect-[3/4]"; // tall
  if (pos === 6) return "sm:col-span-2 aspect-[16/10] sm:aspect-[16/9]"; // wide
  return "aspect-square";
}

export interface GalleryGridProps {
  items: GalleryItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  layout?: "section" | "page";
}

export default function GalleryGrid({
  items,
  eyebrow = "Gallery",
  title = "Moments That Define the Journey",
  description = "A visual diary of Himalayan trails, heritage corners, wildlife sightings, and warm encounters from Nepal.",
  ctaHref = "/gallery",
  ctaLabel = "View More",
  layout = "section",
}: GalleryGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const galleryItems = items.length > 0 ? items : fallbackGalleryItems;
  const isPage = layout === "page";

  const BATCH_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const visibleItems = isPage
    ? galleryItems.slice(0, visibleCount)
    : galleryItems.slice(0, 6);

  const hasMore = isPage && visibleCount < galleryItems.length;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [items]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (gridRef.current && visibleItems.length > 0) {
        gsap.fromTo(
          "[data-gallery-card='true']",
          { opacity: 0, y: 44, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleItems.length, layout]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden bg-[#f4f1ea] text-black"
    >
      {!isPage && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#00b5c4]/10 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-black/5 blur-3xl" />
        </div>
      )}

      <div className={`relative mx-auto max-w-7xl px-6 md:px-10 ${isPage ? "pb-20 pt-4 md:pb-28" : "py-20 md:py-28"}`}>
        {isPage ? (
          <div ref={headerRef} className="mb-10 flex items-center justify-between border-b border-black/10 pb-6">
            <p className="text-[11px] font-light uppercase tracking-[0.3em] text-black/40">
              {eyebrow}
            </p>
            <p className="text-sm text-black/50">{galleryItems.length} moments</p>
          </div>
        ) : (
          <>
            <div ref={headerRef} className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="mb-3 text-[11px] font-light uppercase tracking-[0.3em] text-black/40">
                  {eyebrow}
                </p>
                <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-black md:text-6xl">
                  {title}
                </h2>
              </div>

              {ctaHref && (
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00b5c4]"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>

            <p className="mb-10 max-w-2xl text-[15px] leading-relaxed text-black/60 md:text-[17px]">
              {description}
            </p>
          </>
        )}

        {visibleItems.length > 0 ? (
          <div
            ref={gridRef}
            className={
              isPage
                ? "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
                : "grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3"
            }
          >
            {visibleItems.map((item, index) => (
              <button
                key={item._id || `${item.title}-${index}`}
                type="button"
                data-gallery-card="true"
                onClick={() => isPage && setLightboxIndex(index)}
                onPointerMove={!isPage ? handlePointerMove : undefined}
                onPointerLeave={!isPage ? handlePointerLeave : undefined}
                className={`group relative block w-full overflow-hidden rounded-[1.25rem] bg-white text-left shadow-[0_18px_50px_rgba(0,0,0,0.12)] md:rounded-[2rem] ${isPage ? "cursor-zoom-in " + getPageSpanClass(index) : getGridSpanClass(index)
                  }`}
              >
                {item.image ? (
                  <Image
                    data-gallery-image="true"
                    src={urlForImage(item.image, isPage ? 700 : 1200)}
                    alt={item.imageAlt || item.caption || item.title || "Gallery image"}
                    fill
                    className={`object-cover will-change-transform ${isPage
                      ? "transition-transform duration-[6000ms] ease-out group-hover:scale-[1.15]"
                      : "transition-transform duration-700"
                      }`}
                    sizes={
                      isPage
                        ? "(max-width: 640px) 50vw, 25vw"
                        : index === 0
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 100vw, 25vw"
                    }
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#e8e4dc] text-black/40">
                    No image
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500" />

                {!isPage && (
                  <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
                    {item.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className={isPage ? "absolute inset-x-0 bottom-0 p-3 md:p-4" : "absolute inset-x-0 bottom-0 p-5 md:p-6"}>
                  <h3 className={isPage ? "text-sm font-semibold leading-tight text-white md:text-base" : "mb-2 text-xl font-semibold leading-tight text-white md:text-2xl"}>
                    {item.title}
                  </h3>
                  {!isPage && item.caption && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-white/75 md:text-base">
                      {item.caption}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-black/15 bg-white/60 p-10 text-center">
            <p className="text-lg font-medium text-black">No gallery moments yet.</p>
            <p className="mt-2 text-sm text-black/55">Add gallery items in Sanity to showcase your Nepal journeys here.</p>
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button
              type="button"
              onClick={() => setVisibleCount((c) => c + BATCH_SIZE)}
              variant="outline"
              rounded="full"
              className="group px-6 py-3 text-sm font-medium tracking-wide border-gray-300 hover:border-accent text-gray-700 hover:text-accent transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-md"
            >
              <span>Load More</span>

              {/* Remaining Items Badge */}
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-mono group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                {galleryItems.length - visibleCount}
              </span>

              {/* Animated Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </Button>
          </div>
        )}
      </div>

      {isPage && lightboxIndex !== null && (
        <GalleryLightbox
          items={galleryItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => {
            setLightboxIndex(i);
            if (i >= visibleCount) setVisibleCount(i + 1);
          }}
        />
      )}
    </section>
  );
}

function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const image = card.querySelector<HTMLImageElement>("[data-gallery-image='true']");
  if (!image) return;

  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  gsap.to(image, {
    x: x * 24,
    y: y * 24,
    scale: 1.08,
    duration: 0.45,
    ease: "power2.out",
  });
}

function handlePointerLeave(event: React.PointerEvent<HTMLElement>) {
  const image = event.currentTarget.querySelector<HTMLImageElement>("[data-gallery-image='true']");
  if (!image) return;

  gsap.to(image, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "power3.out",
  });
}