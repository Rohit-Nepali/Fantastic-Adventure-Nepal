"use client";

import Link from "next/link";
import { useLanguage } from "@/provider/Language";

export default function DocumentsClientView() {
  const { language } = useLanguage();

  // Bulletproof structure mapping for the three languages
  const content = {
    en: {
      title: "Documents and Preparation for Trekking in Nepal",
      sec1: "1. Necessary Documents",
      passportLabel: "Passport:",
      passportDesc: "Ensure it is valid for at least 6 months beyond the planned departure date.",
      insuranceLabel: "Travel Insurance:",
      insuranceDesc: "Comprehensive coverage that includes high-altitude trekking and emergency evacuation is required. A printed copy of the insurance details should be carried.",
      visaLabel: "Visa:",
      visaDesc: "A valid tourist visa for Nepal is necessary. This can be obtained upon arrival or in advance from a Nepalese embassy/consulate.",
      sec2: "2. Packing Recommendations",
      clothingLabel: "Clothing:",
      clothingDesc: "Include warm layers, moisture-wicking base layers, trekking pants, a down jacket, a waterproof/windproof jacket, gloves, and a hat.",
      footwearLabel: "Footwear:",
      footwearDesc: "Sturdy, preferably waterproof, trekking boots and comfortable socks are essential.",
      accLabel: "Accessories:",
      accDesc: "Sunglasses, sunscreen, trekking poles, a hat/cap, a reusable water bottle, and a headlamp.",
      packLabel: "Backpack:",
      packDesc: "A comfortable daypack for daily essentials, while main luggage will be carried by porters.",
      otherLabel: "Other Essentials:",
      otherDesc: "Personal medications, a basic first-aid kit, toiletries, and a power bank for charging electronic devices.",
      sec3: "3. Health and Safety Protocols",
      altitudeLabel: "Altitude Sickness Precautions:",
      altitudeDesc: "Trekking often involves high altitudes. Gradual ascent, hydration, and acclimatization days are recommended to minimize altitude sickness risks. Guides are trained to monitor and assist if symptoms arise.",
      vacLabel: "Vaccinations:",
      vacDesc: "Routine vaccines should be up-to-date. Additional vaccinations like Hepatitis A, Typhoid, and Rabies may be recommended—consult your healthcare provider.",
      covidLabel: "COVID-19 Measures:",
      covidDesc: "Adhere to local guidelines, including mask usage, hand sanitization, and maintaining social distancing where applicable.",
      contactBtn: "Contact Us",
      aboutBtn: "Learn about us"
    },
    es: {
      title: "Documentos y Preparación para el Trekking en Nepal",
      sec1: "1. Documentos Necesarios",
      passportLabel: "Pasaporte:",
      passportDesc: "Asegúrese de que sea válido por al menos 6 meses más allá de la fecha prevista de salida.",
      insuranceLabel: "Seguro de Viaje:",
      insuranceDesc: "Se requiere una cobertura integral que incluya trekking a gran altitud y evacuación de emergencia. Se debe llevar una copia impresa de los detalles del seguro.",
      visaLabel: "Visado:",
      visaDesc: "Es necesario un visado turístico válido para Nepal. Este se puede obtener a la llegada o con antelación en una embajada/consulado de Nepal.",
      sec2: "2. Recomendaciones de Equipaje",
      clothingLabel: "Ropa:",
      clothingDesc: "Incluya capas abrigadas, capas base que absorban la humedad, pantalones de trekking, una chaqueta de plumas, una chaqueta impermeable/cortavientos, guantes y un gorro.",
      footwearLabel: "Calzado:",
      footwearDesc: "Las botas de trekking resistentes, preferiblemente impermeables, y los calcetines cómodos son esenciales.",
      accLabel: "Accesorios:",
      accDesc: "Gafas de sol, protector solar, bastones de trekking, gorra/sombrero, una botella de agua reutilizable y un frontal.",
      packLabel: "Mochila:",
      packDesc: "Una mochila de día cómoda para los elementos esenciales diarios, mientras que el equipaje principal será llevado por los porteadores.",
      otherLabel: "Otros Elementos Esenciales:",
      otherDesc: "Medicamentos personales, un botiquín básico de primeros auxilios, artículos de tocador y un banco de energía para cargar dispositivos electrónicos.",
      sec3: "3. Protocolos de Salud y Seguridad",
      altitudeLabel: "Precauciones contra el Mal de Altura:",
      altitudeDesc: "El trekking a menudo implica grandes altitudes. Se recomienda un ascenso gradual, hidratación y días de aclimatación para minimizar los riesgos del mal de altura. Los guías están capacitados para monitorear y ayudar si surgen síntomas.",
      vacLabel: "Vacunas:",
      vacDesc: "Las vacunas de rutina deben estar al día. Se pueden recomendar vacunas adicionales como la Hepatitis A, la Tifoidea y la Rabia; consulte a su proveedor de atención médica.",
      covidLabel: "Medidas COVID-19:",
      covidDesc: "Adhiérase a las pautas locales, incluido el uso de mascarillas, la desinfección de manos y el mantenimiento del distanciamiento social donde corresponda.",
      contactBtn: "Contáctenos",
      aboutBtn: "Saber más sobre nosotros"
    },
    fr: {
      title: "Documents et Préparation pour le Trek au Népal",
      sec1: "1. Documents Nécessaires",
      passportLabel: "Passeport:",
      passportDesc: "Assurez-vous qu'il est valide pendant au moins 6 mois après la date de départ prévue.",
      insuranceLabel: "Assurance Voyage:",
      insuranceDesc: "Une couverture complète comprenant le trek en haute altitude et l'évacuation d'urgence est requise. Une copie imprimée des détails de l'assurance doit être transportée.",
      visaLabel: "Visa:",
      visaDesc: "Un visa de tourisme valide pour le Népal est nécessaire. Il peut être obtenu à l'arrivée ou à l'avance auprès d'une ambassade/un consulat du Népal.",
      sec2: "2. Recommandations de Bagages",
      clothingLabel: "Vêtements:",
      clothingDesc: "Incluez des couches chaudes, des sous-vêtements respirants, des pantalons de randonnée, une doudoune, une veste imperméable/coupe-vent, des gants et un bonnet.",
      footwearLabel: "Chaussures:",
      footwearDesc: "Des chaussures de randonnée robustes, de préférence imperméables, et des chaussettes confortables sont essentielles.",
      accLabel: "Accessoires:",
      accDesc: "Lunettes de soleil, crème solaire, bâtons de randonnée, chapeau/casquette, une bouteille d'eau réutilisable et une lampe frontale.",
      packLabel: "Sac à Dos:",
      packDesc: "Un sac à dos de jour confortable pour les effets personnels quotidiens, tandis que les bagages principaux seront transportés par des porteurs.",
      otherLabel: "Autres Essentiels:",
      otherDesc: "Médicaments personnels, une trousse de premiers soins de base, des articles de toilette et une batterie externe pour charger les appareils électroniques.",
      sec3: "3. Protocoles de Santé et Sécurité",
      altitudeLabel: "Précautions contre le Mal des Montagnes:",
      altitudeDesc: "Le trek implique souvent de hautes altitudes. Une ascension progressive, l'hydratation et des journées d'acclimatation sont recommandées pour minimiser les risques. Les guides sont formés pour surveiller et aider si des symptômes surviennent.",
      vacLabel: "Vaccins:",
      vacDesc: "Les vaccins de routine doivent être à jour. Des vaccins supplémentaires comme l'Hépatite A, la Typhoïde et la Rage peuvent être recommandés — consultez votre médecin.",
      covidLabel: "Mesures COVID-19:",
      covidDesc: "Respectez les directives locales, y compris l'utilisation de masques, la désinfection des mains et le maintien de la distanciation sociale le cas échéant.",
      contactBtn: "Contactez-nous",
      aboutBtn: "En savoir plus sur nous"
    }
  };

  const t = content[language] || content.en;

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">{t.title}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">{t.sec1}</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px]">
          <li>
            <strong>{t.passportLabel}</strong> {t.passportDesc}
          </li>
          <li>
            <strong>{t.insuranceLabel}</strong> {t.insuranceDesc}
          </li>
          <li>
            <strong>{t.visaLabel}</strong> {t.visaDesc}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">{t.sec2}</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px]">
          <li>
            <strong>{t.clothingLabel}</strong> {t.clothingDesc}
          </li>
          <li>
            <strong>{t.footwearLabel}</strong> {t.footwearDesc}
          </li>
          <li>
            <strong>{t.accLabel}</strong> {t.accDesc}
          </li>
          <li>
            <strong>{t.packLabel}</strong> {t.packDesc}
          </li>
          <li>
            <strong>{t.otherLabel}</strong> {t.otherDesc}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">{t.sec3}</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px]">
          <li>
            <strong>{t.altitudeLabel}</strong> {t.altitudeDesc}
          </li>
          <li>
            <strong>{t.vacLabel}</strong> {t.vacDesc}
          </li>
          <li>
            <strong>{t.covidLabel}</strong> {t.covidDesc}
          </li>
        </ul>
      </section>

      <div className="mt-10">
        <Link href="/contact" className="inline-block bg-accent text-white px-5 py-3 rounded-md">{t.contactBtn}</Link>
        <Link href="/about" className="ml-4 inline-block text-accent underline"> {t.aboutBtn}</Link>
      </div>
    </main>
  );
}