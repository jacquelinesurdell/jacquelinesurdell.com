import IndexNav from "@/components/IndexNav";

export const metadata = { title: "Work — Jacqueline Surdell" };

const WORKS = [
  { title: "Heaven", img: "/images/heaven-installation.jpg", medium: "Installation. Cotton rope, steel." },
  { title: "Dear William Leonard Pereira", img: "/images/dear-william.jpg", medium: "Installation. Cotton rope, steel." },
  { title: "Examination of Workroom", img: "/images/examination-workroom.jpg", medium: "Installation. Cotton rope, steel." },
  { title: "Tectonic Cord", img: "/images/tectonic-cord.jpg", medium: "Installation. Cotton rope, steel." },
  { title: "How High Is Too High", img: "/images/how-high.jpg", medium: "Sculpture. Cotton rope, steel." },
  { title: "Let's Be Stars", img: "/images/lets-be-stars.jpg", medium: "Sculpture. Cotton rope, steel." },
];

export default function Work() {
  return (
    <main className="px-6 md:px-10 py-8 text-[13px] leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        <aside className="md:col-span-2 order-2 md:order-1">
          <div className="md:sticky md:top-8">
            <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)]">Work</p>
            <p className="mt-1 text-[var(--muted-foreground)]">Selected</p>
          </div>
        </aside>

        <section className="md:col-span-7 order-1 md:order-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-12">
            {WORKS.map((w) => (
              <figure key={w.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.img} alt={w.title} className="w-full h-auto border border-[var(--border)]" />
                <figcaption className="mt-2 text-[var(--muted-foreground)]">
                  <span className="text-[var(--foreground)]">{w.title}</span>. {w.medium}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-12 text-[var(--muted-foreground)]">
            Additional projects, photography, performance, and video to be added.
          </p>
        </section>

        <IndexNav />
      </div>
    </main>
  );
}
