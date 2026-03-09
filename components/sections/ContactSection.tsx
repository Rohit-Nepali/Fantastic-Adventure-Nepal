"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
      });
      gsap.fromTo(rightRef.current, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
      });
      gsap.fromTo(".contact-info-item", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full px-4 py-3 bg-black/[0.03] border border-black/10 rounded-xl text-black text-[14px] font-light font-sans placeholder:text-black/25 focus:outline-none focus:border-black/30 transition-colors duration-300";
  const labelClass = "block text-[11px] tracking-[2px] uppercase text-black/35 font-sans font-light mb-2";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-white overflow-hidden px-6 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* ── LEFT — Info ── */}
        <div ref={leftRef}>
          <p className="text-[11px] tracking-[3px] uppercase text-black/35 font-light mb-3 font-sans">
            /Contact Us
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-black leading-[1.15] tracking-tight mb-5">
            Let&apos;s Plan Your{" "}
            <span className="text-black/30 font-light italic">Perfect Adventure</span>
          </h2>
          <p className="text-black/45 text-[14px] leading-relaxed font-light font-sans max-w-sm mb-12">
            Ready to start your Nepal adventure? Get in touch and let our expert team craft the journey of a lifetime for you.
          </p>

          <div className="space-y-0 border-t border-black/8 rounded-2xl overflow-hidden bg-black/[0.02]">
            {[
              { label: "Our Office", lines: ["Thamel, Kathmandu 44600", "Nepal"] },
              { label: "Phone", lines: ["+977 1 2345678", "+977 9841234567"] },
              { label: "Email", lines: ["info@fantasticadventurenepal.com", "bookings@fantasticadventurenepal.com"] },
            ].map((item) => (
              <div
                key={item.label}
                className="contact-info-item flex items-start justify-between px-6 py-5 border-b border-black/8 last:border-b-0"
              >
                <p className="text-[11px] tracking-[2px] uppercase text-black/30 font-sans font-light w-24 flex-shrink-0 pt-0.5">
                  {item.label}
                </p>
                <div className="text-right">
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-[13px] text-black/60 font-light font-sans leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Form ── */}
        <div ref={rightRef} className="flex flex-col justify-center">
          <p className="text-[11px] tracking-[3px] uppercase text-black/30 font-sans font-light mb-8">
            Send Us a Message
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="john@example.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+977 98XXXXXXXX" />
              </div>
              <div>
                <label htmlFor="destination" className={labelClass}>Destination</label>
                <select id="destination" name="destination" value={formData.destination} onChange={handleChange} className={inputClass + " cursor-pointer"}>
                  <option value="">Select a destination</option>
                  <option value="kathmandu">Kathmandu Valley</option>
                  <option value="pokhara">Pokhara</option>
                  <option value="chitwan">Chitwan National Park</option>
                  <option value="everest">Everest Base Camp</option>
                  <option value="annapurna">Annapurna Region</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>Your Message *</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={inputClass + " resize-none"} placeholder="Tell us about your dream adventure..." />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-black text-white text-[12px] tracking-[0.15em] uppercase font-sans font-medium py-4 rounded-xl transition-all duration-300 hover:bg-black/80 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
