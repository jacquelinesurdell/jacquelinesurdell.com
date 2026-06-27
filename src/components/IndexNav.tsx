import Link from "next/link";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/about#contact" },
];

export default function IndexNav() {
  return (
    <nav className="md:col-span-3 order-3">
      <div className="md:sticky md:top-8 md:text-right">
        <Link href="/" className="text-[15px] font-medium tracking-tight">
          Jacqueline Surdell
        </Link>
        <ul className="mt-6 space-y-1">
          {NAV.map((n) => (
            <li key={n.label}>
              <Link
                href={n.href}
                className="text-[var(--muted-foreground)] hover:text-[var(--accent)]"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 space-y-1 text-[var(--muted-foreground)]" id="contact">
          <p>Chicago, IL</p>
          <p>
            <a href="mailto:jacquelinesurdell@gmail.com" className="hover:text-[var(--accent)]">
              Email
            </a>
          </p>
          <p>
            <a
              href="https://www.instagram.com/jacquelinesurdell"
              className="hover:text-[var(--accent)]"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
    </nav>
  );
}
