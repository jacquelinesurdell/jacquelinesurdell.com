#!/usr/bin/env python3
"""Build src/data/works.json + site.json from /tmp/jax-content.json and download images."""
import json, os, re, sys, urllib.request, hashlib
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = "/tmp/jax-content.json"
MEDIA_DIR = os.path.join(ROOT, "public", "media")
DATA_DIR = os.path.join(ROOT, "src", "data")

CAT_ORDER = ["exhibition", "installation", "sculpture", "photography",
             "works-on-paper", "video", "performance"]
CAT_LABEL = {
    "exhibition": "Exhibitions", "installation": "Installation",
    "sculpture": "Sculpture", "photography": "Photography",
    "works-on-paper": "Works on Paper", "video": "Video",
    "performance": "Performance",
}

def slugify(t):
    t = t.lower().strip()
    t = t.replace("@", "-at-").replace("&", "-and-").replace("'", "").replace("’", "")
    t = re.sub(r"[^a-z0-9]+", "-", t).strip("-")
    return re.sub(r"-+", "-", t) or "untitled"

def clean_medium(m):
    if not m: return ""
    m = re.sub(r"\s+", " ", m).strip().strip('"').strip()
    # If it reads like prose (long / sentence-y), drop it — it's a description, not a materials list.
    if len(m) > 90: return ""
    if m.endswith(".") and len(m.split()) > 12: return ""
    if m[:1].isupper() and (" is " in m[:30] or " a " in m[:14]): return ""
    return m

def clean_dims(d):
    if not d: return ""
    d = re.sub(r"\s+", " ", d).strip().strip('"').strip()
    return d if len(d) < 80 else ""

def year_num(y):
    m = re.search(r"(19|20)\d{2}", str(y))
    return int(m.group()) if m else 0

def main():
    data = json.load(open(SRC))
    works_in = data["works"]
    os.makedirs(MEDIA_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)

    # build records + dedupe slugs
    seen = {}
    works = []
    dl = []  # (url, localpath)
    for w in works_in:
        title = (w.get("title") or "Untitled").strip()
        slug = slugify(title)
        n = seen.get(slug, 0); seen[slug] = n + 1
        if n: slug = f"{slug}-{n+1}"
        imgs = w.get("images") or []
        local = []
        for i, url in enumerate(imgs, 1):
            ext = ".jpg"
            mext = re.search(r"\.(jpe?g|png|gif|webp)(\?|$)", url, re.I)
            if mext: ext = "." + mext.group(1).lower().replace("jpeg", "jpg")
            rel = f"/media/{slug}/{i:02d}{ext}"
            local.append(rel)
            dl.append((url, os.path.join(ROOT, "public", rel.lstrip("/"))))
        works.append({
            "slug": slug,
            "title": title,
            "year": str(w.get("year") or "").strip(),
            "yearNum": year_num(w.get("year")),
            "category": w.get("category") or "sculpture",
            "medium": clean_medium(w.get("medium")),
            "dimensions": clean_dims(w.get("dimensions")),
            "series": (w.get("series") or "").strip(),
            "description": re.sub(r"\s+", " ", (w.get("description") or "")).strip(),
            "images": local,
            "sourceUrl": w.get("sourceUrl") or "",
        })

    # order: by category group, then year desc, then title
    works.sort(key=lambda x: (CAT_ORDER.index(x["category"]) if x["category"] in CAT_ORDER else 99,
                              -x["yearNum"], x["title"].lower()))

    # download images (skip media-less)
    def fetch(job):
        url, path = job
        if os.path.exists(path) and os.path.getsize(path) > 0: return True
        os.makedirs(os.path.dirname(path), exist_ok=True)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=40) as r, open(path, "wb") as f:
                f.write(r.read())
            return os.path.getsize(path) > 0
        except Exception as e:
            print("  FAIL", url[:70], e); return False

    print(f"downloading {len(dl)} images...")
    ok = 0
    with ThreadPoolExecutor(max_workers=8) as ex:
        for r in ex.map(fetch, dl): ok += 1 if r else 0
    print(f"  {ok}/{len(dl)} downloaded")

    # global index order (for prev/next + /index grid)
    json.dump(works, open(os.path.join(DATA_DIR, "works.json"), "w"), indent=1, ensure_ascii=False)
    site = {
        "about": data.get("about", ""),
        "cv": data.get("cv", {}),
        "contact": data.get("contact", {}),
        "categories": [{"key": c, "label": CAT_LABEL[c]} for c in CAT_ORDER],
    }
    json.dump(site, open(os.path.join(DATA_DIR, "site.json"), "w"), indent=1, ensure_ascii=False)
    print(f"wrote works.json ({len(works)} works) + site.json")
    # report
    withmed = sum(1 for w in works if w["medium"])
    print(f"  medium:{withmed}  dims:{sum(1 for w in works if w['dimensions'])}  imgs:{sum(len(w['images']) for w in works)}")

if __name__ == "__main__":
    main()
