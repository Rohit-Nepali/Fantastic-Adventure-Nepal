import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    contactInfo,
    socialLinks,
    certifications[]{
      title,
      caption,
      image,
      alt
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    hero,
    about,
    categoriesIntro,
    whyChooseUs,
    whatWeOffer,
    partnerWithUs,
    storiesInEveryFrame,
    reviewsIntro,
    planYourTrip,
    planTripOptions,
    categories[]->{
      title,
      slug,
      description,
      image,
      imageAlt
    },
    reviews[]->{
      travelerName,
      country,
      review,
      rating,
      image,
      imageAlt,
      featured
    },
    gallery[]->{
      title,
      caption,
      tags,
      image,
      imageAlt
    }
  }
`;

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

export const travelCategoriesQuery = groq` * [_type == "travelCategoriesSection"][0] {
  sectionTagline,
  heading,
  description,
  categories[] {
    label,
    teaser,
    // Safely fetch the asset URL from the image object
    "image": image.asset-> url,
      // Build the dynamic URL using the slug object
      "href": "/categories/" + slug.current
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