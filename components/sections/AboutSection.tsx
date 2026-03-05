"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="section bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Mountains in Nepal"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--bg-secondary)] rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div>
            <span className="caps">About Us</span>
            <h2 className="mt-2 mb-6">
              Your Gateway to Nepal's Extraordinary Adventures
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Fantastic Adventure Nepal is a premier travel company dedicated to 
              showcasing the breathtaking beauty, rich culture, and incredible 
              adventures that Nepal has to offer. With years of experience and 
              deep local knowledge, we craft unforgettable journeys for travelers 
              from around the world.
            </p>
            <p className="text-[var(--text-secondary)] mb-8">
              From the towering peaks of the Himalayas to the ancient temples of 
              the Kathmandu Valley, we specialize in creating personalized 
              experiences that capture the essence of this remarkable destination.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="font-serif text-3xl font-semibold text-[var(--accent)]">
                  10+
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-1">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-semibold text-[var(--accent)]">
                  5000+
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-1">
                  Happy Travelers
                </div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-semibold text-[var(--accent)]">
                  50+
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-1">
                  Destinations
                </div>
              </div>
            </div>

            <button className="btn btn-primary">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
