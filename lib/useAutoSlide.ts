"use client";

import { useEffect, useRef, useState } from "react";

interface UseAutoSlideOptions {
  totalSlides: number;
  minDelayMs?: number;
  maxDelayMs?: number;
  enabled?: boolean;
}

const randomDelay = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function useAutoSlide({
  totalSlides,
  minDelayMs = 5000,
  maxDelayMs = 7000,
  enabled = true,
}: UseAutoSlideOptions) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const getWrappedIndex = (index: number) => {
    if (totalSlides <= 0) return 0;

    return ((index % totalSlides) + totalSlides) % totalSlides;
  };

  useEffect(() => {
    setActiveSlide(0);
  }, [totalSlides]);

  useEffect(() => {
    if (!enabled || isPaused || totalSlides <= 1) return;

    const delay = randomDelay(minDelayMs, maxDelayMs);
    timerRef.current = setTimeout(() => {
      setActiveSlide((previous) => (previous + 1) % totalSlides);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeSlide, enabled, isPaused, maxDelayMs, minDelayMs, totalSlides]);

  return {
    activeSlide,
    isPaused,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
    goTo: (index: number) => setActiveSlide(getWrappedIndex(index)),
    next: () => setActiveSlide((previous) => getWrappedIndex(previous + 1)),
    prev: () => setActiveSlide((previous) => getWrappedIndex(previous - 1)),
  };
}
