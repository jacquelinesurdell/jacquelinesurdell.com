// Regenerates src/data/works.json from the per-project files in src/data/works/.
// Each project is its own file so Pages CMS can present them as a collection with
// a real "add project" button. Runs automatically before dev and build.
//
// This script is the guard rail between the CMS and the site: whatever subset of
// fields an editor saves, every record emitted here has the full shape the
// components expect.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data");
const worksDir = join(dataDir, "works");

const files = readdirSync(worksDir).filter((f) => f.endsWith(".json"));
if (files.length === 0) throw new Error(`No project files found in ${worksDir}`);

const raw = files.map((f) => {
  let work;
  try {
    work = JSON.parse(readFileSync(join(worksDir, f), "utf8"));
  } catch (err) {
    throw new Error(`Could not read project file ${f}: ${err.message}`);
  }
  return { ...work, slug: work.slug || f.replace(/\.json$/, "") };
});

// `order` fixes the curated sequence of existing projects. A project added from
// the CMS has no order, so it sorts to the top, newest first.
const rank = (w) => (typeof w.order === "number" ? w.order : -Infinity);
raw.sort((a, b) => {
  const [ra, rb] = [rank(a), rank(b)];
  if (ra !== rb) return ra - rb;
  if (ra !== -Infinity) return 0;
  if (b.yearNum !== a.yearNum) return (b.yearNum || 0) - (a.yearNum || 0);
  return (a.title || "").localeCompare(b.title || "");
});

const seen = new Set();
const works = raw.map((w) => {
  if (!w.title) throw new Error(`Project "${w.slug}" is missing a title.`);
  if (seen.has(w.slug)) throw new Error(`Two projects share the name "${w.slug}".`);
  seen.add(w.slug);

  const year = String(w.year ?? "");
  // `year` is the label shown on the page and may be a range; `yearNum` sorts.
  const yearNum = typeof w.yearNum === "number" ? w.yearNum : Number(year.match(/\d{4}/)?.[0]) || 0;

  const out = {
    slug: w.slug,
    title: w.title,
    year,
    yearNum,
    category: w.category || "sculpture",
    medium: w.medium || "",
    dimensions: w.dimensions || "",
    series: w.series || "",
    description: w.description || "",
  };
  if (w.venue) out.venue = w.venue;
  out.images = Array.isArray(w.images) ? w.images.filter(Boolean) : [];
  if (w.imageCaptions) out.imageCaptions = w.imageCaptions;
  out.sourceUrl = w.sourceUrl || "";
  out.featured = Boolean(w.featured);
  return out;
});

writeFileSync(join(dataDir, "works.json"), JSON.stringify(works, null, 2) + "\n");
console.log(`build-works: ${works.length} projects -> src/data/works.json`);
