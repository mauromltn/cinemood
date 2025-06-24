import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinemood",
  description: "Scopri film e serie TV perfetti per il tuo stato d'animo. Lascia che le tue emozioni guidino la tua prossima visione.",
  openGraph: {
    title: "Cinemood",
    description: "Scopri film e serie TV perfetti per il tuo stato d'animo. Lascia che le tue emozioni guidino la tua prossima visione.",
    url: "https://cinemood.it",
    images: [
      {
        url: "https://cinemood.it/og-image.png",
        width: 1470,
        height: 920,
        alt: "Cinemood",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <ClerkProvider>
      <html lang="it">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
