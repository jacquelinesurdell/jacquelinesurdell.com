"use client";

import { useState } from "react";
import Link from "next/link";

type Work = {
  title: string;
  context?: string;
  dates?: string;
  link?: { label: string; href: string };
  img: string;
  caption: string;
};

// Jacqueline Surdell's works. Layout/format mirrors a standard artist work-viewer:
// title, context, dates, optional link, image, gallery-label caption, prev/next.
const WORKS: Work[] = [
  {
    title: "Heaven",
    context: "Installation",
    img: "/images/heaven-installation.jpg",
    caption: "Heaven. Cotton rope, steel. Installation view.",
  },
  {
    title: "Dear William Leonard Pereira",
    context: "Installation",
    img: "/images/dear-william.jpg",
    caption: "Dear William Leonard Pereira. Cotton rope, steel. Installation view.",
  },
  {
    title: "Examination of Workroom",
    context: "Installation",
    img: "/images/examination-workroom.jpg",
    caption: "Examination of Workroom. Cotton rope, steel. Installation view.",
  },
  {
    title: "Tectonic Cord",
    context: "Installation",
    img: "/images/tectonic-cord.jpg",
    caption: "Tectonic Cord. Cotton rope, steel.",
  },
  {
    title: "How High Is Too High",
    context: "Sculpture",
    img: "/images/how-high.jpg",
    caption: "How High Is Too High. Cotton rope, steel.",
  },
  {
    title: "Let's Be Stars",
    context: "Sculpture",
    img: "/images/lets-be-stars.jpg",
    caption: "Let's Be Stars. Cotton rope, steel.",
  },
];

export default function WorkViewer() {
  const [i, setI] = useState(0);
  const w = WORKS[i];
  const go = (d: number) => setI((i + d + WORKS.length) % WORKS.length);

  return (
    <main className="min-h-screen px-6 md:px-10 py-8 flex flex-col text-[13px] leading-relaxed">
      {/* top bar: name + prev/next */}
      <header className="flex items-start justify-between">
        <Link href="/" className="text-[15px] font-medium tracking-tight">
          Jacqueline Surdell
        </Link>
        <div className="flex gap-6 text-[var(--muted-foreground)]">
          <button onClick={() => go(-1)} aria-label="Previous work" className="hover:text-[var(--accent)]">
            &larr;
          </button>
          <button onClick={() => go(1)} aria-label="Next work" className="hover:text-[var(--accent)]">
            &rarr;
          </button>
        </div>
      </header>

      {/* work info */}
      <section className="mt-16 max-w-3xl">
        <h1 className="text-[26px] md:text-[32px] tracking-tight">{w.title}</h1>
        {w.context && <p className="mt-4 text-[var(--muted-foreground)]">{w.context}</p>}
        {w.dates && <p className="mt-1 text-[var(--muted-foreground)]">{w.dates}</p>}
        {w.link && (
          <p className="mt-2">
            <a href={w.link.href} className="text-[var(--muted-foreground)] hover:text-[var(--accent)]">
              {w.link.label} &#8599;
            </a>
          </p>
        )}
        <hr className="mt-8 border-[var(--border)]" />
      </section>

      {/* image + caption */}
      <figure className="mt-8 max-w-5xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.img} alt={w.title} className="w-full h-auto border border-[var(--border)]" />
        <figcaption className="mt-2 text-[var(--muted-foreground)]">{w.caption}</figcaption>
      </figure>

      {/* footer nav */}
      <footer className="mt-auto pt-20 flex items-end justify-between text-[var(--muted-foreground)]">
        <nav className="flex gap-6">
          <Link href="/work" className="hover:text-[var(--accent)]">Work</Link>
          <Link href="/cv" className="hover:text-[var(--accent)]">CV</Link>
          <Link href="/about" className="hover:text-[var(--accent)]">About</Link>
          <a href="mailto:jacquelinesurdell@gmail.com" className="hover:text-[var(--accent)]">Contact</a>
        </nav>
        <span>{i + 1} / {WORKS.length}</span>
      </footer>
    </main>
  );
}
