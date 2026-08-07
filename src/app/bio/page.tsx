import RailNav from "@/components/RailNav";
import site from "@/data/site.json";

export const metadata = { title: "Bio — Jacqueline Surdell" };

export default function Bio() {
  const about = (site.about as string).split(/\n+/).filter(Boolean);
  const c = site.contact as Record<string, string>;
  const cvPdf = (site as { cvPdf?: string }).cvPdf;

  return (
    <div className="frame">
      <RailNav />
      <main className="main">
        <hr />
        <div className="bio-half">
          <div className="bio">
            <div className="col-label">Bio</div>
            {about.map((p, n) => (
              <p key={n}>{p}</p>
            ))}

            {cvPdf ? (
              <p className="cv-download">
                <a href={cvPdf} target="_blank" rel="noopener">
                  Download CV (PDF) ↗
                </a>
              </p>
            ) : null}

            <div className="col-label" style={{ marginTop: "2.4rem" }}>
              Contact
            </div>
            <div className="contact-links">
              <a href={`mailto:${c.email}`}>{c.email} ↗</a>
              {c.instagram ? (
                <a href={c.instagram} target="_blank" rel="noopener">
                  Instagram ↗
                </a>
              ) : null}
            </div>
          </div>

          {/* Right column is reserved for the Deyson / SB video once supplied. */}
          <aside className="bio-aside" />
        </div>
      </main>
    </div>
  );
}
