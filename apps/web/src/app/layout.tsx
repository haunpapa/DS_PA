import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DS PA | 부동산 입지 분석 보고서",
  description:
    "Gemini 분석과 Claude 문서 구조화를 기반으로 PDF형 부동산 입지 분석 보고서를 제공하는 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
