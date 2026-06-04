import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import imgAllAngles from "@/assets/showcase-allangles.png.asset.json";
import imgFloating from "@/assets/showcase-floating.png.asset.json";
import imgProblem from "@/assets/showcase-problem.png.asset.json";
import imgPsychology from "@/assets/showcase-psychology.png.asset.json";
import imgCompare from "@/assets/showcase-compare.png.asset.json";
import { resolveAssetUrl } from "@/lib/asset";


if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    src: resolveAssetUrl(imgAllAngles.url),
    eyebrow: "01 — In-Store Tablet",
    title: "Every angle. One screen.",
    desc: "A boutique-grade interface that lets customers explore 500+ designs and view every angle in real time.",
    span: "lg:col-span-8 lg:row-span-2",
    accent: "from-[#c9a86a]/40 to-transparent",
  },
  {
    src: resolveAssetUrl(imgPsychology.url),
    eyebrow: "02 — Buyer Psychology",
    title: "The hesitation, mapped.",
    desc: "Five universal doubts that hold every jewelry purchase back — and the moments we resolve them.",
    span: "lg:col-span-4 lg:row-span-2",
    accent: "from-[#c9a86a]/30 to-transparent",
  },
  {
    src: resolveAssetUrl(imgFloating.url),
    eyebrow: "03 — AI Try-On",
    title: "Wear it before you own it.",
    desc: "Realistic try-on across front, side, and back — true-to-scale, lifelike shine, zero guesswork.",
    span: "lg:col-span-6",
    accent: "from-[#c9a86a]/35 to-transparent",
  },
  {
    src: resolveAssetUrl(imgCompare.url),
    eyebrow: "04 — Compare & Customize",
    title: "Side-by-side certainty.",
    desc: "Compare designs, swap metals, change pendant shapes — every decision visualized instantly.",
    span: "lg:col-span-6",
    accent: "from-[#c9a86a]/30 to-transparent",
  },
  {
    src: resolveAssetUrl(imgProblem.url),
    eyebrow: "05 — The Old Way",
    title: "What we're replacing.",
    desc: "Limited trays, long consultations, and a guessing game between you and your customer.",
    span: "lg:col-span-12",
    accent: "from-[#c9a86a]/25 to-transparent",
  },
];

const FADE = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<typeof SLIDES[number] | null>(null);


  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const depth = Number(el.dataset.parallax || 0);
        gsap.fromTo(
          el,
          { yPercent: depth },
          {
            yPercent: -depth,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative bg-bg py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,106,0.35) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div {...FADE} className="mb-14 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              The Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
            A new way to{" "}
            <span className="font-display italic">see, try, and decide.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted max-w-2xl">
            Five moments inside the QYLMORA experience — from the customer's
            first hesitation to the confident yes.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[280px] md:auto-rows-[340px] gap-5 md:gap-6">
          {SLIDES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1],
                delay: (i % 3) * 0.08,
              }}
              className={`group relative overflow-hidden rounded-2xl border border-stroke bg-[#0d0d10] ${s.span}`}
            >
              {/* Image with parallax */}
              <div
                data-parallax={(i % 2 === 0 ? 6 : -6).toString()}
                className="absolute inset-0 will-change-transform"
              >
                <img
                  src={s.src}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-[115%] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Bottom gradient + gold wash */}
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-t ${s.accent} mix-blend-overlay opacity-60`}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
              />

              {/* Hairline frame */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.04] group-hover:ring-[#c9a86a]/30 transition-colors duration-500"
              />

              {/* Copy */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                <span className="text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#c9a86a]/90 mb-3">
                  {s.eyebrow}
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl text-text-primary font-display leading-tight max-w-md">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm md:text-[15px] text-text-primary/70 max-w-md leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Click overlay to open lightbox */}
              <button
                type="button"
                onClick={() => setActive(s)}
                aria-label={`View ${s.title} full image`}
                className="absolute inset-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a86a]/60 rounded-2xl"
              />
            </motion.article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl w-full p-0 bg-bg border-stroke overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>{active?.title ?? "Preview"}</DialogTitle>
          </VisuallyHidden>
          {active && (
            <div className="relative">
              <img
                src={active.src}
                alt={active.title}
                className="w-full h-auto max-h-[85vh] object-contain bg-bg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/95 via-bg/60 to-transparent px-5 md:px-8 py-5">
                <div className="text-[10px] md:text-xs text-[#c9a86a] uppercase tracking-[0.3em] mb-2">
                  {active.eyebrow}
                </div>
                <div className="text-text-primary text-xl md:text-2xl font-display italic mb-1">
                  {active.title}
                </div>
                <p className="text-muted text-sm max-w-2xl">{active.desc}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
