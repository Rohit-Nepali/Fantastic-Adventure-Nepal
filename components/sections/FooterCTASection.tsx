"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";
import { travelStyles } from "@/lib/travelStyles";
import { Facebook, Youtube, Linkedin, Phone, Mail } from "lucide-react";

// X (Twitter) — kept as custom SVG since lucide uses the old bird icon
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function FooterCTASection() {
  const { language } = useLanguage();
  const copy = translations[language].footer;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  const sampleTrips = [
    { label: "Everest Base Camp", href: "/destinations" },
    { label: "Annapurna Circuit", href: "/destinations" },
    { label: "Chitwan Jungle Safari", href: "/destinations" },
  ];

  const quickLinks = [
    { label: "Our Story", href: "/about" },
    { label: "DMC", href: "/dmc" },
    { label: "What we Offer", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ];

  const socialIcons = [
    { icon: <Facebook size={16} />, href: "#" },
    { icon: <Youtube size={16} />, href: "#" },
    { icon: <XIcon />, href: "#" },
    { icon: <Linkedin size={16} />, href: "#" },
  ];

  const affiliations = [
    {
      name: "NATTA",
      caption: "Nepal Association of Tour & Travel Agents",
      src: "/affiliation_logos/natta-logo-white-76452a92.png",
      alt: "NATTA logo",
      width: 240,
      height: 72,
      className: "h-10 w-auto",
    },
    {
      name: "PATA",
      caption: "Pacific Asia Travel Association",
      subCaption: "Nepal Chapter",
      src: "/affiliation_logos/pata-logo-white-f57e853e.webp",
      alt: "PATA logo",
      width: 180,
      height: 72,
      className: "h-10 w-auto",
    },
    {
      name: "SKAL",
      caption: "Skål International",
      subCaption: "Connecting Tourism Globally | Nepal",
      src: "/affiliation_logos/skal-international-logo-white-b823b08f.png",
      alt: "Skal International logo",
      width: 240,
      height: 72,
      className: "h-10 w-auto",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        bigTextRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: bigTextRef.current, start: "top 95%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="overflow-hidden"
      style={{ backgroundColor: "#252525" }}
    >
      <div ref={contentRef}>
        {/* Main footer content */}
        <div className="flex justify-between px-8 md:px-14 pt-14 pb-10 mx-auto">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 4L25 12H17L21 4Z" fill="white" opacity="0.9" />
                  <rect x="18" y="12" width="6" height="3" fill="white" opacity="0.9" />
                  <rect x="15" y="15" width="12" height="4" rx="1" fill="white" opacity="0.85" />
                  <rect x="12" y="19" width="18" height="3" fill="white" opacity="0.8" />
                  <rect x="10" y="22" width="22" height="12" rx="1" fill="white" opacity="0.75" />
                  <rect x="17" y="28" width="8" height="6" fill="white" opacity="0.9" />
                </svg>
                <div>
                  <p className="text-white font-bold text-xl tracking-wide leading-none" style={{ fontFamily: "'Georgia', serif" }}>FANTASTIC ADVENTURE NEPAL</p>
                  <p className="text-white/60 text-[10px] italic tracking-widest">...nature, culture & adventure</p>
                </div>
              </div>
            </div>

            <p className="text-white/75 text-sm font-light leading-relaxed mb-8 max-w-[280px]">
              Fantastic Adventure Nepal is your dependable travel partner for journeys across Nepal. We blend deep local knowledge, seamless logistics, and global standards of service to craft meaningful and memorable holiday experiences that check off your requirement list.
            </p>

            {/* Social links */}
            <div className="mb-8">
              <p className="text-white/50 text-[10px] tracking-[3px] uppercase mb-4">Social Links</p>
              <div className="flex items-center gap-3">
                {socialIcons.map(({ icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:border-accent hover:bg-accent hover:text-white transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Enquiries */}
            <div>
              <p className="text-white/50 text-[10px] tracking-[3px] uppercase mb-4">For Enquiries</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Phone size={15} />
                  <span>+977-1-5909976 / 5909977 / 5909978</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Mail size={15} />
                  <span>info@fantasticadventurenepal.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between lg:gap-20 gap-10">
            {/* Sample Trips */}
            <div>
              <p className="text-white/50 text-[10px] tracking-[3px] uppercase mb-6">Sample Trips</p>
              <ul className="space-y-4">
                {sampleTrips.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white text-base font-light hover:text-white/70 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Style */}
            <div>
              <p className="text-white/50 text-[10px] tracking-[3px] uppercase mb-6">Travel Style</p>
              <ul className="space-y-4">
                {travelStyles.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white text-base font-light hover:text-white/70 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-white/50 text-[10px] tracking-[3px] uppercase mb-6">Quick Links</p>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white text-base font-light hover:text-white/70 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Affiliations row */}
        <div className=" px-8 md:px-14 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-white/20">
          <p className="text-white/50 text-[10px] tracking-[3px] uppercase shrink-0">Affiliated With:</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {affiliations.map((affiliation) => (
              <div key={affiliation.name} className="flex flex-col justify-center opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src={affiliation.src}
                  alt={affiliation.alt}
                  width={affiliation.width}
                  height={affiliation.height}
                  className={`${affiliation.className} object-contain`}
                  sizes="(max-width: 768px) 160px, 200px"
                />
                <p className="mt-2 text-white/70 text-[8px] tracking-wide leading-tight max-w-[220px]">
                  {affiliation.caption}
                  {affiliation.subCaption ? ` • ${affiliation.subCaption}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giant brand name at bottom */}
      <div ref={bigTextRef} className="relative overflow-hidden" style={{ height: "clamp(100px, 18vw, 220px)" }}>
        {/* <div
          className="absolute inset-0 flex items-end justify-center pb-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "100% 40%",
            WebkitMaskImage: "url(#brand-mask)",
          }}
        /> */}
        <p
          className="relative z-10 text-center font-black uppercase leading-none select-none"
          style={{
            fontSize: "clamp(70px, 16vw, 200px)",
            letterSpacing: "-0.01em",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            color: "transparent",
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "100% 59%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          Fantastic Adventure Nepal
        </p>
      </div>

      {/* Copyright */}
      <div className="px-8 md:px-14 py-4 flex items-center justify-between border-t border-white/10">
        <p className="text-white/30 text-[11px] font-light">{copy.copyright}</p>
      </div>
    </footer>
  );
}