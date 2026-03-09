"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation configurations
export const animationConfig = {
  duration: {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
  },
  ease: {
    smooth: "power2.out",
    elegant: "power3.out",
    bouncy: "back.out(1.7)",
  },
  stagger: {
    small: 0.1,
    medium: 0.2,
    large: 0.3,
  },
};

// Utility functions for common animations

/**
 * Fade in animation from bottom
 */
export function fadeInFromBottom(
  element: string,
  delay: number = 0,
  duration: number = animationConfig.duration.normal
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: animationConfig.ease.smooth,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Fade in animation from left
 */
export function fadeInFromLeft(
  element: string,
  delay: number = 0,
  duration: number = animationConfig.duration.normal
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: animationConfig.ease.smooth,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Fade in animation from right
 */
export function fadeInFromRight(
  element: string,
  delay: number = 0,
  duration: number = animationConfig.duration.normal
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: animationConfig.ease.smooth,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Scale up animation
 */
export function scaleUp(
  element: string,
  delay: number = 0,
  duration: number = animationConfig.duration.normal
) {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: animationConfig.ease.elegant,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Stagger animation for multiple elements
 */
export function staggerFadeIn(
  elements: string,
  staggerAmount: number = animationConfig.stagger.medium,
  duration: number = animationConfig.duration.normal
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: staggerAmount,
      ease: animationConfig.ease.smooth,
      scrollTrigger: {
        trigger: elements,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Parallax effect for images
 */
export function parallaxEffect(
  element: string,
  speed: number = 0.3
) {
  return gsap.to(element, {
    y: () => -window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * Image reveal animation (scale from center)
 */
export function imageReveal(
  element: string,
  delay: number = 0,
  duration: number = animationConfig.duration.slow
) {
  return gsap.fromTo(
    element,
    { clipPath: "inset(50% 50% 50% 50%)", scale: 1.2 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration,
      delay,
      ease: animationConfig.ease.elegant,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Text reveal animation
 */
export function textReveal(
  element: string,
  delay: number = 0,
  duration: number = animationConfig.duration.normal
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: animationConfig.ease.smooth,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Navbar slide down animation
 */
export function navbarSlideDown(delay: number = 0) {
  return gsap.fromTo(
    "nav",
    { opacity: 0, y: -100 },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.duration.slow,
      delay,
      ease: animationConfig.ease.smooth,
    }
  );
}

/**
 * Refresh ScrollTrigger (call after dynamic content loads)
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTriggers (call on component unmount)
 */
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
