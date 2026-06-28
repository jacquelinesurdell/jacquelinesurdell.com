import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH="/jacquelinesurdell.com" for the GitHub Pages
// project-subpath PREVIEW build. Leave it empty/unset for the apex custom-domain
// production build (jacquelinesurdell.com served at root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
