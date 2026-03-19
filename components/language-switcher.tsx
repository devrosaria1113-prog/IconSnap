"use client";

import { useLang } from "@/lib/i18n";
import { LOCALE_LABELS, type Locale } from "@/lib/i18n";

const LOCALES: Locale[] = ["ko", "en", "de"];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLang();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            locale === l
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
