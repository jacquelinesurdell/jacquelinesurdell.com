import Link from "next/link";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "#contact" },
];

type Work = { title: string; img: string; medium: string };

const FEATURED: Work = {
  title: "Heaven",
  img: "/images/heaven-installation.jpg",
  medium: "Woven sculpture, installation view. Cotton, rope, and steel.",
};

const WORKS: Work[] = [
  { title: "Dear William Leonard Pereira", img: "/images/dear-william.jpg", medium: "Installation. Cotton rope, steel." },
  { title: "Tectonic Cord", img: "/images/tectonic-cord.jpg", medium: "Installation. Cotton rope, steel." },
  { title: "How High Is Too High", img: "/images/how-high.jpg", medium: "Sculpture. Cotton rope, steel." },
  { title: "Let's Be Stars", img: "/images/lets-be-stars.jpg", medium: "Sculpture. Cotton rope, steel." },
  { title: "Examination of Workroom", img: "/images/examination-workroom.jpg", medium: "Installation. Cotton rope, steel." },
];

function Caption({ title, medium }: { title: string; medium: string }) {
  return (
    <figcaption className="mt-2 text-[var(--muted-foreground)]">
      <span className="text-[var(--foreground)]">{title}</span>. {medium}
    </figcaption>
  );
}

export default function Home() {
  return (
    <main className="px-6 md:px-10 py-8 text-[13px] leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        {/* Left: section label */}
        <aside className="md:col-span-2 order-2 md:order-1">
          <div className="md:sticky md:top-8">
            <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Selected Work</p>
            <p className="mt-1 text-[var(--muted-foreground)]">Recent</p>
          </div>
        </aside>

        {/* Center: featured work, work grid, statement */}
        <section className="md:col-span-7 order-1 md:order-2">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FEATURED.img} alt={FEATURED.title} className="w-full h-auto border border-[var(--border)]" />
            <Caption title={FEATURED.title} medium={FEATURED.medium} />
          </figure>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {WORKS.map((w) => (
              <figure key={w.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.img} alt={w.title} className="w-full h-auto border border-[var(--border)]" />
                <Caption title={w.title} medium={w.medium} />
              </figure>
            ))}
          </div>

          <div className="mt-24 max-w-[62ch]">
            <p className="text-[15px] leading-7 text-[var(--foreground)]">
              As a Chicago native, my work is inspired by the industrial history of the city in
              relation to forces of labor and how they relate to social, cultural and economic
              movements, locally and globally. I grew up in a dichotomous environment between the
              blast furnaces and manual labor of the Southside steel mills and the prairie lands
              and wildflower paintings of my grandmother&apos;s studio. From that, I developed a
              practice where art and craft, life and work, body and labor, industry and artistic
              vision, live in unity.
            </p>
            <Link href="/about" className="inline-block mt-4 text-[var(--muted-foreground)] hover:text-[var(--accent)]">
              More about the work
            </Link>
          </div>
        </section>

        {/* Right: index / nav */}
        <nav className="md:col-span-3 order-3">
          <div className="md:sticky md:top-8 md:text-right">
            <Link href="/" className="text-[15px] font-medium tracking-tight">Jacqueline Surdell</Link>
            <ul className="mt-6 space-y-1">
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="text-[var(--muted-foreground)] hover:text-[var(--accent)]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-1 text-[var(--muted-foreground)]" id="contact">
              <p>Chicago, IL</p>
              <p>
                <a href="mailto:jacquelinesurdell@gmail.com" className="hover:text-[var(--accent)]">Email</a>
              </p>
              <p>
                <a href="https://www.instagram.com/jacquelinesurdell" className="hover:text-[var(--accent)]">Instagram</a>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
}
