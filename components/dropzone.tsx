"use client";

import { useCallback, useState } from "react";

interface DropzoneProps {
  onImageSelect: (file: File) => void;
}

export default function Dropzone({ onImageSelect }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      setError(null);
      const validTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("PNG, JPG, WEBP 형식만 지원합니다.");
        return;
      }
      if (file.type !== "image/png") {
        // 알림은 하되 차단하지는 않음
      }
      onImageSelect(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSelect(file);
    },
    [validateAndSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSelect(file);
      e.target.value = "";
    },
    [validateAndSelect]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center justify-center gap-3
        w-full max-w-xl mx-auto h-56 rounded-2xl border-2 border-dashed
        transition-colors cursor-pointer
        ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50"}
      `}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileInput}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div className="text-4xl select-none">🖼️</div>
      <p className="text-gray-600 font-medium">
        이미지를 드래그하거나 클릭해서 업로드
      </p>
      <p className="text-sm text-gray-400">PNG, JPG, WEBP · 투명도 유지는 PNG 권장</p>
      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
