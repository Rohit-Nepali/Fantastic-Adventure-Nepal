"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { travelStyles } from "@/lib/travelStyles";

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const travelRows = [travelStyles.slice(0, 3), travelStyles.slice(3, 6)];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-travel-card='true']");
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="relative overflow-hidden px-6 md:px-10 py-20 md:py-24 bg-[#f4f1ea]"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-10 md:mb-14 max-w-3xl">
          <p className="text-[11px] tracking-[0.25em] uppercase text-black/35 mb-3 font-sans">
            Travel Categories
          </p>
          <h2 className="text-4xl md:text-6xl text-black leading-[1.05] tracking-tight mb-4">
            Choose Your Travel Style
          </h2>
          <p className="text-black/60 text-[15px] md:text-[17px] leading-relaxed">
            Explore journeys shaped by how you love to travel, from culture-rich city walks to wild river adventure.
          </p>
        </div>

        <div ref={cardsRef} className="space-y-6 lg:space-y-4">
          {travelRows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="group/row grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:flex-nowrap lg:gap-4"
            >
              {row.map((style) => (
                <Link
                  key={style.label}
                  href={style.href}
                  data-travel-card="true"
                  className="group relative block h-[320px] lg:h-[340px] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.15)] lg:flex-1 lg:min-w-0 lg:transition-[flex-grow,transform,filter] lg:duration-500 lg:ease-out lg:group-hover/row:flex-[0.88] lg:hover:!flex-[1.55]"
                >
                  <Image
                    src={style.image}
                    alt={style.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-white/70 text-[10px] uppercase tracking-[0.24em] mb-2 font-sans">
                      Travel Style
                    </p>
                    <h3 className="text-white text-3xl tracking-tight mb-2">
                      {style.label}
                    </h3>
                    <p className="text-white/85 text-[14px] leading-relaxed">
                      {style.teaser}
                    </p>
                    <div className="mt-4 h-[2px] w-0 bg-white/90 group-hover:w-24 transition-all duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}