import Link from "next/link";
import { notFound } from "next/navigation";
import worksData from "@/data/works.json";

type Work = { slug: string; title: string; category: string; images: string[] };

const WORKS = (worksData as Work[]).filter((w) => w.images.length > 0);
const label = (c: string) =>
  c.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ");

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = WORKS.find((x) => x.slug === slug);
  return { title: w ? `${w.title} — Jacqueline Surdell` : "Jacqueline Surdell" };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = WORKS.find((x) => x.slug === slug);
  if (!w) notFound();

  return (
    <main className="px-6 md:px-10 py-8 text-[13px] leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        <aside className="md:col-span-2 order-2 md:order-1">
          <div className="md:sticky md:top-8">
            <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
              {label(w.category)}
            </p>
            <Link
              href="/work"
              className="mt-3 inline-block text-[var(--muted-foreground)] hover:text-[var(--accent)]"
            >
              &larr; All work
            </Link>
          </div>
        </aside>

        <section className="md:col-span-7 order-1 md:order-2">
          <h1 className="text-[26px] md:text-[32px] tracking-tight">{w.title}</h1>
          <p className="mt-3 text-[var(--muted-foreground)]">Cotton rope, steel.</p>
          <hr className="mt-6 border-[var(--border)]" />
          <div className="mt-8 space-y-10">
            {w.images.map((src, n) => (
              <figure key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${w.title} (${n + 1})`}
                  className="w-full h-auto border border-[var(--border)]"
                />
              </figure>
            ))}
          </div>
        </section>

        <nav className="md:col-span-3 order-3">
          <div className="md:sticky md:top-8 md:text-right">
            <Link href="/" className="text-[15px] font-medium tracking-tight">
              Jacqueline Surdell
            </Link>
          </div>
        </nav>
      </div>
    </main>
  );
}
