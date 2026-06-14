// types/index.ts
// Single source of truth for all data types across the app

// ─── Categories ────────────────────────────────────────────────────────────

// Used on homepage TravelCategories component — shape unchanged from before
export interface CategoryItem {
  label: string;
  teaser: string;
  image: string;
  href: string;
}

export interface ReviewItem {
  travelerName: string;
  country: string;
  review: string;
  rating: number;
  image?: {
    url: string;
    alt?: string;
  };
  imageAlt?: string;
  featured?: boolean;
}

export interface HomePageData {
  hero: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
  about: {
    label: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    buttonLabel: string;
    cards: {
      title: string;
      description: string;
    }[];
  };
  categoriesIntro: {
    label: string;
    title: string;
    description: string;
  };
  categories: {
    title: string;
    slug: { current: string };
    description: string;
    image: PackageImage;
  }[];
  whyChooseUs: {
    label: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    features: {
      title: string;
      description: string;
    }[];
  };
  whatWeOffer: {
    label: string;
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      highlights: string[];
    }[];
  };
  partnerWithUs: {
    title: string;
    description: string;
    services: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  storiesInEveryFrame: {
    label: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  gallery: {
    title: string;
    caption: string;
    tags: string[];
    image: PackageImage;
  }[];
  reviewsIntro: {
    label: string;
    title: string;
  };
  reviews: ReviewItem[];
  planYourTrip: {
    label: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    formTitle: string;
    submitLabel: string;
  };
  planTripOptions: {
    destinationOptions: string[];
    budgetRanges: string[];
    durationOptions: string[];
    referralSources: string[];
  };
}

export interface SiteSettingsData {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  socialLinks: {
    label: string;
    href: string;
  }[];
  certifications: {
    title: string;
    caption: string;
    image: PackageImage;
  }[];
}

export interface CategoriesSectionProps {
  data: {
    sectionTagline: string;
    heading: string;
    description: string;
    categories: CategoryItem[];
  };
}

// Used on listing page filter tabs
export interface Category {
  _id: string;
  label: string;
  slug: { current: string };
  teaser?: string;
  image?: string;
}

// ─── Packages ──────────────────────────────────────────────────────────────

export interface PackageCategory {
  _id: string;
  label: string;
  slug: { current: string };
}

export interface PackageImage {
  url: string;
  alt?: string;
}

// Used on listing page cards
export interface PackageCard {
  _id: string;
  title: string;
  slug: { current: string };
  shortIntro: string;
  price: number;
  duration: string;
  destination: string;
  difficulty: string;
  maxAltitude?: string;
  groupSize?: string;
  bestSeason?: string;
  accommodation?: string;
  rating?: number;
  isFeatured?: boolean;
  bannerImage: PackageImage;
  category: PackageCategory;
}

// Used on detail page
export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description?: string;
  elevation?: string;
  walkingHours?: string;
  distance?: string;
  meals?: string;
  accommodation?: string;
}

export interface EssentialInfoItem {
  title: string;
  body: unknown[]; // Portable Text blocks
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Departure {
  date: string;
  availability: "Available" | "Guaranteed" | "Full";
  price?: number;
}

export interface PackageDetail extends PackageCard {
  overview?: unknown[]; // Portable Text blocks
  transportation?: string;
  meals?: string;
  gallery?: PackageImage[];
  highlights?: string[];
  itinerary?: ItineraryDay[];
  costIncludes?: string[];
  costExcludes?: string[];
  essentialInfo?: EssentialInfoItem[];
  faqs?: FaqItem[];
  departures?: Departure[];
}

// ─── Gallery ───────────────────────────────────────────────────────────────

export interface GalleryItem {
  _id: string;
  title: string;
  caption?: string;
  tags?: string[];
  image: any;
  imageAlt?: string;
}