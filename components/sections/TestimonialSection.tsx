"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Mountain, Leaf, Sun, Droplets, Footprints, Waves, Backpack, Tent, Compass, Wind, MapPin, Zap } from "lucide-react";

// --- 1. Lucide React Icons (Vibe Icons) ---
const VibeIcons = {
  mountain: <Mountain className="w-8 h-8 text-slate-700" />,
  leaf: <Leaf className="w-8 h-8 text-green-600" />,
  sun: <Sun className="w-8 h-8 text-amber-500" />,
  water: <Droplets className="w-8 h-8 text-blue-500" />,
  hike: <Footprints className="w-8 h-8 text-orange-600" />,
  river: <Waves className="w-8 h-8 text-cyan-500" />,
  jacket: <Backpack className="w-8 h-8 text-indigo-600" />,
  tent: <Tent className="w-8 h-8 text-emerald-700" />,
  compass: <Compass className="w-8 h-8 text-red-500" />,
  breeze: <Wind className="w-8 h-8 text-sky-400" />,
  destination: <MapPin className="w-8 h-8 text-pink-600" />,
  adrenaline: <Zap className="w-8 h-8 text-yellow-500" />,
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
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTween = useRef<gsap.core.Timeline | null>(null);

  // Define the explosion coordinates for the 4 icons
  const burstCoords = useMemo(() => [
    { x: -60, y: -50, rotate: -25 }, // Top Left
    { x: 60, y: -40, rotate: 20 },   // Top Right
    { x: -50, y: 50, rotate: -15 },  // Bottom Left
    { x: 50, y: 60, rotate: 30 },    // Bottom Right
  ], []);

  const handleMouseEnter = () => {
    // Kill any active animations to prevent glitching
    if (hoverTween.current) hoverTween.current.kill();

    hoverTween.current = gsap.timeline();

    // 1. Lift the card slightly
    hoverTween.current.to(cardRef.current, {
      y: -8,
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
      duration: 0.4,
      ease: "power2.out",
    }, 0);

    // 2. Fade in and slide up the review text
    hoverTween.current.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, 0);

    // 3. EXPLODE the vibe icons!
    iconsRef.current.forEach((icon, i) => {
      if (!icon) return;
      hoverTween.current?.to(icon, {
        scale: 1,
        opacity: 1,
        x: burstCoords[i].x,
        y: burstCoords[i].y,
        rotation: burstCoords[i].rotate,
        duration: 0.6,
        ease: "back.out(1.7)", // This creates the bouncy "burst" effect
      }, i * 0.05); // slight stagger
    });
  };

  const handleMouseLeave = () => {
    if (hoverTween.current) hoverTween.current.kill();

    hoverTween.current = gsap.timeline();

    // Reset card
    hoverTween.current.to(cardRef.current, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      duration: 0.4,
      ease: "power2.out",
    }, 0);

    // Hide text
    hoverTween.current.to(textRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.3,
      ease: "power2.inOut",
    }, 0);

    // Suck the icons back into the center
    hoverTween.current.to(iconsRef.current, {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.4,
      ease: "back.in(1.2)",
    }, 0);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl p-8 max-w-sm w-full mx-auto cursor-pointer transition-colors hover:bg-white"
      style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
    >
      {/* --- Profile & Exploding Icons Container --- */}
      <div className="relative flex items-center justify-center mb-6">

        {/* The hidden SVGs waiting to burst */}
        {data.vibes.map((vibeKey: keyof typeof VibeIcons, i: number) => (
          <div
            key={i}
            ref={(el) => { iconsRef.current[i] = el; }}
            className="absolute z-0"
            style={{
              opacity: 0,
              transform: "scale(0) translate(0px, 0px)" // Initial state
            }}
          >
            {VibeIcons[vibeKey]}
          </div>
        ))}

        {/* Profile Picture (sits above the icons so they shoot OUT from behind it) */}
        <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image src={data.image} alt={data.name} fill className="object-cover" />
        </div>
      </div>

      {/* --- User Info --- */}
      <div className="text-center relative z-10">
        <h4 className="text-xl font-bold text-slate-800 mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {data.name}
        </h4>
        <p className="text-[11px] tracking-widest uppercase text-accent font-medium mb-4">
          {data.role}
        </p>

        {/* --- The Hidden Review --- */}
        <div className="overflow-hidden relative h-[100px] flex items-start justify-center">
          <p
            ref={textRef}
            className="text-slate-600 text-sm leading-relaxed absolute top-0"
            style={{ opacity: 0, transform: "translateY(15px)" }} // Initial State
          >
            "{data.review}"
          </p>
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
          <p className="text-[12px] tracking-[0.25em] uppercase text-accent font-medium mb-4 font-sans">
            / Voices of Joy
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.05] tracking-tight">
            Hear From Our <span className="text-accent italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Travelers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} data={testimonial} />
          ))}
        </div>

      </div>
    </section>
  );
}