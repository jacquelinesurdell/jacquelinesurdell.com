import IndexNav from "@/components/IndexNav";

export const metadata = { title: "CV — Jacqueline Surdell" };

export default function CV() {
  return (
    <main className="px-6 md:px-10 py-8 text-[13px] leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        <aside className="md:col-span-2 order-2 md:order-1">
          <div className="md:sticky md:top-8">
            <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)]">CV</p>
          </div>
        </aside>

        <section className="md:col-span-7 order-1 md:order-2 max-w-[64ch]">
          <div className="space-y-8 text-[var(--foreground)]">
            <div>
              <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)] mb-2">Education</p>
              <p className="text-[var(--muted-foreground)]">To be added.</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)] mb-2">Selected Exhibitions</p>
              <p className="text-[var(--muted-foreground)]">To be added.</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)] mb-2">Press</p>
              <p className="text-[var(--muted-foreground)]">To be added.</p>
            </div>
            <p className="text-[var(--muted-foreground)]">
              Full CV content can be imported from the existing site.
            </p>
          </div>
        </section>

        <IndexNav />
      </div>
    </main>
  );
}
