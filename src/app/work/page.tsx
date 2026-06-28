import Link from "next/link";
import IndexNav from "@/components/IndexNav";
import worksData from "@/data/works.json";

export const metadata = { title: "Work — Jacqueline Surdell" };

type Work = { slug: string; title: string; category: string; images: string[] };

const ORDER = ["installation", "sculpture", "works-on-paper", "photography", "performance", "video"];
const label = (c: string) =>
  c.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" ");

export default function Work() {
  const works = (worksData as Work[]).filter((w) => w.images.length > 0);
  const byCat = ORDER.map((cat) => ({
    cat,
    items: works.filter((w) => w.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <main className="px-6 md:px-10 py-8 text-[13px] leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        <aside className="md:col-span-2 order-2 md:order-1">
          <div className="md:sticky md:top-8">
            <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Work</p>
          </div>
        </aside>

        <section className="md:col-span-7 order-1 md:order-2 space-y-16">
          {byCat.map((g) => (
            <div key={g.cat}>
              <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)] mb-5">
                {label(g.cat)}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                {g.items.map((w) => (
                  <Link key={w.slug} href={`/work/${w.slug}`} className="group block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.images[0]}
                      alt={w.title}
                      className="w-full h-auto border border-[var(--border)]"
                    />
                    <p className="mt-2 text-[var(--foreground)] group-hover:text-[var(--accent)]">
                      {w.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <IndexNav />
      </div>
    </main>
  );
}
