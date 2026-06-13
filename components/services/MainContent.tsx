"use client";

import { Button } from "../ui/Button";

interface HeroProps {
  t: any;
  onScrollTo: (id: string) => void;
}

export const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  alt: "Fantastic Adventure Nepal B2B Team Handling Logistics in Kathmandu",
};

export default function Hero({ t, onScrollTo }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="hero-animate inline-block py-1.5 text-xs text-accent uppercase tracking-[0.2em]">
            {"/ " + t.hero.badge}
          </span>
          <h1 className="hero-animate text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t.hero.title}
          </h1>
          <p className="hero-animate text-lg text-slate-600 leading-relaxed max-w-2xl">
            {t.hero.description}
          </p>
          <div className="hero-animate pt-4 flex flex-col sm:flex-row gap-4 items-center">
            <Button variant="accent" rounded="full" onClick={() => onScrollTo("b2b-form")}>
              {t.hero.btnPartner}
            </Button>
            <Button variant="outline" rounded="full" onClick={() => onScrollTo("services")}>
              {t.hero.btnLearn}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 hero-img-animate">
          <div className="relative group rounded-xl overflow-hidden shadow-xl bg-slate-200 aspect-[4/3]">
            <img
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}