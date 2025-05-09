import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./[locale]/globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Runa Code",
  description:
    "Innovative technological solutions and custom software development. We transform ideas into high-performance web and mobile applications to drive your business forward.",
  metadataBase: new URL("https://runa-code.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/logos/runa-logo.png",
  },
  openGraph: {
    images: [
      {
        url: "/logos/runa-logo.png",
        width: 1200,
        height: 630,
        alt: "Runa Code Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
