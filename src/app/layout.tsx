import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../presentation/styles/globals.css";
import { UserProvider } from "@/presentation/context/UserContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "CloudNote - 생각을 포착하고, 삶을 정리하라",
    template: "%s | CloudNote",
  },
  description: "모든 기기에서 노트를 동기화하는 가장 빠른 방법. AI 기반 요약 및 정리 기능을 갖춘 깔끔한 작업 공간을 제공합니다.",
  openGraph: {
    title: "CloudNote - 생각을 포착하고, 삶을 정리하라",
    description: "모든 기기에서 노트를 동기화하는 가장 빠른 방법. AI 기반 요약 및 정리 기능을 갖춘 깔끔한 작업 공간을 제공합니다.",
    url: "/",
    siteName: "CloudNote",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CloudNote Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudNote - 생각을 포착하고, 삶을 정리하라",
    description: "모든 기기에서 노트를 동기화하는 가장 빠른 방법. AI 기반 요약 및 정리 기능을 갖춘 깔끔한 작업 공간을 제공합니다.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${manrope.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary/20 selection:text-primary min-h-screen flex flex-col">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
