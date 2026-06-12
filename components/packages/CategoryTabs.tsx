// components/packages/CategoryTabs.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types";

interface Props {
  categories: Category[];
  activeSlug: string | null;
}

export default function CategoryTabs({ categories, activeSlug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSelect(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/packages?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 mb-10">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSelect(null)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !activeSlug
              ? "bg-[#00b5c4] text-white shadow-sm"
              : "bg-white text-[#444] border border-[#ddd] hover:border-[#00b5c4] hover:text-[#00b5c4]"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleSelect(cat.slug.current)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeSlug === cat.slug.current
                ? "bg-[#00b5c4] text-white shadow-sm"
                : "bg-white text-[#444] border border-[#ddd] hover:border-[#00b5c4] hover:text-[#00b5c4]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}