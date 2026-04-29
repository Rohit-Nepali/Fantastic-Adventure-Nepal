"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLanguage } from "@/provider/Language";
import { translations } from "@/lib/translations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { language } = useLanguage();
  const copy = translations[language].hero;
  const [titleFirstRaw, ...titleRestRaw] = copy.title.split(",");
  const titleFirstLine = titleFirstRaw.trim();
  const titleSecondLine = titleRestRaw.join(",").trim();
  const activeWordLine = titleSecondLine || titleFirstLine;
  const activeLineWords = activeWordLine.split(/\s+/).filter(Boolean);
  const leadingTitle = activeLineWords.slice(0, -1).join(" ");
  const lastTitleWord = activeLineWords.at(-1) ?? "";
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastWordRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const scrollArrowsRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate in the overlay and content

      gsap.set(videoWrapperRef.current, {
        force3D: true,
        willChange: "transform",
      });
      gsap.set(contentRef.current, { force3D: true, willChange: "transform" });

      const tl = gsap.timeline({ delay: 0.4 });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" },
          "-=0.7",
        )
        .to(
          lastWordRef.current,
          { color: "var(--accent)", duration: 0.8, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        );

      if (scrollHintRef.current && scrollArrowsRef.current) {
        gsap.fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.05 },
        );

        const arrows =
          scrollArrowsRef.current.querySelectorAll(".scroll-arrow");
        gsap.fromTo(
          arrows,
          { y: -4, opacity: 0.2 },
          {
            y: 8,
            opacity: 1,
            duration: 0.9,
            ease: "power1.inOut",
            repeat: -1,
            stagger: 0.12,
          },
        );
      }

      if (lastWordRef.current) {
        gsap.set(lastWordRef.current, {
          color: "var(--accent)",
          display: "inline-block",
          transformOrigin: "center bottom",
        });

        // Animate scale + skew instead of font-family swap
        gsap
          .timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: "power1.inOut" },
          })
          .to(lastWordRef.current, {
            skewX: -6,
            scaleX: 1.04,
            duration: 1.2,
          })
          .to(lastWordRef.current, {
            skewX: 0,
            scaleX: 1,
            duration: 1.2,
            delay: 0.2,
          });
      }

      //parallax effect on video
      // gsap.to(
      //   videoRef.current, {
      //   y: "20%",
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: 0.8,
      //   },
      // }
      // );

      gsap.to(contentRef.current, {
        y: "-6%", // moves opposite for depth
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // gsap.to(overlayRef.current, {
      //   opacity: 1,
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: 1,
      //   },
      // });

      gsap.to(videoWrapperRef.current, {
        y: "12%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Video Background */}
      <div ref={videoWrapperRef} className="absolute inset-0">
        <video
          ref={videoRef}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        // poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
        >
          <source src="Fantastic_Hero_Section.mp4" type="video/mp4" />
        </video>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60 opacity-0 transition-opacity duration-1000"
        />
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full px-6 md:px-16 lg:px-24 pb-24 md:pb-32 flex flex-col justify-end"
      >
        {/* Text — bottom left */}
        <div className="max-w-2xl flex-1 flex flex-col justify-end">
          {titleSecondLine ? (
            <div className="my-4">
              <h2
                className="text-white font-semibold leading-[1.45] tracking-tight"
                style={{
                  fontSize: "clamp(2rem,5vw,4rem)",
                  lineHeight: "1.45",
                  fontKerning: "none",
                }}
              >
                {titleFirstLine},
              </h2>
              <h2
                ref={titleRef}
                style={{
                  fontSize: "clamp(2rem,6vw,6rem)",
                  lineHeight: "1.15",
                  fontKerning: "none",
                }}
                className="text-white font-semibold leading-[1.1] tracking-tight"
              >
                {leadingTitle ? `${leadingTitle} ` : ""}
                <span ref={lastWordRef} className="inline-block text-white">
                  {lastTitleWord}
                </span>
              </h2>
            </div>
          ) : (
            <h2
              ref={titleRef}
              className="text-white font-semibold leading-[1.1] tracking-tight mb-4 text-[clamp(2.2rem,6vw,4.5rem)]"
            >
              {leadingTitle ? `${leadingTitle} ` : ""}
              <span ref={lastWordRef} className="text-white">
                {lastTitleWord}
              </span>
            </h2>
          )}

          <p
            ref={subtitleRef}
            className="text-white/60 font-sans font-light text-[14px] md:text-base leading-relaxed max-w-sm opacity-0"
          >
            {copy.subtitle}
          </p>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="pointer-events-none absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        aria-hidden="true"
      >
        <div
          ref={scrollArrowsRef}
          className="flex flex-col items-center leading-none text-white/90"
        >
          <span className="scroll-arrow text-[18px]">⌄</span>
          <span className="scroll-arrow text-[18px] -mt-2">⌄</span>
          <span className="scroll-arrow text-[18px] -mt-2">⌄</span>
        </div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/85 font-medium">
          Explore more
        </p>
      </div>
    </section>
  );
}
