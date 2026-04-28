"use client";

import { useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";

const destinationData = [
  {
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=85",
      "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    ],
    cards: [
      { title: "Everest Base Camp", description: "We create journeys tailored to your dreams.", tag: "5,364 m" },
      { title: "Khumbu Icefall", description: "Towering seracs and glacier formations.", tag: "Glacier" },
      { title: "Namche Bazaar", description: "Gateway to Everest at 3,440m.", tag: "3,440 m" },
      { title: "Himalayan Ridge", description: "Ridgeline trails above the clouds.", tag: "Trek" },
      { title: "Tengboche", description: "Ancient monastery at 3,867m.", tag: "Culture" },
    ],
  },
];

export default function AboutSection() {
  const { language } = useLanguage();
  const copy = translations[language].about;
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const kenBurnsTweens = useRef<(gsap.core.Tween | null)[]>([]);
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const activeCenterIdxRef = useRef(1);

  const dest = destinationData[0];
  const CARD_COUNT = dest.cards.length;

  // ── Ken Burns ──────────────────────────────────────────────────────
  const startKenBurns = useCallback((idx: number) => {
    const el = imgRefs.current[idx];
    if (!el) return;
    kenBurnsTweens.current[idx]?.kill();
    gsap.set(el, { scale: 1 });
    kenBurnsTweens.current[idx] = gsap.to(el, {
      scale: 1.09,
      duration: 7,
      ease: "none",
    });
  }, []);

  const stopKenBurns = useCallback((idx: number) => {
    kenBurnsTweens.current[idx]?.kill();
    const el = imgRefs.current[idx];
    if (el) gsap.to(el, { scale: 1, duration: 0.8, ease: "power2.out" });
  }, []);

  // ── Continuous coverflow interpolation synced to scroll position ──
  const updateCoverflow = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - trackCenter);

      const normalizedDist = Math.min(dist / (card.offsetWidth * 1.2), 1);
      const scale = gsap.utils.interpolate(1.06, 1, normalizedDist);
      const y = gsap.utils.interpolate(-8, 0, normalizedDist);
      const shadowY = gsap.utils.interpolate(28, 6, normalizedDist);
      const shadowBlur = gsap.utils.interpolate(64, 20, normalizedDist);
      const shadowAlpha = gsap.utils.interpolate(0.22, 0.08, normalizedDist);
      const zIndex = Math.round(gsap.utils.interpolate(30, 10, normalizedDist));

      gsap.set(card, {
        scale,
        y,
        zIndex,
        boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha})`,
      });

      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    if (activeCenterIdxRef.current !== closestIdx) {
      stopKenBurns(activeCenterIdxRef.current);
      startKenBurns(closestIdx);
      activeCenterIdxRef.current = closestIdx;
    }
  }, [startKenBurns, stopKenBurns]);

  // ── Drive visual interpolation every frame for buttery smoothness ─
  useEffect(() => {
    const tick = () => updateCoverflow();
    gsap.ticker.add(tick);
    updateCoverflow();

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [updateCoverflow]);

  // ── Start Ken Burns on mount for initial center card ──────────────
  useEffect(() => {
    startKenBurns(activeCenterIdxRef.current);
    return () => {
      for (let i = 0; i < CARD_COUNT; i++) kenBurnsTweens.current[i]?.kill();
    };
  }, [CARD_COUNT, startKenBurns]);

  // ── Drag to scroll ─────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = {
      isDown: true,
      startX: e.pageX - track.offsetLeft,
      scrollLeft: track.scrollLeft,
    };
    track.style.cursor = "grabbing";
  }, []);

  const onMouseLeave = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current.isDown = false;
    track.style.cursor = "grab";
  }, []);

  const onMouseUp = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    dragRef.current.isDown = false;
    track.style.cursor = "grab";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.4;
    track.scrollLeft = dragRef.current.scrollLeft - walk;
  }, []);

  return (
    <section className="px-0 py-12 md:py-16">
      <div className="max-w-6xl mx-auto mb-12 md:mb-16 px-4 sm:px-6 md:px-0">
        {/* Using a grid to strictly control the space between left and right content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">

          {/* Headline Block (Spans 7 columns) */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              {/* Visual anchor line to ground the label */}
              <span className="w-10 h-[1px] bg-accent/40"></span>
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-bold font-sans">
                {copy.label || "/About Us"}
              </p>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[0.9] tracking-tighter">
              {copy.titleLead || "What's So Special"} <br />
              <span className="text-accent italic font-serif font-light">
                {copy.titleAccent || "About This?"}
              </span>
            </h2>
          </div>

          {/* Description & Button Block (Spans 5 columns) */}
          <div className="md:col-span-5 flex flex-col items-start md:items-end gap-8">
            {/* Right-aligned on desktop to balance the layout, but max-width kept tight for readability */}
            <p className="text-slate-500 text-base md:text-lg leading-relaxed font-normal md:text-right max-w-sm">
              {copy.description || "Discover stories hidden in the peaks and valleys. We curate moments that transcend standard sightseeing."}
            </p>

            <button className="group relative bg-accent text-white text-[11px] tracking-[0.2em] uppercase font-bold pl-10 pr-4 py-4 rounded-full transition-all duration-500 hover:bg-slate-900 cursor-pointer flex items-center gap-8 overflow-hidden shadow-xl shadow-accent/20">
              <span className="relative z-10">{copy.button || "Learn More"}</span>
              <span className="relative z-10 bg-white/20 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                  <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Outer wrapper — clips overflow, anchors edge overlays */}
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        {/* Left edge ) shaped curve blur */}
        <div
          className="absolute top-4 md:top-6 left-0 z-40 pointer-events-none"
          style={{
            position: "absolute",
            width: "clamp(56px, 20vw, 240px)",
            height: "88%",
          }}
        >
          <svg
            style={{ position: "absolute", width: 0, height: 0 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 1. Define the blur filter */}
              <filter id="edge-fade" x="-20%" y="-20%" width="140%" height="140%">
                {/* Manipulate stdDeviation to control how soft the curve edge is */}
                <feGaussianBlur stdDeviation="0.02" />
              </filter>

              {/* 2. Create a Mask instead of a clipPath */}
              <mask id="paren-mask" maskContentUnits="objectBoundingBox">
                <path
                  d="M0,0 C0.45,0.15 0.5,0.7 0,1 L0,1 L0,0 Z"
                  fill="white"
                  filter="url(#edge-fade)"
                />
              </mask>
            </defs>
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              /* 3. Use the SVG mask here instead of clipPath */
              mask: "url(#paren-mask)",
              WebkitMask: "url(#paren-mask)",

              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.07) 0%, rgba(255,255,255,0.10) 65%, transparent 100%)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(7px) saturate(1.2)",
            }}
          />
        </div>

        {/* Right edge ( shaped curve blur */}
        <div
          className="absolute right-[-12px] md:right-[-16px] top-4 md:top-6 z-40 pointer-events-none"
          style={{
            position: "absolute",
            width: "clamp(56px, 20vw, 240px)",
            height: "88%",
          }}
        >
          <svg
            style={{ position: "absolute", width: 0, height: 0 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Blur filter for the right side */}
              <filter id="right-edge-fade" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.02" />
              </filter>

              {/* Mask for the ( shape */}
              <mask id="right-paren-mask" maskContentUnits="objectBoundingBox">
                {/* Mirrored path: Starts top-right, curves inward to the left, closes along the right edge */}
                <path
                  d="M1,0 C0.55,0.15 0.5,0.7 1,1 L1,1 L1,0 Z"
                  fill="white"
                  filter="url(#right-edge-fade)"
                />
              </mask>
            </defs>
          </svg>

          {/* Soft fade mask layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              mask: "url(#right-paren-mask)",
              WebkitMask: "url(#right-paren-mask)",

              /* Mirrored gradient: 'to left' instead of 'to right' */
              background:
                "linear-gradient(to left, rgba(255, 255, 255, 0.14) 0%, rgba(255,255,255,0.10) 65%, transparent 100%)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(7px) saturate(1.2)",
            }}
          />
        </div>

        {/* Scroll track */}
        <div
          ref={trackRef}
          className="relative z-10 flex gap-3 overflow-x-auto px-4 sm:px-6 md:px-6 py-6 md:py-8 select-none space-x-3"
          style={{
            scrollSnapType: "x mandatory",
            scrollPaddingInline: "1rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
          }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {dest.cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative flex-none w-[78vw] sm:w-[62vw] md:w-[42vw] lg:w-[calc(33.333%-0.5rem)] h-[320px] sm:h-[360px] md:h-[420px] rounded-xl overflow-hidden will-change-transform"
              style={{
                scrollSnapAlign: "center",
                flexShrink: 0,
                zIndex: 10,
                transform: "scale(1)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image — Ken Burns target */}
              <div
                ref={(el) => { imgRefs.current[i] = el; }}
                className="absolute inset-0"
                style={{ willChange: "transform" }}
              >
                <Image
                  src={dest.images[i]}
                  alt={card.title}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Tag */}
              <div
                className="absolute top-3.5 right-3.5 text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.13)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "0.5px solid rgba(255,255,255,0.28)",
                }}
              >
                {card.tag}
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3
                  className="text-white text-base md:text-lg font-light italic mb-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-white/60 text-[10px] md:text-[11px] tracking-widest uppercase font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <p className="text-center mt-2 text-[11px] tracking-widest uppercase text-gray-400 opacity-60">
        scroll to explore →
      </p>
    </section>
  );
}