import RailNav from "@/components/RailNav";
import site from "@/data/site.json";

export const metadata = { title: "Bio / CV — Jacqueline Surdell" };

type CV = { education: string[]; projects_exhibitions: string[]; press: string[] };

const isHeader = (s: string) =>
  s === s.toUpperCase() && /[A-Z]/.test(s) && s.length < 40;

export default function BioCV() {
  const about = (site.about as string).split(/\n+/).filter(Boolean);
  const cv = site.cv as CV;
  const c = site.contact as Record<string, string>;

  return (
    <div className="frame">
      <RailNav />
      <main className="main">
        <hr />
        <div className="bio-cols">
          {/* Bio */}
          <div className="bio">
            <div className="col-label">Bio</div>
            {about.map((p, n) => (
              <p key={n}>{p}</p>
            ))}
          </div>

          {/* CV */}
          <div>
            <div className="col-label">CV</div>
            <div className="cv-block">
              <strong>Education</strong>
              <br />
              {cv.education.map((e, n) => (
                <div key={n}>{e}</div>
              ))}
              <br />
              <strong>Selected Projects &amp; Exhibitions</strong>
              <br />
              {cv.projects_exhibitions.map((e, n) =>
                isHeader(e) ? (
                  <div key={n} style={{ marginTop: ".6rem", color: "rgba(0,0,0,0.45)" }}>
                    {e}
                  </div>
                ) : (
                  <div key={n}>{e}</div>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="col-label">Contact</div>
            <div className="contact-links">
              <a href={`mailto:${c.email}`}>Email ↗</a>
              {c.instagram ? (
                <a href={c.instagram} target="_blank" rel="noopener">Instagram ↗</a>
              ) : null}
              {c.twitter ? (
                <a href={c.twitter} target="_blank" rel="noopener">Twitter ↗</a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Press (full width) */}
        {cv.press?.length ? (
          <>
            <hr />
            <div className="col-label">Press</div>
            <div className="cv-block" style={{ columns: 2, columnGap: "2.4rem" }}>
              {cv.press.map((e, n) =>
                /^\d{4}/.test(e) ? (
                  <div key={n} style={{ marginTop: ".6rem", color: "rgba(0,0,0,0.45)" }}>
                    {e}
                  </div>
                ) : (
                  <div key={n}>{e}</div>
                )
              )}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
