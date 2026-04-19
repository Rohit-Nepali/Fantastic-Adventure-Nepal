"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/provider/Language";

export default function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
