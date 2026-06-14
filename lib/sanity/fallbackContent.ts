import type { HomePageData, SiteSettingsData } from "@/lib/sanity/types";

export const fallbackSiteSettings: SiteSettingsData = {
  siteName: "Fantastic Adventure Nepal",
  contactEmail: "info@fantasticadventurenepal.com",
  contactPhone: "+977-1-5909976",
  officeAddress: "Thamel, Kathmandu 44600, Nepal",
  socialLinks: [
    { label: "Facebook", href: "#" },
    { label: "Youtube", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  certifications: [
    {
      title: "NATTA",
      caption: "Nepal Association of Tour & Travel Agents",
      image: {
        url: "/affiliation_logos/natta-logo-white-76452a92.png",
        alt: "NATTA logo",
      },
    },
    {
      title: "KEEP",
      caption: "Kathmandu Environmental Education Project",
      image: {
        url: "/affiliation_logos/KEEP_logo.jpg",
        alt: "KEEP logo",
      },
    },
    {
      title: "TAAN",
      caption: "Trekking Agents Association of Nepal",
      image: {
        url: "/affiliation_logos/taan-logo.jpg",
        alt: "TAAN logo",
      },
    },
  ],
};

export const fallbackHomePageData: HomePageData = {
  hero: {
    title: "Discover Nepal with Local Experts",
    subtitle:
      "Experience the breathtaking Himalayas, ancient cultures, vibrant festivals, and unforgettable adventures with Fantastic Adventure Nepal.",
    buttonLabel: "Plan Your Trip",
  },
  about: {
    label: "/About Us",
    titleLead: "Welcome to",
    titleAccent: "Fantastic Adventure Nepal",
    description:
      "Fantastic Adventure Nepal Pvt. Ltd. is a government-registered trekking, tour, and adventure company based in Kathmandu, creating meaningful journeys throughout Nepal, Tibet, and Bhutan.",
    buttonLabel: "Learn More",
    cards: [
      {
        title: "Local Himalayan Experts",
        description:
          "Founded by passionate tourism professionals with years of experience in Himalayan trekking and travel management.",
      },
      {
        title: "Licensed Professional Team",
        description:
          "Our licensed guides and dedicated operations team ensure every journey is organized, safe, and rewarding.",
      },
      {
        title: "Tailor-Made Journeys",
        description:
          "From private escapes to group departures, itineraries are customized around your interests, comfort, and pace.",
      },
      {
        title: "Responsible Tourism",
        description:
          "We champion responsible travel practices that support local communities and protect Nepal's natural heritage.",
      },
      {
        title: "24/7 Travel Support",
        description:
          "Our team remains available from arrival to departure with responsive, practical support.",
      },
      {
        title: "Safety-First Operations",
        description:
          "We monitor weather, routes, and logistics closely so travelers can explore confidently.",
      },
    ],
  },
  categoriesIntro: {
    label: "Travel Categories",
    title: "Explore Nepal Your Way",
    description:
      "Every traveler is unique, and so is every journey. Choose from a wide range of travel experiences built around your interests.",
  },
  categories: [
    {
      title: "Trekking Adventures",
      slug: { current: "trekking-adventures" },
      description:
        "Walk through spectacular Himalayan landscapes, remote mountain villages, and world-famous trails.",
      image: {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        alt: "Himalayan trekking route",
      },
    },
    {
      title: "Cultural & Heritage Tours",
      slug: { current: "cultural-heritage-tours" },
      description:
        "Discover UNESCO sites, temples, and centuries-old living traditions across Nepal.",
      image: {
        url: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=85",
        alt: "Heritage square in Nepal",
      },
    },
    {
      title: "Wildlife & Jungle Safari",
      slug: { current: "wildlife-jungle-safari" },
      description:
        "Experience the biodiversity of Chitwan and Bardia national parks with expert naturalists.",
      image: {
        url: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1200&q=85",
        alt: "Rhino in Nepal safari",
      },
    },
    {
      title: "Peak Climbing & Mountaineering",
      slug: { current: "peak-climbing-mountaineering" },
      description:
        "Take on Nepal's iconic trekking peaks with professional climbing support.",
      image: {
        url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=85",
        alt: "Climber on snow ridge",
      },
    },
    {
      title: "Adventure Sports",
      slug: { current: "adventure-sports" },
      description:
        "Add adrenaline with rafting, canyoning, paragliding, bungee, and mountain biking.",
      image: {
        url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=85",
        alt: "Whitewater rafting in Nepal",
      },
    },
    {
      title: "Luxury Holidays",
      slug: { current: "luxury-holidays" },
      description:
        "Travel in comfort with premium stays, curated experiences, and personalized service.",
      image: {
        url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=85",
        alt: "Luxury mountain stay",
      },
    },
    {
      title: "Festival & Spiritual Journeys",
      slug: { current: "festival-spiritual-journeys" },
      description:
        "Immerse in sacred sites, colorful festivals, monasteries, and spiritual traditions.",
      image: {
        url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85",
        alt: "Festival and spiritual rituals in Nepal",
      },
    },
  ],
  whyChooseUs: {
    label: "Why Choose Us",
    titleLead: "Your Adventure",
    titleAccent: "Starts Here",
    description:
      "We combine local expertise with global standards to deliver authentic Himalayan travel experiences.",
    features: [
      {
        title: "Local Knowledge, Global Standards",
        description:
          "We know Nepal beyond the guidebooks while maintaining international service quality.",
        },
      {
        title: "Personalized Travel Experiences",
        description:
          "Every itinerary is crafted around interests, fitness, travel style, and budget.",
      },
      {
        title: "Experienced Team",
        description:
          "Licensed guides and skilled operations staff support each stage of your journey.",
      },
      {
        title: "Commitment to Safety",
        description:
          "Safety-led trekking and travel operations with proactive route and weather monitoring.",
      },
      {
        title: "Responsible Tourism",
        description:
          "We work with local communities and partners to support sustainable tourism development.",
      },
      {
        title: "Trusted Value",
        description:
          "Transparent pricing and dependable service designed for meaningful long-term travel memories.",
      },
    ],
  },
  whatWeOffer: {
    label: "What We Offer",
    title: "Travel Designed Around You",
    description:
      "From independent travelers to group partners, we design journeys aligned to each traveler's needs.",
    items: [
      {
        title: "FIT Travelers",
        description:
          "Travel at your own pace with private, flexible itineraries customized exclusively for you.",
        highlights: ["Independent travelers", "Couples", "Honeymooners", "Adventure seekers"],
      },
      {
        title: "Group Tours",
        description:
          "Join expertly guided tours blending culture, adventure, and excellent logistical support.",
        highlights: ["Friends and groups", "Educational institutions", "Corporate groups", "Tour operators"],
      },
      {
        title: "Family Adventures",
        description:
          "Family-friendly journeys balancing adventure, comfort, and safety for all age groups.",
        highlights: ["Easy hikes", "Wildlife safaris", "Cultural sightseeing", "Scenic mountain experiences"],
      },
      {
        title: "Curated Experiences",
        description:
          "Go beyond classic itineraries with immersive and carefully designed specialty travel programs.",
        highlights: ["Festival journeys", "Wellness retreats", "Luxury escapes", "Community encounters"],
      },
      {
        title: "Solo Travelers",
        description:
          "Travel independently with structured support, local expertise, and confidence.",
        highlights: ["Personalized support", "Flexible itineraries", "Secure arrangements", "Local expert guides"],
      },
    ],
  },
  partnerWithUs: {
    title: "Partner with Fantastic Adventure Nepal",
    description:
      "As a Kathmandu-based DMC, we provide dependable ground handling, itinerary development, and operational delivery for global travel partners.",
    services: [
      "Ground handling services",
      "Customized itinerary development",
      "Trekking and tour operations",
      "Group travel management",
      "Hotel reservations and transport",
      "Permit, guide, and porter coordination",
      "Airport assistance",
    ],
    ctaLabel: "Start a Partnership Inquiry",
    ctaHref: "/contact",
  },
  storiesInEveryFrame: {
    label: "Stories In Every Frame",
    title: "Moments That Define the Journey",
    description:
      "Through our travelers and guides, experience landscapes, traditions, and encounters that capture Nepal's spirit.",
    ctaLabel: "Explore the Gallery",
    ctaHref: "/culture-tour",
  },
  gallery: [
    {
      title: "Prayer Flags Above the Ridge",
      caption: "A high mountain pass where wind, color, and silence meet.",
      tags: ["himalayas", "trekking", "landscape"],
      image: {
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85",
        alt: "Prayer flags in the Himalayas",
      },
    },
    {
      title: "Heritage Courtyards",
      caption: "Timeless temples and living culture in Kathmandu Valley.",
      tags: ["heritage", "culture", "city"],
      image: {
        url: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1600&q=85",
        alt: "Temple courtyard in Nepal",
      },
    },
    {
      title: "Jungle Encounters",
      caption: "Wildlife moments from Nepal's protected lowland ecosystems.",
      tags: ["wildlife", "safari", "nature"],
      image: {
        url: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1600&q=85",
        alt: "Wildlife safari in Nepal",
      },
    },
  ],
  reviewsIntro: {
    label: "/Traveler Reviews",
    title: "Hear From Our Travelers",
  },
  reviews: [
    {
      travelerName: "Emma Johnson",
      country: "United Kingdom",
      review:
        "Everything was handled seamlessly, from airport pickup to trekking logistics. The local insights made our journey unforgettable.",
      rating: 5,
      featured: true,
    },
    {
      travelerName: "Carlos Rivera",
      country: "Spain",
      review:
        "Our cultural tour was deeply immersive and beautifully paced. We felt welcomed at every stop.",
      rating: 5,
      featured: true,
    },
    {
      travelerName: "Aisha Noor",
      country: "UAE",
      review:
        "Professional guides, excellent communication, and strong safety practices throughout our family trip.",
      rating: 4,
    },
    {
      travelerName: "Luca Martin",
      country: "France",
      review:
        "The custom itinerary matched our preferences perfectly. Nepal felt both adventurous and comfortable.",
      rating: 5,
    },
  ],
  planYourTrip: {
    label: "/Plan Your Trip",
    titleLead: "Plan Your",
    titleAccent: "Nepal Journey",
    description:
      "Share your travel preferences and our local team will help design the right experience for your timeline and budget.",
    formTitle: "Trip Inquiry Form",
    submitLabel: "Submit Inquiry",
  },
  planTripOptions: {
    destinationOptions: [
      "Everest Region",
      "Annapurna Region",
      "Langtang Region",
      "Manaslu Region",
      "Kathmandu Valley",
      "Chitwan & Bardia",
      "Nepal-Tibet-Bhutan Circuit",
      "Custom Destination",
    ],
    budgetRanges: [
      "Under USD 1,000",
      "USD 1,000 - 2,500",
      "USD 2,500 - 5,000",
      "USD 5,000+",
    ],
    durationOptions: [
      "3-5 Days",
      "6-9 Days",
      "10-14 Days",
      "15+ Days",
      "Flexible",
    ],
    referralSources: [
      "Google Search",
      "Social Media",
      "Friend / Family",
      "Travel Agency",
      "Returning Traveler",
      "Other",
    ],
  },
};
