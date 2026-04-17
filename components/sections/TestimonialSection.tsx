"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";

const avatarGroup = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
];

export default function TestimonialSection() {
  const { language } = useLanguage();
  const copy = translations[language].testimonials;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-white overflow-hidden px-6 md:px-20 py-20 md:py-28"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] tracking-[3px] uppercase text-black/30 font-light mb-8 font-sans">
          {copy.label}
        </p>

        <blockquote className="text-2xl md:text-4xl font-light text-black leading-[1.4] tracking-tight mb-3">
          &ldquo;{copy.quote},{" "}
          <span className="text-black/30 italic font-light">{copy.highlight}</span>&rdquo;
        </blockquote>

        {/* Avatars + Name */}
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex items-center">
            {avatarGroup.map((src, i) => (
              <div
                key={i}
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white"
                style={{ marginLeft: i > 0 ? "-12px" : "0", zIndex: avatarGroup.length - i }}
              >
                <Image src={src} alt="avatar" fill className="object-cover" sizes="48px" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-black text-[14px] font-semibold font-sans">{copy.name}</p>
            <p className="text-black/40 text-[12px] font-light font-sans">{copy.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
