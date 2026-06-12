"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../layout/SectionWrapper";

export interface CategoryItem {
  label: string;
  teaser: string;
  image: string;
  href: string;
}

export interface CategoriesSectionProps {
  data: {
    sectionTagline: string;
    heading: string;
    description: string;
    categories: CategoryItem[];
  };
}

const chunkArray = (arr: CategoryItem[], size: number) => {
  if (!arr || arr.length === 0) return [];
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default function TravelCategoriesSection({ data }: CategoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Safely fallback if data hasn't loaded yet
  const categories = data?.categories || [];
  const travelRows = chunkArray(categories, 4);

  useEffect(() => {
    if (!data || categories.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-travel-card='true']");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 42, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [categories, data]);

  if (!data) return null;

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative overflow-hidden py-20 md:py-24 bg-[#f4f1ea]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Animated Header */}
        <div ref={headerRef} className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-black/35 mb-3 font-sans">
            {data?.sectionTagline || "Explore"}
          </p>
          <h2 className="text-4xl md:text-6xl text-black leading-[1.05] tracking-tight mb-4">
            {data?.heading || "Categories"}
          </h2>
          <p className="text-black/60 text-[15px] md:text-[17px] leading-relaxed">
            {data?.description || ""}
          </p>
        </div>

        {/* Animated Grid Wrapper */}
        {travelRows.length > 0 && (
          <div ref={cardsRef} className="space-y-6 lg:space-y-4">
            {travelRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="group/row grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:flex-nowrap lg:gap-4"
              >
                {row.map((style) => (
                  <Link
                    key={style?.label || Math.random().toString()}
                    href={style?.href || "#"}
                    data-travel-card="true"
                    className="group relative block h-[320px] lg:h-[340px] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.15)] lg:flex-1 lg:min-w-0 lg:transition-[flex-grow,transform,filter] lg:duration-500 lg:ease-out lg:group-hover/row:flex-[0.88] lg:hover:!flex-[1.55]"
                  >
                    {style?.image && (
                      <Image
                        src={style.image}
                        alt={style?.label || "Travel style category"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Card Info Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-white text-3xl tracking-tight mb-2">
                        {style?.label || ""}
                      </h3>
                      <p className="text-white/85 text-[14px] leading-relaxed">
                        {style?.teaser || ""}
                      </p>
                      <div className="mt-4 h-[2px] w-0 bg-white/90 group-hover:w-24 transition-all duration-500" />
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}