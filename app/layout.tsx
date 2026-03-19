import type { Metadata } from "next";
import "./globals.css";
import LanguageProvider from "@/components/language-provider";

export const metadata: Metadata = {
  title: "IconSnap — App Icon Resizer",
  description: "Generate Xcode-ready icon sets instantly from a single image",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
