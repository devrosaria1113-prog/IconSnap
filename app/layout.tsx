import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IconSnap — 앱 아이콘 리사이저",
  description: "이미지를 업로드하면 8가지 사이즈로 리사이징 후 ZIP으로 다운로드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
