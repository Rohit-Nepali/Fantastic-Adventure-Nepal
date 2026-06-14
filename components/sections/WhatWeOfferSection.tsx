"useinit"
"use client";

import React from "react";
import { User, Users, Heart, Sparkles, Footprints, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

const useLanguage = () => {
  return { language: "en" as "en" | "es" | "fr" };
};

const LOCALIZED_CONTENT = {
  en: {
    hero: {
      badge: "What We Offer",
      title: "Explore Nepal Your Way",
      description: "Every traveler is unique, and so is every journey. Choose from individual profiles and custom-tailored frameworks structured around your desired tempo and comfort guidelines."
    },
    styles: [
      {
        id: "fits",
        title: "FIT's (Free Independent Travelers)",
        desc: "Travel at your own pace with fully customized itineraries designed exclusively for you. Enjoy total strategic execution, complete visual flexibility, and private transport setups.",
        metaTitle: "Perfect For:",
        metaItems: ["Independent travelers", "Couples & Honeymooners", "Custom itinerary enthusiasts"]
      },
      {
        id: "groups",
        title: "Group Tours",
        desc: "Experience Nepal together with like-minded individuals. Our fixed group architectures merge thorough local validation with shared logistics optimization for excellent value.",
        metaTitle: "Ideal For:",
        metaItems: ["Friends and travel groups", "Educational institutions", "Corporate retreats & teams"]
      },
      {
        id: "families",
        title: "Family Adventures",
        desc: "Build generational experiences via family-focused routes configured with lower physical impacts, enhanced safety buffers, and highly engaging activities.",
        metaTitle: "Highlights Include:",
        metaItems: ["Easy scenic hiking routes", "Chitwan wildlife safaris", "Family-friendly premium lodgings"]
      },
      {
        id: "curated",
        title: "Curated Experiences",
        desc: "Special interest setups that venture outside basic sightseeing models. Focus exclusively on deep structural elements, mindfulness networks, and specialized themes.",
        metaTitle: "Popular Tracks:",
        metaItems: ["Wellness & Yoga Retreats", "High-End Luxury Alpine Escapes", "Local Festival Immersion"]
      },
      {
        id: "solos",
        title: "Solo Travelers",
        desc: "Maintain total autonomous flexibility without incurring undue logistical risks. Travel with total institutional backend oversight, 24/7 check-ins, and local native matching.",
        metaTitle: "System Guarantees:",
        metaItems: ["Flexible localized pricing models", "Verified English-speaking expert guides", "Integrated safety monitoring tracking"]
      }
    ],
    whyUs: {
      title: "Engineered Framework Benefits",
      items: [
        "Local Himalayan Experts & Registered Assets",
        "Tailor-Made Configurations for Varied Budgets",
        "Completely Transparent Baseline Execution Costs",
        "24/7 Strategic Travel Coordination Support"
      ]
    },
    cta: {
      title: "Ready to Explore Your Own Way?",
      desc: "Whether you're dreaming of mountain adventures, cultural discoveries, wildlife encounters, or a personalized holiday, our local travel experts are here to design the perfect journey for you.",
      btnPlan: "Plan Your Trip",
      btnContact: "Contact Our Experts",
    }
  },
  es: {
    hero: {
      badge: "Lo Que Ofrecemos",
      title: "Explore Nepal a su Manera",
      description: "Cada viajero es único, y también lo es cada viaje. Elija entre perfiles individuales y marcos adaptados a sus objetivos de viaje."
    },
    styles: [
      {
        id: "fits",
        title: "Viajeros Independientes (FIT)",
        desc: "Viaje a su propio ritmo con itinerarios totalmente personalizados. Disfrute de flexibilidad visual y transporte privado.",
        metaTitle: "Perfecto Para:",
        metaItems: ["Viajeros independientes", "Parejas y recién casados", "Entusiastas de rutas personalizadas"]
      },
      {
        id: "groups",
        title: "Tours en Grupo",
        desc: "Experimente Nepal junto a viajeros con ideas afines. Combinamos la exploración cultural con logísticas compartidas optimizadas.",
        metaTitle: "Ideal Para:",
        metaItems: ["Amigos y grupos de viaje", "Instituciones educativas", "Grupos corporativos"]
      },
      {
        id: "families",
        title: "Aventuras Familiares",
        desc: "Cree recuerdos inolvidables con viajes diseñados para todas las edades, equilibrando la comodidad, la cultura y la seguridad.",
        metaTitle: "Destacados Incluyen:",
        metaItems: ["Senderismo escénico de bajo impacto", "Safaris en parques nacionales", "Alojamientos familiares premium"]
      },
      {
        id: "curated",
        title: "Experiencias Curadas",
        desc: "Viajes cuidadosamente diseñados que van más allá del turismo tradicional. Encuentros locales auténticos y retiros temáticos.",
        metaTitle: "Rutas Populares:",
        metaItems: ["Retiros de Bienestar y Yoga", "Escapadas de Lujo en el Himalaya", "Experiencias de Festivales Locales"]
      },
      {
        id: "solos",
        title: "Viajeros Solitarios",
        desc: "Viaje de forma independiente pero con total seguridad. Proporcionamos un respaldo operativo constante y guías locales expertos.",
        metaTitle: "Beneficios:",
        metaItems: ["Soporte personalizado constante", "Itinerarios adaptables", "Arreglos de viaje seguros"]
      }
    ],
    whyUs: {
      title: "Por Qué Elegirnos",
      items: [
        "Expertos locales en el Himalaya",
        "Experiencias de viaje a la medida",
        "Precios transparentes y sin costos ocultos",
        "Asistencia de viaje activa 24/7"
      ]
    },
    cta: {
      title: "¿Listo para Explorar a Tu Manera?",
      desc: "Ya sea que sueñes con aventuras en la montaña, descubrimientos culturales, encuentros con la vida silvestre o unas vacaciones personalizadas, nuestros expertos locales están aquí para diseñar el viaje perfecto para ti.",
      btnPlan: "Planifica Tu Viaje",
      btnContact: "Contacta a Nuestros Expertos",
    }
  },
  fr: {
    hero: {
      badge: "Ce Que Nous Offrons",
      title: "Explorez le Népal à Votre Façon",
      description: "Chaque voyageur est unique, et chaque aventure l'est aussi. Choisissez le style de voyage qui correspond le mieux à vos aspirations."
    },
    styles: [
      {
        id: "fits",
        title: "Voyageurs Indépendants (FIT)",
        desc: "Voyagez à votre propre rythme avec des itinéraires sur mesure conçus exclusivement pour vous. Flexibilité totale garantie.",
        metaTitle: "Idéal Pour:",
        metaItems: ["Voyageurs autonomes", "Couples & Lunes de miel", "Amateurs de sur-mesure complet"]
      },
      {
        id: "groups",
        title: "Circuits en Groupe",
        desc: "Partagez l'aventure avec d'autres passionnés. Nos circuits de groupe allient convivialité, encadrement et optimisation des coûts.",
        metaTitle: "Parfait Pour:",
        metaItems: ["Groupes d'amis", "Institutions éducatives", "Comités d'entreprises"]
      },
      {
        id: "families",
        title: "Aventures en Famille",
        desc: "Créez des souvenirs intergénérationnels avec des parcours adaptés, privilégiant la sécurité, le confort et l'émerveillement.",
        metaTitle: "Points Forts :",
        metaItems: ["Randonnées faciles et panoramiques", "Safaris animaliers à Chitwan", "Hébergements familiaux adaptés"]
      },
      {
        id: "curated",
        title: "Expériences Thématiques",
        desc: "Des séjours exclusifs axés sur l'immersion spirituelle, le bien-être ou le très haut de gamme en haute montagne.",
        metaTitle: "Thèmes Prisés :",
        metaItems: ["Retraites de Yoga & Bien-être", "Évasions de Luxe dans l'Himalaya", "Immersion dans les Festivals Locales"]
      },
      {
        id: "solos",
        title: "Voyageurs Solo",
        desc: "Partez l'esprit tranquille. Bénéficiez d'un encadrement sécurisant et de l'assistance de notre équipe tout au long de votre parcours.",
        metaTitle: "Garanties :",
        metaItems: ["Assistance personnalisée continue", "Itinéraires flexibles", "Logistique sécurisée de bout en bout"]
      }
    ],
    whyUs: {
      title: "Les Avantages de Notre Structure",
      items: [
        "Experts locaux de l'Himalaya",
        "Conception de séjours 100% sur mesure",
        "Tarification transparente et claire",
        "Assistance logistique disponible 24h/24"
      ]
    },
    cta: {
      title: "Prêt à Explorer à Votre Façon ?",
      desc: "Que vous rêviez d’aventures en montagne, de découvertes culturelles, de rencontres avec la faune sauvage ou de vacances sur mesure, nos experts locaux sont là pour concevoir le voyage idéal pour vous.",
      btnPlan: "Planifiez Votre Voyage",
      btnContact: "Contactez Nos Experts",
    }
  }
};

export default function WhatWeOfferSection() {
  const { language } = useLanguage();
  const t = LOCALIZED_CONTENT[language] || LOCALIZED_CONTENT.en;

  // Icons map tailored directly to travel categories
  const styleIcons = (id: string) => {
    switch (id) {
      case "fits": return <User className="w-5 h-5 text-[#2CC1DA]" />;
      case "groups": return <Users className="w-5 h-5 text-[#2CC1DA]" />;
      case "families": return <Heart className="w-5 h-5 text-[#2CC1DA]" />;
      case "curated": return <Sparkles className="w-5 h-5 text-[#2CC1DA]" />;
      case "solos": return <Footprints className="w-5 h-5 text-[#2CC1DA]" />;
      default: return <Sparkles className="w-5 h-5 text-[#2CC1DA]" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-12 overflow-x-hidden">

      {/* HERO BANNER SECTION */}
      {/* HERO BANNER SECTION */}
      <section className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Fixed the typo in the URL string format here */}
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=100')" }}
        />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 ">
            {t.hero.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">{t.hero.title}</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">{t.hero.description}</p>
        </div>
      </section>

      {/* TRAVEL CONFIGURATOR GRID */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {t.styles.map((style) => (
            <div
              key={style.id}
              className="bg-white rounded-2xl px-6 py-2 sm:px-10 sm:py-4 border border-slate-200/80 shadow-sm hover:shadow-md transition duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    {styleIcons(style.id)}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900">{style.title}</h4>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">{style.desc}</p>
              </div>

              <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 border border-slate-200/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">{style.metaTitle}</h4>
                <ul className="space-y-2.5">
                  {style.metaItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                      <div className="w-1.5 h-1.5 bg-[#2CC1DA] rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPACT WHY CHOOSE US FOOTPRINT */}
      <section className="bg-white border-t border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center py-4 md:py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">{t.whyUs.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {t.whyUs.items.map((benefit, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200/50 flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSISTENT ENGAGEMENT SECTION */}
      <section className="max-w-4xl mx-auto mt-16 px-4 text-center">
        <div className="bg-gradient-to-br from-slate-700  via-slate-800 to-[#0a1f2b] p-8 sm:p-12 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#2CC1DA]/10 rounded-full blur-2xl" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">{t.cta.title}</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">{t.cta.desc}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="accent"
              rounded="lg"
            >
              <Link href="/planYourTrip"> <span>{t.cta.btnPlan}</span></Link>
            </Button>
            <Button
              variant="outline"
              rounded="lg"
              className="text-white border-slate-500 hover:border-slate-400 hover:bg-slate-700/30 transition duration-300"
            >
              <Link href="/contact"> <span>{t.cta.btnContact}</span></Link>
            </Button>
          </div>
        </div>
      </section >

    </div >
  );
}