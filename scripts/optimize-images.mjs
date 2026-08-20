// Shrinks the images in the exported site before it is published.
// Runs on ./out (the build output), never on the repo, so the originals
// uploaded through the CMS are always kept untouched in public/media.
// Filenames are preserved exactly, because works.json references them by name.
//
// Results are cached by source-file hash in .image-cache, which CI restores
// between runs, so a publish only pays to process newly uploaded images.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const root = process.argv[2] || "out/media";
const cacheDir = process.env.IMAGE_CACHE_DIR || ".image-cache";
const MAX_WIDTH = 2200;
const QUALITY = 82;
const VERSION = "v1"; // bump to invalidate every cached result

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

let files;
try {
  files = walk(root).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
} catch {
  console.log(`optimize-images: nothing at ${root}, skipping`);
  process.exit(0);
}

mkdirSync(cacheDir, { recursive: true });

async function optimize(buf, ext) {
  let pipeline = sharp(buf, { failOn: "none" }).rotate();
  const { width } = await sharp(buf).metadata();
  if (width && width > MAX_WIDTH) pipeline = pipeline.resize({ width: MAX_WIDTH });
  if (ext === ".png") return pipeline.png({ compressionLevel: 9 }).toBuffer();
  if (ext === ".webp") return pipeline.webp({ quality: QUALITY }).toBuffer();
  return pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
}

let before = 0;
let after = 0;
let processed = 0;
let cached = 0;

for (const file of files) {
  const source = readFileSync(file);
  before += source.length;
  const key = createHash("sha256").update(VERSION).update(source).digest("hex");
  const cachePath = join(cacheDir, `${key}${extname(file).toLowerCase()}`);

  if (existsSync(cachePath)) {
    const hit = readFileSync(cachePath);
    writeFileSync(file, hit);
    after += hit.length;
    cached++;
    continue;
  }

  try {
    const out = await optimize(source, extname(file).toLowerCase());
    // Never let "optimizing" make a file bigger.
    const best = out.length < source.length ? out : source;
    writeFileSync(file, best);
    writeFileSync(cachePath, best);
    after += best.length;
    processed++;
  } catch (err) {
    console.warn(`optimize-images: skipped ${file} (${err.message})`);
    after += source.length;
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
const saved = before > 0 ? Math.round((1 - after / before) * 100) : 0;
console.log(
  `optimize-images: ${files.length} images (${processed} processed, ${cached} from cache), ` +
    `${mb(before)}MB -> ${mb(after)}MB (${saved}% smaller)`
);
