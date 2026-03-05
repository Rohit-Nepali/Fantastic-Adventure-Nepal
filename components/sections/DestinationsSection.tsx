"use client";

import Image from "next/image";

const destinations = [
  {
    id: 1,
    name: "Kathmandu Valley",
    description: "Ancient temples, vibrant markets, and rich cultural heritage",
    image: "https://images.unsplash.com/photo-1565429221253-3a6f28234cfc?w=800&q=80",
    price: "From $299",
    duration: "3-5 Days"
  },
  {
    id: 2,
    name: "Pokhara",
    description: "Gateway to the Annapurna Circuit with stunning lake views",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",
    price: "From $349",
    duration: "4-6 Days"
  },
  {
    id: 3,
    name: "Chitwan National Park",
    description: "Wildlife safaris and nature experiences in the lowlands",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    price: "From $279",
    duration: "2-4 Days"
  },
  {
    id: 4,
    name: "Everest Base Camp",
    description: "Trek to the foot of the world's highest peak",
    image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&q=80",
    price: "From $1,499",
    duration: "14-21 Days"
  },
  {
    id: 5,
    name: "Lumbini",
    description: "Birthplace of Buddha and spiritual pilgrimage site",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    price: "From $199",
    duration: "2-3 Days"
  },
  {
    id: 6,
    name: "Annapurna Region",
    description: "Spectacular mountain trails and diverse landscapes",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    price: "From $899",
    duration: "7-12 Days"
  }
];

export default function DestinationsSection() {
  return (
    <section id="destinations" className="section bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="caps">Destinations</span>
          <h2 className="mt-2 mb-6">
            Explore the Beauty of Nepal
          </h2>
          <p className="text-[var(--text-secondary)]">
            From the bustling streets of Kathmandu to the serene heights of the Himalayas, 
            discover the diverse landscapes and rich culture that make Nepal truly extraordinary.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className="card p-0 overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide">
                    {destination.duration}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {destination.price}
                  </span>
                </div>
                <h3 className="mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {destination.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn btn-secondary">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}
