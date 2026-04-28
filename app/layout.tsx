import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "../provider/providers";
import Navbar from "@/components/layout/Navbar";
import FooterCTASection from "@/components/layout/FooterCTASection";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fantastic Nepal",
  description: "Experience the beauty of Nepal",
  icons: {
    icon: "/LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.variable}>
      <body>
        <Providers>
          <Navbar />
          <main className="pt-0">{children}</main>
          <FooterCTASection />
        </Providers>
      </body>
    </html>
  );
}
