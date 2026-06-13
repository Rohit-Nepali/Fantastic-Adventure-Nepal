"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GalleryItem } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "../ui/Button";

export interface GalleryScrollProps {
    items: GalleryItem[];
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaHref?: string;
    ctaLabel?: string;
}

export default function GalleryScroll({
    items,
    eyebrow = "Our Gallery",
    title = "Moments That Define the Journey",
    description = "A glimpse into Nepal through traveler stories, mountain trails, heritage corners, and unforgettable local encounters.",
    ctaHref = "/gallery",
    ctaLabel = "View Full Gallery",
}: GalleryScrollProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header fade-in
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 86%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Cards fade/slide in as the row enters view
            if (trackRef.current) {
                gsap.fromTo(
                    "[data-hscroll-card='true']",
                    { opacity: 0, x: 60, scale: 0.96 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: trackRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [items.length]);

    // Vertical wheel -> horizontal scroll
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        if (!track) return;
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            track.scrollLeft += e.deltaY;
        }
    };

    // Drag-to-scroll for mouse users
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        if (!track) return;

        const startX = e.pageX;
        const startScroll = track.scrollLeft;
        let isDragging = false;

        track.style.cursor = "grabbing";
        track.style.scrollSnapType = "none";
        track.style.userSelect = "none";

        const onMove = (ev: MouseEvent) => {
            const delta = ev.pageX - startX;
            if (Math.abs(delta) > 3) isDragging = true;
            track.scrollLeft = startScroll - delta;
        };

        const onUp = () => {
            track.style.cursor = "grab";
            track.style.scrollSnapType = "";
            track.style.userSelect = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);

            // Prevent accidental link navigation after a drag
            if (isDragging) {
                const blockClick = (ev: MouseEvent) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    track.removeEventListener("click", blockClick, true);
                };
                track.addEventListener("click", blockClick, true);
            }
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    if (!items || items.length === 0) return null;

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-[#f4f1ea] text-black">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#00b5c4]/10 blur-3xl" />
                <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-black/5 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
                {/* Header */}
                <div
                    ref={headerRef}
                    className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end"
                >
                    <div>
                        <p className="mb-3 text-xs font-light uppercase tracking-[0.3em] text-accent">
                            {`/ ${eyebrow}`}
                        </p>
                        <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-black md:text-6xl">
                            {title}
                        </h2>
                        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-black/60 md:text-[17px]">
                            {description}
                        </p>
                    </div>

                    {ctaHref && (
                        <Link
                            href={ctaHref}
                            className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00b5c4] whitespace-nowrap"
                        >
                            {ctaLabel}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>

                {/* Horizontal scroll track */}
                <div
                    ref={trackRef}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    className="flex cursor-grab gap-5 overflow-x-auto pb-4 snap-x snap-proximity scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {items.slice(0, 6).map((item, index) => (
                        <Link
                            href={ctaHref}
                            key={item._id || `${item.title}-${index}`}
                            data-hscroll-card="true"
                            draggable={false}
                            className="group relative h-[420px] w-[78vw] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:w-[420px] md:w-[480px]"
                        >
                            {item.image ? (
                                <Image
                                    src={urlForImage(item.image, 1200)}
                                    alt={item.imageAlt || item.caption || item.title || "Gallery image"}
                                    fill
                                    draggable={false}
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                                    sizes="(max-width: 768px) 80vw, 480px"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#e8e4dc] text-black/40">
                                    No image
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute inset-x-4 top-4 ">
                                {item.tags?.slice(0, 2).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-xl bg-white/15 px-2 py-1 text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                                <div className="flex items-end justify-between gap-3">
                                    <div>
                                        <h3 className=" font-semibold leading-tight text-white md:text-2xl">
                                            {item.title}
                                        </h3>
                                        {item.caption && (
                                            <p className="line-clamp-2 text-sm leading-relaxed text-white/75 md:text-base">
                                                {item.caption}
                                            </p>
                                        )}
                                    </div>
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                        <ArrowUpRight className="h-5 w-5 text-white" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Trailing "View All" card */}
                    <Button asChild variant="accent" className="p-0 h-auto bg-transparent hover:bg-transparent shadow-none active:scale-100">
                        <Link
                            href={ctaHref}
                            data-hscroll-card="true"
                            draggable={false}
                            className="group relative flex h-[420px] w-[78vw] flex-shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-[2rem] border border-dashed border-black/15 bg-white/60 text-center sm:w-[280px]"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 group-hover:bg-[#00b5c4]">
                                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <span className="text-lg font-semibold text-black">View Full Gallery</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}