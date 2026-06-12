import { groq } from "next-sanity";

export const aboutUsQuery = groq`*[_type == "aboutUs"][0]{
  title,
  subtitle,
  description,
  closingLine,
  whyTravelWithUs[]{
    label,
    icon{ asset->{ url }, alt }
  },
  images[]{
    asset->{ url },
    alt
  }
}`

export const whyChooseUsQuery = groq` *[_type == "whyChooseUs"][0]{
    label,
    title,
    description,
    features[]{
      title,
      description,
      iconName
    }
  }`

const imageFragment = `{
    asset->{ _id, url },
    hotspot,
    crop,
    alt
  }`

// ─── Travel Categories (Homepage) ──────────────────────────────────────────
// Output shape is IDENTICAL to before — CategoryItem interface unchanged.
// categories[] now dereferenced from standalone category documents.

export const travelCategoriesQuery = groq`
  *[_type == "travelCategoriesSection"][0] {
    sectionTagline,
    heading,
    description,
    "categories": categories[]-> {
      label,
      teaser,
      "image": image.asset->url,
      "href": "/packages?category=" + slug.current
    }
  }
`;

// NOTE: href changed from "/categories/" + slug to "/packages?category=" + slug
// This links homepage category cards directly to the filtered listing page.
// If you want to keep "/categories/..." routes, just change the prefix above.

// ─── Category Queries (Listing Page Filter Tabs) ───────────────────────────

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    label,
    slug,
    teaser,
    "image": image.asset->url
  }
`;

// ─── Package Queries ───────────────────────────────────────────────────────

// All packages — listing page (lightweight)
export const ALL_PACKAGES_QUERY = groq`
  *[_type == "package"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortIntro,
    price,
    duration,
    destination,
    difficulty,
    maxAltitude,
    groupSize,
    bestSeason,
    accommodation,
    rating,
    isFeatured,
    "bannerImage": {
      "url": bannerImage.asset->url,
      "alt": bannerImage.alt
    },
    "category": category-> {
      _id,
      label,
      slug
    }
  }
`;

// Packages filtered by category slug — used for server-side filtering if needed
export const PACKAGES_BY_CATEGORY_QUERY = groq`
  *[_type == "package" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortIntro,
    price,
    duration,
    destination,
    difficulty,
    maxAltitude,
    groupSize,
    bestSeason,
    accommodation,
    rating,
    isFeatured,
    "bannerImage": {
      "url": bannerImage.asset->url,
      "alt": bannerImage.alt
    },
    "category": category-> {
      _id,
      label,
      slug
    }
  }
`;

// Featured packages — homepage highlight section
export const FEATURED_PACKAGES_QUERY = groq`
  *[_type == "package" && isFeatured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortIntro,
    price,
    duration,
    difficulty,
    rating,
    "bannerImage": {
      "url": bannerImage.asset->url,
      "alt": bannerImage.alt
    },
    "category": category-> {
      _id,
      label,
      slug
    }
  }
`;

// Single package — full detail page
export const PACKAGE_BY_SLUG_QUERY = groq`
  *[_type == "package" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortIntro,
    overview,
    price,
    duration,
    destination,
    difficulty,
    maxAltitude,
    groupSize,
    bestSeason,
    accommodation,
    transportation,
    meals,
    rating,
    isFeatured,

    "bannerImage": {
      "url": bannerImage.asset->url,
      "alt": bannerImage.alt
    },
    "gallery": gallery[]{
      "url": asset->url,
      "alt": alt
    },

    "category": category-> {
      _id,
      label,
      slug
    },

    highlights,

    itinerary[] | order(dayNumber asc) {
      dayNumber,
      title,
      description,
      elevation,
      walkingHours,
      distance,
      meals,
      accommodation
    },

    costIncludes,
    costExcludes,

    essentialInfo[] {
      title,
      body
    },

    faqs[] {
      question,
      answer
    },

    departures[] | order(date asc) {
      date,
      availability,
      price
    }
  }
`;

// All package slugs — for generateStaticParams
export const ALL_PACKAGE_SLUGS_QUERY = groq`
  *[_type == "package"] { "slug": slug.current }
`;

// ─── Gallery ───────────────────────────────────────────────────────────────

export const ALL_GALLERY_PHOTOS_QUERY = groq`
  *[_type == "galleryPhoto"] | order(order asc) {
    _id,
    "image": image.asset->url,
    caption,
    location
  }
`;