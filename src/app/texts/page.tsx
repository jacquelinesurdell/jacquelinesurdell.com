import type { Metadata } from "next";

// The page moved to /press. Kept so any existing link to /texts still lands
// somewhere useful rather than 404ing.
export const metadata: Metadata = {
  title: "Press — Jacqueline Surdell",
  robots: { index: false, follow: false },
};

export default function TextsMoved() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/press/" />
        <link rel="canonical" href="/press/" />
      </head>
      <body style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", padding: "2rem" }}>
        <p>
          This page is now at <a href="/press/">Press</a>.
        </p>
      </body>
    </html>
  );
}
