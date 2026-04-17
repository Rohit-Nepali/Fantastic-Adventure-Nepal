"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { type LanguageCode } from "@/lib/translations";

type LanguageContextValue = {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const defaultLanguage: LanguageCode = "en";

const isLanguageCode = (value: string | null): value is LanguageCode =>
  value === "en" || value === "es" || value === "fr";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") {
      return defaultLanguage;
    }

    const saved = window.localStorage.getItem("lang");
    return isLanguageCode(saved) ? saved : defaultLanguage;
  });

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("lang", language);
  }, [language]);

  const changeLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
  };

  const value = useMemo(
    () => ({ language, changeLanguage }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};