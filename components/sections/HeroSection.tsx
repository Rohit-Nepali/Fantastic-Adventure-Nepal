"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
        >
          <source
            src="loading_video.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video fails — can replace with more Nepal-specific one */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full px-6 sm:px-10 md:px-16 pb-12 md:pb-16 flex flex-col justify-end">
        <div
          className={`transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-4">
                Pack Your Bags,<br className="sm:hidden" /> Let's Go Somewhere Amazing
              </h1>

              <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-xl font-light">
                Discover breathtaking destinations and create memories that last forever.
              </p>
            </div>

            <Button>Book Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}