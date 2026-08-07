import RailNav from "@/components/RailNav";
import site from "@/data/site.json";

export const metadata = { title: "Texts — Jacqueline Surdell" };

type PressItem = {
  year: string;
  title: string;
  publication: string;
  author: string;
  url: string;
};

export default function Texts() {
  const press = ((site.cv as { press?: PressItem[] }).press ?? []) as PressItem[];

  // Grouped by year so the most recent writing reads first.
  const years = [...new Set(press.map((p) => p.year))].sort((a, b) => b.localeCompare(a));

  return (
    <div className="frame">
      <RailNav />
      <main className="main">
        <hr />
        <div className="col-label">Texts</div>
        <p className="texts-intro">
          Reviews, press, interviews, and other writing about the work.
        </p>

        {years.map((year) => (
          <section className="texts-year" key={year}>
            <div className="texts-year-label">{year}</div>
            <ul className="texts-list">
              {press
                .filter((p) => p.year === year)
                .map((p, n) => (
                  <li key={n}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener">
                        {p.title} ↗
                      </a>
                    ) : (
                      <span>{p.title}</span>
                    )}
                    <span className="texts-meta">
                      {p.publication}
                      {p.author ? `, ${p.author}` : ""}
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
