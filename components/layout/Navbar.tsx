"use client";

import Link from "next/link";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
  { label: "Testimonials", href: "#testimonials" }
];

export default function Navbar() {

  const [language, setLanguage] = useState("ENG");
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "English", label: "English" },
    { code: "Spanish", label: "Spanish" },
    { code: "French", label: "French" }
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-white text-2xl">Fantastic Advenutre Nepal</span>
      </div>

      {/* Center Nav */}
      <div className="hidden md:flex items-center rounded-full px-2 py-1.5 gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-4 py-1.5 rounded-full text-sm font-light tracking-wide transition-all duration-200 font-sans cursor-pointer text-white/80 hover:text-white hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}
      </div>


      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-white/70 text-[12px]"
          >
            {language} ▾
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white text-black shadow-lg">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="bg-white text-black text-[11px] font-sans font-medium tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-white/90 cursor-pointer">
          Contact Us
        </button>
      </div>
    </nav>
  );
}