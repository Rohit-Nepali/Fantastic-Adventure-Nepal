"use client";

import { useLanguage } from "@/provider/Language";
import CategoryTabs from "@/components/packages/CategoryTabs";
import PackageGrid from "@/components/packages/PackageGrid";
import { Category, PackageCard } from "@/lib/sanity/types";

interface PackagesClientViewProps {
  packages: PackageCard[];
  categories: Category[];
  categorySlug: string | null;
}

export default function PackagesClientView({ packages, categories, categorySlug }: PackagesClientViewProps) {
  const { language } = useLanguage();

  // Handle local UI configurations on the fly
  const UI = {
    en: {
      badge: "Tours & Packages",
      heading: "Explore Nepal Your Way",
      description: "Every traveler is unique, and so is every journey. Choose from a wide range of experiences designed for your interests and adventure level.",
      noFoundTitle: "No packages found",
      noFoundDesc: "Try selecting a different category."
    },
    es: {
      badge: "Tours y Paquetes",
      heading: "Explora Nepal a Tu Manera",
      description: "Cada viajero es único, y también lo es cada viaje. Elige entre una amplia gama de experiencias diseñadas para tus intereses y nivel de aventura.",
      noFoundTitle: "No se encontraron paquetes",
      noFoundDesc: "Intenta seleccionar una categoría diferente."
    },
    fr: {
      badge: "Circuits & Forfaits",
      heading: "Explorez le Népal à Votre Façon",
      description: "Chaque voyageur est unique, et chaque voyage l'est aussi. Choisissez parmi une large gamme d'expériences conçues pour vos intérêts et votre niveau d'aventure.",
      noFoundTitle: "Aucun forfait trouvé",
      noFoundDesc: "Essayez de sélectionner une catégorie différente."
    }
  };

  const t = UI[language] || UI.en;

  // Filter computation runs dynamically here on layout updates
  const filtered = categorySlug
    ? packages.filter((p) => p.category?.slug?.current === categorySlug)
    : packages;

  return (
    <main className="min-h-screen bg-[#f5f3ef]">
      {/* Hero */}
      <section className="pt-32 pb-12 px-6 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-[#00b5c4] mb-3">
          {t.badge}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#111] leading-tight mb-4">
          {t.heading}
        </h1>
        <p className="text-[#555] max-w-xl mx-auto text-lg">
          {t.description}
        </p>
      </section>

      {/* Category Filter Tabs */}
      <CategoryTabs categories={categories} activeSlug={categorySlug} />

      {/* Package Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#888]">
            <p className="text-2xl font-display mb-2">{t.noFoundTitle}</p>
            <p className="text-sm">{t.noFoundDesc}</p>
          </div>
        ) : (
          <PackageGrid packages={filtered} />
        )}
      </section>
    </main>
  );
}