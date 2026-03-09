
"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const TopTours = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const tours = [
    { id: 1, name: "Everest Base Camp", image: "https://images.unsplash.com/photo-1544735716-39742fc067b8?q=80&w=800", duration: "12 Days", price: "$1,200", desc: "Trek to the roof of the world." },
    { id: 2, name: "Annapurna Circuit", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=800", duration: "14 Days", price: "$1,450", desc: "Experience diverse cultures and landscapes." },
    { id: 3, name: "Langtang Valley", image: "https://images.unsplash.com/photo-1590523278191-995734277971?q=80&w=800", duration: "10 Days", price: "$950", desc: "The valley of glaciers awaits you." },
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % tours.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + tours.length) % tours.length);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-white">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[11px] tracking-[3px] uppercase text-black/35 font-light mb-3">/Top Tours</p>
        <h2 className="text-4xl font-semibold text-black mb-4">Top Tours to Spark Your Wanderlust</h2>
        <div className="flex items-center justify-between">
          <p className="text-black/45 text-sm max-w-lg">Explore our curated selection of must-visit destinations with complete detailed itineraries.</p>
          {/* Navigation Controls */}
          <div className="flex gap-2">
            <button onClick={handlePrev} className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"><ChevronLeft size={20}/></button>
            <button onClick={handleNext} className="p-2 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"><ChevronRight size={20}/></button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="flex items-center justify-center gap-6 overflow-hidden min-h-[550px]">
        {tours.map((tour, index) => {
          const isCenter = index === activeIndex;
          const isVisible = Math.abs(index - activeIndex) <= 1;

          if (!isVisible) return null;

          return (
            <div 
              key={tour.id}
              className={`transition-all duration-700 ease-out flex-shrink-0 ${
                isCenter ? "w-full md:w-[450px] scale-100 opacity-100" : "w-[300px] scale-90 opacity-40"
              }`}
            >
              <div className={`relative rounded-3xl overflow-hidden mb-6 ${isCenter ? "h-[400px]" : "h-[300px]"}`}>
                <Image src={tour.image} alt={tour.name} fill className="object-cover" sizes="50vw" />
              </div>

              {isCenter && (
                <div className="animate-in fade-in duration-500">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-semibold">{tour.name}</h3>
                    <span className="text-sm text-black/50">{tour.duration}</span>
                  </div>
                  <p className="text-black/45 text-sm mb-6">{tour.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">from {tour.price}</span>
                    <button className="bg-black text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-black/80 transition-all">Book Now</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopTours;