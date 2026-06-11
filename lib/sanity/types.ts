export type CmsImage = {
  url: string;
  alt?: string;
};

export type CategoryItem = {
  title: string;
  slug: string;
  description: string;
  image: CmsImage;
};

export type ReviewItem = {
  travelerName: string;
  country: string;
  review: string;
  rating: number;
  image?: CmsImage;
  featured?: boolean;
};

export type GalleryItem = {
  title: string;
  caption: string;
  image: CmsImage;
  tags: string[];
};

export type OfferItem = {
  title: string;
  description: string;
  highlights: string[];
};

export type PartnerContent = {
  title: string;
  description: string;
  services: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type WhyChooseItem = {
  title: string;
  description: string;
};

export type PlanTripOptionSets = {
  destinationOptions: string[];
  budgetRanges: string[];
  durationOptions: string[];
  referralSources: string[];
};

export type HomePageData = {
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
    cards: WhyChooseItem[];
  };
  categoriesIntro: {
    label: string;
    title: string;
    description: string;
  };
  categories: CategoryItem[];
  whyChooseUs: {
    label: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    features: WhyChooseItem[];
  };
  whatWeOffer: {
    label: string;
    title: string;
    description: string;
    items: OfferItem[];
  };
  partnerWithUs: PartnerContent;
  storiesInEveryFrame: {
    label: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  gallery: GalleryItem[];
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
  planTripOptions: PlanTripOptionSets;
};

export type SiteSettingsData = {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  socialLinks: Array<{ label: string; href: string }>;
  certifications: Array<{ title: string; caption?: string; image?: CmsImage }>;
};
