"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SliderCard {
  image: string;
  number?: string;
  title?: string;
  description?: string;
  id?: string | number;
  name?: string;
  duration?: string;
  price?: string;
  desc?: string;
  [key: string]: string | number | boolean | ReactNode | undefined;
}

interface SliderProps {
  cards: SliderCard[];
  visibleCards?: number;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  renderCard?: (card: SliderCard, index: number) => ReactNode;
  className?: string;
}

export default function Slider({
  cards,
  visibleCards = 2,
  showDots = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  renderCard,
  className = "",
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, cards.length - visibleCards);

  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  // Handle auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        goTo(0);
      } else {
        next();
      }
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, maxIndex]);

  // GSAP animation for sliding
  useEffect(() => {
    if (!trackRef.current || !sliderRef.current) return;

    const container = trackRef.current.parentElement as HTMLElement;
    if (!container) return;

    const gap = 24;
    const cardWidth = (container.offsetWidth - gap) / visibleCards;
    const offset = currentIndex * (cardWidth + gap);

    gsap.to(trackRef.current, {
      x: -offset,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }, [currentIndex, visibleCards]);

  // Default card renderer
  const defaultRenderCard = (card: SliderCard, index: number) => (
    <div className="flex-shrink-0 w-full md:w-[calc(50%-12px)] bg-white border border-gray-150 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Top Row: Image and Number */}
      <div className="flex justify-between items-start mb-8">
        {/* Image Container */}
        <div className="relative w-1/2 aspect-video rounded-lg overflow-hidden">
          <Image
            src={card.image}
            alt={card.title || `Card ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 40vw, 20vw"
          />
        </div>

        {/* Number badge */}
        {card.number && (
          <span className="text-black/80 text-lg font-medium font-sans tracking-tight">
            {card.number}
          </span>
        )}
      </div>

      {/* Bottom Row: Text Content */}
      <div className="space-y-3">
        {card.title && (
          <h3 className="text-black font-semibold text-lg leading-tight">
            {card.title}
          </h3>
        )}
        {card.description && (
          <p className="text-black/70 text-[15px] leading-relaxed font-normal font-sans">
            {card.description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div ref={sliderRef} className={`max-w-7xl mx-auto ${className}`}>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out py-4"
          style={{ gap: "24px", willChange: "transform" }}
        >
          {cards.map((card, i) => (
            <div key={i}>
              {renderCard ? renderCard(card, i) : defaultRenderCard(card, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-10">
        {/* Dots Navigation */}
        {showDots && (
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-full bg-black transition-all duration-500 cursor-pointer border-none p-0"
                style={{
                  width: i === currentIndex ? "32px" : "8px",
                  opacity: i === currentIndex ? 1 : 0.2,
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Arrow Navigation */}
        {showArrows && (
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                ${
                  currentIndex === 0
                    ? "border-black/5 text-black/10 cursor-not-allowed"
                    : "border-black/20 text-black hover:bg-black hover:text-white cursor-pointer active:scale-95"
                }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                ${
                  currentIndex === maxIndex
                    ? "border-black/5 text-black/10 cursor-not-allowed"
                    : "border-black/20 text-black hover:bg-black hover:text-white cursor-pointer active:scale-95"
                }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
