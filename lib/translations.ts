export type LanguageCode = "en" | "es" | "fr";

export const languageOptions = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
] as const satisfies ReadonlyArray<{ code: LanguageCode; label: string }>;

export const translations = {
  en: {
    navItems: [
      { label: "Home", href: "#home" },
      { label: "Destinations", href: "#destinations" },
      { label: "About Us", href: "#about" },
      { label: "Contact Us", href: "#contact" },
      { label: "Testimonials", href: "#testimonials" },
    ],
    navCta: "Contact Us",
    hero: {
      title: "Pack Your Bags, Let's Go Explore Somewhere Amazing",
      subtitle:
        "Hidden gems, breathtaking views, unforgettable adventures — where will you go next?",
      button: "Book Now",
    },
    about: {
      label: "/About Us",
      titleLead: "What's So Special",
      titleAccent: "About This?",
      description:
        "Save more on your trips with exclusive discounts, seasonal promotions, and unbeatable deals for unforgettable adventures.",
      button: "Learn More",
      cards: [
        {
          number: "01",
          title: "Everest Base Camp",
          description:
            "We don't just plan vacations; we create journeys tailored to your dreams, ensuring every moment is unforgettable.",
        },
        {
          number: "02",
          title: "Annapurna Circuit",
          description:
            "With our trusted local partners, you'll discover hidden spots and cultural experiences that most travelers never get to see.",
        },
        {
          number: "03",
          title: "Upper Mustang",
          description:
            "Step into the 'Forbidden Kingdom' to witness ancient monasteries and a landscape that feels like another planet.",
        },
        {
          number: "04",
          title: "Mardi Himal Trek",
          description:
            "A short, pristine trek providing spectacular face-to-face views of the sacred Machhapuchhre peak.",
        },
        {
          number: "05",
          title: "Annapurna Base Camp",
          description:
            "The ABC trek takes you deep into the Annapurna Sanctuary, surrounded by a 360-degree wall of giant peaks.",
        },
        {
          number: "06",
          title: "Chitwan Jungle Safari",
          description:
            "Trade the mountains for the jungle. Spot one-horned rhinos, tigers, and exotic birds on a safari adventure.",
        },
      ],
    },
    destinations: {
      label: "/Our Destination",
      title: "Your Next Favorite Place Awaits",
      description:
        "Get the best value for your trips with exclusive discounts, seasonal promotions, and deals to save while exploring the world!",
      button: "See All",
      items: [
        { id: 1, name: "Italy", count: "12 Destinations" },
        { id: 2, name: "Japan", count: "15 Destinations" },
        { id: 3, name: "Indonesia", count: "14 Destinations" },
        { id: 4, name: "Nepal", count: "18 Destinations" },
        { id: 5, name: "Switzerland", count: "9 Destinations" },
        { id: 6, name: "Maldives", count: "11 Destinations" },
      ],
    },
    topTours: {
      label: "/Top Tours",
      title: "Top Tours to Spark Your Wanderlust",
      description:
        "Explore our curated selection of must-visit destinations with complete detailed itineraries.",
      button: "Book Now",
      tours: [
        {
          id: 1,
          name: "Everest Base Camp",
          duration: "12 Days",
          price: "$1,200",
          desc: "Trek to the roof of the world.",
        },
        {
          id: 2,
          name: "Annapurna Circuit",
          duration: "14 Days",
          price: "$1,450",
          desc: "Experience diverse cultures and landscapes.",
        },
        {
          id: 3,
          name: "Langtang Valley",
          duration: "10 Days",
          price: "$950",
          desc: "The valley of glaciers awaits you.",
        },
      ],
    },
    whyChooseUs: {
      label: "Why Choose Us",
      titleLead: "Your Adventure",
      titleAccent: "Starts Here",
      description:
        "We go above and beyond to ensure your Nepal experience exceeds all expectations.",
      features: [
        {
          number: "01",
          title: "Expert Local Guides",
          description:
            "Our experienced guides are born and raised in Nepal, offering insider knowledge and authentic cultural experiences.",
        },
        {
          number: "02",
          title: "Safety First",
          description:
            "Your safety is our top priority. We maintain the highest safety standards and always prioritize secure travel arrangements.",
        },
        {
          number: "03",
          title: "Flexible Itineraries",
          description:
            "We customize every trip to match your preferences, ensuring a perfect balance of adventure and relaxation.",
        },
        {
          number: "04",
          title: "Unique Experiences",
          description:
            "From hidden temples to remote mountain villages, we take you beyond the typical tourist paths.",
        },
        {
          number: "05",
          title: "Best Value",
          description:
            "Competitive pricing with no hidden costs. We offer transparent pricing and exceptional quality for your money.",
        },
        {
          number: "06",
          title: "24/7 Support",
          description:
            "Round-the-clock support throughout your journey. We're always just a call away whenever you need assistance.",
        },
      ],
    },
    testimonials: {
      label: "/Testimonials",
      quote:
        "I've been on countless trips, but this one was different. Everything was perfectly organized, and the local insights made it truly unique.",
      highlight: "Can't wait for my next adventure!",
      name: "James Carter",
      title: "Travel Enthusiast",
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
      groups: {
        explore: ["Our Plans", "Top Tours", "Travel Guide", "Sustainability Commitment"],
        aboutUs: ["Our Story", "Testimonials", "Sustainability Commitment", "Careers"],
        support: ["FAQ", "Contact Us", "Booking Process", "Privacy Policy"],
      },
      copyright: "© 2025 Fantastic Adventure Nepal",
    },
  },
  es: {
    navItems: [
      { label: "Inicio", href: "#home" },
      { label: "Destinos", href: "#destinations" },
      { label: "Nosotros", href: "#about" },
      { label: "Contacto", href: "#contact" },
      { label: "Testimonios", href: "#testimonials" },
    ],
    navCta: "Contacto",
    hero: {
      title: "Haz la maleta y salgamos a explorar algo increíble",
      subtitle:
        "Joyas ocultas, vistas impresionantes y aventuras inolvidables: ¿a dónde irás después?",
      button: "Reservar ahora",
    },
    about: {
      label: "/Nosotros",
      titleLead: "¿Qué tiene de especial",
      titleAccent: "esto?",
      description:
        "Ahorra más en tus viajes con descuentos exclusivos, promociones de temporada y ofertas increíbles para aventuras inolvidables.",
      button: "Saber más",
      cards: [
        {
          number: "01",
          title: "Campo Base del Everest",
          description:
            "No solo planificamos vacaciones; creamos viajes adaptados a tus sueños para que cada momento sea inolvidable.",
        },
        {
          number: "02",
          title: "Circuito Annapurna",
          description:
            "Con nuestros socios locales de confianza descubrirás lugares ocultos y experiencias culturales que la mayoría de los viajeros nunca ve.",
        },
        {
          number: "03",
          title: "Upper Mustang",
          description:
            "Entra en el 'Reino Prohibido' para ver monasterios antiguos y un paisaje que parece de otro planeta.",
        },
        {
          number: "04",
          title: "Trek Mardi Himal",
          description:
            "Una caminata corta y pura con vistas espectaculares de frente al sagrado Machhapuchhre.",
        },
        {
          number: "05",
          title: "Campo Base Annapurna",
          description:
            "La ruta ABC te lleva al corazón del Santuario de Annapurna, rodeado por una pared de gigantes de 360 grados.",
        },
        {
          number: "06",
          title: "Safari por la selva de Chitwan",
          description:
            "Cambia las montañas por la jungla. Observa rinocerontes de un cuerno, tigres y aves exóticas en un safari.",
        },
      ],
    },
    destinations: {
      label: "/Nuestros destinos",
      title: "Tu próximo lugar favorito te espera",
      description:
        "Obtén el mejor valor para tus viajes con descuentos exclusivos, promociones de temporada y ofertas para ahorrar mientras exploras el mundo.",
      button: "Ver todo",
      items: [
        { id: 1, name: "Italia", count: "12 destinos" },
        { id: 2, name: "Japón", count: "15 destinos" },
        { id: 3, name: "Indonesia", count: "14 destinos" },
        { id: 4, name: "Nepal", count: "18 destinos" },
        { id: 5, name: "Suiza", count: "9 destinos" },
        { id: 6, name: "Maldivas", count: "11 destinos" },
      ],
    },
    topTours: {
      label: "/Mejores tours",
      title: "Tours destacados para despertar tus ganas de viajar",
      description:
        "Explora nuestra selección curada de destinos imprescindibles con itinerarios detallados.",
      button: "Reservar ahora",
      tours: [
        { id: 1, name: "Campo Base del Everest", duration: "12 días", price: "$1,200", desc: "Camina hasta el techo del mundo." },
        { id: 2, name: "Circuito Annapurna", duration: "14 días", price: "$1,450", desc: "Vive culturas y paisajes diversos." },
        { id: 3, name: "Valle de Langtang", duration: "10 días", price: "$950", desc: "El valle de los glaciares te espera." },
      ],
    },
    whyChooseUs: {
      label: "Por qué elegirnos",
      titleLead: "Tu aventura",
      titleAccent: "empieza aquí",
      description:
        "Vamos más allá para asegurarnos de que tu experiencia en Nepal supere todas las expectativas.",
      features: [
        { number: "01", title: "Guías locales expertos", description: "Nuestros guías nacieron y crecieron en Nepal y ofrecen conocimiento privilegiado y experiencias culturales auténticas." },
        { number: "02", title: "La seguridad es lo primero", description: "Tu seguridad es nuestra prioridad. Mantenemos los más altos estándares y priorizamos viajes seguros." },
        { number: "03", title: "Itinerarios flexibles", description: "Personalizamos cada viaje según tus preferencias para equilibrar aventura y descanso." },
        { number: "04", title: "Experiencias únicas", description: "Desde templos ocultos hasta aldeas remotas, te llevamos más allá de las rutas turísticas habituales." },
        { number: "05", title: "Mejor valor", description: "Precios competitivos sin costes ocultos. Ofrecemos transparencia y una calidad excepcional." },
        { number: "06", title: "Soporte 24/7", description: "Asistencia permanente durante todo tu viaje. Siempre estamos a una llamada de distancia." },
      ],
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
      groups: {
        explore: ["Nuestros planes", "Mejores tours", "Guía de viaje", "Compromiso con la sostenibilidad"],
        aboutUs: ["Nuestra historia", "Testimonios", "Compromiso con la sostenibilidad", "Carreras"],
        support: ["Preguntas frecuentes", "Contacto", "Proceso de reserva", "Política de privacidad"],
      },
      copyright: "© 2025 Fantastic Adventure Nepal",
    },
  },
  fr: {
    navItems: [
      { label: "Accueil", href: "#home" },
      { label: "Destinations", href: "#destinations" },
      { label: "À propos", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Témoignages", href: "#testimonials" },
    ],
    navCta: "Contact",
    hero: {
      title: "Faites vos valises, partons explorer quelque chose d'incroyable",
      subtitle:
        "Trésors cachés, vues à couper le souffle, aventures inoubliables - où irez-vous ensuite ?",
      button: "Réserver",
    },
    about: {
      label: "/À propos",
      titleLead: "Qu'est-ce qui est si spécial",
      titleAccent: "à propos de ça ?",
      description:
        "Économisez davantage sur vos voyages grâce à des réductions exclusives, des promotions saisonnières et des offres imbattables pour des aventures inoubliables.",
      button: "En savoir plus",
      cards: [
        { number: "01", title: "Camp de base de l'Everest", description: "Nous ne planifions pas seulement des vacances; nous créons des voyages adaptés à vos rêves pour que chaque instant soit inoubliable." },
        { number: "02", title: "Circuit de l'Annapurna", description: "Avec nos partenaires locaux de confiance, vous découvrirez des lieux cachés et des expériences culturelles que la plupart des voyageurs ne voient jamais." },
        { number: "03", title: "Upper Mustang", description: "Entrez dans le 'Royaume interdit' pour découvrir d'anciens monastères et un paysage qui semble venir d'une autre planète." },
        { number: "04", title: "Trek de Mardi Himal", description: "Une randonnée courte et pure offrant des vues spectaculaires de Machhapuchhre, la montagne sacrée." },
        { number: "05", title: "Camp de base de l'Annapurna", description: "Le trek ABC vous plonge au cœur du sanctuaire de l'Annapurna, entouré d'un mur de sommets géants à 360 degrés." },
        { number: "06", title: "Safari dans la jungle de Chitwan", description: "Troquez les montagnes contre la jungle. Observez des rhinocéros unicornes, des tigres et des oiseaux exotiques lors d'un safari." },
      ],
    },
    destinations: {
      label: "/Nos destinations",
      title: "Votre prochain endroit préféré vous attend",
      description:
        "Bénéficiez du meilleur rapport qualité-prix pour vos voyages avec des réductions exclusives, des promotions saisonnières et des offres pour économiser tout en explorant le monde.",
      button: "Tout voir",
      items: [
        { id: 1, name: "Italie", count: "12 destinations" },
        { id: 2, name: "Japon", count: "15 destinations" },
        { id: 3, name: "Indonésie", count: "14 destinations" },
        { id: 4, name: "Népal", count: "18 destinations" },
        { id: 5, name: "Suisse", count: "9 destinations" },
        { id: 6, name: "Maldives", count: "11 destinations" },
      ],
    },
    topTours: {
      label: "/Meilleures excursions",
      title: "Les meilleures excursions pour éveiller votre envie d'ailleurs",
      description:
        "Explorez notre sélection de destinations incontournables avec des itinéraires détaillés.",
      button: "Réserver",
      tours: [
        { id: 1, name: "Camp de base de l'Everest", duration: "12 jours", price: "$1,200", desc: "Marchez jusqu'au toit du monde." },
        { id: 2, name: "Circuit de l'Annapurna", duration: "14 jours", price: "$1,450", desc: "Vivez des cultures et des paysages variés." },
        { id: 3, name: "Vallée du Langtang", duration: "10 jours", price: "$950", desc: "La vallée des glaciers vous attend." },
      ],
    },
    whyChooseUs: {
      label: "Pourquoi nous choisir",
      titleLead: "Votre aventure",
      titleAccent: "commence ici",
      description:
        "Nous allons au-delà des attentes pour que votre expérience au Népal dépasse tout ce que vous imaginez.",
      features: [
        { number: "01", title: "Guides locaux experts", description: "Nos guides expérimentés sont nés et ont grandi au Népal, offrant une connaissance locale et des expériences authentiques." },
        { number: "02", title: "La sécurité avant tout", description: "Votre sécurité est notre priorité. Nous maintenons les normes les plus élevées et privilégions des arrangements sûrs." },
        { number: "03", title: "Itinéraires flexibles", description: "Nous personnalisons chaque voyage selon vos préférences pour trouver le bon équilibre entre aventure et détente." },
        { number: "04", title: "Expériences uniques", description: "Des temples cachés aux villages de montagne isolés, nous vous emmenons au-delà des sentiers touristiques classiques." },
        { number: "05", title: "Meilleur rapport qualité-prix", description: "Tarification compétitive sans frais cachés. Nous offrons une transparence totale et une qualité exceptionnelle." },
        { number: "06", title: "Assistance 24h/24, 7j/7", description: "Un support permanent tout au long de votre voyage. Nous sommes toujours joignables." },
      ],
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
      description: "Nous concevons des voyages inoubliables à travers les paysages du Népal.",
      social: ["Youtube", "Instagram", "Facebook"],
      groups: {
        explore: ["Nos offres", "Meilleures excursions", "Guide de voyage", "Engagement durable"],
        aboutUs: ["Notre histoire", "Témoignages", "Engagement durable", "Carrières"],
        support: ["FAQ", "Contact", "Processus de réservation", "Politique de confidentialité"],
      },
      copyright: "© 2025 Fantastic Adventure Nepal",
    },
  },
} as const;
