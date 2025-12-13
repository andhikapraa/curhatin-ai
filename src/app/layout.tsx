import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Curhatin AI - Teman Curhat AI yang Memahami Perasaanmu",
  themeColor: "#5DC998",
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
  },
  twitter: {
    card: "summary",
    title: "Curhatin AI - Teman Curhat AI yang Memahami Perasaanmu",
    description:
      "Ruang aman untuk berbagi perasaan tanpa judgement, dengan respons penuh empati.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${nunito.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
