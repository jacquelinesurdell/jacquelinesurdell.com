"use client";

import { useState } from "react";
import Link from "next/link";
import worksData from "@/data/works.json";

type Work = { slug: string; title: string; category: string; images: string[] };

const WORKS = (worksData as Work[]).filter((w) => w.images.length > 0);

function catLabel(c: string) {
  return c
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");
}

export default function WorkViewer() {
  const [i, setI] = useState(0);
  const w = WORKS[i];
  const go = (d: number) => setI((i + d + WORKS.length) % WORKS.length);
  if (!w) return null;

  return (
    <main className="min-h-screen px-6 md:px-10 py-8 flex flex-col text-[13px] leading-relaxed">
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

      <section className="mt-16 max-w-3xl">
        <h1 className="text-[26px] md:text-[32px] tracking-tight">{w.title}</h1>
        <p className="mt-4 text-[var(--muted-foreground)]">{catLabel(w.category)}</p>
        <p className="mt-2">
          <Link href={`/work/${w.slug}`} className="text-[var(--muted-foreground)] hover:text-[var(--accent)]">
            View project &#8599;
          </Link>
        </p>
        <hr className="mt-8 border-[var(--border)]" />
      </section>

      <figure className="mt-8 max-w-5xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.images[0]} alt={w.title} className="w-full h-auto border border-[var(--border)]" />
        <figcaption className="mt-2 text-[var(--muted-foreground)]">
          {w.title}. Cotton rope, steel.
        </figcaption>
      </figure>

      <footer className="mt-auto pt-20 flex items-end justify-between text-[var(--muted-foreground)]">
        <nav className="flex gap-6">
          <Link href="/work" className="hover:text-[var(--accent)]">Work</Link>
          <Link href="/cv" className="hover:text-[var(--accent)]">CV</Link>
          <Link href="/about" className="hover:text-[var(--accent)]">About</Link>
          <a href="mailto:jacquelinesurdell@gmail.com" className="hover:text-[var(--accent)]">Contact</a>
        </nav>
        <span>
          {i + 1} / {WORKS.length}
        </span>
      </footer>
    </main>
  );
}
