// Prefix for /public assets (images). next/link and _next assets are handled by
// next.config basePath automatically, but plain <img src="/media/..."> are not —
// so prefix those with the same base. Empty for the apex production build.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE}${p}`;
