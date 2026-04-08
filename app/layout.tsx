import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OK금융그룹 해외연수 포털",
  description: "2026 OK금융그룹 해외연수 대상자 포털 - 참석 확인, 여권 제출, 공지 확인",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
