"use client";

import Image from "next/image";
import { Mountain, Leaf, Sun, Droplets, Footprints, Waves, Backpack, Tent, Compass, Wind, MapPin, Zap } from "lucide-react";

// --- 1. Lucide React Icons (Vibe Icons) ---
const VibeIcons = {
  mountain: <Mountain className="w-5 h-5 text-slate-500" />,
  leaf: <Leaf className="w-5 h-5 text-green-600/70" />,
  sun: <Sun className="w-5 h-5 text-amber-500/70" />,
  water: <Droplets className="w-5 h-5 text-blue-500/70" />,
  hike: <Footprints className="w-5 h-5 text-orange-600/70" />,
  river: <Waves className="w-5 h-5 text-cyan-500/70" />,
  jacket: <Backpack className="w-5 h-5 text-indigo-600/70" />,
  tent: <Tent className="w-5 h-5 text-emerald-700/70" />,
  compass: <Compass className="w-5 h-5 text-red-500/70" />,
  breeze: <Wind className="w-5 h-5 text-sky-400/70" />,
  destination: <MapPin className="w-5 h-5 text-pink-600/70" />,
  adrenaline: <Zap className="w-5 h-5 text-yellow-500/70" />,
};

// --- 2. Dummy Data ---
const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Spiritual Seeker",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    review: "The temple visits were absolutely ethereal. I felt a profound sense of peace and joy that I will carry with me forever.",
    vibes: ["sun", "leaf", "mountain", "destination"],
  },
  {
    name: "Maya Lin",
    role: "Adventure Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    review: "Rafting through the glacial rivers and hiking the ridges was the most thrilling experience. Perfect mix of culture and adrenaline!",
    vibes: ["river", "hike", "adrenaline", "jacket"],
  },
  {
    name: "Jordan McKee",
    role: "Nature Lover",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    review: "Camping under the Himalayan stars with the compass guiding our way was pure magic. The mountain air and tent life felt like home!",
    vibes: ["tent", "compass", "breeze", "mountain"],
  },
  {
    name: "Sophie Chen",
    role: "Adventurer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    review: "Every trail brought me closer to nature. The backpack felt lighter with every step, and my spirit soared higher with each summit.",
    vibes: ["hike", "jacket", "compass", "adrenaline"],
  },
];

// --- 3. Individual Card Component ---
const TestimonialCard = ({ data }: { data: any }) => {
  return (
    <div className="group relative bg-white border border-slate-100 rounded-3xl p-8 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] shadow-sm flex flex-col justify-between h-full">
      
      {/* Quote Section */}
      <div className="mb-8">
        {/* Decorative Quote Mark */}
        <span className="text-4xl text-slate-200 font-serif absolute top-6 left-6 leading-none">"</span>
        <p className="text-slate-600 text-base leading-relaxed relative z-10 pt-4 italic">
          {data.review}
        </p>
      </div>

      {/* Author & Vibes Section */}
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-50 shadow-sm shrink-0">
            <Image src={data.image} alt={data.name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-800 leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {data.name}
            </h4>
            <p className="text-[10px] tracking-widest uppercase text-teal-600 font-semibold">
              {data.role}
            </p>
          </div>
        </div>

        {/* Static Vibe Icons */}
        <div className="flex gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
          {data.vibes.slice(0, 3).map((vibeKey: keyof typeof VibeIcons, i: number) => (
            <div key={i} title={vibeKey} className="bg-slate-50 p-1.5 rounded-full">
              {VibeIcons[vibeKey]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 4. Main Section Component ---
export default function TestimonialSection() {
  return (
    <section className="py-24 bg-[#f9f8f6] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <p className="text-[12px] tracking-[0.25em] uppercase text-teal-600 font-bold mb-4 font-sans">
            / Voices of Joy
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tight">
            Hear From Our <span className="text-teal-600 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Travelers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} data={testimonial} />
          ))}
        </div>

      </div>
    </section>
  );
}