import WorkView from "@/components/WorkView";
import works from "@/data/works.json";

type Work = { slug: string; category: string; images: string[] };

// Home = a default lead view (first exhibition with images), mirroring the
// reference site's "homepage = a chosen exhibition" behavior.
const ALL = works as Work[];
const lead =
  ALL.find((w) => w.category === "exhibition" && w.images.length > 2) ||
  ALL.find((w) => w.images.length > 0) ||
  ALL[0];

export default function Home() {
  return <WorkView slug={lead.slug} />;
}
