"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";

export default function FooterCTASection() {
  const { language } = useLanguage();
  const copy = translations[language].footer;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const footerGroups = [
    { label: copy.groupLabels.explore, links: copy.groups.explore },
    { label: copy.groupLabels.aboutUs, links: copy.groups.aboutUs },
    { label: copy.groupLabels.support, links: copy.groups.support },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="bg-stone-950 text-white overflow-hidden"
    >
      {/* CTA Top */}
      <div ref={contentRef} className="px-6 md:px-10 pt-16 pb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-b border-white/10">
        <div className="max-w-lg">
          <h2 className="text-3xl md:text-5xl font-semibold leading-[1.15] tracking-tight mb-2">
            {copy.ctaLead} <span className="text-white/35 font-light italic">{copy.ctaAccent}</span>
          </h2>
        </div>
        <button className="flex-shrink-0 bg-white text-black text-[12px] font-sans font-semibold tracking-[0.1em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white/90 cursor-pointer flex items-center gap-3">
          {copy.ctaButton}
          <span className="bg-black/10 w-6 h-6 rounded-full flex items-center justify-center text-[9px]">›</span>
        </button>
      </div>

      {/* Social links */}
      <div className="px-6 md:px-10 py-6 flex items-center gap-6 border-b border-white/10">
        {copy.social.map((s) => (
          <span key={s} className="text-white/40 text-[12px] font-sans font-light">
            {s}
          </span>
        ))}
      </div>

      {/* Links grid */}
      <div className="px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10">
        {/* Logo col */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L7 2L12 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 2V12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <p className="text-white/30 text-[12px] font-light font-sans leading-relaxed max-w-[160px]">
            {copy.description}
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.label}>
            <p className="text-white/50 text-[11px] tracking-[2px] uppercase font-sans font-light mb-4">{group.label}</p>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/30 text-[13px] font-light font-sans hover:text-white transition-colors leading-snug block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white/10 rounded-sm flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5L5 1L9 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-white/25 text-[11px] font-sans font-light">{copy.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
