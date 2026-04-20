"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/provider/Language";
import { languageOptions, translations } from "@/lib/translations";

type NavbarProps = {
  variant?: "overlay" | "solid";
};

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function Navbar({ variant = "overlay" }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { language, changeLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuImageRef = useRef<HTMLDivElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const copy = translations[language];
  const navItems = copy.navItems;
  const currentLanguage = languageOptions.find((o) => o.code === language) ?? languageOptions[0];
  const useOverlayStyle = variant === "overlay" && !isScrolled && !menuOpen;

  const menuImages = [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?w=600&q=80",
    "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80",
    "https://images.unsplash.com/photo-1526481280693-3bfa7561807e?w=600&q=80",
    "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?w=600&q=80",
  ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOverlayNavigation = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isNavigating) return;

    setPendingHref(href);
    setIsNavigating(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!overlayRef.current || !menuItemsRef.current) return;
    const items = menuItemsRef.current.querySelectorAll(".nav-item");

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(overlayRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" }
      );
      gsap.fromTo(items,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(menuImageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(menuFooterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.6 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(items, { opacity: 0, y: -30, duration: 0.3, stagger: 0.04, ease: "power2.in" });
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
        delay: 0.15,
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
          if (pendingHref) {
            const nextHref = pendingHref;
            setPendingHref(null);
            if (nextHref !== pathname) {
              router.push(nextHref);
            } else {
              setIsNavigating(false);
            }
          }
        },
      });
    }
  }, [menuOpen, pathname, pendingHref, router]);

  return (
    <>
      {/* ── TOP BAR ── */}
      <nav className={cx(
        "w-full flex items-center justify-between px-6 md:px-10 py-6 z-[90] transition-colors duration-500",
        useOverlayStyle
          ? "bg-transparent border-b border-transparent"
          : "bg-white/90 backdrop-blur border-b border-black/10"
      )}>
        {/* Hamburger */}
        <button
          onClick={() => {
            setPendingHref(null);
            setIsNavigating(false);
            setMenuOpen(true);
          }}
          className="flex flex-col gap-[5px] group cursor-pointer"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className={cx(
            "block h-[1.5px] w-6 transition-all duration-300 group-hover:w-8",
            "bg-black"
          )} />
          <span className={cx(
            "block h-[1.5px] w-4 transition-all duration-300 group-hover:w-8",
            "bg-black"
          )} />
        </button>

        {/* Brand — centered */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className={cx(
            "text-lg font-semibold tracking-wide transition-colors duration-500",
            "text-black"
          )}>
            Fantastic Adventure Nepal
          </span>
        </Link>

        {/* Right — lang + CTA */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((p) => !p)}
              className={cx(
                "text-[12px] tracking-wide font-sans transition-colors duration-500",
                "text-black/70"
              )}
            >
              {currentLanguage.label} &#9662;
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white text-black shadow-lg z-50">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { changeLanguage(lang.code); setLangOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={cx(
              "hidden md:block text-[11px] font-medium tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all duration-300",
              "bg-white text-black border border-black/20 hover:bg-white/90"
            )}
          >
            {copy.navCta}
          </Link>
        </div>
      </nav>

      {/* ── FULLSCREEN OVERLAY ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-white hidden flex-col"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {/* Close + Brand */}
        <div className="flex items-center justify-between px-6 md:px-10 py-6 flex-shrink-0">
          <button
            onClick={() => {
              setPendingHref(null);
              setIsNavigating(false);
              setMenuOpen(false);
            }}
            className="text-black/40 hover:text-black transition-colors duration-200 cursor-pointer text-sm tracking-widest uppercase font-sans"
          >
            ✕ Close
          </button>
          <span className="text-black/30 text-sm tracking-widest uppercase font-sans">
            Fantastic Adventure Nepal
          </span>
        </div>

        {/* Thin divider */}
        <div className="mx-6 md:mx-10 h-[1px] bg-black/8 flex-shrink-0" />

        <div className="flex flex-1 overflow-hidden px-6 md:px-10 pb-10 gap-16">

          {/* Nav Links */}
          <div ref={menuItemsRef} className="flex flex-col justify-center gap-1 flex-1">
            {navItems.map((item, i) => (
              <div key={item.label} className="nav-item opacity-0">
                <Link
                  href={item.href}
                  onClick={handleOverlayNavigation(item.href)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cx(
                    "group flex items-baseline gap-4 py-2 transition-opacity duration-200",
                    isNavigating ? "pointer-events-none opacity-70" : ""
                  )}
                >
                  <span className="text-black/25 text-xs font-sans tracking-widest w-6">
                    0{i + 1}
                  </span>
                  <span className={cx(
                    "font-semibold transition-colors duration-300 text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tight",
                    hoveredIndex === i ? "text-orange-500" : "text-black"
                  )}>
                    {item.label}
                  </span>
                </Link>
                {i < navItems.length - 1 && (
                  <div className="ml-10 h-[1px] bg-black/6" />
                )}
              </div>
            ))}

            {/* CTA inside menu */}
            <div className="nav-item opacity-0 mt-6 ml-10">
              <Link
                href="/contact"
                onClick={handleOverlayNavigation("/contact")}
                className="inline-flex items-center gap-3 bg-black text-white text-[11px] tracking-[0.15em] uppercase font-medium px-7 py-3.5 rounded-full hover:bg-orange-500 transition-colors duration-300"
              >
                Plan Your Trip
                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">›</span>
              </Link>
            </div>
          </div>

          {/* Right — Preview Image */}
          <div
            ref={menuImageRef}
            className="hidden lg:flex flex-col justify-center w-[340px] flex-shrink-0 opacity-0"
          >
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden">
              <img
                src={hoveredIndex !== null ? menuImages[hoveredIndex] : menuImages[0]}
                alt="destination preview"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1 font-sans">Explore</p>
                <p className="text-white text-lg font-semibold">
                  {hoveredIndex !== null ? navItems[hoveredIndex].label : "Nepal"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="mx-6 md:mx-10 h-[1px] bg-black/8 flex-shrink-0" />
        <div
          ref={menuFooterRef}
          className="flex items-center justify-between px-6 md:px-10 py-4 opacity-0 flex-shrink-0"
        >
          <div className="flex gap-6">
            {["Instagram", "Facebook", "Youtube"].map((s) => (
              <a key={s} href="#" className="text-black/30 hover:text-black text-xs tracking-widest uppercase font-sans transition-colors duration-200">
                {s}
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            {languageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cx(
                  "text-xs tracking-widest uppercase font-sans transition-colors duration-200",
                  language === lang.code ? "text-orange-500 font-medium" : "text-black/30 hover:text-black"
                )}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}