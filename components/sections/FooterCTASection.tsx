"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import { navItems } from "../layout/Navbar";

const footerLinks = {
  Explore: ["Our Plans", "Top Tours", "Travel Guide", "Sustainability Commitment"],
  "About Us": ["Our Story", "Testimonials", "Sustainability Commitment", "Careers"],
  Support: ["FAQ", "Contact Us", "Booking Process", "Privacy Policy"],
};

export default function FooterCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
            Pack Your Bags, Your{" "}
            <span className="text-white/35 font-light italic">Adventure Awaits!</span>
          </h2>
        </div>
        <button className="flex-shrink-0 bg-white text-black text-[12px] font-sans font-semibold tracking-[0.1em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white/90 cursor-pointer flex items-center gap-3">
          Book a Vacation
          <span className="bg-black/10 w-6 h-6 rounded-full flex items-center justify-center text-[9px]">›</span>
        </button>
      </div>

      {/* Social links */}
      <div className="px-6 md:px-10 py-6 flex items-center gap-6 border-b border-white/10">
        {["Youtube", "Instagram", "Facebook"].map((s) => (
          <a key={s} href="#" className="text-white/40 text-[12px] font-sans font-light hover:text-white transition-colors">
            {s}
          </a>
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
            Crafting unforgettable journeys through Nepal's landscapes.
          </p>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <p className="text-white/50 text-[11px] tracking-[2px] uppercase font-sans font-light mb-4">{category}</p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/30 text-[13px] font-light font-sans hover:text-white transition-colors leading-snug block">
                    {link}
                  </a>
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
          <span className="text-white/25 text-[11px] font-sans font-light">© 2025 Fantastic Adventure Nepal</span>
        </div>

        {/* Center pill nav */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1.5 gap-1">
          {navItems.map((item, i) => (
            <Link key={item.label} href={item.href} scroll={false} legacyBehavior>
              <a
                className={`px-3 py-1 rounded-full text-[11px] font-light tracking-wide transition-all duration-200 font-sans cursor-pointer
                  ${i === 0 ? "bg-white/15 text-white" : "text-white/40 hover:text-white"}`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white/25 text-[11px] font-sans font-light">ENG ▾</span>
          <button className="text-white/25 text-[11px] font-sans font-light hover:text-white transition-colors cursor-pointer">Contact Us</button>
        </div>
      </div>
    </footer>
  );
}
