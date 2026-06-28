import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jacqueline Surdell",
  description:
    "Jacqueline Surdell is a Chicago artist working in large-scale woven sculpture exploring industry, labor, body, and craft.",
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
