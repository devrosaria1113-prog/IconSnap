"use client";

import { PLATFORM_LABELS, type Platform } from "@/lib/icon-sizes";
import { Smartphone, Tablet, Watch, Monitor, Store } from "lucide-react";
import { useLang } from "@/lib/i18n";

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  iphone: <Smartphone className="w-4 h-4" />,
  ipad: <Tablet className="w-4 h-4" />,
  watch: <Watch className="w-4 h-4" />,
  mac: <Monitor className="w-4 h-4" />,
  appstore: <Store className="w-4 h-4" />,
};

const SELECTABLE_PLATFORMS: Platform[] = ["iphone", "ipad", "watch", "mac"];

interface PlatformSelectorProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}

export default function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  const { t } = useLang();

  const toggle = (platform: Platform) => {
    if (selected.includes(platform)) {
      if (selected.length === 1) return;
      onChange(selected.filter((p) => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700">{t.platformTitle}</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Store className="w-3 h-3" /> {t.appstoreHint}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SELECTABLE_PLATFORMS.map((platform) => {
          const isSelected = selected.includes(platform);
          return (
            <button
              key={platform}
              onClick={() => toggle(platform)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                ${isSelected
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"}
              `}
            >
              {PLATFORM_ICONS[platform]}
              <span className="text-xs font-medium">{PLATFORM_LABELS[platform]}</span>
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center
                ${isSelected ? "border-indigo-500 bg-indigo-500" : "border-gray-300"}`}
              >
                {isSelected && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">{t.platformHint}</p>
    </div>
  );
}
