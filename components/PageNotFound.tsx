// components/NotFoundClient.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/provider/Language";
import { translations, LanguageCode } from "@/lib/translations";

export default function PageNotFound() {
  let language = "en";
  let t = {
    title: "Lost in the Wilderness?",
    description: "Even the best explorers take an unexpected detour. The path you are looking for doesn't exist or has moved.",
    button: "Return to Home"
  };

  // Safely check context to avoid runtime crashes outside the language provider
  try {
    const context = useLanguage();
    if (context && context.language) {
      language = context.language;
      if (translations[language as LanguageCode]?.notFound) {
        t = translations[language as LanguageCode].notFound;
      }
    }
  } catch (error) {
    console.debug("Language context not available on this route.");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center text-gray-900 overflow-hidden">
      
      {/* Light, clean background topographic map accents */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-gray-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-900" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-8">
        
        {/* Soft, minimal text arrangement */}
        <div className="space-y-3">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-cyan-600">
            Error Code 404
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900">
            {t.title}
          </h1>
        </div>

        {/* Supporting descriptive copy */}
        <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto leading-relaxed font-normal">
          {t.description}
        </p>

        {/* Clean, high-contrast crisp white button with black text */}
        <div className="pt-4">
          <Button 
            asChild 
            size="lg" 
            className="group rounded-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 font-medium px-8 py-6 shadow-md shadow-gray-200/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/" className="inline-flex items-center justify-center gap-3">
              <span>{t.button}</span>
              <svg 
                className="h-5 w-5 text-gray-900 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}