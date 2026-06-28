"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import works from "@/data/works.json";
import site from "@/data/site.json";

type Work = { slug: string; title: string; category: string };
type Cat = { key: string; label: string };

export default function RailNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const cats = site.categories as Cat[];
  const byCat = (key: string) =>
    (works as Work[]).filter((w) => w.category === key);
  const active = (href: string) => (path === href ? " active" : "");

  const Groups = () => (
    <>
      <Link href="/all" className={`rail-link rail-all${active("/all")}`}>
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
                  className={`rail-link${active(`/work/${w.slug}`)}`}
                  onClick={() => setOpen(false)}
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
          <Link href="/bio-cv" className={`rail-link${active("/bio-cv")}`} onClick={() => setOpen(false)}>
            Bio / CV
          </Link>
          <Link href="/bio-cv" className={`rail-link${active("/bio-cv")}`} onClick={() => setOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop right rail: static header (name + rule) + scrolling list */}
      <nav className="rail">
        <div className="rail-top">
          <Link href="/" className="rail-name">
            Jacqueline Surdell
          </Link>
          <div className="hr" />
        </div>
        <div className="rail-scroll">
          <Groups />
        </div>
      </nav>

      {/* Mobile top bar + slide-down index */}
      <div className="mbar">
        <Link href="/" className="mbar-name" onClick={() => setOpen(false)}>
          Jacqueline Surdell
        </Link>
        <button
          className="mbar-toggle"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Index"}
        </button>
      </div>
      {open ? (
        <div className="msheet" onClick={() => setOpen(false)}>
          <nav className="msheet-inner" onClick={(e) => e.stopPropagation()}>
            <Groups />
          </nav>
        </div>
      ) : null}
    </>
  );
}
