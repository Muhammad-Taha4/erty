import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

import e1 from "@/assets/expl-1.jpeg.asset.json";
import e2 from "@/assets/expl-2.jpeg.asset.json";
import e3 from "@/assets/expl-3.jpeg.asset.json";
import e4 from "@/assets/expl-4.jpeg.asset.json";
import e5 from "@/assets/expl-5.jpeg.asset.json";
import e6 from "@/assets/expl-6.jpeg.asset.json";
import { resolveAssetUrl } from "@/lib/asset";

const IMGS = [
  resolveAssetUrl(e1.url),
  resolveAssetUrl(e2.url),
  resolveAssetUrl(e3.url),
  resolveAssetUrl(e4.url),
  resolveAssetUrl(e5.url),
  resolveAssetUrl(e6.url),
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(colARef.current, { y: 60 }, {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(colBRef.current, { y: 120 }, {
        y: -120,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const colA = IMGS.slice(0, 3);
  const colB = IMGS.slice(3);

  return (
    <section id="explorations" ref={sectionRef} className="relative bg-bg overflow-hidden py-20 md:py-32">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary leading-[1.15] max-w-2xl">
          A glimpse into <span className="font-display italic">our visual research</span>
        </h2>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 grid grid-cols-2 gap-8 md:gap-20">

        <div ref={colARef} className="space-y-8 md:space-y-16">
          {colA.map((src, i) => (
            <button
              key={src}
              onClick={() => setLightbox(src)}
              className="block w-full max-w-[360px] mx-auto aspect-square rounded-3xl overflow-hidden border border-stroke bg-surface cursor-zoom-in"
              style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <div ref={colBRef} className="space-y-8 md:space-y-16 pt-16 md:pt-32">
          {colB.map((src, i) => (
            <button
              key={src}
              onClick={() => setLightbox(src)}
              className="block w-full max-w-[360px] mx-auto aspect-square rounded-3xl overflow-hidden border border-stroke bg-surface ml-auto cursor-zoom-in"
              style={{ transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)` }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl" />
        </div>
      )}
    </section>
  );
}
