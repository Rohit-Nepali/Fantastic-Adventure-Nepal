"use client";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ContactSection from "@/components/sections/ContactSection";

export default function AboutPage() {
  return (
    <>
      {/* <HeroSection /> */}
      <AboutSection />
      <WhyChooseUsSection />
      <TestimonialSection />
      <ContactSection />
    </>
  );
}