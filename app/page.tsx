import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <DestinationsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
