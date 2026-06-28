import type { Metadata, Viewport } from "next";
import "./globals.css";
import works from "@/data/works.json";

type Work = { yearNum: number; title: string; images: string[] };

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";
const DESC =
  "Jacqueline Surdell is a Chicago artist working in large-scale woven sculpture exploring industry, labor, body, and craft.";

// Hero = first image of the most recent project (highest year) that has images.
const recent = [...(works as Work[])]
  .filter((w) => w.images?.length)
  .sort((a, b) => (b.yearNum || 0) - (a.yearNum || 0))[0];
const hero = recent && SITE ? `${SITE}${recent.images[0]}` : undefined;

export const metadata: Metadata = {
  metadataBase: SITE ? new URL(SITE) : undefined,
  title: "Jacqueline Surdell",
  description: DESC,
  openGraph: {
    type: "website",
    siteName: "Jacqueline Surdell",
    title: "Jacqueline Surdell",
    description: DESC,
    url: SITE || undefined,
    images: hero ? [{ url: hero, alt: "Jacqueline Surdell" }] : [],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacqueline Surdell",
    description: DESC,
    images: hero ? [hero] : [],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
