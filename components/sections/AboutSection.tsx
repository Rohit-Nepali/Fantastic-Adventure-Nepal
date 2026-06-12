"use client";

import { PortableText } from "next-sanity";
import SectionWrapper from "../layout/SectionWrapper";
import Button from "../ui/Button";
import Link from "next/link";

export interface AboutSectionProps {
  aboutUs: {
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
  if (!aboutUs) return null;

  const image1 = aboutUs?.images?.[0];
  const image2 = aboutUs?.images?.[1];

  const img1Url = image1?.asset?.url || "/api/placeholder/400/600";
  const img2Url = image2?.asset?.url || "/api/placeholder/400/600";

  return (
    <SectionWrapper
      className="relative overflow-hidden py-20 md:py-24 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center md:px-2">

        {/* Left Side: Content */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <p className="text-[12px] tracking-[0.25em] uppercase text-accent font-medium mb-4 font-sans">
            {"/ " + (aboutUs?.title || "About Us")}
          </p>

          <h2 className="text-xl md:text-2xl font-semibold">
            {aboutUs?.subtitle || "Welcome to Fantastic Adventure Nepal"}
          </h2>

          <div className="prose prose-lg text-gray-600 max-w-none">
            <PortableText value={aboutUs?.description || []} />
          </div>
          
          {aboutUs?.closingLine && (
            <p className="text-lg font-medium text-gray-800 italic border-l-4 border-emerald-500 pl-4">
              {aboutUs.closingLine}
            </p>
          )}

          {/* CTA*/}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
            <Button variant="accent" rounded="full">
              <Link href="/planYourTrip">Plan Your Trip</Link>
            </Button>
            <Button variant="outline" rounded="full">
              <Link href="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>

        {/* Right Side: Two Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full pt-16 lg:pt-24">
          {/* Image 1 */}
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={img1Url}
              alt={image1?.alt || "Trek Adventure Nepal"}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Image 2 */}
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 lg:translate-y-6">
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