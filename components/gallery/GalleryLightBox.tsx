"use client";

import Image from "next/image";
import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

export interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const item = items[activeIndex];

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-8 md:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:left-6"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-6"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Content */}
      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 py-16 md:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full max-h-[75vh]">
          <Image
            key={item._id}
            src={urlForImage(item.image, 1600)}
            alt={item.imageAlt || item.caption || item.title || "Gallery image"}
            fill
            className="object-contain animate-in fade-in zoom-in-95 duration-300"
            sizes="100vw"
            priority
          />
        </div>

        <div className="mt-5 max-w-2xl text-center">
          <h3 className="text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
          {item.caption && (
            <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
              {item.caption}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs text-white/40">
            {activeIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}