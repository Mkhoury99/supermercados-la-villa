"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageValue>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lavilla-lang");
    if (saved !== "en" && saved !== "es") return;
    const id = window.setTimeout(() => {
      setLangState(saved);
      document.documentElement.lang = saved;
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem("lavilla-lang", next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function tx(lang: Lang, copy: { en: string; es: string }) {
  return copy[lang];
}
