"use client";

import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United Kingdom",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "Our trek to Everest Base Camp was absolutely life-changing. The team at Fantastic Adventure Nepal made everything so seamless. The guides were knowledgeable, the accommodations exceeded expectations, and every moment in the mountains was magical."
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Canada",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    text: "From the moment we arrived in Kathmandu, we felt welcomed and well cared for. The personalized itinerary they created for us captured everything we wanted - culture, adventure, and relaxation. Highly recommend!"
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    text: "The wildlife safari in Chitwan was incredible! We saw rhinos, elephants, and even a tiger. The local guides knew exactly where to find the animals while respecting their natural habitat. A truly unforgettable experience."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section bg-[var(--bg-dark)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="caps text-white/60">Testimonials</span>
          <h2 className="mt-2 mb-6 text-white">
            What Our Travelers Say
          </h2>
          <p className="text-white/70">
            Don't just take our word for it. Here's what our amazing travelers 
            have to say about their adventures with Fantastic Adventure Nepal.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="text-yellow-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-white/60">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-white">5000+</div>
              <div className="text-sm text-white/60 mt-1">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-white">4.9/5</div>
              <div className="text-sm text-white/60 mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-semibold text-white">98%</div>
              <div className="text-sm text-white/60 mt-1">Return Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
