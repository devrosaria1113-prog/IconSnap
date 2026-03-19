"use client";

import Image from "next/image";
import type { ResizedIcon } from "@/lib/resize";
import { useLang } from "@/lib/i18n";

interface IconPreviewGridProps {
  icons: ResizedIcon[];
}

export default function IconPreviewGrid({ icons }: IconPreviewGridProps) {
  const { t } = useLang();
  const sorted = [...icons].sort((a, b) => b.pixels - a.pixels);

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {t.preview}{" "}
        <span className="text-sm font-normal text-gray-400">({t.previewCount(icons.length)})</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {sorted.map(({ filename, pixels, dataUrl }) => {
          const displaySize = Math.min(pixels, 72);
          return (
            <div
              key={filename}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div
                className="flex items-center justify-center bg-gray-50 rounded-lg"
                style={{ width: 80, height: 80 }}
              >
                <Image
                  src={dataUrl}
                  alt={filename}
                  width={displaySize}
                  height={displaySize}
                  unoptimized
                  className="rounded"
                />
              </div>
              <span className="text-xs font-mono text-gray-500 text-center break-all leading-tight">
                {filename}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
