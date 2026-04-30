"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const nepalImages = [
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80", 
  "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?w=800&q=80", 
  "https://images.unsplash.com/photo-1526481280693-3bfa7561807e?w=800&q=80", 
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80", 
  "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?w=800&q=80", 
  "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=800&q=80" 
];

export default function DestinationsSection() {
  const { language } = useLanguage();
  const copy = translations[language].destinations;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const destinations = (copy.items || []).map((destination, index) => ({
    ...destination,
    image: nepalImages[index] || nepalImages[0],
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
          },
        }
      );

      // Staggered Cards Animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(Array.from(cards),
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      id="destinations"
      ref={sectionRef}
      size="default"
      padding="default"
      bg="light"
      overflow
    >
      {/* ── HEADER ── */}
      <div ref={headerRef} className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-10">
        <div className="max-w-2xl">
          <p className="text-[12px] tracking-[0.25em] uppercase text-accent font-medium mb-4 font-sans">
            {copy.label || "Explore the Himalayas"}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
            {copy.title || "Nepal's Timeless Wonders"}
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-8 md:max-w-sm md:text-right">
          <p className="text-slate-500 text-lg leading-relaxed font-light">
            {copy.description || "From the highest peaks on Earth to lush tropical jungles, discover the diverse soul of Nepal."}
          </p>

          <Button
            asChild
            variant="accent"
            rounded="full"
            className="group w-fit transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Link href="/destinations">
              <span className="relative z-10 text-white">{copy.button || "View All Regions"}</span>
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── GRID ── */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-[450px] shadow-2xl shadow-black/5"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={destination.id <= 3}
            />

            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Top Badge: Package Count */}
            <div className="absolute top-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-1.5 rounded-full text-[12px] font-medium tracking-wide">
                {destination.count || "12+ Tours"}
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
                Destination
              </p>
              <h3 className="text-white text-3xl font-semibold tracking-tight">
                {destination.name}
              </h3>
              <div className="h-[2px] w-0 bg-accent mt-4 group-hover:w-full transition-all duration-700 ease-in-out" />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}