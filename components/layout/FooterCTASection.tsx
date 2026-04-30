"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";
import { travelStyles } from "@/lib/travelStyles";
import { Facebook, Youtube, Linkedin, Phone, Mail, Twitter } from "lucide-react";

export default function FooterCTASection() {
  const { language } = useLanguage();
  const copy = translations[language].footer;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sampleTrips = [
    { label: "Everest Base Camp", href: "/destinations" },
    { label: "Annapurna Circuit", href: "/destinations" },
    { label: "Chitwan Jungle Safari", href: "/destinations" },
  ];

  const quickLinks = [
    { label: "Our Story", href: "/about" },
    { label: "Documents & Preparation", href: "/documents" },
    { label: "DMC", href: "/dmc" },
    { label: "What we Offer", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ];

  const socialIcons = [
    { icon: <Facebook size={16} />, href: "#" },
    { icon: <Youtube size={16} />, href: "#" },
    { icon: <Twitter size={16} />, href: "#" },
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
      name: "KEEP",
      caption: "Kathmandu Environmental Education Project",
      src: "/affiliation_logos/KEEP_logo.jpg",
      alt: "KEEP logo",
      width: 240,
      height: 84,
      className: "h-10 w-auto",
    },
    {
      name: "TAAN",
      caption: "Trekking Agents Association of Nepal",
      src: "/affiliation_logos/taan-logo.jpg",
      alt: "TAAN logo",
      width: 240,
      height: 84,
      className: "h-10 w-auto cover",
    }
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
        ".footer-link-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
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
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 md:px-10 lg:flex-row lg:justify-between lg:gap-32 xl:px-14">

          {/* Brand column */}
          <div className="w-full lg:max-w-md">
            <div className="mb-5">
              <Image
                src="/Logo-Website.png"
                alt="Fantastic Adventure Nepal"
                width={260}
                height={78}
                className="h-14 w-auto object-contain"
                sizes="260px"
              />
            </div>
            <div>
              {/* Effect applied here */}
              <p 
                className=" text-lg sm:text-4xl tracking-wide leading-none uppercase" 
                style={{ 
                  fontFamily: "'Georgia', serif",
                  color: "transparent",
                  backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80')`,
                  backgroundSize: "cover",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  fontWeight: 900,
                }}
              >
                FANTASTIC ADVENTURE NEPAL
              </p>
              <p className="text-white/60 text-[10px] italic tracking-[0.24em] mt-1">...nature, culture & adventure</p>
            </div>

              <p className="text-white/75 text-sm font-light leading-relaxed mb-8 mt-4 max-w-none sm:max-w-[28rem]">
              Fantastic Adventure Nepal is your dependable travel partner for journeys across Nepal. We blend deep local knowledge, seamless logistics, and global standards of service to craft meaningful and memorable holiday experiences that check off your requirement list.
            </p>

            {/* Social links */}
            <div className="mb-8">
              <p className="text-white/50 text-[10px] tracking-[3px] uppercase mb-4">Social Links</p>
                <div className="flex flex-wrap items-center gap-3">
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

          <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:w-auto lg:grid-cols-3 lg:gap-14">
            {/* Sample Trips */}
            <div>
              <p className="text-white/50 text-[10px] tracking-[3px] uppercase mb-6">Sample Trips</p>
              <ul className="space-y-4">
                {sampleTrips.map((link) => (
                  <li key={link.label} className="footer-link-item">
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
                  <li key={link.label} className="footer-link-item">
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
                  <li key={link.label} className="footer-link-item">
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
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6 md:px-10 xl:px-14">
        <p className="text-white/30 text-[11px] font-light">{copy.copyright}</p>
      </div>
    </footer>
  );
}