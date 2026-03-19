"use client";

import { useState, useCallback } from "react";
import Dropzone from "@/components/dropzone";
import IconPreviewGrid from "@/components/icon-preview-grid";
import PlatformSelector from "@/components/platform-selector";
import LanguageSwitcher from "@/components/language-switcher";
import { resizeImage, type ResizedIcon } from "@/lib/resize";
import { downloadZip } from "@/lib/download";
import { useLang } from "@/lib/i18n";
import type { Platform } from "@/lib/icon-sizes";

type Status = "idle" | "processing" | "done" | "error";

const DEFAULT_PLATFORMS: Platform[] = ["iphone", "ipad"];

export default function Home() {
  const { t } = useLang();
  const [icons, setIcons] = useState<ResizedIcon[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [originalName, setOriginalName] = useState<string>("");
  const [platforms, setPlatforms] = useState<Platform[]>(DEFAULT_PLATFORMS);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    setPendingFile(file);
    setOriginalName(file.name.replace(/\.[^/.]+$/, ""));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!pendingFile) return;
    setStatus("processing");
    try {
      const resized = await resizeImage(pendingFile, platforms);
      setIcons(resized);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }, [pendingFile, platforms]);

  const handleDownload = useCallback(async () => {
    await downloadZip(icons, platforms);
  }, [icons, platforms]);

  const handleReset = useCallback(() => {
    setIcons([]);
    setStatus("idle");
    setOriginalName("");
    setPendingFile(null);
    setPlatforms(DEFAULT_PLATFORMS);
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10 relative">
        <div className="absolute right-0 top-0">
          <LanguageSwitcher />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Icon<span className="text-indigo-600">Snap</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto whitespace-pre-line">{t.subtitle}</p>
      </div>

      {/* Step 1 + 2: 업로드 & 플랫폼 선택 */}
      {status === "idle" && (
        <div className="flex flex-col gap-8">
          <Dropzone onImageSelect={handleImageSelect} />

          {pendingFile && (
            <>
              <PlatformSelector selected={platforms} onChange={setPlatforms} />
              <div className="flex justify-center">
                <button
                  onClick={handleGenerate}
                  className="px-8 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  {t.generate}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Processing */}
      {status === "processing" && (
        <div className="flex flex-col items-center justify-center gap-3 h-56">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">{t.generating}</p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="flex flex-col items-center gap-4 h-56 justify-center">
          <p className="text-red-500 font-medium">{t.error}</p>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            {t.retry}
          </button>
        </div>
      )}

      {/* Done */}
      {status === "done" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
            <div>
              <p className="font-medium text-gray-800">{originalName}</p>
              <p className="text-sm text-gray-400">{t.doneDesc(icons.length)}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t.reupload}
              </button>
              <button
                onClick={handleDownload}
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <span>{t.download}</span>
                <span>↓</span>
              </button>
            </div>
          </div>

          <IconPreviewGrid icons={icons} />
        </div>
      )}
    </main>
  );
}
