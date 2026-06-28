"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import works from "@/data/works.json";
import site from "@/data/site.json";

type Work = { slug: string; title: string; category: string };
type Cat = { key: string; label: string };

export default function RailNav() {
  const path = usePathname();
  const cats = site.categories as Cat[];
  const byCat = (key: string) =>
    (works as Work[]).filter((w) => w.category === key);

  return (
    <nav className="rail">
      <Link href="/" className="rail-name">
        Jacqueline Surdell
      </Link>
      <div className="hr" />
      <Link
        href="/all"
        className={`rail-all${path?.startsWith("/all") ? " active" : ""}`}
      >
        ALL
      </Link>

      {cats.map((c) => {
        const items = byCat(c.key);
        if (!items.length) return null;
        return (
          <div className="rail-group" key={c.key}>
            <div className="rail-cat">{c.label}</div>
            <div className="rail-items">
              {items.map((w) => (
                <Link
                  key={w.slug}
                  href={`/work/${w.slug}`}
                  className={`rail-link${
                    path === `/work/${w.slug}` ? " active" : ""
                  }`}
                >
                  {w.title}
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      <div className="rail-group">
        <div className="rail-cat">About</div>
        <div className="rail-items">
          <Link
            href="/bio-cv"
            className={`rail-link${path?.startsWith("/bio-cv") ? " active" : ""}`}
          >
            Bio / CV
          </Link>
          <Link
            href="/bio-cv"
            className={`rail-link${path?.startsWith("/bio-cv") ? " active" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
