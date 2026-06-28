import { notFound } from "next/navigation";
import WorkView from "@/components/WorkView";
import works from "@/data/works.json";

type Work = { slug: string; title: string };
const ALL = works as Work[];

export function generateStaticParams() {
  return ALL.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = ALL.find((x) => x.slug === slug);
  return { title: w ? `${w.title} — Jacqueline Surdell` : "Jacqueline Surdell" };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ALL.some((w) => w.slug === slug)) notFound();
  return <WorkView slug={slug} />;
}
