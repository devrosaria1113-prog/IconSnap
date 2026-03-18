"use client";

import Image from "next/image";
import type { ResizedIcon } from "@/lib/resize";

interface IconPreviewGridProps {
  icons: ResizedIcon[];
}

export default function IconPreviewGrid({ icons }: IconPreviewGridProps) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">미리보기</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {icons.map(({ size, dataUrl }) => {
          const displaySize = Math.min(size.width, 80);
          return (
            <div
              key={size.label}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div
                className="flex items-center justify-center bg-gray-50 rounded-lg"
                style={{ width: 88, height: 88 }}
              >
                <Image
                  src={dataUrl}
                  alt={size.label}
                  width={displaySize}
                  height={displaySize}
                  unoptimized
                  className="rounded"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <span className="text-xs font-mono text-gray-500">{size.label}</span>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {size.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
