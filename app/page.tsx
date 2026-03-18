"use client";

import { useState, useCallback } from "react";
import Dropzone from "@/components/dropzone";
import IconPreviewGrid from "@/components/icon-preview-grid";
import { resizeImage, type ResizedIcon } from "@/lib/resize";
import { downloadZip } from "@/lib/download";

type Status = "idle" | "processing" | "done" | "error";

export default function Home() {
  const [icons, setIcons] = useState<ResizedIcon[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [originalName, setOriginalName] = useState<string>("");

  const handleImageSelect = useCallback(async (file: File) => {
    setStatus("processing");
    setOriginalName(file.name.replace(/\.[^/.]+$/, ""));
    try {
      const resized = await resizeImage(file);
      setIcons(resized);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }, []);

  const handleDownload = useCallback(async () => {
    await downloadZip(icons);
  }, [icons]);

  const handleReset = useCallback(() => {
    setIcons([]);
    setStatus("idle");
    setOriginalName("");
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Icon<span className="text-indigo-600">Snap</span>
        </h1>
        <p className="text-gray-500">
          이미지를 업로드하면 8가지 사이즈의 아이콘을 즉시 생성합니다
        </p>
      </div>

      {/* Upload */}
      {status === "idle" && (
        <Dropzone onImageSelect={handleImageSelect} />
      )}

      {/* Processing */}
      {status === "processing" && (
        <div className="flex flex-col items-center justify-center gap-3 h-56">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">리사이징 중...</p>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="flex flex-col items-center gap-4 h-56 justify-center">
          <p className="text-red-500 font-medium">이미지 처리 중 오류가 발생했습니다.</p>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* Done */}
      {status === "done" && (
        <div className="flex flex-col gap-6">
          {/* Action bar */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
            <div>
              <p className="font-medium text-gray-800">{originalName}</p>
              <p className="text-sm text-gray-400">8가지 사이즈 생성 완료</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                다시 업로드
              </button>
              <button
                onClick={handleDownload}
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <span>ZIP 다운로드</span>
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
