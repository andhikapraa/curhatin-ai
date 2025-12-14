import type { Metadata, Viewport } from "next";
import { Nunito, Poppins } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5DC998",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://curhatin-ai.prasetya.dev"),
  title: {
    default: "Curhatin AI - Teman Curhat AI yang Memahami Perasaanmu",
    template: "%s | Curhatin AI",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "Curhatin AI adalah teman AI yang selalu siap mendengarkan curhatanmu kapan saja. Ruang aman untuk berbagi perasaan tanpa judgement, dengan respons penuh empati.",
  keywords: [
    "curhat",
    "AI",
    "mental health",
    "kesehatan mental",
    "emotional support",
    "Indonesia",
  ],
  authors: [{ name: "Curhatin AI Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Curhatin AI - Teman Curhat AI yang Memahami Perasaanmu",
    description:
      "Ruang aman untuk berbagi perasaan tanpa judgement, dengan respons penuh empati.",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Curhatin AI - Tempat Aman untuk Menenangkan Pikiranmu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curhatin AI - Teman Curhat AI yang Memahami Perasaanmu",
    description:
      "Ruang aman untuk berbagi perasaan tanpa judgement, dengan respons penuh empati.",
    images: ["/og/home.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://curhatin-ai.prasetya.dev/#organization",
      name: "Curhatin AI",
      url: "https://curhatin-ai.prasetya.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://curhatin-ai.prasetya.dev/apple-touch-icon.png",
      },
      description:
        "Teman AI yang selalu siap mendengarkan curhatanmu kapan saja dengan empati tulus.",
    },
    {
      "@type": "WebSite",
      "@id": "https://curhatin-ai.prasetya.dev/#website",
      url: "https://curhatin-ai.prasetya.dev",
      name: "Curhatin AI",
      publisher: {
        "@id": "https://curhatin-ai.prasetya.dev/#organization",
      },
      inLanguage: "id-ID",
    },
    {
      "@type": "WebPage",
      "@id": "https://curhatin-ai.prasetya.dev/#webpage",
      url: "https://curhatin-ai.prasetya.dev",
      name: "Curhatin AI - Teman Curhat AI yang Memahami Perasaanmu",
      description:
        "Ruang aman untuk berbagi perasaan tanpa judgement, dengan respons penuh empati.",
      isPartOf: {
        "@id": "https://curhatin-ai.prasetya.dev/#website",
      },
      about: {
        "@id": "https://curhatin-ai.prasetya.dev/#organization",
      },
      inLanguage: "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <Script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          id="json-ld"
          type="application/ld+json"
        />
      </head>
      <body
        className={`${poppins.variable} ${nunito.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
