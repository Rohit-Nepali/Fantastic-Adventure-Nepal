"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/provider/Language";

// Sub-component splits
import CoreServices from "./CoreServices";
import InquiryForm from "./InquiryForm";
import Hero from "./MainContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ToastState {
  show: boolean;
  type: "success" | "error" | null;
  title: string;
  message: string;
}

// Deep Content Localization Matrix explicitly isolated to Nepal Ground Handling operations
const LOCALIZED_CONTENT = {
  en: {
    hero: {
      badge: "Official Himalayan DMC",
      title: "Your Trusted Local Ground Handling Partner in Nepal",
      description:
        "Fantastic Adventure Nepal operates as a premier, locally owned Destination Management Company (DMC) based in Kathmandu. We deliver high-integrity travel management, strict safety frameworks, and robust B2B ground handling services across Nepal.",
      btnPartner: "Partner With Us",
      btnLearn: "Our Operations",
    },
    services: {
      title: "Our Ground Operations & Handling Services",
      subtitle: "Reliable, audited, end-to-end B2B infrastructure across all major regional specialties in Nepal.",
      items: [
        {
          id: "trekking",
          title: "Trekking & Alpine Expeditions",
          subcap: "High-Altitude Risk Operations",
          description:
            "Full ground coordination for Everest Base Camp, Annapurna Circuit, Langtang Valley, and Manaslu Circuit. We secure specialized permits, establish satellite communications, and provision experienced local guiding teams.",
          highlights: ["Certified Sherpa Guides", "Satelitte/O2 Infrastructure", "Heli-Evac Clearances", "Government Peak Permits"],
        },
        {
          id: "cultural",
          title: "Cultural & Heritage Pathways",
          subcap: "Bespoke Experiential Travel",
          description:
            "Tailored itineraries focusing on Nepal's UNESCO world heritage hubs like Kathmandu, Bhaktapur, and Patan Durbar Squares. Immersive custom programs built with handpicked local community hosts and historians.",
          highlights: ["UNESCO Heritage Passes", "Multi-lingual Experts", "Exclusive Homestay Access", "Festival Logistical Matrix"],
        },
        {
          id: "adventure",
          title: "Adventure & Wilderness Operations",
          subcap: "Audited Action Logistical Setups",
          description:
            "White-water river rafting asset management, certified paragliding allocations in Pokhara, high-impact ziplines, and premium deep jungle safaris incorporating professional wildlife biologists in Chitwan and Bardia.",
          highlights: ["Audited Water Gear Safety", "Chitwan/Bardia Access", "Premium Lodge Bookings", "Naturalist Escapes Handling"],
        },
        {
          id: "educational",
          title: "Educational & Institutional Travel",
          subcap: "University & CSR Infrastructure",
          description:
            "Specialized risk-mitigated legal structures and logistical frameworks custom built for international academic groups, NGO field studies, research bodies, and corporate philanthropic delegations within Nepal.",
          highlights: ["Institutional Compliance", "Custom Field-Lodge Setups", "CSR Project Integration", "24/7 Desk Monitoring"],
        },
      ],
    },
    benefits: {
      title: "Let's Scale Nepal's Tourism Together",
      description:
        "We build high-trust white-label partnerships with global tour operators, agencies, and independent trip planners. Lean fully on our legal registration framework and local footprint while you manage customer acquisition.",
      list: [
        "Direct local operator pricing matrices with unbundled cost breakdowns",
        "Fast-track TIMS execution, conservation areas, and restricted inner-line clearances",
        "Privately managed, audited transport fleets and priority domestic air space bookings",
        "Direct block hotel room allocations spanning premium luxury to mid-tier chains across Nepal",
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
      msgPlaceholder: "Describe your expected passenger volume, regional interests in Nepal, or specific white-label operational requirements...",
      btnSubmit: "Submit B2B Inquiry",
      btnSubmitting: "Sending B2B Inquiry...",
    },
    toasts: {
      successTitle: "Inquiry Sent",
      successMsg: "Your B2B partnership request has been submitted successfully to our Kathmandu desk.",
      errorTitle: "Submission Failed",
      errorMsg: "We could not submit your inquiry. Please check your network and try again.",
    },
  },
  es: {
    hero: {
      badge: "DMC Himalayano Oficial",
      title: "Tu Socio de Confianza para Operaciones en Tierra en Nepal",
      description:
        "Fantastic Adventure Nepal opera como una empresa de gestión de destinos (DMC) de propiedad totalmente local con sede en Katmandú. Ofrecemos una gestión de viajes impecable y servicios de asistencia en tierra B2B en todo Nepal.",
      btnPartner: "Asócese con Nosotros",
      btnLearn: "Nuestras Operaciones",
    },
    services: {
      title: "Nuestras Operaciones en Tierra y Servicios de Gestión",
      subtitle: "Infraestructura B2B confiable, auditada y de extremo a extremo en las principales especialidades regionales de Nepal.",
      items: [
        {
          id: "trekking",
          title: "Trekking y Expediciones Alpinas",
          subcap: "Operaciones de Riesgo en Alta Montaña",
          description:
            "Coordinación completa en tierra para el Campamento Base del Everest, Circuito de los Annapurnas, Valle de Langtang y Circuito de Manaslu. Aseguramos permisos especiales y desplegamos guías altamente capacitados.",
          highlights: ["Guías Sherpa Certificados", "Logística de Oxígeno/Satélite", "Evacuación Médica en Helicóptero", "Permisos de Cumbre Estatales"],
        },
        {
          id: "cultural",
          title: "Rutas Culturales y de Patrimonio",
          subcap: "Viajes de Experiencia Personalizados",
          description:
            "Itinerarios a la medida centrados en los centros de patrimonio de la UNESCO en Nepal como las plazas Durbar de Katmandú, Bhaktapur y Patán, conectando con historiadores y comunidades locales.",
          highlights: ["Pases de Patrimonio UNESCO", "Expertos Multilingües", "Acceso Exclusivo a Comunidades", "Logística de Festivales Locales"],
        },
        {
          id: "adventure",
          title: "Aventura y Operaciones en la Naturaleza",
          subcap: "Logística Auditada de Acción",
          description:
            "Gestión de balsas de rafting, reservas de parapente en Pokhara, tirolesas y safaris premium en la selva con el apoyo de biólogos profesionales en los parques nacionales de Chitwan y Bardia.",
          highlights: ["Equipos de Agua Auditados", "Logística en Chitwan y Bardia", "Hoteles y Lodges Premium", "Guías Naturalistas Expertos"],
        },
        {
          id: "educational",
          title: "Viajes Educativos e Institucionales",
          subcap: "Infraestructura Académica y RSE",
          description:
            "Marcos operativos mitigados para viajes institucionales de universidades internacionales, estudios de campo de ONG, investigación científica y delegaciones de voluntariado dentro de Nepal.",
          highlights: ["Cumplimiento Institucional", "Campamentos de Campo a Medida", "Integración de Proyectos RSE", "Monitoreo Operativo 24/7"],
        },
      ],
    },
    benefits: {
      title: "Escalemos Juntos el Turismo en Nepal",
      description:
        "Establecemos asociaciones de alta integridad con operadores turísticos globales, agencias y planificadores de viajes. Confíe en nuestro sólido registro legal y en nuestra total presencia local mientras usted gestiona el contacto con el cliente.",
      list: [
        "Matrices de precios locales directos con desgloses de costos transparentes",
        "Gestión rápida de TIMS, autorizaciones de parques nacionales y permisos especiales de zonas restringidas",
        "Flotas de vehículos de gestión privada y protocolos de prioridad para vuelos domésticos",
        "Asignación integral de reservas hoteleras en cadenas premium y de gama media en Nepal",
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
      msgPlaceholder: "Describa su volumen previsto de pasajeros, intereses de rutas en Nepal o requisitos especiales de marca blanca...",
      btnSubmit: "Enviar Solicitud B2B",
      btnSubmitting: "Enviando Solicitud B2B...",
    },
    toasts: {
      successTitle: "Solicitud Enviada",
      successMsg: "Su solicitud de asociación B2B se ha enviado correctamente a nuestra oficina de Katmandú.",
      errorTitle: "Error al Enviar",
      errorMsg: "No hemos podido enviar su solicitud. Por favor, inténtelo de nuevo.",
    },
  },
  fr: {
    hero: {
      badge: "DMC Himalayen Officiel",
      title: "Votre Partenaire Local de Confiance pour l'Accueil au Népal",
      description:
        "Fantastic Adventure Nepal opère en tant qu'agence de gestion de destination (DMC) locale basée à Katmandou. Nous fournissons une gestion de voyage de premier ordre et des services d'assistance au sol B2B à travers tout le Népal.",
      btnPartner: "Devenir Partenaire",
      btnLearn: "Nos Opérations",
    },
    services: {
      title: "Nos Opérations au Sol & Services d'Accueil",
      subtitle: "Une infrastructure B2B fiable, auditée et de bout en bout pour toutes les principales spécialités régionales au Népal.",
      items: [
        {
          id: "trekking",
          title: "Trekking & Expéditions Alpines",
          subcap: "Opérations à Haute Altitude et Risques",
          description:
            "Coordination complète au sol pour l'Everest, l'Annapurna, Langtang et Manaslu. Nous gérons les permis spéciaux, les communications satellites et le déploiement d'équipes de guides experts.",
          highlights: ["Guides Sherpas Certifiés", "Infrastructures Satellites & O2", "Évacuation Héliportée Médicale", "Permis Officiels de Sommet"],
        },
        {
          id: "cultural",
          title: "Visites Culturelles & Patrimoniales",
          subcap: "Voyages Expérientiels Sur Mesure",
          description:
            "Itinéraires personnalisés axés sur les sites classés par l'UNESCO au Népal (Katmandou, Bhaktapur, Patan). Programmes conçus avec des historiens et des communautés locales d'accueil.",
          highlights: ["Pass Patrimoine UNESCO", "Experts Multilingues", "Accès Immersion Communautaire", "Logistique Festivals Locaux"],
        },
        {
          id: "adventure",
          title: "Aventure & Gestion de la Vie Sauvage",
          subcap: "Logistique d'Action Auditée",
          description:
            "Gestion des équipements de rafting, réservations de parapente à Pokhara, tyroliennes et safaris de jungle premium avec l'accompagnement de biologistes naturalistes à Chitwan et Bardia.",
          highlights: ["Équipements Aquatiques Audités", "Logistique Chitwan & Bardia", "Lodges & Hôtels Privilèges", "Guides Naturalistes Experts"],
        },
        {
          id: "educational",
          title: "Voyages Éducatifs & Institutionnels",
          subcap: "Infrastructures Académiques & RSE",
          description:
            "Cadres logistiques sécurisés et conformités légales adaptés aux universités internationales, séjours de recherche d'ONG, missions scientifiques et délégations de volontariat au Népal.",
          highlights: ["Conformité Institutionnelle", "Logements Terrains Sur Mesure", "Intégration Projets RSE", "Suivi Opérationnel 24h/24"],
        },
      ],
    },
    benefits: {
      title: "Saluons Ensemble le Tourisme au Népal",
      description:
        "Nous établissons des partenariats de haute intégrité avec des voyagistes mondiaux, des agences et des planificateurs de voyages. Appuyez-vous sur notre enregistrement légal solide et notre ancrage local complet pendant que vous gérez les clients.",
      list: [
        "Grilles de tarifs locaux directs avec des ventilations de coûts transparentes",
        "Traitement accéléré des cartes TIMS, des autorisations pour les parcs nationaux et des permis d'accès spéciaux",
        "Flottes de véhicules gérées de manière privée et priorités de réservation sur les vols domestiques",
        "Allocations complètes de réservations d'hôtel dans les chaînes haut et moyen de gamme au Népal",
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
      msgPlaceholder: "Décrivez votre volume de passagers prévu, vos intérêts régionaux au Népal ou vos exigences spécifiques en marque blanche...",
      btnSubmit: "Soumettre la Demande",
      btnSubmitting: "Envoi de la Demande B2B...",
    },
    toasts: {
      successTitle: "Demande Envoyée",
      successMsg: "Votre demande de partenariat B2B a été soumise avec succès à notre bureau de Katmandou.",
      errorTitle: "Échec de l'Envoi",
      errorMsg: "Nous n'avons pas pu soumettre votre demande. Veuillez réessayer.",
    },
  },
};

export default function DmcB2bSection() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const t = LOCALIZED_CONTENT[language as keyof typeof LOCALIZED_CONTENT] || LOCALIZED_CONTENT.en;

  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: null,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 5000);
    return () => clearTimeout(timer);
  }, [toast.show]);

  const triggerToast = (type: "success" | "error", title: string, message: string) => {
    setToast({ show: true, type, title, message });
  };

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
      gsap.from(".hero-img-animate", { scale: 0.95, opacity: 0, duration: 1.2, ease: "power2.out", delay: 0.4 });

      gsap.from(".service-header-animate", {
        scrollTrigger: { trigger: ".service-header-animate", start: "top 85%", toggleActions: "play none none none" },
        y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
      });

      gsap.from(".service-card-animate", {
        scrollTrigger: { trigger: "#services-list-container", start: "top 85%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out"
      });

      gsap.from(".form-info-animate", {
        scrollTrigger: { trigger: "#b2b-form", start: "top 80%", toggleActions: "play none none none" },
        x: -40, opacity: 0, duration: 0.9, ease: "power2.out"
      });

      gsap.from(".form-card-animate", {
        scrollTrigger: { trigger: "#b2b-form", start: "top 80%", toggleActions: "play none none none" },
        x: 40, opacity: 0, duration: 0.9, ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-slate-800 overflow-hidden">
      {/* Fixed Absolute Toast System */}
      <div className="fixed top-6 right-6 z-50 w-full max-w-sm pointer-events-auto" role="status" aria-live="polite">
        {toast.show && (
          <div className="overflow-hidden rounded-xl bg-white shadow-2xl border border-slate-200">
            <div className="flex items-start gap-3 p-4">
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-[#2CC1DA]" />
                ) : (
                  <div className="text-red-500 font-bold">✕</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">{toast.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{toast.message}</p>
              </div>
            </div>
            <div className="h-1 bg-slate-100">
              <div
                className={`h-full ${toast.type === "success" ? "bg-[#2CC1DA]" : "bg-red-500"}`}
                style={{ animation: "b2bToastCountdown 5s linear forwards" }}
              />
            </div>
          </div>
        )}
      </div>

      <Hero t={t} onScrollTo={handleScrollTo} />
      <CoreServices t={t} />
      <InquiryForm t={t} triggerToast={triggerToast} />

      <style jsx global>{`
        @keyframes b2bToastCountdown {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}