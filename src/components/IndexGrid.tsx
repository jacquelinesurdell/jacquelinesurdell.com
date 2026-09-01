import Link from "next/link";
import { asset } from "@/lib/asset";
import works from "@/data/works.json";
import site from "@/data/site.json";

type Work = {
  slug: string; title: string; year: string; medium: string;
  dimensions: string; images: string[];
};

const ALL = (works as Work[]).filter((w) => w.images.length > 0);

const cvPdf = (site as { cvPdf?: string }).cvPdf || "/JacquelineSurdell-CV.pdf";

export default function IndexGrid() {
  return (
    <div className="index-wrap">
      <div className="index-name">
        <Link href="/">Jacqueline Surdell</Link>
        <span className="back">
          <Link href="/bio">Bio</Link>
          {" / "}
          <a href={cvPdf} target="_blank" rel="noopener">CV</a>
        </span>
      </div>
      <div className="indexgrid">
        {ALL.map((w) => (
          <Link href={`/work/${w.slug}`} key={w.slug} className="tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(w.images[0])} alt={w.title} loading="lazy" />
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
