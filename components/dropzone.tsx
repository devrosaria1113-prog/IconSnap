"use client";

import { useCallback, useState } from "react";
import { ImageUp } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface DropzoneProps {
  onImageSelect: (file: File) => void;
}

export default function Dropzone({ onImageSelect }: DropzoneProps) {
  const { t } = useLang();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      setError(null);
      const validTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError(t.dropzoneError);
        return;
      }
      onImageSelect(file);
    },
    [onImageSelect, t]
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
      <ImageUp className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
      <p className="text-gray-600 font-medium">{t.dropzoneLabel}</p>
      <p className="text-sm text-gray-400">{t.dropzoneHint}</p>
      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
    </div>
  );
}
