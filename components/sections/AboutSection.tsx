"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";

const aboutImages = [
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=90",
  "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?w=800&q=90",
  "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=90",
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=90",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=90",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=90",
];

const aboutImagesSecondary = [
  "https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&q=80", // Everest detail
  "https://images.unsplash.com/photo-1502310297702-f4b8730b5e92?w=400&q=80", // Annapurna detail
  "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=400&q=80", // Upper Mustang detail
  "https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=400&q=80", // Mardi Himal detail
  "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=400&q=80", // ABC detail
  "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=400&q=80", // Chitwan detail
];

export default function AboutSection() {
  const { language } = useLanguage();
  const copy = translations[language].about;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = copy.cards.map((card, index) => ({
    ...card,
    image: aboutImages[index],
    secondaryImage: aboutImagesSecondary[index],
  }));

  const visibleCards = 2;
  const maxIndex = cards.length - visibleCards;

  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(sliderRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const container = trackRef.current.parentElement as HTMLElement;
    if (!container) return;
    const gap = 24;
    const cardW = (container.offsetWidth - gap) / 2;
    const offset = currentIndex * (cardW + gap);
    gsap.to(trackRef.current, { x: -offset, duration: 0.7, ease: "power3.inOut" });
  }, [currentIndex]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-4 md:px-10 py-12 md:py-24"
    >
      {/* ── HEADER SECTION ── */}
      <div ref={headingRef} className="max-w-7xl mx-auto mb-10 md:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

          <div className="flex flex-col sm:flex-row gap-6 md:gap-20 lg:gap-32 flex-1">
            {/* 1. Label */}
            <div className="flex-shrink-0">
              <p className="text-[10px] md:text-[11px] tracking-[3px] uppercase text-black/35 font-light font-sans lg:mt-2">
                {copy.label}
              </p>
            </div>

            {/* 2. Header and Description */}
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-semibold text-black leading-[1.2] tracking-tight mb-4">
                {copy.titleLead} <span className="text-black/50 md:text-black">{copy.titleAccent}</span>
              </h2>
              <p className="text-black/55 text-[14px] md:text-[15px] leading-relaxed font-light font-sans max-w-md">
                {copy.description}
              </p>
            </div>
          </div>

          {/* 3. Right Content: Button */}
          <div className="flex-shrink-0">
            <button className="w-full sm:w-auto bg-black text-white text-[11px] tracking-[0.15em] uppercase font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-black/80 cursor-pointer flex items-center justify-center gap-3">
              {copy.button}
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* ── SLIDER SECTION ── */}
      <div ref={sliderRef} className="max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out py-4"
            style={{ gap: "24px", willChange: "transform" }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Top Row: Image and Number */}
                <div className="flex justify-between items-start mb-8">
                  {/* Image Container - Scaled down and fixed ratio */}
                  {/* Image Container - Parallax depth effect */}
                  <div
                    className="relative w-1/2 aspect-video rounded-lg overflow-hidden group/img"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
                      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
                      const img = e.currentTarget.querySelector("img");
                      if (img) {
                        (img as HTMLElement).style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      const img = e.currentTarget.querySelector("img");
                      if (img) {
                        (img as HTMLElement).style.transform = "scale(1) translate(0px, 0px)";
                        (img as HTMLElement).style.transition = "transform 0.6s ease-out";
                      }
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      style={{ transition: "transform 0.15s ease-out" }}
                      sizes="(max-width: 768px) 40vw, 20vw"
                    />
                  </div>

                  {/* Number badge - Moved to the top right of the card */}
                  <span className="text-black/80 text-lg font-medium font-sans tracking-tight">
                    {card.number}
                  </span>
                </div>

                {/* Bottom Row: Text Content */}
                <div className="space-y-3">
                  {/* Title - Optional based on image 2, but kept for structure */}
                  {card.title && (
                    <h3 className="text-black font-semibold text-lg leading-tight">
                      {card.title}
                    </h3>
                  )}
                  <p className="text-black/70 text-[15px] leading-relaxed font-normal font-sans">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTROLS (Remaining the same for functionality) ── */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-full bg-black transition-all duration-500 cursor-pointer border-none p-0"
                style={{
                  width: i === currentIndex ? "32px" : "8px",
                  opacity: i === currentIndex ? 1 : 0.2
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {[
              { label: <ChevronLeft size={18} />, fn: prev, disabled: currentIndex === 0 },
              { label: <ChevronRight size={18} />, fn: next, disabled: currentIndex === maxIndex },
            ].map(({ label, fn, disabled }, idx) => (
              <button
                key={idx}
                onClick={fn}
                disabled={disabled}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
            ${disabled
                    ? "border-black/5 text-black/10 cursor-not-allowed"
                    : "border-black/20 text-black hover:bg-black hover:text-white cursor-pointer active:scale-95"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}