"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/provider/Language";
import { languageOptions, translations } from "@/lib/translations";

export default function Navbar() {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const copy = translations[language];
  const navItems = copy.navItems;
  const currentLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0];

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 py-5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-white text-2xl">Fantastic Adventure Nepal</span>
      </div>

      {/* Center Nav */}
      <div className="glass-nav hidden md:flex items-center rounded-full px-2 py-1.5 gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="
        px-4 py-1.5 rounded-full text-sm font-light tracking-wide 
        transition-all duration-200 font-sans cursor-pointer 
        text-white/80 hover:text-white 
        hover:bg-white/20
        hover:shadow-[0_2px_10px_rgba(255,255,255,0.15)]
      "
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
            {currentLanguage.label} ▾
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white text-black shadow-lg">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
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
          {copy.navCta}
        </button>
      </div>
    </nav>
  );
}