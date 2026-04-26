"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAutoSlide } from "@/lib/useAutoSlide";

const cultureStories = [
  {
    title: "Kathmandu Heritage Walk",
    subtitle: "Temples, courtyards, and timeless city stories",
    description:
      "Wander through living heritage squares where carved windows, prayer lamps, and centuries-old shrines shape everyday life.",
    highlights: ["Durbar Squares", "Hidden bahals", "Sunset rooftop tea"],
    images: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&q=85",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&q=85",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=85",
    ],
    meta: "Half-day | Easy pace",
  },
  {
    title: "Bhaktapur Craft Trails",
    subtitle: "Hands-on Newari art and local craftsmanship",
    description:
      "Meet local artisans and explore pottery lanes, wood carving ateliers, and family workshops preserving Nepal's artistic legacy.",
    highlights: ["Pottery square", "Wood carving alleys", "Traditional juju dhau tasting"],
    images: [
      "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=1600&q=85",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&q=85",
      "https://images.unsplash.com/photo-1526481280695-3c469c953a67?w=1600&q=85",
    ],
    meta: "Full-day | Cultural immersion",
  },
  {
    title: "Monasteries & Mountain Villages",
    subtitle: "Slow travel through sacred hill communities",
    description:
      "Journey across hilltop monasteries and village trails where prayer flags, chanting halls, and mountain horizons create a serene rhythm.",
    highlights: ["Monastery rituals", "Village homestay moments", "Himalayan viewpoints"],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
      "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=1600&q=85",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85",
    ],
    meta: "2-3 days | Moderate",
  },
];

interface CultureStoryImageSliderProps {
  images: string[];
  title: string;
  meta: string;
}

function CultureStoryImageSlider({ images, title, meta }: CultureStoryImageSliderProps) {
  const { activeSlide, pause, resume, next, prev } = useAutoSlide({
    totalSlides: images.length,
    minDelayMs: 5000,
    maxDelayMs: 7000,
  });

  return (
    <div
      className="relative h-[280px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        className="absolute inset-0 flex transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${activeSlide * 100}%)`, animationDuration: `${7000}ms` }}
      >
        {images.map((image, imageIndex) => (
          <div
            key={`${title}-slide-${imageIndex}`}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-transform duration-[7000ms] ease-in-out ${
                imageIndex === activeSlide ? "scale-110" : "scale-105"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={imageIndex === 0}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 sm:px-4">
        <button
          type="button"
          onClick={prev}
          className="pointer-events-auto inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray/25 text-white/85 transition-all duration-300 hover:bg-gray/45 hover:text-white active:scale-95 active:bg-black/55"
          aria-label={`Previous image for ${title}`}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={next}
          className="pointer-events-auto inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/25 text-white/85 transition-all duration-300 hover:bg-black/45 hover:text-white active:scale-95 active:bg-black/55"
          aria-label={`Next image for ${title}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <p className="absolute left-5 bottom-5 text-white text-xs md:text-sm tracking-wide font-medium">
        {meta}
      </p>
    </div>
  );
}

export default function CultureTourSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cultureStories.forEach((_, index) => {
        const row = rowRefs.current[index];
        const imageEl = imageRefs.current[index];
        const textEl = textRefs.current[index];
        const fromLeft = index % 2 === 0;

        if (!row || !imageEl || !textEl) return;

        gsap.fromTo(
          imageEl,
          { opacity: 0, x: fromLeft ? -40 : 40, scale: 1.06 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          textEl,
          { opacity: 0, x: fromLeft ? 40 : -40, y: 18 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#f7f6f3] via-[#f2eee6] to-[#ece8df] px-6 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-20 max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-black/45 font-sans mb-3">
            /Travel Style
          </p>
          <h1 className="text-4xl md:text-6xl text-black leading-[1.05] tracking-tight mb-5">
            Cultural Tour
          </h1>
          <p className="text-black/65 text-[15px] md:text-[17px] leading-relaxed">
            A story-led journey through Nepal's heritage cities, sacred spaces, and artisan neighborhoods. Every stop is designed for meaningful encounters, not rushed checklists.
          </p>
        </div>

        <div className="space-y-14 md:space-y-24">
          {cultureStories.map((story, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div
                key={story.title}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center ${
                  reverse ? "" : ""
                }`}
              >
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className={`${reverse ? "lg:order-2" : "lg:order-1"}`}
                >
                  <CultureStoryImageSlider
                    images={story.images}
                    title={story.title}
                    meta={story.meta}
                  />
                </div>

                <div
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className={`${reverse ? "lg:order-1" : "lg:order-2"}`}
                >
                  <p className="text-[11px] tracking-[0.24em] uppercase text-black/40 mb-3 font-sans">
                    Experience {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-3xl md:text-5xl text-black leading-[1.1] tracking-tight mb-3">
                    {story.title}
                  </h2>
                  <p className="text-black/55 text-lg md:text-xl leading-snug mb-4">
                    {story.subtitle}
                  </p>
                  <p className="text-black/70 text-[15px] leading-relaxed mb-6 max-w-xl">
                    {story.description}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {story.highlights.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-black/15 bg-white/70 px-4 py-1.5 text-[12px] tracking-wide text-black/75"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 md:mt-24 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-black/10 pt-8">
          <p className="text-black/60 text-[14px]">
            Ready for a custom cultural route across Kathmandu Valley and beyond?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground text-[11px] tracking-[0.15em] uppercase px-7 py-3.5 hover:bg-accent/90 transition-colors"
          >
            Plan This Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
