import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Header from "./components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REST Countries API with color theme switcher",
  description: "A simple REST Countries API with color theme switcher",
  metadataBase: new URL('https://rest-countries-khaki-kappa.vercel.app/'),
  openGraph: {
    title: "REST Countries API with color theme switcher",
    siteName: "REST Countries API with color theme switcher",
    type: "website",
    url: "https://rest-countries-khaki-kappa.vercel.app/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Country flags",
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition duration-500`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
