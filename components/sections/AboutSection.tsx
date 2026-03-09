"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=90",
    number: "01",
    title: "Everest Base Camp",
    description: "We don't just plan vacations; we create journeys tailored to your dreams, ensuring every moment is unforgettable.",
  },
  {
    image: "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?w=800&q=90",
    number: "02",
    title: "Annapurna Circuit",
    description: "With our trusted local partners, you'll discover hidden spots and cultural experiences that most travelers never get to see.",
  },
  {
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=90",
    number: "03",
    title: "Upper Mustang",
    description: "Step into the 'Forbidden Kingdom' to witness ancient monasteries and a landscape that feels like another planet.",
  },
  {
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=90",
    number: "04",
    title: "Mardi Himal Trek",
    description: "A short, pristine trek providing spectacular face-to-face views of the sacred Machhapuchhre peak.",
  },
  {
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=90",
    number: "05",
    title: "Annapurna Base Camp",
    description: "The ABC trek takes you deep into the Annapurna Sanctuary, surrounded by a 360-degree wall of giant peaks.",
  },
  {
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=90",
    number: "06",
    title: "Chitwan Jungle Safari",
    description: "Trade the mountains for the jungle. Spot one-horned rhinos, tigers, and exotic birds on a safari adventure.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
                /About Us
              </p>
            </div>

            {/* 2. Header and Description */}
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-semibold text-black leading-[1.2] tracking-tight mb-4">
                What&apos;s So Special{" "}
                <span className="text-black/50 md:text-black">About This?</span>
              </h2>
              <p className="text-black/55 text-[14px] md:text-[15px] leading-relaxed font-light font-sans max-w-md">
                Save more on your trips with exclusive discounts, seasonal promotions, and
                unbeatable deals for unforgettable adventures.
              </p>
            </div>
          </div>

          {/* 3. Right Content: Button */}
          <div className="flex-shrink-0">
            <button className="w-full sm:w-auto bg-black text-white text-[11px] tracking-[0.15em] uppercase font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-black/80 cursor-pointer flex items-center justify-center gap-3">
              Learn More
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
                  <div className="relative w-1/2 aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
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