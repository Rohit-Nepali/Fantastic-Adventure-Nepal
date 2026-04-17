"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";

const destinationImages = [
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  "https://images.unsplash.com/photo-1565429221253-3a6f28234cfc?w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
];

export default function DestinationsSection() {
  const { language } = useLanguage();
  const copy = translations[language].destinations;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const destinations = copy.items.map((destination, index) => ({
    ...destination,
    image: destinationImages[index],
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          gsap.fromTo(card, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative bg-white overflow-hidden px-6 md:px-10 py-16 md:py-24"
    >
      {/* ── HEADER ── */}
      <div ref={headerRef} className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8">
        <div className="max-w-xl">
          <p className="text-[11px] tracking-[3px] uppercase text-black/35 font-light mb-4 font-sans">
            {copy.label}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-[1.1] tracking-tight">
            {copy.title}
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6 md:max-w-xs md:text-right">
          <p className="text-black/45 text-[15px] leading-relaxed font-light font-sans">
            {copy.description}
          </p>

          {/* Updated Button to match image style */}
          <button className="group bg-black text-white text-[11px] tracking-[0.15em] uppercase font-sans font-medium pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:bg-black/90 cursor-pointer flex items-center gap-4">
            {copy.button}
            <span className="bg-white/15 w-10 h-10 rounded-full flex items-center justify-center text-[12px] group-hover:bg-white/25 transition-colors">
              <span className="translate-y-[-1px]">›››</span>
            </span>
          </button>
        </div>
      </div>

      {/* ── GRID ── */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group relative rounded-xl overflow-hidden cursor-pointer h-[320px] md:h-[400px]"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={destination.id <= 3}
              onError={(e) => {
                console.error("Image failed to load:", destination.image);
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-gray-200');
              }}
            />

            {/* Subtle Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

            {/* Badge: White Pill with "Count Destination" */}
            <div className="absolute top-5 left-5">
              <div className="bg-white/95 backdrop-blur-md text-black px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <span className="text-[12px] font-semibold font-sans">
                  {destination.count}
                </span>
              </div>
            </div>

            {/* Name: Bottom-Left with specific typography */}
            <div className="absolute bottom-7 left-7">
              <h3 className="text-white text-2xl font-medium font-sans tracking-wide">
                {destination.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}