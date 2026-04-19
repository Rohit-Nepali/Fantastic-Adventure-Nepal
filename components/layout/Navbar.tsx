"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/provider/Language";
import { languageOptions, translations } from "@/lib/translations";

type NavbarProps = {
  variant?: "overlay" | "solid";
};

// simple class combiner
const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function Navbar({ variant = "overlay" }: NavbarProps) {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const copy = translations[language];
  const navItems = copy.navItems;

  const currentLanguage =
    languageOptions.find((option) => option.code === language) ??
    languageOptions[0];

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const styles = {
    navShell: {
      base: "flex items-center justify-between px-6 py-8 md:px-10",
      overlay: "absolute top-0 left-0 right-0 z-20 py-6",
      solid:
        "sticky top-0 z-30 py-4 border-b border-black/10 bg-white/90 backdrop-blur",
    },

    brand: "text-2xl",

    navGroup: {
      base: "hidden md:flex items-center rounded-full px-2 py-1.5 gap-1",
      overlay: "glass-nav",
      solid: "",
    },

    navLink: {
      base: "px-4 py-1.5 rounded-full text-sm font-light tracking-wide transition-all duration-200 font-sans cursor-pointer",
      overlay:
        "text-white/80 hover:text-white hover:bg-white/20 hover:shadow-[0_2px_10px_rgba(255,255,255,0.15)]",
      solid: "text-black/70 hover:text-black hover:bg-black/5",
    },

    languageBtn: {
      overlay: "text-white/70 text-[12px]",
      solid: "text-black/55 text-[12px]",
    },

    cta: {
      base: "text-[11px] font-medium tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all duration-300",
      overlay: "bg-white text-black hover:bg-white/90",
      solid: "bg-black text-white hover:bg-black/85",
    },
  };

  return (
    <nav className={cx(styles.navShell.base, styles.navShell[variant])}>
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2">
        <span
          className={cx(
            styles.brand,
            variant === "solid" ? "text-black" : "text-white"
          )}
        >
          Fantastic Adventure Nepal
        </span>
      </Link>

      {/* Nav Items */}
      <div className={cx(styles.navGroup.base, styles.navGroup[variant])}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cx(styles.navLink.base, styles.navLink[variant])}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={styles.languageBtn[variant]}
          >
            {currentLanguage.label} &#9662;
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

        {/* CTA */}
        <Link
          href="/contact"
          className={cx(styles.cta.base, styles.cta[variant])}
        >
          {copy.navCta}
        </Link>
      </div>
    </nav>
  );
}