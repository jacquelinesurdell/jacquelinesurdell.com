import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (no server runtime).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
