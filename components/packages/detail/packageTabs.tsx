// components/packages/detail/PackageTabs.tsx
"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { PackageDetail, Departure } from "@/lib/sanity/types";
import { ChevronDown, CheckIcon, XIcon } from "lucide-react";
import { useLanguage } from "@/provider/Language";
import { getSafe } from "@/lib/translations";

type TranslationKeys = {
  overview: string;
  itinerary: string;
  cost: string;
  includes: string;
  excludes: string;
  essential: string;
  departures: string;
  faqs: string;
  joinDeparture: string;
  highlights?: string; // fallback mapping if available
};

export default function PackageTabs({ pkg }: { pkg: PackageDetail }) {
  const { language } = useLanguage();
  const defaultTranslations = {
    overview: "Overview",
    itinerary: "Itinerary",
    cost: "Cost",
    includes: "Cost Includes",
    excludes: "Cost Excludes",
    essential: "Essential Information",
    departures: "Fixed Departures",
    faqs: "FAQs",
    joinDeparture: "Join Departure",
  };

  // Use the nullish coalescing operator (??) to fallback to defaults if getSafe returns undefined
  const t = (getSafe("packageTabs", language) ??
    defaultTranslations) as unknown as TranslationKeys;

  const [activeTab, setActiveTab] = useState("overview");

  // Tab configurations for clean iteration and readable name-mapping
  const tabs = [
    { id: "overview", label: t.overview },
    { id: "itinerary", label: t.itinerary },
    { id: "cost", label: t.cost },
    { id: "essential", label: t.essential },
    { id: "departures", label: t.departures },
    { id: "faqs", label: t.faqs },
  ];

  return (
    <div>
      {/* ── Tab Bar ── */}
      <div className="top-[64px] z-30 bg-white border-b border-[#eee] -mx-4 px-4 md:-mx-0 md:px-0 mb-8">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#00b5c4] text-[#00b5c4]"
                  : "border-transparent text-[#666] hover:text-[#111]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Panels ── */}
      {activeTab === "overview" && <OverviewPanel pkg={pkg} t={t} />}
      {activeTab === "itinerary" && <ItineraryPanel pkg={pkg} t={t} />}
      {activeTab === "cost" && <CostPanel pkg={pkg} t={t} />}
      {activeTab === "essential" && <EssentialPanel pkg={pkg} t={t} />}
      {activeTab === "departures" && <DeparturesPanel pkg={pkg} t={t} />}
      {activeTab === "faqs" && <FaqsPanel pkg={pkg} t={t} />}
    </div>
  );
}

// ─── Sub-Panels ────────────────────────────────────────────────────────────

