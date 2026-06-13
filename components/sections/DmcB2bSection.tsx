"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Mountain,
  Compass,
  Milestone,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { useLanguage } from "@/provider/Language";

interface ToastState {
  show: boolean;
  type: "success" | "error" | null;
  title: string;
  message: string;
}

// Comprehensive Localized Content Matrices
const LOCALIZED_CONTENT = {
  en: {
    hero: {
      badge: "Official Himalayan DMC",
      title: "Your Trusted Local Travel Partner in the Himalayas",
      description:
        "Fantastic Adventure Nepal operates as a premier locally owned Destination Management Company (DMC) based in Kathmandu. We deliver professional travel management and robust ground handling services across Nepal.",
      btnPartner: "Partner With Us",
      btnLearn: "Learn More",
    },
    services: {
      title: "Our Ground Operations & Handling Services",
      subtitle:
        "Reliable, flawless, end-to-end B2B infrastructure across all major regional specialties.",
      items: [
        {
          id: "trekking",
          title: "Trekking & Expeditions",
          description:
            "Full ground coordination for Everest Base Camp, Annapurna Circuit, Langtang Valley, and Manaslu Circuit, alongside professional high-altitude peak climbing permits and gear logistics.",
        },
        {
          id: "cultural",
          title: "Cultural & Heritage Tours",
          description:
            "Tailored pathways focusing on ancient historical hubs like Kathmandu, Bhaktapur, and Patan Durbar Squares, Buddhist stupas, sacred monuments, and immersive local community experiences.",
        },
        {
          id: "adventure",
          title: "Adventure & Wildlife",
          description:
            "White-water river rafting, paragliding bookings in Pokhara, zip-lining, and premium deep jungle packages featuring tiger tracking and bird watching in Chitwan and Bardia National Parks.",
        },
        {
          id: "educational",
          title: "Educational & Group Travel",
          description:
            "Specialized logistics setups for global academic institutions, volunteer initiatives, custom corporate retreats, and complex special-interest group frameworks across South Asia.",
        },
      ],
    },
    benefits: {
      title: "Let's Scale the Himalayas Together",
      description:
        "We establish high-integrity partnerships with global tour operators, agencies, and independent trip planners. Lean on our rock-solid legal registration and complete local footprint while you manage client-facing operations.",
      list: [
        "Direct local pricing matrices with transparent cost breakdowns",
        "Fast-track TIMS, national park clearances, and special inner-line permits",
        "Privately managed vehicle fleets and flight reservation protocols",
        "Comprehensive hotel reservation allocations across premium and mid-range chains",
      ],
    },
    form: {
      title: "B2B Partnership Inquiry",
      companyLabel: "Agency / Company Name",
      companyPlaceholder: "e.g., Mountain Travel Global Ltd",
      nameLabel: "Contact Person",
      namePlaceholder: "Your Name",
      emailLabel: "Work Email",
      emailPlaceholder: "partner@agency.com",
      phoneLabel: "WhatsApp Number / Phone",
      phonePlaceholder: "e.g., +1 (555) 000-0000",
      msgLabel: "Partnership Goals / Operational Needs",
      msgPlaceholder:
        "Describe your expected passenger volume, regional interests, or special white-label requirements...",
      btnSubmit: "Submit B2B Inquiry",
      btnSubmitting: "Sending B2B Inquiry...",
    },
    toasts: {
      successTitle: "Inquiry Sent",
      successMsg:
        "Your B2B partnership request has been submitted successfully.",
      errorTitle: "Submission Failed",
      errorMsg: "We could not submit your inquiry. Please try again.",
    },
  },
  es: {
    hero: {
      badge: "DMC Himalayano Oficial",
      title: "Tu Socio de Viajes Local de Confianza en los Himalayas",
      description:
        "Fantastic Adventure Nepal opera como una empresa de gestión de destinos (DMC) de propiedad local con sede en Katmandú. Ofrecemos una gestión de viajes profesional y servicios integrales de asistencia en tierra en todo Nepal.",
      btnPartner: "Asóciese con Nosotros",
      btnLearn: "Saber Más",
    },
    services: {
      title: "Nuestras Operaciones en Tierra y Servicios de Gestión",
      subtitle:
        "Infraestructura B2B confiable, impecable y de extremo a extremo en las principales especialidades regionales.",
      items: [
        {
          id: "trekking",
          title: "Trekking y Expediciones",
          description:
            "Coordinación completa en tierra para el Campamento Base del Everest, Circuito de los Annapurnas, Valle de Langtang y Circuito de Manaslu, junto con permisos profesionales de escalada de picos de gran altitud y logística de equipos.",
        },
        {
          id: "cultural",
          title: "Excursiones Culturales y de Patrimonio",
          description:
            "Rutas personalizadas centradas en centros históricos antiguos como las plazas Durbar de Katmandú, Bhaktapur y Patán, estupas budistas, monumentos sagrados y experiencias inmersivas en comunidades locales.",
        },
        {
          id: "adventure",
          title: "Aventura y Vida Silvestre",
          description:
            "Rafting en ríos de aguas bravas, reservas de parapente en Pokhara, tirolesa y paquetes premium en la selva profunda con seguimiento de tigres y observación de aves en los Parques Nacionales de Chitwan y Bardia.",
        },
        {
          id: "educational",
          title: "Viajes Educativos y de Grupo",
          description:
            "Logística especializada para instituciones académicas internacionales, iniciativas de voluntariado, retiros corporativos personalizados y complejos marcos para grupos de interés especial en el sur de Asia.",
        },
      ],
    },
    benefits: {
      title: "Escalemos Juntos los Himalayas",
      description:
        "Establecemos asociaciones de alta integridad con operadores turísticos globales, agencias y planificadores de viajes independientes. Confíe en nuestro sólido registro legal y en nuestra total presencia local mientras usted gestiona las operaciones de cara al cliente.",
      list: [
        "Matrices de precios locales directos con desgloses de costes transparentes",
        "Gestión rápida de TIMS, autorizaciones de parques nacionales y permisos especiales de zonas restringidas",
        "Flotas de vehículos de gestión privada y protocolos de reserva de vuelos",
        "Asignación integral de reservas hoteleras en cadenas premium y de gama media",
      ],
    },
    form: {
      title: "Solicitud de Asociación B2B",
      companyLabel: "Nombre de la Agencia / Empresa",
      companyPlaceholder: "ej., Mountain Travel Global Ltd",
      nameLabel: "Persona de Contacto",
      namePlaceholder: "Tu Nombre",
      emailLabel: "Correo Electrónico de Trabajo",
      emailPlaceholder: "socio@agencia.com",
      phoneLabel: "Número de WhatsApp / Teléfono",
      phonePlaceholder: "ej., +1 (555) 000-0000",
      msgLabel: "Objetivos de Asociación / Necesidades Operativas",
      msgPlaceholder:
        "Describa su volumen previsto de pasajeros, intereses regionales o requisitos especiales de marca blanca...",
      btnSubmit: "Enviar Solicitud B2B",
      btnSubmitting: "Enviando Solicitud B2B...",
    },
    toasts: {
      successTitle: "Solicitud Enviada",
      successMsg: "Su solicitud de asociación B2B se ha enviado correctamente.",
      errorTitle: "Error al Enviar",
      errorMsg:
        "No hemos podido enviar su solicitud. Por favor, inténtelo de nuevo.",
    },
  },
  fr: {
    hero: {
      badge: "DMC Himalayen Officiel",
      title: "Votre Partenaire Local de Confiance dans les Himalayas",
      description:
        "Fantastic Adventure Nepal opère en tant que agence de gestion de destination (DMC) locale basée à Katmandou. Nous fournissons une gestion de voyage professionnelle et des services d'assistance au sol robustes à travers le Népal.",
      btnPartner: "Devenir Partenaire",
      btnLearn: "En Savoir Plus",
    },
    services: {
      title: "Nos Opérations au Sol & Services d'Accueil",
      subtitle:
        "Une infrastructure B2B fiable, sans faille et de bout en bout pour toutes les principales spécialités régionales.",
      items: [
        {
          id: "trekking",
          title: "Trekking & Expéditions",
          description:
            "Coordination complète au sol pour le camp de base de l'Everest, le circuit des Annapurnas, la vallée du Langtang et le circuit du Manaslu, ainsi que les permis professionnels d'ascension et la logistique du matériel.",
        },
        {
          id: "cultural",
          title: "Visites Culturelles & Patrimoniales",
          description:
            "Itinéraires sur mesure axés sur les anciens centres historiques comme les places Durbar de Katmandou, Bhaktapur et Patan, les stupas bouddhistes, les monuments sacrés et les expériences communautaires immersives.",
        },
        {
          id: "adventure",
          title: "Aventure & Vie Sauvage",
          description:
            "Rafting en eau vive, réservations de parapente à Pokhara, tyrolienne et forfaits de jungle premium avec suivi des tigres et observation des oiseaux dans les parcs nationaux de Chitwan et Bardia.",
        },
        {
          id: "educational",
          title: "Voyages Éducatifs & de Groupe",
          description:
            "Configurations logistiques spécialisées pour les institutions académiques mondiales, les initiatives de bénévolat, les séminaires d'entreprise sur mesure et les programmes complexes pour groupes d'intérêts particuliers en Asie du Sud.",
        },
      ],
    },
    benefits: {
      title: "Saluons Ensemble les Himalayas",
      description:
        "Nous établissons des partenariats de haute intégrité avec des voyagistes mondiaux, des agences et des planificateurs de voyages indépendants. Appuyez-vous sur notre enregistrement légal solide et notre ancrage local complet pendant que vous gérez les opérations clients.",
      list: [
        "Grilles de tarifs locaux directs avec des ventilations de coûts transparentes",
        "Traitement accéléré des cartes TIMS, des autorisations pour les parcs nationaux et des permis d'accès spéciaux",
        "Flottes de véhicules gérées de manière privée et protocoles de réservation de vols",
        "Allocations complètes de réservations d'hôtel dans les chaînes haut et moyen de gamme",
      ],
    },
    form: {
      title: "Demande de Partenariat B2B",
      companyLabel: "Nom de l'Agence / Entreprise",
      companyPlaceholder: "ex., Mountain Travel Global Ltd",
      nameLabel: "Personne de Contact",
      namePlaceholder: "Votre Nom",
      emailLabel: "E-mail Professionnel",
      emailPlaceholder: "partenaire@agence.com",
      phoneLabel: "Numéro WhatsApp / Téléphone",
      phonePlaceholder: "ex., +33 (0)6 00 00 00 00",
      msgLabel: "Objectifs de Partenariat / Besoins Opérationnels",
      msgPlaceholder:
        "Décrivez votre volume de passagers prévu, vos intérêts régionaux ou vos exigences spécifiques en marque blanche...",
      btnSubmit: "Soumettre la Demande",
      btnSubmitting: "Envoi de la Demande B2B...",
    },
    toasts: {
      successTitle: "Demande Envoyée",
      successMsg: "Votre demande de partenariat B2B a été soumise avec succès.",
      errorTitle: "Échec de l'Envoi",
      errorMsg:
        "Nous n'avons pas pu soumettre votre demande. Veuillez réessayer.",
    },
  },
};

