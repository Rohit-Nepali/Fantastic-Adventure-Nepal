import AboutSection, { AboutSectionProps } from "@/components/sections/AboutSection";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutUsQuery } from "@/lib/sanity/queries";

export default async function AboutPage() {
  let aboutUs;
  try {
    aboutUs = await sanityFetch<AboutSectionProps['aboutUs']>(aboutUsQuery);
  } catch (err) {
    console.error('sanityFetch failed:', err);
  }

  return <AboutSection aboutUs={aboutUs} />;
}