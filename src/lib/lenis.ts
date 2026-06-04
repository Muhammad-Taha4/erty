import type LenisType from "@studio-freight/lenis";

export let lenis: LenisType | null = null;

export async function initLenis() {
  if (typeof window === "undefined") return;

  const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
    import("@studio-freight/lenis"),
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });

  // SINGLE shared loop: GSAP's ticker drives Lenis, and Lenis drives
  // ScrollTrigger.update. Do NOT add a separate requestAnimationFrame loop —
  // two loops calling lenis.raf cause stale/jumping scroll positions on reverse.
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t: number) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();
}
