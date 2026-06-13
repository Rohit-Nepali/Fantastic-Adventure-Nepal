"use client";

import * as React from "react";
import Image from "next/image";
import { fallbackHomePageData } from "@/lib/sanity/fallbackContent";

export interface ReviewItem {
  travelerName: string;
  country: string;
  review: string;
  rating: number;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface TestimonialSectionProps {
  data?: ReviewItem[];
  intro?: {
    label?: string;
    title?: string;
  };
}

const TestimonialCard = ({ data }: { data: ReviewItem }) => {
  const [imageError, setImageError] = React.useState(false);
  const rating = Number(data.rating) || 5;

  const initials = data.travelerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const showImage = data.image && typeof data.image === "string" && !imageError;

  return (
    <div className="group relative bg-white border border-slate-100 rounded-3xl p-8 w-full min-w-[320px] md:min-w-[420px] transition-all duration-300 hover:border-slate-200 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] shadow-sm flex flex-col justify-between">

      {/* Quote + Rating */}
      <div className="flex-1 min-w-0">
        <span className="text-4xl text-slate-200 font-serif absolute top-6 left-6 leading-none pointer-events-none">
          &quot;
        </span>

        <div className="mb-3 flex gap-1 text-amber-400">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < rating ? "text-amber-400" : "text-slate-200"}>
              ★
            </span>
          ))}
        </div>

        <p className="text-slate-600 text-base leading-relaxed italic pt-2">
          {data.review}
        </p>
      </div>

      {/* User */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
        {showImage ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-100 shadow-sm">
            <Image
              src={data.image!}
              alt={data.imageAlt || data.travelerName}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700 border border-slate-100">
            {initials || "TR"}
          </div>
        )}

        <div>
          <h4
            className="text-base font-bold text-slate-800 leading-none mb-1.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {data.travelerName}
          </h4>
          <p className="text-[10px] tracking-widest uppercase text-accent font-semibold">
            {data.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection({ data, intro }: TestimonialSectionProps) {
  const baseReviews = data?.length ? data : fallbackHomePageData.reviews;
  const reviews = baseReviews.slice(0, 6); // more natural for horizontal scroll

  const label = intro?.label || fallbackHomePageData.reviewsIntro.label;
  const title = intro?.title || fallbackHomePageData.reviewsIntro.title;

  return (
    <section className="py-24 bg-[#f9f8f6] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[12px] tracking-[0.25em] uppercase text-accent font-bold mb-4">
            {label}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 px-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {reviews.map((review, index) => (
            <div key={`${review.travelerName}-${index}`} className="snap-start">
              <TestimonialCard data={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}