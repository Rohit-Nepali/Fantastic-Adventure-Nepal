"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortableText } from "next-sanity";
import SectionWrapper from "../layout/SectionWrapper";
import Button from "../ui/Button";
import Link from "next/link";

export interface AboutSectionProps {
  aboutUs?: {
    title: string;
    subtitle: string | null;
    description: any[];
    closingLine: string | null;
    whyTravelWithUs: {
      label: string;
      icon?: {
        asset?: {
          url: string;
        };
      };
    }[];
    images: {
      asset?: {
        url: string;
      };
      alt?: string;
    }[];
  };
}

export default function AboutSection({ aboutUs }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutUs) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const startY = isMobile ? 20 : 30;

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: startY },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 88%",
            },
          },
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: startY },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 88%",
            },
          },
        );
      }

      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0, y: startY },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 88%",
            },
          },
        );
      }

      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: "top 90%",
            },
          },
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
            },
          },
        );
      }

      if (image1Ref.current) {
        gsap.fromTo(
          image1Ref.current,
          { opacity: 0, x: -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image1Ref.current,
              start: "top 85%",
            },
          },
        );
      }

      if (image2Ref.current) {
        gsap.fromTo(
          image2Ref.current,
          { opacity: 0, x: 30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image2Ref.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [aboutUs]);

  if (!aboutUs) return null;

  const image1 = aboutUs?.images?.[0];
  const image2 = aboutUs?.images?.[1];

  const img1Url = image1?.asset?.url || "/api/placeholder/400/600";
  const img2Url = image2?.asset?.url || "/api/placeholder/400/600";

  return (
    <SectionWrapper
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-24 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center md:px-2">
        {/* Left Side: Content */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <p
            ref={titleRef}
            className="text-[12px] tracking-[0.25em] uppercase text-accent font-medium mb-4 font-sans"
          >
            {"/ " + (aboutUs?.title || "About Us")}
          </p>

          <h2 ref={subtitleRef} className="text-xl md:text-2xl font-semibold">
            {aboutUs?.subtitle || "Welcome to Fantastic Adventure Nepal"}
          </h2>

          <div
            ref={descriptionRef}
            className="prose prose-lg text-gray-600 max-w-none"
          >
            <PortableText value={aboutUs?.description || []} />
          </div>

          {aboutUs?.closingLine && (
            <p
              ref={closingRef}
              className="text-lg font-medium text-gray-800 italic border-l-4 border-emerald-500 pl-4"
            >
              {aboutUs.closingLine}
            </p>
          )}

          {/* CTA*/}
          <div
            ref={ctaRef}
            className="pt-4 flex flex-col sm:flex-row gap-4 items-center"
          >
            <Button variant="accent" rounded="full">
              <Link href="/planYourTrip">Plan Your Trip</Link>
            </Button>
            <Button variant="outline" rounded="full">
              <Link href="/packages">Explore Categories</Link>
            </Button>
          </div>
        </div>

        {/* Right Side: Two Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full pt-16 lg:pt-24">
          {/* Image 1 */}
          <div
            ref={image1Ref}
            className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={img1Url}
              alt={image1?.alt || "Trek Adventure Nepal"}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Image 2 */}
          <div
            ref={image2Ref}
            className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 lg:translate-y-6"
          >
            <img
              src={img2Url}
              alt={image2?.alt || "Trek Adventure Nepal 2"}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
