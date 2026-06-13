import HeroSection from "@/components/sections/HeroSection";
import AboutSection, { AboutSectionProps } from "@/components/sections/AboutSection";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutUsQuery, ALL_GALLERY_ITEMS_QUERY, travelCategoriesQuery, whyChooseUsQuery } from "@/lib/sanity/queries";
import TravelCategoriesSection, { CategoriesSectionProps } from "@/components/sections/TravelCategoriesSection";
import { GalleryItem } from "@/lib/sanity/types";
import WhyChooseUsSection, { WhyChooseUsProps } from "@/components/sections/WhyChooseUsSection";
import DmcB2bSection from "@/components/sections/DmcB2bSection";
import GalleryScroll from "@/components/gallery/GalleryScroll";

export default async function Home() {

  const aboutUs = await sanityFetch<AboutSectionProps['aboutUs']>(aboutUsQuery);
  const travelCategoriesData = await sanityFetch<CategoriesSectionProps['data']>(travelCategoriesQuery);
  const galleryItems = await sanityFetch<GalleryItem[]>(ALL_GALLERY_ITEMS_QUERY);
  const whyChooseUsData = await sanityFetch<WhyChooseUsProps['data']>(whyChooseUsQuery);

  return (
    <>
      <HeroSection />
      <TravelCategoriesSection data={travelCategoriesData} />
      <GalleryScroll items={galleryItems} />
      <AboutSection aboutUs={aboutUs} />
      <DmcB2bSection />
      <WhyChooseUsSection data={whyChooseUsData} />
      {/* <TestimonialSection /> */}
    </>
  );
}
