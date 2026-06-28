import Link from "next/link";
import works from "@/data/works.json";

type Work = {
  slug: string; title: string; year: string; medium: string;
  dimensions: string; images: string[];
};

export const metadata = { title: "Index — Jacqueline Surdell" };

const ALL = (works as Work[]).filter((w) => w.images.length > 0);

export default function IndexGrid() {
  return (
    <div className="index-wrap">
      <div className="index-name">
        <Link href="/">Jacqueline Surdell</Link>
        <Link href="/bio-cv" className="back">
          Bio / CV
        </Link>
      </div>
      <div className="indexgrid">
        {ALL.map((w) => (
          <Link href={`/work/${w.slug}`} key={w.slug} className="tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.images[0]} alt={w.title} loading="lazy" />
            <div className="tile-cap">
              <i>{w.title}</i>
              {w.year ? `, ${w.year}` : ""}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
