import RailNav from "@/components/RailNav";
import site from "@/data/site.json";
import { asset } from "@/lib/asset";

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

          <aside className="bio-aside">
            {/* Process video. Transcoded from a 1.84 GB 4K master to 720p so the
                page stays usable; preload="metadata" means only a few KB load
                until someone presses play. */}
            <figure className="bio-video">
              <video
                controls
                preload="metadata"
                playsInline
                poster={asset("/media/surdell-process-poster.jpg")}
                width={1280}
                height={720}
              >
                <source src={asset("/media/surdell-process-720p.mp4")} type="video/mp4" />
                Your browser cannot play this video.
              </video>
              <figcaption>In the studio</figcaption>
            </figure>
          </aside>
        </div>
      </main>
    </div>
  );
}