function OverviewPanel({ pkg, t }: { pkg: PackageDetail; t: TranslationKeys }) {
  return (
    <div className="space-y-8">
      {/* Highlights */}
      {pkg.highlights && pkg.highlights.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111] mb-4">
            {t.overview && t.overview.includes("Overview")
              ? "Trip Highlights"
              : `${t.overview} Highlights`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pkg.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-[#f8f6f2] rounded-xl"
              >
                <CheckIcon className="w-4 h-4 text-[#00b5c4] shrink-0" />
                <span className="text-[#333] text-sm">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview text */}
      {pkg.overview && (
        <div>
          <h2 className="font-display text-2xl font-bold text-[#111] mb-4">
            {t.overview}
          </h2>
          <div className="prose prose-neutral max-w-none text-[#444] leading-relaxed">
            <PortableText value={pkg.overview as never} />
          </div>
        </div>
      )}
    </div>
  );
}

function ItineraryPanel({
  pkg,
  t,
}: {
  pkg: PackageDetail;
  t: TranslationKeys;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#111] mb-6">
        {t.itinerary}
      </h2>
      {pkg.itinerary && pkg.itinerary.length > 0 ? (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[#e5e1d8]" />
          <div className="space-y-0">
            {pkg.itinerary.map((day, i) => (
              <div key={i} className="relative pl-14 pb-8">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#00b5c4] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">
                    {day.dayNumber}
                  </span>
                </div>

                <div className="bg-white border border-[#eee] rounded-xl p-5 shadow-sm">
                  <h3 className="font-display text-base font-bold text-[#111] mb-2">
                    Day {day.dayNumber}: {day.title}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-3">
                    {day.elevation && (
                      <Chip icon="⛰" label={`Elevation: ${day.elevation}`} />
                    )}
                    {day.walkingHours && (
                      <Chip icon="🕐" label={`Walking: ${day.walkingHours}`} />
                    )}
                    {day.distance && (
                      <Chip icon="📍" label={`Distance: ${day.distance}`} />
                    )}
                    {day.meals && (
                      <Chip icon="🍽" label={`Meals: ${day.meals}`} />
                    )}
                    {day.accommodation && (
                      <Chip icon="🏠" label={`Stay: ${day.accommodation}`} />
                    )}
                  </div>

                  {day.description && (
                    <p className="text-[#555] text-sm leading-relaxed">
                      {day.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[#888]">Itinerary details will be added soon.</p>
      )}
    </div>
  );
}

function CostPanel({ pkg, t }: { pkg: PackageDetail; t: TranslationKeys }) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Includes */}
      <div>
        <h2 className="font-display text-xl font-bold text-[#111] mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
            <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0" />
          </span>
          {t.includes}
        </h2>
        {pkg.costIncludes && pkg.costIncludes.length > 0 ? (
          <ul className="space-y-2">
            {pkg.costIncludes.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[#333]"
              >
                <CheckIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#888] text-sm">No inclusions listed yet.</p>
        )}
      </div>

      {/* Excludes */}
      <div>
        <h2 className="font-display text-xl font-bold text-[#111] mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">
            <XIcon className="w-4 h-4 text-red-500" />
          </span>
          {t.excludes}
        </h2>
        {pkg.costExcludes && pkg.costExcludes.length > 0 ? (
          <ul className="space-y-2">
            {pkg.costExcludes.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[#333]"
              >
                <XIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#888] text-sm">No exclusions listed yet.</p>
        )}
      </div>
    </div>
  );
}

function EssentialPanel({
  pkg,
  t,
}: {
  pkg: PackageDetail;
  t: TranslationKeys;
}) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#111] mb-6">
        {t.essential}
      </h2>
      {pkg.essentialInfo && pkg.essentialInfo.length > 0 ? (
        <div className="space-y-2">
          {pkg.essentialInfo.map((item, i) => (
            <div
              key={i}
              className="border border-[#eee] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8f6f2] transition-colors"
              >
                <span className="font-medium text-[#111] text-sm">
                  {item.title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#00b5c4] transition-transform duration-200 ${openAccordion === i ? "rotate-180" : ""}`}
                />
              </button>
              {openAccordion === i && (
                <div className="px-5 pb-5 prose prose-sm prose-neutral max-w-none text-[#555]">
                  <PortableText value={item.body as never} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#888]">Essential information will be added soon.</p>
      )}
    </div>
  );
}

function DeparturesPanel({
  pkg,
  t,
}: {
  pkg: PackageDetail;
  t: TranslationKeys;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#111] mb-6">
        {t.departures}
      </h2>
      {pkg.departures && pkg.departures.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-[#eee]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f8f6f2] text-left">
                <th className="px-5 py-3 font-medium text-[#555]">Date</th>
                <th className="px-5 py-3 font-medium text-[#555]">
                  Availability
                </th>
                <th className="px-5 py-3 font-medium text-[#555]">Price</th>
                <th className="px-5 py-3 font-medium text-[#555]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece4]">
              {pkg.departures.map((dep, i) => (
                <DepartureRow key={i} dep={dep} basePrice={pkg.price} t={t} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[#888]">
          No fixed departures listed. Contact us to plan a custom date.
        </p>
      )}
    </div>
  );
}

function FaqsPanel({ pkg, t }: { pkg: PackageDetail; t: TranslationKeys }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-[#111] mb-6">
        {t.faqs}
      </h2>
      {pkg.faqs && pkg.faqs.length > 0 ? (
        <div className="space-y-2">
          {pkg.faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[#eee] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8f6f2] transition-colors"
              >
                <span className="font-medium text-[#111] text-sm pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#00b5c4] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-[#555] text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#888]">FAQs will be added soon.</p>
      )}
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function Chip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[#555] bg-[#f3f0ea] px-2.5 py-1 rounded-full">
      <span>{icon}</span> {label}
    </span>
  );
}

function DepartureRow({
  dep,
  basePrice,
  t,
}: {
  dep: Departure;
  basePrice: number;
  t: TranslationKeys;
}) {
  const availabilityStyle: Record<string, string> = {
    Available: "bg-emerald-100 text-emerald-700",
    Guaranteed: "bg-blue-100 text-blue-700",
    Full: "bg-red-100 text-red-600",
  };

  const formattedDate = new Date(dep.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <tr className="hover:bg-[#fafaf8] transition-colors">
      <td className="px-5 py-4 text-[#333] font-medium">{formattedDate}</td>
      <td className="px-5 py-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${availabilityStyle[dep.availability]}`}
        >
          {dep.availability}
        </span>
      </td>
      <td className="px-5 py-4 text-[#333]">
        USD {(dep.price ?? basePrice).toLocaleString()}
      </td>
      <td className="px-5 py-4">
        {dep.availability !== "Full" && (
          <a
            href="#inquiry"
            className="text-xs px-4 py-2 bg-[#00b5c4] text-white rounded-full hover:bg-[#009aaa] transition-colors whitespace-nowrap"
          >
            {t.joinDeparture}
          </a>
        )}
      </td>
    </tr>
  );
}
