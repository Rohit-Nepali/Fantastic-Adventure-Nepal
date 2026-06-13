// components/packages/detail/PackageHero.tsx

import Image from "next/image";
import Link from "next/link";
import { PackageDetail } from "@/lib/sanity/types";

const WHATSAPP_NUMBER = "9779800000000";

export default function PackageHero({ pkg }: { pkg: PackageDetail }) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${pkg.title} package. Could you share more details?`
  );

  return (
    <section>
      {/* Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {pkg.bannerImage?.url ? (
          <Image
            src={pkg.bannerImage.url}
            alt={pkg.bannerImage.alt ?? pkg.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-[#e8e4dc]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Text Container */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl ml-4 md:ml-16 mb-4 md:mb-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/70 text-xs mb-3">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
              <span>/</span>
              <span className="text-white">{pkg.category?.label}</span>
            </div>

            {/* Rating */}
            {pkg.rating && (
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.round(pkg.rating!) ? "text-[#f59e0b]" : "text-white/30"}`}>
                    ★
                  </span>
                ))}
                <span className="text-white/80 text-sm ml-1">{pkg.rating.toFixed(1)}</span>
              </div>
            )}

            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {pkg.title}
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-2xl">{pkg.shortIntro}</p>
          </div>
        </div>
      </div>

      {/* MOBILE-ONLY FIXED BOTTOM DOCK (Hidden on Desktop `md:hidden`) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] px-4 py-3 z-50 flex items-center justify-between gap-3 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <a
          href="#inquiry"
          className="flex-1 text-center py-2.5 bg-[#00b5c4] text-white rounded-full text-sm font-medium active:bg-[#009aaa] transition-colors"
        >
          Book Now
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 border border-[#25d366] text-[#25d366] rounded-full text-sm font-medium active:bg-[#25d366] active:text-white transition-colors flex items-center justify-center"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}