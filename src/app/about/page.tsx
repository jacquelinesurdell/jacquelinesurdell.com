import IndexNav from "@/components/IndexNav";

export const metadata = { title: "About — Jacqueline Surdell" };

export default function About() {
  return (
    <main className="px-6 md:px-10 py-8 text-[13px] leading-relaxed">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
        <aside className="md:col-span-2 order-2 md:order-1">
          <div className="md:sticky md:top-8">
            <p className="uppercase tracking-[0.12em] text-[var(--muted-foreground)]">About</p>
          </div>
        </aside>

        <section className="md:col-span-7 order-1 md:order-2 max-w-[64ch]">
          <div className="space-y-6 text-[15px] leading-7 text-[var(--foreground)]">
            <p>
              Jacqueline Surdell was born and raised in Chicago, Illinois. The city&apos;s history of
              industry, labor, and Midwest grit plays a significant role in her work.
            </p>
            <p>
              Surdell&apos;s Polish grandfather worked in the steel mills in Hegewisch, a neighborhood
              on the South Side of Chicago, while her Dutch grandmother is a landscape painter. The
              dichotomy established between manual labor and conceptual labor influenced Surdell at an
              early age. Stories of the mills, the operation of massive blast furnaces, chaotic
              melting pits, and the injuries they caused, were set against memories of wildflower
              fields and her grandmother painting the colorful landscape.
            </p>
            <p>
              That combination produced an early arts view in which life and work, body and labor,
              industry and artistic vision live in unity. Working primarily in large-scale woven
              sculpture, Surdell builds with cotton rope and steel, drawing the body, athletics, and
              the act of labor into monumental, hand-worked forms.
            </p>
          </div>
        </section>

        <IndexNav />
      </div>
    </main>
  );
}
