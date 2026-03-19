"use client";

import { createContext, useContext } from "react";

export type Locale = "ko" | "en" | "de";

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  de: "Deutsch",
};

export const translations = {
  ko: {
    subtitle: "플랫폼을 선택하고 이미지를 업로드하면\nXcode용 아이콘 세트(Contents.json)를 즉시 생성합니다",
    generate: "아이콘 생성",
    generating: "아이콘 생성 중...",
    error: "이미지 처리 중 오류가 발생했습니다.",
    retry: "다시 시도",
    doneDesc: (count: number) => `${count}개 이미지 생성 완료 · AppIcon.appiconset 포함`,
    reupload: "다시 업로드",
    download: "ZIP 다운로드",
    dropzoneLabel: "이미지를 드래그하거나 클릭해서 업로드",
    dropzoneHint: "PNG, JPG, WEBP · 투명도 유지는 PNG 권장",
    dropzoneError: "PNG, JPG, WEBP 형식만 지원합니다.",
    platformTitle: "배포 플랫폼 선택",
    appstoreHint: "App Store 마케팅 아이콘 자동 포함",
    platformHint: "Universal (iPhone + iPad) 기본 선택 · 최소 1개 이상 선택 필요",
    preview: "미리보기",
    previewCount: (count: number) => `${count}개`,
  },
  en: {
    subtitle: "Select platforms and upload an image\nto instantly generate an Xcode icon set (Contents.json)",
    generate: "Generate Icons",
    generating: "Generating icons...",
    error: "An error occurred while processing the image.",
    retry: "Try Again",
    doneDesc: (count: number) => `${count} images generated · AppIcon.appiconset included`,
    reupload: "Upload Again",
    download: "Download ZIP",
    dropzoneLabel: "Drag & drop or click to upload",
    dropzoneHint: "PNG, JPG, WEBP · PNG recommended for transparency",
    dropzoneError: "Only PNG, JPG, and WEBP formats are supported.",
    platformTitle: "Select Target Platforms",
    appstoreHint: "App Store marketing icon included automatically",
    platformHint: "Universal (iPhone + iPad) selected by default · At least one required",
    preview: "Preview",
    previewCount: (count: number) => `${count} files`,
  },
  de: {
    subtitle: "Plattform auswählen und Bild hochladen,\num sofort ein Xcode-Icon-Set (Contents.json) zu erstellen",
    generate: "Icons erstellen",
    generating: "Icons werden erstellt...",
    error: "Beim Verarbeiten des Bildes ist ein Fehler aufgetreten.",
    retry: "Erneut versuchen",
    doneDesc: (count: number) => `${count} Bilder erstellt · AppIcon.appiconset enthalten`,
    reupload: "Erneut hochladen",
    download: "ZIP herunterladen",
    dropzoneLabel: "Bild hierher ziehen oder klicken",
    dropzoneHint: "PNG, JPG, WEBP · PNG für Transparenz empfohlen",
    dropzoneError: "Nur PNG, JPG und WEBP werden unterstützt.",
    platformTitle: "Zielplattformen auswählen",
    appstoreHint: "App Store Marketing-Icon wird automatisch einbezogen",
    platformHint: "Universal (iPhone + iPad) standardmäßig ausgewählt · Mindestens eine Plattform erforderlich",
    preview: "Vorschau",
    previewCount: (count: number) => `${count} Dateien`,
  },
} satisfies Record<Locale, Record<string, string | ((n: number) => string)>>;

export type Translations = typeof translations.ko;

export interface LangContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

export const LangContext = createContext<LangContextValue>({
  locale: "ko",
  setLocale: () => {},
  t: translations.ko,
});

export function useLang() {
  return useContext(LangContext);
}
