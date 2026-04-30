"use client";

import HeroSection from "@/components/sections/HeroSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import TopTours from "@/components/sections/TopTours";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ContactSection from "@/components/sections/ContactSection";

export default function DestinationsPage() {
  return (
    <>
      {/* <HeroSection /> */}
      <DestinationsSection />
      <CategoriesSection />
      <TopTours />
      <TestimonialSection />
      <ContactSection />
    </>
  );
}