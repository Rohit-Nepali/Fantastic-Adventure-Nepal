"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    number: "01",
    title: "Expert Local Guides",
    description: "Our experienced guides are born and raised in Nepal, offering insider knowledge and authentic cultural experiences.",
  },
  {
    number: "02",
    title: "Safety First",
    description: "Your safety is our top priority. We maintain the highest safety standards and always prioritize secure travel arrangements.",
  },
  {
    number: "03",
    title: "Flexible Itineraries",
    description: "We customize every trip to match your preferences, ensuring a perfect balance of adventure and relaxation.",
  },
  {
    number: "04",
    title: "Unique Experiences",
    description: "From hidden temples to remote mountain villages, we take you beyond the typical tourist paths.",
  },
  {
    number: "05",
    title: "Best Value",
    description: "Competitive pricing with no hidden costs. We offer transparent pricing and exceptional quality for your money.",
  },
  {
    number: "06",
    title: "24/7 Support",
    description: "Round-the-clock support throughout your journey. We're always just a call away whenever you need assistance.",
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".why-line",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: "power4.out", transformOrigin: "left",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative bg-white overflow-hidden px-16 py-20"
    >
      {/* Top hairline */}
      <div className="absolute top-0 left-16 right-16 h-px bg-black/10" />

      <div className="max-w-7xl mx-auto">
        {/* HEADER  */}
        <div ref={headerRef} className="flex items-end justify-between mb-16">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[4px] uppercase text-black/35 font-light mb-5 font-sans">
              Why Choose Us
            </p>
            <div className="why-line w-12 h-px bg-black mb-6 origin-left block" />
            <h2 className="text-5xl lg:text-6xl font-light text-black leading-[1.1] tracking-tight">
              Your Adventure{" "}
              <em className="not-italic font-light text-black/40">Starts Here</em>
            </h2>
          </div>
          <p className="hidden lg:block max-w-xs text-black/45 text-[15px] leading-relaxed font-light font-sans pb-1">
            We go above and beyond to ensure your Nepal experience exceeds all expectations.
          </p>
        </div>

        {/* ── GRID ── */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative border-t border-l border-black/10 p-8 transition-all duration-500 hover:bg-black/10 cursor-default
                [&:nth-child(3n+1)]:border-l-0
                last:border-b-0"
            >
              {/* Bottom border for last row */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />

              {/* Number */}
              <p className="text-[11px] tracking-[3px] text-black/25 font-sans font-light mb-6 transition-colors duration-500 group-hover:text-white/30">
                {feature.number}
              </p>

              {/* Title */}
              <h3 className="text-xl font-light text-black leading-snug mb-3 transition-colors duration-500 group-hover:text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-black/45 text-[13.5px] leading-relaxed font-light font-sans transition-colors duration-500 group-hover:text-white/60">
                {feature.description}
              </p>

              {/* Hover: top edge reveal */}
              <div className="absolute top-0 left-0 right-0 h-px bg-black scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-16 right-16 h-px bg-black/10" />
    </section>
  );
}