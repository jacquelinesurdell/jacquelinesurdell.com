// Regenerates src/data/works.json from the per-project files in src/data/works/.
// Each project is its own file so Pages CMS can present them as a collection with
// a real "add project" button. Runs automatically before dev and build.
//
// This script is the guard rail between the CMS and the site: whatever subset of
// fields an editor saves, every record emitted here has the full shape the
// components expect.
//
// Pages CMS rewrites a project file with ONLY the fields declared in .pages.yml,
// so any field kept there but not declared is deleted on the first save. Fields
// we want to keep but not show her live in src/data/works-archive.json, which the
// CMS never opens, and are merged back in here by slug.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data");
const worksDir = join(dataDir, "works");

// Fields the CMS is not allowed to touch, keyed by slug. See works-archive.json.
const archive = JSON.parse(readFileSync(join(dataDir, "works-archive.json"), "utf8"));
delete archive._note;

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

// "On the website" is her reversible stand-in for deleting a project. A hidden
// project is dropped from works.json, which takes it off the home page, out of the
// side navigation and stops its own page being generated, while the file, its
// images and its archive entry all stay in the repository.
const hidden = raw.filter((w) => w.visible === false);
const visible = raw.filter((w) => w.visible !== false);
if (hidden.length > 0) {
  console.log(
    `build-works: ${hidden.length} project(s) turned off and left out of the site: ` +
      hidden.map((w) => w.slug).join(", ")
  );
}
if (visible.length === 0) {
  console.warn("build-works: every project is turned off, so the site will have no work on it.");
}

const seen = new Set();
const works = visible.map((w) => {
  if (!w.title) throw new Error(`Project "${w.slug}" is missing a title.`);
  if (seen.has(w.slug)) throw new Error(`Two projects share the name "${w.slug}".`);
  seen.add(w.slug);

  const year = String(w.year ?? "");
  // `year` is the label shown on the page and may be a range; `yearNum` sorts.
  const yearNum = typeof w.yearNum === "number" ? w.yearNum : Number(year.match(/\d{4}/)?.[0]) || 0;

  // The project file wins if it still carries the field; otherwise fall back to
  // the archive, which is where these live now that the CMS strips them.
  const kept = archive[w.slug] || {};

  const out = {
    slug: w.slug,
    title: w.title,
    year,
    yearNum,
    category: w.category || "sculpture",
    medium: w.medium || "",
    dimensions: w.dimensions || "",
    series: w.series || kept.series || "",
    description: w.description || "",
  };
  if (w.venue) out.venue = w.venue;
  out.images = Array.isArray(w.images) ? w.images.filter(Boolean) : [];
  const imageCaptions = w.imageCaptions || kept.imageCaptions;
  if (imageCaptions) out.imageCaptions = imageCaptions;
  out.sourceUrl = w.sourceUrl || kept.sourceUrl || "";
  out.featured = Boolean(w.featured);
  return out;
});

// A stale archive entry means a project file was renamed or removed. Warn rather
// than fail, so a rename never blocks a publish, but leave a trail.
const allSlugs = new Set(raw.map((w) => w.slug));
const orphans = Object.keys(archive).filter((slug) => !allSlugs.has(slug));
if (orphans.length > 0) {
  console.warn(
    `build-works: works-archive.json has no matching project for ${orphans.join(", ")}. ` +
      `If a project was renamed, move its archive entry to the new name.`
  );
}

writeFileSync(join(dataDir, "works.json"), JSON.stringify(works, null, 2) + "\n");
console.log(`build-works: ${works.length} projects -> src/data/works.json`);
