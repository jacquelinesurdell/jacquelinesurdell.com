import Link from "next/link";
import RailNav from "@/components/RailNav";
import { asset } from "@/lib/asset";
import works from "@/data/works.json";

type Work = {
  slug: string; title: string; year: string; category: string;
  medium: string; dimensions: string; series: string; description: string;
  images: string[]; sourceUrl: string;
};

const ALL = works as Work[];

export default function WorkView({ slug }: { slug: string }) {
  const i = ALL.findIndex((w) => w.slug === slug);
  const w = ALL[i];
  if (!w) return null;
  const prev = ALL[(i - 1 + ALL.length) % ALL.length];
  const next = ALL[(i + 1) % ALL.length];

  return (
    <div className="frame">
      <RailNav />
      <main className="main">
        {/* top band: prev/next arrows at right (matches reference) */}
        <div className="work-top">
          <nav className="arrows">
            <Link href={`/work/${prev.slug}`} aria-label="Previous">&larr;</Link>
            <Link href={`/work/${next.slug}`} aria-label="Next">&rarr;</Link>
          </nav>
        </div>

        <hr />

        <div className="work-head">
          <h1 className="work-title">{w.title}</h1>
          <div className="work-meta">
            {[w.year, w.medium, w.dimensions].filter(Boolean).join("\n")}
          </div>
        </div>

        {w.description && w.category === "exhibition" ? (
          <p className="work-desc">{w.description}</p>
        ) : null}

        <hr />

        <div className="gallery">
          {w.images.map((src, n) => (
            <figure className="fig" key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(src)} alt={`${w.title} (${n + 1})`} loading="lazy" />
              {n === 0 ? (
                <figcaption>
                  <i>{w.title}</i>
                  {w.year ? `, ${w.year}` : ""}
                  {w.medium ? `. ${w.medium}` : ""}
                  {w.dimensions ? `, ${w.dimensions}` : ""}
                </figcaption>
              ) : null}
            </figure>
          ))}
          {w.images.length === 0 && w.description ? (
            <p className="work-desc" style={{ marginTop: 0 }}>{w.description}</p>
          ) : null}
        </div>

        <div className="work-foot">
          <span className="counter">{i + 1} / {ALL.length}</span>
          <nav className="arrows">
            <Link href={`/work/${prev.slug}`} aria-label="Previous">&larr;</Link>
            <Link href={`/work/${next.slug}`} aria-label="Next">&rarr;</Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
