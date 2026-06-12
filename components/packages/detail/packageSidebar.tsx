// components/packages/detail/PackageSidebar.tsx
"use client";

import Link from "next/link";
import { PackageDetail } from "@/types";

const WHATSAPP_NUMBER = "9779800000000"; // ← replace with your number

export default function PackageSidebar({ pkg }: { pkg: PackageDetail }) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${pkg.title} package. Could you share more details?`
  );

  const facts = [
    { label: "Duration",   value: pkg.duration },
    { label: "Difficulty", value: pkg.difficulty },
    { label: "Group Size", value: pkg.groupSize },
    { label: "Season",     value: pkg.bestSeason },
  ].filter((f) => f.value);

  // Next upcoming available departure
  const nextDeparture = pkg.departures?.find(
    (d) => d.availability !== "Full" && new Date(d.date) >= new Date()
  );

  return (
    <div className="bg-white border border-[#eee] rounded-2xl shadow-sm overflow-hidden">
      {/* Price */}
      <div className="bg-[#f8f6f2] px-6 py-5 border-b border-[#eee]">
        <p className="text-xs text-[#888] uppercase tracking-wide mb-1">Starting From</p>
        <p className="text-3xl font-bold text-[#111]">
          USD {pkg.price.toLocaleString()}
        </p>
        {pkg.rating && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[#f59e0b]">★</span>
            <span className="text-sm text-[#555]">{pkg.rating.toFixed(1)} rating</span>
          </div>
        )}
      </div>

      {/* Quick Facts */}
      {facts.length > 0 && (
        <div className="px-6 py-4 border-b border-[#eee] space-y-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center justify-between text-sm">
              <span className="text-[#888]">{fact.label}</span>
              <span className="font-medium text-[#111]">{fact.value}</span>
            </div>
          ))}
          {nextDeparture && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#888]">Next Departure</span>
              <span className="font-medium text-[#111]">
                {new Date(nextDeparture.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      )}

      {/* CTAs */}
      <div className="px-6 py-5 space-y-3">
        <a
          href="#inquiry"
          className="block w-full text-center px-6 py-3 bg-[#00b5c4] text-white rounded-full text-sm font-medium hover:bg-[#009aaa] transition-colors"
        >
          Book Now
        </a>
        <Link
          href="/plan-your-trip"
          className="block w-full text-center px-6 py-3 border border-[#ddd] text-[#333] rounded-full text-sm font-medium hover:border-[#00b5c4] hover:text-[#00b5c4] transition-colors"
        >
          Customize This Trip
        </Link>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-[#25d366] text-[#25d366] rounded-full text-sm font-medium hover:bg-[#25d366] hover:text-white transition-colors"
        >
          <WhatsAppIcon /> WhatsApp Us
        </a>
      </div>

      {/* Trust note */}
      <div className="px-6 pb-5 text-center">
        <p className="text-xs text-[#aaa]">
          Free cancellation · No hidden fees · 24/7 support
        </p>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}