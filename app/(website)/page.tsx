import HeroSection from "@/components/sections/HeroSection";
import AboutSection, { AboutSectionProps } from "@/components/sections/AboutSection";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutUsQuery, travelCategoriesQuery, whyChooseUsQuery } from "@/lib/sanity/queries";
import TravelCategoriesSection, { CategoriesSectionProps } from "@/components/sections/TravelCategoriesSection";
import WhyChooseUsSection, { WhyChooseUsProps } from "@/components/sections/WhyChooseUsSection";

export default async function Home() {

  const aboutUs = await sanityFetch<AboutSectionProps['aboutUs']>(aboutUsQuery);
  const travelCategoriesData = await sanityFetch<CategoriesSectionProps['data']>(travelCategoriesQuery);
  const whyChooseUsData = await sanityFetch<WhyChooseUsProps['data']>(whyChooseUsQuery);

  return (
    <>
      <HeroSection />
      <AboutSection aboutUs={aboutUs} />
      <TravelCategoriesSection data={travelCategoriesData} />
      <WhyChooseUsSection data={whyChooseUsData} />
      {/* <TestimonialSection /> */}
    </>
  );
}
