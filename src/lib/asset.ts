export function resolveAssetUrl(url: string) {
  if (!url) return url;
  // Lovable-hosted assets are referenced with a relative `/__l5e/...` path.
  // In development we proxy `/__l5e` to the Lovable origin via Vite dev server.
  // In production (Vercel) the proxy is not present, so prepend the full origin.
  const LOVABLE_BASE = (import.meta.env.VITE_LOVABLE_BASE as string) || "https://pixel-alchemy-62.lovable.app";
  if (url.startsWith("/__l5e")) return LOVABLE_BASE + url;
  return url;
}
