import HeroSection from "@/components/sections/HeroSection";
import AboutSection, { AboutSectionProps } from "@/components/sections/AboutSection";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutUsQuery, travelCategoriesQuery, whyChooseUsQuery } from "@/lib/sanity/queries";
import TravelCategoriesSection, { CategoriesSectionProps } from "@/components/sections/TravelCategoriesSection";
import WhyChooseUsSection, { WhyChooseUsProps } from "@/components/sections/WhyChooseUsSection";
import DmcB2bSection from "@/components/sections/DmcB2bSection";

export default async function Home() {

  const aboutUs = await sanityFetch<AboutSectionProps['aboutUs']>(aboutUsQuery);
  const travelCategoriesData = await sanityFetch<CategoriesSectionProps['data']>(travelCategoriesQuery);
  console.log("Fetched Travel Categories Data:", travelCategoriesData); // Debug log to verify data structure
  const whyChooseUsData = await sanityFetch<WhyChooseUsProps['data']>(whyChooseUsQuery);

  return (
    <>
      <HeroSection />
      <TravelCategoriesSection data={travelCategoriesData} />
      <WhyChooseUsSection data={whyChooseUsData} />
      <AboutSection aboutUs={aboutUs} />
      <DmcB2bSection />
      {/* <TestimonialSection /> */}
    </>
  );
}