const ICON_MAPPING = {
  trekking: Mountain,
  cultural: Compass,
  adventure: Milestone,
  educational: GraduationCap,
};

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  alt: "Fantastic Adventure Nepal B2B Team Handling Logistics in Kathmandu",
};

export default function DmcB2bSection() {
  const { language } = useLanguage();

  // Safely pull translations based on language hook
  const t =
    LOCALIZED_CONTENT[language as keyof typeof LOCALIZED_CONTENT] ||
    LOCALIZED_CONTENT.en;

  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: null,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.show]);

  const triggerToast = (
    type: "success" | "error",
    title: string,
    message: string,
  ) => {
    setToast({
      show: true,
      type,
      title,
      message,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partner-with-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || data.error || "Failed to submit inquiry.",
        );
      }

      triggerToast("success", t.toasts.successTitle, t.toasts.successMsg);

      setFormData({
        company: "",
        name: "",
        email: "",
        whatsapp: "",
        message: "",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t.toasts.errorMsg;
      triggerToast("error", t.toasts.errorTitle, errorMessage);
      console.error("Error submitting B2B inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Section Animations
      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-img-animate", {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.4,
      });

      // 2. Services Section Animations
      gsap.from(".service-header-animate", {
        scrollTrigger: {
          trigger: ".service-header-animate",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".service-card-animate", {
        scrollTrigger: {
          trigger: "#services-list-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      // 3. Form Section Animations
      gsap.from(".form-info-animate", {
        scrollTrigger: {
          trigger: "#b2b-form",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });

      gsap.from(".form-card-animate", {
        scrollTrigger: {
          trigger: "#b2b-form",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-slate-800 overflow-hidden">
      <div
        className="fixed top-6 right-6 z-50 w-full max-w-sm pointer-events-auto"
        role="status"
        aria-live="polite"
      >
        {toast.show && (
          <div className="overflow-hidden rounded-xl bg-white shadow-2xl border border-slate-200">
            <div className="flex items-start gap-3 p-4">
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-[#2CC1DA]" />
                ) : (
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">
                  {toast.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {toast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                className="shrink-0 rounded-md text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2CC1DA]/30"
                aria-label="Dismiss notification"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="h-1 bg-slate-100">
              <div
                className={`h-full ${toast.type === "success" ? "bg-[#2CC1DA]" : "bg-red-500"}`}
                style={{
                  animation: "b2bToastCountdown 5s linear forwards",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="hero-animate inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border">
              {t.hero.badge}
            </span>
            <h1 className="hero-animate text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
              {t.hero.title}
            </h1>
            <p className="hero-animate text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>
            <div className="hero-animate pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <Button variant="accent" rounded="full">
                <Link href="/Parner-wiht-us">{t.hero.btnPartner}</Link>
              </Button>
              <Button variant="outline" rounded="full">
                <Link href="/services">{t.hero.btnLearn}</Link>
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

      {/* 2. CORE SERVICES SHOWCASE */}
      <section
        id="services"
        className="bg-slate-50 border-y border-slate-200 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="service-header-animate text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.services.title}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t.services.subtitle}</p>
          </div>

          <div
            id="services-list-container"
            className="space-y-6 max-w-5xl mx-auto"
          >
            {t.services.items.map((service) => {
              const IconComponent =
                ICON_MAPPING[service.id as keyof typeof ICON_MAPPING] ||
                Mountain;
              return (
                <div
                  key={service.id}
                  className="service-card-animate bg-white border border-slate-200 p-6 md:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border-l-4 border-l-[#2CC1DA]"
                >
                  <div className="flex items-start gap-4 md:w-1/3">
                    <IconComponent className="w-6 h-6 text-slate-900 shrink-0 mt-1" />
                    <h4 className="text-xl font-bold text-slate-900">
                      {service.title}
                    </h4>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PARTNER WITH US & B2B FORM */}
      <section
        id="b2b-form"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="form-info-animate space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.benefits.title}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {t.benefits.description}
            </p>

            <div className="space-y-4 pt-4">
              {t.benefits.list.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2CC1DA] shrink-0 mt-0.5" />
                  <p className="text-slate-700 font-medium text-sm">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* B2B INQUIRY FORM */}
          <div className="form-card-animate bg-white border border-slate-200 shadow-xl rounded-xl p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {t.form.title}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  {t.form.companyLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.form.companyPlaceholder}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                    {t.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.form.namePlaceholder}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                    {t.form.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.form.emailPlaceholder}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  {t.form.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={t.form.phonePlaceholder}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
                  {t.form.msgLabel}
                </label>
                <textarea
                  rows={4}
                  placeholder={t.form.msgPlaceholder}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#2CC1DA] focus:ring-2 focus:ring-[#2CC1DA]/10 transition duration-200 resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                width="full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? t.form.btnSubmitting : t.form.btnSubmit}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes b2bToastCountdown {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
