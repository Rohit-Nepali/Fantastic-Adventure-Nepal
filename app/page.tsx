import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterCTASection from "@/components/sections/FooterCTASection";
import TopTours from "@/components/sections/TopTours";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DestinationsSection />
      <TopTours />
      <WhyChooseUsSection />
      <TestimonialSection />
      <ContactSection />
      <FooterCTASection />
    </main>
  );
}
