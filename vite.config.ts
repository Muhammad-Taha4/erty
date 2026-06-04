// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    preset: "netlify",
  },
  // Proxy Lovable-hosted assets (/__l5e/...) to the published site so images
  // and videos load during local `vite dev`. These assets live on Lovable's
  // platform, not in the repo, so without this they 404 locally.
  vite: {
    server: {
      proxy: {
        "/__l5e": {
          target: "https://pixel-alchemy-62.lovable.app",
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});
