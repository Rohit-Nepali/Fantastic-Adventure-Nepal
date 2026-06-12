// components/packages/PackageGrid.tsx

import Link from "next/link";
import Image from "next/image";
import { PackageCard } from "@/types";

function difficultyColor(difficulty: string) {
  const map: Record<string, string> = {
    "Easy":            "bg-emerald-100 text-emerald-700",
    "Easy-Moderate":   "bg-lime-100 text-lime-700",
    "Moderate":        "bg-yellow-100 text-yellow-700",
    "Moderate-Hard":   "bg-orange-100 text-orange-700",
    "Hard":            "bg-red-100 text-red-700",
    "Extreme":         "bg-purple-100 text-purple-700",
  };
  return map[difficulty] ?? "bg-gray-100 text-gray-600";
}

function Card({ pkg }: { pkg: PackageCard }) {
  return (
    <Link
      href={`/packages/${pkg.slug.current}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        {pkg.bannerImage?.url ? (
          <Image
            src={pkg.bannerImage.url}
            alt={pkg.bannerImage.alt ?? pkg.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#e8e4dc] flex items-center justify-center">
            <span className="text-[#aaa] text-sm">No image</span>
          </div>
        )}

        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#111] text-xs font-medium px-3 py-1 rounded-full">
            {pkg.category?.label}
          </span>
        </div>

        {pkg.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="bg-[#00b5c4] text-white text-xs font-medium px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {pkg.rating && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[#f59e0b] text-sm">★</span>
            <span className="text-sm font-medium text-[#333]">{pkg.rating.toFixed(1)}</span>
          </div>
        )}

        <h2 className="font-display text-lg font-bold text-[#111] mb-1 group-hover:text-[#00b5c4] transition-colors">
          {pkg.title}
        </h2>
        <p className="text-[#666] text-sm leading-relaxed mb-4 line-clamp-2">
          {pkg.shortIntro}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="flex items-center gap-1 text-xs text-[#555]">
            <ClockIcon /> {pkg.duration}
          </span>
          {pkg.destination && (
            <span className="flex items-center gap-1 text-xs text-[#555]">
              <PinIcon /> {pkg.destination}
            </span>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor(pkg.difficulty)}`}>
            {pkg.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#f0ece4]">
          <div>
            <span className="text-xs text-[#888]">From</span>
            <p className="text-lg font-bold text-[#111]">USD {pkg.price.toLocaleString()}</p>
          </div>
          <span className="text-sm font-medium text-[#00b5c4] group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PackageGrid({ packages }: { packages: PackageCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <Card key={pkg._id} pkg={pkg} />
      ))}
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}