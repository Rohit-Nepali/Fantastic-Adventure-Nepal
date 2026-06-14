export type LanguageCode = "en" | "es" | "fr";

export const languageOptions = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
] as const satisfies ReadonlyArray<{ code: LanguageCode; label: string }>;

export function getSafe<T extends keyof typeof translations.en>(
  key: T,
  language: LanguageCode,
  fallback?: Partial<typeof translations.en[T]>
): typeof translations.en[T] {
  const enVal = translations.en[key];
  const langVal = (translations[language] as Partial<typeof translations.en>)?.[key];
  if (langVal === undefined) return enVal;
  return (langVal ?? fallback ?? enVal) as typeof translations.en[T];
}

export const translations = {
  en: {
    navItems: [
      { label: "Home", href: "/" },
      { label: "Tours & Packages", href: "/packages" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Plan Your Trip", href: "/planYourTrip" },
      { label: "Contact Us", href: "/contact" },
    ],
    navCta: "Plan Your Trip",
    hero: {
      title: "Pack Your Bags, Let's Go Explore",
      subtitle:
        "Experience the breathtaking Himalayas, ancient cultures, vibrant festivals, and unforgettable adventures with Fantastic Adventure Nepal.\n\nWhether you're seeking high-altitude adventure, spiritual discovery, or a family holiday, our experienced local team designs journeys that combine safety, authenticity, and exceptional service.",
      button: "Plan Your Trip",
    },
    planYourTrip: {
      title: "Plan Your Trip",
      description: "Tell us about your dream adventure in Nepal, and our travel experts will create a personalized itinerary tailored to your interests, budget, and travel dates.",
      submitBtn: "Submit Plan Details",
      sections: {
        tripInfo: "Trip Information",
        personalInfo: "Personal Information",
        additionalDetails: "Additional Details",
      },
      fields: {
        tripName: "Trip Name / Destination",
        tripNamePlaceholder: "e.g., Everest Base Camp Trek, Annapurna Base Camp Trek, Nepal Cultural Tour",
        budgetRange: "Estimated Budget Range",
        budgetPlaceholder: "Select your estimated budget range",
        numberOfTravelers: "Number of Travelers",
        travelersPlaceholder: "Select group size",
        travelDate: "Preferred Travel Date",
        duration: "Trip Duration (Days)",
        fullName: "Full Name",
        fullNamePlaceholder: "John Doe",
        whatsAppNumber: "WhatsApp Number",
        whatsAppPlaceholder: "+1 234 567 890",
        emailAddress: "Email Address",
        emailPlaceholder: "john@example.com",
        streetAddress: "Street Address",
        streetPlaceholder: "123 Adventure St",
        country: "Country of Residence",
        countryPlaceholder: "e.g., United States",
        referral: "How Did You Hear About Us?",
        referralPlaceholder: "Select an option",
        specialRequirements: "Special Requirements",
        specialRequirementsPlaceholder: "Please mention dietary preferences, accommodation preferences, fitness level, travel interests, or any special requests.",
        comments: "Comments or Message",
        commentsPlaceholder: "Any additional notes or questions for our team...",
      },
      options: {
        budgets: ["Under $500", "$500 – $1,000", "$1,000 – $2,000", "$2,000 – $5,000", "Above $5,000"],
        travelers: ["Solo Traveler", "2 People", "3–5 People", "6–10 People", "10+ People"],
        referrals: ["Google Search", "Facebook", "Instagram", "YouTube", "Friend / Family Recommendation", "Travel Agency", "Previous Customer", "Other"],
      },
    },
    contact: {
      label: "/Contact Us",
      titleLead: "Let's Plan Your",
      titleAccent: "Perfect Adventure",
      description:
        "Ready to start your Nepal adventure? Get in touch and let our expert team craft the journey of a lifetime for you.",
      info: [
        { label: "Our Office", lines: ["Thamel, Kathmandu 44600", "Nepal"] },
        { label: "Phone", lines: ["+977 1 2345678", "+977 9841234567"] },
        {
          label: "Email",
          lines: ["info@fantasticadventurenepal.com", "bookings@fantasticadventurenepal.com"],
        },
      ],
      form: {
        header: "Send Us a Message",
        name: "Full Name *",
        email: "Email Address *",
        phone: "Phone Number",
        destination: "Destination",
        message: "Your Message *",
        namePlaceholder: "John Doe",
        emailPlaceholder: "john@example.com",
        phonePlaceholder: "+977 98XXXXXXXX",
        destinationPlaceholder: "Select a destination",
        messagePlaceholder: "Tell us about your dream adventure...",
        submit: "Send Message",
        options: [
          { value: "kathmandu", label: "Kathmandu Valley" },
          { value: "pokhara", label: "Pokhara" },
          { value: "chitwan", label: "Chitwan National Park" },
          { value: "everest", label: "Everest Base Camp" },
          { value: "annapurna", label: "Annapurna Region" },
          { value: "other", label: "Other" },
        ],
      },
    },
    footer: {
      ctaLead: "Pack Your Bags, Your",
      ctaAccent: "Adventure Awaits!",
      ctaButton: "Book a Vacation",
      description: "Crafting unforgettable journeys through Nepal's landscapes.",
      social: ["Youtube", "Instagram", "Facebook"],
      groupLabels: {
        explore: "Explore",
        aboutUs: "About Us",
        support: "Support",
      },
      groups: {
        explore: [
          { label: "Our Plans", href: "/packages" },
          { label: "Top Tours", href: "/packages" },
          { label: "Travel Guide", href: "/planYourTrip" },
        ],
        aboutUs: [
          { label: "Testimonials", href: "/testimonials" },
          { label: "Careers", href: "/contact" },
        ],
        support: [
          { label: "FAQ", href: "/contact" },
          { label: "Contact Us", href: "/contact" },
          { label: "Booking Process", href: "/contact" },
          { label: "Privacy Policy", href: "/contact" },
        ],
      },
      copyright: "© 2025 Fantastic Adventure Nepal",
    },
    topTours: {
      label: "Top Tours",
      title: "Featured Journeys",
      description: "Hand-picked adventures across Nepal's landscapes.",
      button: "View Details",
      tours: [
        { id: "everest", name: "Everest Base Camp Trek", duration: "14 Days", price: "$1,299", desc: "Iconic trek to the roof of the world" },
        { id: "annapurna", name: "Annapurna Circuit", duration: "12 Days", price: "$999", desc: "Diverse trails through the Annapurna range" },
        { id: "langtang", name: "Langtang Valley", duration: "8 Days", price: "$799", desc: "Short yet spectacular mountain adventure" }
      ]
    },
    packageTabs: {
      overview: "Overview",
      itinerary: "Itinerary",
      cost: "Cost",
      includes: "Cost Includes",
      excludes: "Cost Excludes",
      essential: "Essential Information",
      departures: "Fixed Departures",
      faqs: "FAQs",
      joinDeparture: "Join Departure",
    },
  notFound: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      button: "Go Back Home",
    },
  },
  es: {
    navItems: [
      { label: "Inicio", href: "/" },
      { label: "Tours y Paquetes", href: "/packages" },
      { label: "Testimonios", href: "/testimonials" },
      { label: "Planifica Tu Viaje", href: "/planYourTrip" },
      { label: "Contacto", href: "/contact" },
    ],
    navCta: "Planifica Tu Viaje",
    hero: {
      title: "Haz la maleta y salgamos a explorar algo increíble",
      subtitle:
        "Descubre los impresionantes Himalayas, culturas ancestrales, festivales vibrantes y aventuras inolvidables con Fantastic Adventure Nepal. \n\nYa sea que busques una aventura de alta montaña, un viaje espiritual o unas vacaciones en familia, nuestro experimentado equipo local diseña recorridos que combinan seguridad, autenticidad y un servicio excepcional.",
      button: "Reservar ahora",
    },
    planYourTrip: {
      title: "Planifica tu Viaje",
      description: "Cuéntanos sobre la aventura de tus sueños en Nepal y nuestros expertos en viajes crearán un itinerario personalizado adaptado a tus intereses, presupuesto y fechas de viaje.",
      submitBtn: "Enviar detalles del plan",
      sections: {
        tripInfo: "Información del Viaje",
        personalInfo: "Información Personal",
        additionalDetails: "Detalles Adicionales",
      },
      fields: {
        tripName: "Nombre del Viaje / Destino",
        tripNamePlaceholder: "Ej: Trek del Campamento Base del Everest, Trek del Campamento Base del Annapurna",
        budgetRange: "Rango de Presupuesto Estimado",
        budgetPlaceholder: "Selecciona tu rango de presupuesto estimado",
        numberOfTravelers: "Número de Viajeros",
        travelersPlaceholder: "Selecciona el tamaño del grupo",
        travelDate: "Fecha de Viaje Preferida",
        duration: "Duración del Viaje (Días)",
        fullName: "Nombre Completo",
        fullNamePlaceholder: "Juan Pérez",
        whatsAppNumber: "Número de WhatsApp",
        whatsAppPlaceholder: "+34 600 000 000",
        emailAddress: "Correo Electrónico",
        emailPlaceholder: "juan@ejemplo.com",
        streetAddress: "Dirección",
        streetPlaceholder: "Calle Aventura 123",
        country: "País de Residencia",
        countryPlaceholder: "Ej: España",
        referral: "¿Cómo te enteraste de nosotros?",
        referralPlaceholder: "Selecciona una opción",
        specialRequirements: "Requisitos Especiales",
        specialRequirementsPlaceholder: "Por favor, menciona preferencias dietéticas, de alojamiento, nivel de condición física, intereses de viaje o cualquier solicitud especial.",
        comments: "Comentarios o Mensaje",
        commentsPlaceholder: "Cualquier nota adicional o pregunta para nuestro equipo...",
      },
      options: {
        budgets: ["Menos de $500", "$500 – $1,000", "$1,000 – $2,000", "$2,000 – $5,000", "Más de $5,000"],
        travelers: ["Viajero Solo", "2 Personas", "3–5 Personas", "6–10 Personnes", "10+ Personas"],
        referrals: ["Búsqueda en Google", "Facebook", "Instagram", "YouTube", "Recomendación de Amigos / Familia", "Agencia de Viajes", "Cliente Anterior", "Otro"],
      },
    },
    testimonials: {
      label: "/Testimonios",
      quote:
        "He hecho muchos viajes, pero este fue distinto. Todo estuvo perfectamente organizado y la perspectiva local lo hizo realmente único.",
      highlight: "¡Ya quiero mi próxima aventura!",
      name: "James Carter",
      title: "Entusiasta de los viajes",
    },
    contact: {
      label: "/Contacto",
      titleLead: "Planifiquemos tu",
      titleAccent: "aventura perfecta",
      description:
        "¿Listo para comenzar tu aventura por Nepal? Ponte en contacto y deja que nuestro equipo diseñe el viaje de tu vida.",
      info: [
        { label: "Nuestra oficina", lines: ["Thamel, Kathmandu 44600", "Nepal"] },
        { label: "Teléfono", lines: ["+977 1 2345678", "+977 9841234567"] },
        { label: "Correo", lines: ["info@fantasticadventurenepal.com", "bookings@fantasticadventurenepal.com"] },
      ],
      form: {
        header: "Envíanos un mensaje",
        name: "Nombre completo *",
        email: "Correo electrónico *",
        phone: "Número de teléfono",
        destination: "Destino",
        message: "Tu mensaje *",
        namePlaceholder: "Juan Pérez",
        emailPlaceholder: "juan@ejemplo.com",
        phonePlaceholder: "+977 98XXXXXXXX",
        destinationPlaceholder: "Selecciona un destino",
        messagePlaceholder: "Cuéntanos sobre la aventura de tus sueños...",
        submit: "Enviar mensaje",
        options: [
          { value: "kathmandu", label: "Valle de Kathmandu" },
          { value: "pokhara", label: "Pokhara" },
          { value: "chitwan", label: "Parque Nacional de Chitwan" },
          { value: "everest", label: "Campo Base del Everest" },
          { value: "annapurna", label: "Región de Annapurna" },
          { value: "other", label: "Otro" },
        ],
      },
    },
    footer: {
      ctaLead: "Haz la maleta, tu",
      ctaAccent: "aventura te espera",
      ctaButton: "Reservar vacaciones",
      description: "Creamos viajes inolvidables a través de los paisajes de Nepal.",
      social: ["Youtube", "Instagram", "Facebook"],
      groupLabels: {
        explore: "Explorar",
        aboutUs: "Nosotros",
        support: "Soporte",
      },
      groups: {
        explore: [
          { label: "Nuestros planes", href: "/packages" },
          { label: "Mejores tours", href: "/packages" },
          { label: "Guía de viaje", href: "/planYourTrip" },
        ],
        aboutUs: [
          { label: "Testimonios", href: "/testimonials" },
          { label: "Carreras", href: "/contact" },
        ],
        support: [
          { label: "Preguntas frecuentes", href: "/contact" },
          { label: "Contacto", href: "/contact" },
          { label: "Proceso de reserva", href: "/contact" },
          { label: "Política de privacidad", href: "/contact" },
        ],
      },
      copyright: "© 2025 Fantastic Adventure Nepal",
    },
    topTours: {
      label: "Mejores Tours",
      title: "Viajes Destacados",
      description: "Aventuras seleccionadas a través de los paisajes de Nepal.",
      button: "Ver Detalles",
      tours: [
        { id: "everest", name: "Trek Campamento Base del Everest", duration: "14 Días", price: "$1,299", desc: "Trek icónico hacia el techo del mundo" },
        { id: "annapurna", name: "Circuito Annapurna", duration: "12 Días", price: "$999", desc: "Senderos diversos a través del rango Annapurna" },
        { id: "langtang", name: "Valle Langtang", duration: "8 Días", price: "$799", desc: "Aventura de montaña corta pero espectacular" }
      ]
    },
    packageTabs: {
      overview: "Resumen",
      itinerary: "Itinerario",
      cost: "Costo",
      includes: "Incluye el costo",
      excludes: "Excluye el costo",
      essential: "Información esencial",
      departures: "Salidas fijas",
      faqs: "Preguntas frecuentes",
      joinDeparture: "Unirse a la salida",
    },
    notFound: {
      title: "Página No Encontrada",
      description: "La página que buscas no existe o se ha movido.",
      button: "Volver al Inicio",
    },
  },
  fr: {
    navItems: [
      { label: "Accueil", href: "/" },
      { label: "Circuits & Forfaits", href: "/packages" },
      { label: "Témoignages", href: "/testimonials" },
      { label: "Planifiez Votre Voyage", href: "/planYourTrip" },
      { label: "Contact", href: "/contact" },
    ],
    navCta: "Planifiez Votre Voyage",
    hero: {
      title: "Faites vos valises, partons explorer quelque chose d'incroyable",
      subtitle:
        "Découvrez les majestueux Himalayas, des cultures ancestrales, des festivals colorés et des aventures inoubliables avec Fantastic Adventure Nepal.\n\nQue vous recherchiez une aventure en haute altitude, une découverte spirituelle ou des vacances en famille, notre équipe locale expérimentée conçoit des voyages alliant sécurité, authenticité et qualité de service exceptionnelle.",
      button: "Réserver",
    },
    planYourTrip: {
      title: "Planifiez Votre Voyage",
      description: "Parlez-nous de l'aventure de vos rêves au Népal, et nos experts en voyage créeront un itinéraire personnalisé adapté à vos intérêts, votre budget et vos dates de voyage.",
      submitBtn: "Soumettre les détails",
      sections: {
        tripInfo: "Informations sur le Voyage",
        personalInfo: "Informations Personnelles",
        additionalDetails: "Détails Supplémentaires",
      },
      fields: {
        tripName: "Nom du Voyage / Destination",
        tripNamePlaceholder: "Ex: Trek du camp de base de l'Everest, Trek du camp de base de l'Annapurna",
        budgetRange: "Budget Estimé",
        budgetPlaceholder: "Sélectionnez votre tranche de budget",
        numberOfTravelers: "Nombre de Voyageurs",
        travelersPlaceholder: "Sélectionnez la taille du groupe",
        travelDate: "Date de Voyage Préférée",
        duration: "Durée du Voyage (Jours)",
        fullName: "Nom Complet",
        fullNamePlaceholder: "Jean Dupont",
        whatsAppNumber: "Numéro WhatsApp",
        whatsAppPlaceholder: "+33 6 1234 5678",
        emailAddress: "Adresse E-mail",
        emailPlaceholder: "jean@exemple.com",
        streetAddress: "Adresse",
        streetPlaceholder: "123 Rue de l'Aventure",
        country: "Pays de Résidence",
        countryPlaceholder: "Ex: France",
        referral: "Comment avez-vous entendu parler de nous?",
        referralPlaceholder: "Sélectionnez une option",
        specialRequirements: "Exigences Particulières",
        specialRequirementsPlaceholder: "Veuillez mentionner vos préférences alimentaires, d'hébergement, votre niveau de forme physique ou d'autres demandes spéciales.",
        comments: "Commentaires ou Message",
        commentsPlaceholder: "Notes supplémentaires ou questions pour notre équipe...",
      },
      options: {
        budgets: ["Moins de 500 $", "500 $ – 1 000 $", "1 000 $ – 2 000 $", "2 000 $ – 5 000 $", "Plus de 5 000 $"],
        travelers: ["Voyageur Solo", "2 Personnes", "3–5 Personnes", "6–10 Personnes", "10+ Personnes"],
        referrals: ["Recherche Google", "Facebook", "Instagram", "YouTube", "Recommandation d'amis / famille", "Agence de Voyage", "Ancien Client", "Autre"],
      },
    },
    testimonials: {
      label: "/Témoignages",
      quote:
        "J'ai fait d'innombrables voyages, mais celui-ci était différent. Tout était parfaitement organisé et les conseils locaux l'ont rendu vraiment unique.",
      highlight: "Vivement ma prochaine aventure !",
      name: "James Carter",
      title: "Passionné de voyage",
    },
    contact: {
      label: "/Contact",
      titleLead: "Planifions votre",
      titleAccent: "aventure parfaite",
      description:
        "Prêt à commencer votre aventure au Népal ? Contactez-nous et laissez notre équipe concevoir le voyage d'une vie.",
      info: [
        { label: "Notre bureau", lines: ["Thamel, Kathmandu 44600", "Népal"] },
        { label: "Téléphone", lines: ["+977 1 2345678", "+977 9841234567"] },
        { label: "E-mail", lines: ["info@fantasticadventurenepal.com", "bookings@fantasticadventurenepal.com"] },
      ],
      form: {
        header: "Envoyez-nous un message",
        name: "Nom complet *",
        email: "Adresse e-mail *",
        phone: "Numéro de téléphone",
        destination: "Destination",
        message: "Votre message *",
        namePlaceholder: "Jean Dupont",
        emailPlaceholder: "jean@exemple.com",
        phonePlaceholder: "+977 98XXXXXXXX",
        destinationPlaceholder: "Sélectionnez une destination",
        messagePlaceholder: "Parlez-nous de l'aventure de vos rêves...",
        submit: "Envoyer le message",
        options: [
          { value: "kathmandu", label: "Vallée de Kathmandu" },
          { value: "pokhara", label: "Pokhara" },
          { value: "chitwan", label: "Parc national de Chitwan" },
          { value: "everest", label: "Camp de base de l'Everest" },
          { value: "annapurna", label: "Région de l'Annapurna" },
          { value: "other", label: "Autre" },
        ],
      },
    },
    footer: {
      ctaLead: "Faites vos valises, votre",
      ctaAccent: "aventure vous attend",
      ctaButton: "Réserver un voyage",
      description: "We design unforgettable journeys across Nepal's landscapes.",
      social: ["Youtube", "Instagram", "Facebook"],
      groupLabels: {
        explore: "Explorer",
        aboutUs: "À propos",
        support: "Assistance",
      },
      groups: {
        explore: [
          { label: "Nos offres", href: "/packages" },
          { label: "Meilleures excursions", href: "/packages" },
          { label: "Guide de voyage", href: "/planYourTrip" },
        ],
        aboutUs: [
          { label: "Témoignages", href: "/testimonials" },
          { label: "Carrières", href: "/contact" },
        ],
        support: [
          { label: "FAQ", href: "/contact" },
          { label: "Contact", href: "/contact" },
          { label: "Processus de réservation", href: "/contact" },
          { label: "Politique de confidentialité", href: "/contact" },
        ],
      },
      copyright: "© 2025 Fantastic Adventure Nepal",
    },
    topTours: {
      label: "Top Tours",
      title: "Voyages Sélectionnés",
      description: "Aventures choisies à travers les paysages du Népal.",
      button: "Voir Détails",
      tours: [
        { id: "everest", name: "Trek Camp de Base de l'Everest", duration: "14 Jours", price: "$1,299", desc: "Trek iconique vers le toit du monde" },
        { id: "annapurna", name: "Circuit de l'Annapurna", duration: "12 Jours", price: "$999", desc: "Sentiers divers à travers le massif de l'Annapurna" },
        { id: "langtang", name: "Vallée de Langtang", duration: "8 Jours", price: "$799", desc: "Aventure de montagne courte mais spectaculaire" }
      ]
    },
    packageTabs: {
      overview: "Vue d'ensemble",
      itinerary: "Itinéraire",
      cost: "Coût",
      includes: "Le coût comprend",
      excludes: "Le coût exclut",
      essential: "Informations essentielles",
      departures: "Départs fixes",
      faqs: "FAQ",
      joinDeparture: "Rejoindre le départ",
    },
    notFound: {
      title: "Page Non Trouvée",
      description: "La page que vous recherchez n'existe pas ou a été déplacée.",
      button: "Retour à l'Accueil",
    },
  },
} as const;