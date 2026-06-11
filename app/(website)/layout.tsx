// app/(website)/layout.tsx
import Navbar from "@/components/layout/Navbar";
import FooterCTASection from "@/components/layout/FooterCTASection";
import Providers from "@/provider/providers";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <Navbar />
        <main className="pt-0">{children}</main>
        <FooterCTASection />
      </Providers>
    </>
  );
}