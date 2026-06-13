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