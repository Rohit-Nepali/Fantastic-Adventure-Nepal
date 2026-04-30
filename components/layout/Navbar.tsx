"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/provider/Language";
import { languageOptions, translations } from "@/lib/translations";
import { X } from "lucide-react";
import Button from "../ui/Button";

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

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const copy = translations[language];
  const navItems = copy.navItems;
  const currentLanguage =
    languageOptions.find((o) => o.code === language) ?? languageOptions[0];
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
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Always show navbar at the very top
      if (currentScrollY < 50) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        // 2. Hide if scrolling down, show if scrolling up
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Scrolling Down
        } else {
          setIsVisible(true); // Scrolling Up
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOverlayNavigation =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
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
      gsap.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        },
      );
      gsap.fromTo(
        menuImageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", delay: 0.4 },
      );
      gsap.fromTo(
        menuFooterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.6 },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(items, {
        opacity: 0,
        y: -30,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
        delay: 0.15,
        onComplete: () => {
          if (overlayRef.current)
            gsap.set(overlayRef.current, { display: "none" });
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
      <nav
        className={cx(
          "fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-24 py-6 z-[90] transition-all duration-500",
          // Visibility logic
          isVisible ? "translate-y-0" : "-translate-y-full",
          // Background logic
          useOverlayStyle ? "bg-transparent" : "bg-white/10 backdrop-blur",
        )}
      >
        {/* Hamburger */}
        <button
          onClick={() => {
            setPendingHref(null);
            setIsNavigating(false);
            setMenuOpen(true);
          }}
          className="flex flex-col items-start gap-[6px] group cursor-pointer"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          {/* Longest Line */}
          <span
            className={cx(
              "block h-[1.5px] w-8 transition-all duration-300 group-hover:w-8",
              "bg-black",
            )}
          />
          {/* Medium Line */}
          <span
            className={cx(
              "block h-[1.5px] w-5 transition-all duration-300 group-hover:w-8",
              "bg-black",
            )}
          />
          {/* Shortest Line */}
          <span
            className={cx(
              "block h-[1.5px] w-2 transition-all duration-300 group-hover:w-8",
              "bg-black",
            )}
          />
        </button>

        {/* Brand — centered */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/LOGO.png"
            alt="Fantastic Adventure Nepal"
            width={240}
            height={72}
            priority
            className="h-12 w-auto object-contain transition-opacity duration-500"
          />
        </Link>

        {/* Right — lang + CTA */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={langRef}>
            <Button
              onClick={() => setLangOpen((p) => !p)}
              variant={"glass"}
              rounded={"full"}
              className={cx(
                "text-[12px] tracking-wide font-sans transition-colors duration-500",
                "text-white",
              )}
            >
              {currentLanguage.label} &#9662;
            </Button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white/10 backdrop-blur-md text-white shadow-xl z-50 border border-white/20 overflow-hidden">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm duration-200 hover:bg-white/10"
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
              "bg-accent text-white border border-transparent hover:bg-accent/80",
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
            className="flex items-center gap-2 text-black/20 hover:text-black transition-colors duration-200 cursor-pointer text-sm tracking-widest uppercase font-sans"
          >
            <X className="w-4 h-4 text-black" /> Close
          </button>
          <span className="text-black text-sm tracking-widest uppercase font-sans">
            Fantastic Adventure Nepal
          </span>
        </div>

        {/* Thin divider */}
        <div className="mx-6 md:mx-10 h-[1px] bg-black/8 flex-shrink-0" />

        <div className="flex flex-1 overflow-hidden px-6 md:px-10 pb-10 gap-16">
          {/* Nav Links */}
          <div
            ref={menuItemsRef}
            className="flex flex-col justify-center gap-1 flex-1"
          >
            {navItems.map((item, i) => (
              <div key={item.label} className="nav-item opacity-0">
                <Link
                  href={item.href}
                  onClick={handleOverlayNavigation(item.href)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cx(
                    "group flex items-baseline gap-4 py-2 transition-opacity duration-200",
                    isNavigating ? "pointer-events-none opacity-70" : "",
                  )}
                >
                  <span className="text-black/25 text-xs font-sans tracking-widest w-6">
                    0{i + 1}
                  </span>
                  <span
                    className={cx(
                      "font-semibold transition-colors duration-300 text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-tight",
                      hoveredIndex === i ? "text-accent" : "text-black",
                    )}
                  >
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
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-7 py-3.5 rounded-full hover:bg-accent/90 transition-colors duration-300"
              >
                Plan Your Trip
                <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">
                  ›
                </span>
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
                src={
                  hoveredIndex !== null
                    ? menuImages[hoveredIndex]
                    : menuImages[0]
                }
                alt="destination preview"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1 font-sans">
                  Explore
                </p>
                <p className="text-white text-lg font-semibold">
                  {hoveredIndex !== null
                    ? navItems[hoveredIndex].label
                    : "Nepal"}
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
              <a
                key={s}
                href="#"
                className="text-black/30 hover:text-black text-xs tracking-widest uppercase font-sans transition-colors duration-200"
              >
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
                  language === lang.code
                    ? "text-accent font-medium"
                    : "text-black/30 hover:text-black",
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
