"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" })
        .fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" }, "-=0.7")
        .fromTo(subtitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .fromTo(buttonRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-stone-900">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
        >
          <source src="loading_video.mp4" type="video/mp4" />
        </video>
        {/* <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 opacity-0" /> */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full px-6 md:px-10 pb-16 flex flex-col justify-end">
        <div className="max-w-2xl">
          <h2
            className="font-sans text-white font-semibold leading-[1.1] tracking-tight mb-4 text-[clamp(2.2rem,6vw,4.5rem)]"
          >
            Pack Your Bags,{" "} Let's Go Explore
            Somewhere Amazing
          </h2>
          <p ref={subtitleRef} className="text-white/60 font-sans font-light text-[14px] md:text-base leading-relaxed max-w-sm opacity-0 mb-8">
            Hidden gems, breathtaking views, unforgettable adventures — where will you go next?
          </p>
          <div ref={buttonRef} className="opacity-0 flex items-center gap-4">
            <button className="bg-white text-black font-sans font-medium text-[12px] tracking-[0.15em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white/90 cursor-pointer flex items-center gap-3">
              Book Now
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">››</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}