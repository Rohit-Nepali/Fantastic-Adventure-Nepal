import type { Image } from "sanity";
import { sanityClient } from "@/lib/sanity/client";
import { sanityEnv } from "@/lib/sanity/env";
import { fallbackHomePageData, fallbackSiteSettings } from "@/lib/sanity/fallbackContent";
import { urlForImage } from "@/lib/sanity/image";

type ImageLike = {
  image?: Image;
  imageAlt?: string;
};

function mapImage(image?: Image, alt?: string) {
  const url = urlForImage(image);
  if (!url) {
    return undefined;
  }

  return {
    url,
    alt,
  };
}

function asArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

export async function getHomePageData(): Promise<HomePageData> {
  if (!sanityEnv.hasConfig) {
    return fallbackHomePageData;
  }

  try {
    const data = await sanityClient.fetch<any>(homePageQuery);
    if (!data) {
      return fallbackHomePageData;
    }

    return {
      hero: {
        title: data.hero?.title || fallbackHomePageData.hero.title,
        subtitle: data.hero?.subtitle || fallbackHomePageData.hero.subtitle,
        buttonLabel: data.hero?.buttonLabel || fallbackHomePageData.hero.buttonLabel,
      },
      about: {
        label: data.about?.label || fallbackHomePageData.about.label,
        titleLead: data.about?.titleLead || fallbackHomePageData.about.titleLead,
        titleAccent: data.about?.titleAccent || fallbackHomePageData.about.titleAccent,
        description: data.about?.description || fallbackHomePageData.about.description,
        buttonLabel: data.about?.buttonLabel || fallbackHomePageData.about.buttonLabel,
        cards: asArray(data.about?.cards).length
          ? data.about.cards
          : fallbackHomePageData.about.cards,
      },
      categoriesIntro: {
        label: data.categoriesIntro?.label || fallbackHomePageData.categoriesIntro.label,
        title: data.categoriesIntro?.title || fallbackHomePageData.categoriesIntro.title,
        description:
          data.categoriesIntro?.description || fallbackHomePageData.categoriesIntro.description,
      },
      categories: asArray(data.categories).length
        ? data.categories.map((item: any, index: number) => {
            const image = mapImage(item.image, item.imageAlt);
            return {
              title: item.title || fallbackHomePageData.categories[index]?.title || "Category",
              slug:
                item.slug?.current ||
                fallbackHomePageData.categories[index]?.slug ||
                `category-${index + 1}`,
              description:
                item.description || fallbackHomePageData.categories[index]?.description || "",
              image:
                image ||
                fallbackHomePageData.categories[index]?.image ||
                fallbackHomePageData.categories[0].image,
            };
          })
        : fallbackHomePageData.categories,
      whyChooseUs: {
        label: data.whyChooseUs?.label || fallbackHomePageData.whyChooseUs.label,
        titleLead: data.whyChooseUs?.titleLead || fallbackHomePageData.whyChooseUs.titleLead,
        titleAccent:
          data.whyChooseUs?.titleAccent || fallbackHomePageData.whyChooseUs.titleAccent,
        description:
          data.whyChooseUs?.description || fallbackHomePageData.whyChooseUs.description,
        features: asArray(data.whyChooseUs?.features).length
          ? data.whyChooseUs.features
          : fallbackHomePageData.whyChooseUs.features,
      },
      whatWeOffer: {
        label: data.whatWeOffer?.label || fallbackHomePageData.whatWeOffer.label,
        title: data.whatWeOffer?.title || fallbackHomePageData.whatWeOffer.title,
        description:
          data.whatWeOffer?.description || fallbackHomePageData.whatWeOffer.description,
        items: asArray(data.whatWeOffer?.items).length
          ? data.whatWeOffer.items
          : fallbackHomePageData.whatWeOffer.items,
      },
      partnerWithUs: {
        title: data.partnerWithUs?.title || fallbackHomePageData.partnerWithUs.title,
        description:
          data.partnerWithUs?.description || fallbackHomePageData.partnerWithUs.description,
        services: asArray(data.partnerWithUs?.services).length
          ? data.partnerWithUs.services
          : fallbackHomePageData.partnerWithUs.services,
        ctaLabel: data.partnerWithUs?.ctaLabel || fallbackHomePageData.partnerWithUs.ctaLabel,
        ctaHref: data.partnerWithUs?.ctaHref || fallbackHomePageData.partnerWithUs.ctaHref,
      },
      storiesInEveryFrame: {
        label:
          data.storiesInEveryFrame?.label || fallbackHomePageData.storiesInEveryFrame.label,
        title:
          data.storiesInEveryFrame?.title || fallbackHomePageData.storiesInEveryFrame.title,
        description:
          data.storiesInEveryFrame?.description ||
          fallbackHomePageData.storiesInEveryFrame.description,
        ctaLabel:
          data.storiesInEveryFrame?.ctaLabel || fallbackHomePageData.storiesInEveryFrame.ctaLabel,
        ctaHref:
          data.storiesInEveryFrame?.ctaHref || fallbackHomePageData.storiesInEveryFrame.ctaHref,
      },
      gallery: asArray(data.gallery).length
        ? data.gallery.map((item: ImageLike & any, index: number) => ({
            title: item.title || fallbackHomePageData.gallery[index]?.title || "Gallery",
            caption: item.caption || fallbackHomePageData.gallery[index]?.caption || "",
            tags: asArray(item.tags),
            image:
              mapImage(item.image, item.imageAlt) ||
              fallbackHomePageData.gallery[index]?.image ||
              fallbackHomePageData.gallery[0].image,
          }))
        : fallbackHomePageData.gallery,
      reviewsIntro: {
        label: data.reviewsIntro?.label || fallbackHomePageData.reviewsIntro.label,
        title: data.reviewsIntro?.title || fallbackHomePageData.reviewsIntro.title,
      },
      reviews: asArray(data.reviews).length
        ? data.reviews.map((item: ImageLike & any, index: number) => ({
            travelerName:
              item.travelerName ||
              fallbackHomePageData.reviews[index]?.travelerName ||
              "Traveler",
            country: item.country || fallbackHomePageData.reviews[index]?.country || "",
            review: item.review || fallbackHomePageData.reviews[index]?.review || "",
            rating: Number(item.rating) || fallbackHomePageData.reviews[index]?.rating || 5,
            image: mapImage(item.image, item.imageAlt),
            featured: Boolean(item.featured),
          }))
        : fallbackHomePageData.reviews,
      planYourTrip: {
        label: data.planYourTrip?.label || fallbackHomePageData.planYourTrip.label,
        titleLead: data.planYourTrip?.titleLead || fallbackHomePageData.planYourTrip.titleLead,
        titleAccent:
          data.planYourTrip?.titleAccent || fallbackHomePageData.planYourTrip.titleAccent,
        description:
          data.planYourTrip?.description || fallbackHomePageData.planYourTrip.description,
        formTitle: data.planYourTrip?.formTitle || fallbackHomePageData.planYourTrip.formTitle,
        submitLabel:
          data.planYourTrip?.submitLabel || fallbackHomePageData.planYourTrip.submitLabel,
      },
      planTripOptions: {
        destinationOptions: asArray(data.planTripOptions?.destinationOptions).length
          ? data.planTripOptions.destinationOptions
          : fallbackHomePageData.planTripOptions.destinationOptions,
        budgetRanges: asArray(data.planTripOptions?.budgetRanges).length
          ? data.planTripOptions.budgetRanges
          : fallbackHomePageData.planTripOptions.budgetRanges,
        durationOptions: asArray(data.planTripOptions?.durationOptions).length
          ? data.planTripOptions.durationOptions
          : fallbackHomePageData.planTripOptions.durationOptions,
        referralSources: asArray(data.planTripOptions?.referralSources).length
          ? data.planTripOptions.referralSources
          : fallbackHomePageData.planTripOptions.referralSources,
      },
    };
  } catch {
    return fallbackHomePageData;
  }
}

export async function getSiteSettingsData(): Promise<SiteSettingsData> {
  if (!sanityEnv.hasConfig) {
    return fallbackSiteSettings;
  }

  try {
    const data = await sanityClient.fetch<any>(siteSettingsQuery);
    if (!data) {
      return fallbackSiteSettings;
    }

    return {
      siteName: data.siteName || fallbackSiteSettings.siteName,
      contactEmail: data.contactInfo?.email || fallbackSiteSettings.contactEmail,
      contactPhone: data.contactInfo?.phone || fallbackSiteSettings.contactPhone,
      officeAddress: data.contactInfo?.address || fallbackSiteSettings.officeAddress,
      socialLinks: asArray(data.socialLinks).length
        ? data.socialLinks
        : fallbackSiteSettings.socialLinks,
      certifications: asArray(data.certifications).length
        ? data.certifications.map((cert: any) => ({
            title: cert.title,
            caption: cert.caption,
            image: mapImage(cert.image, cert.alt),
          }))
        : fallbackSiteSettings.certifications,
    };
  } catch {
    return fallbackSiteSettings;
  }
}
