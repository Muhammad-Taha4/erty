import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import tryOnVideo from "@/assets/try-on-video.mp4.asset.json";
import viewer3dAsset from "@/assets/viewer-3d-screen.jpeg.asset.json";
import compareAsset from "@/assets/compare.jpeg.asset.json";
import customizeVideo from "@/assets/customize-video-new.mov.asset.json";

const VIEW = { once: true, margin: "-100px" };
const FADE = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const }, viewport: VIEW };

type Project = { title: string; img: string; span: string; video?: string };

const PROJECTS: Project[] = [
  { title: "Virtual Try-On", img: tryOnVideo.url, video: tryOnVideo.url, span: "md:col-span-7" },
  { title: "3D Jewelry Viewer", img: viewer3dAsset.url, span: "md:col-span-5" },
  { title: "Compare Designs", img: compareAsset.url, span: "md:col-span-5" },
  { title: "Product Customization", img: customizeVideo.url, video: customizeVideo.url, span: "md:col-span-7" },
];

export default function SelectedWorks() {
  const [active, setActive] = useState<{ title: string; img: string; video?: string } | null>(null);

  return (
    <section id="showcase" className="bg-bg py-8 md:py-12">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...FADE} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Showcase</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
              See The Future Of <span className="font-display italic">jewelry retail</span>
            </h2>
            <p className="text-muted mt-4 max-w-md">
              Immersive experiences that let every customer explore, interact with, and visualize jewelry before they buy.
            </p>
          </div>
          <a href="#waitlist" className="group relative hidden md:inline-flex rounded-full self-start md:self-auto">
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity animated-gradient-border" />
            <span className="relative inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 bg-surface border border-stroke text-text-primary">
              Join the waitlist <span className="text-[10px]">→</span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              {...FADE}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
              className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl ${p.span} aspect-[4/3]`}
            >
              {p.video ? (
                <video
                  src={p.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              )}
              <button
                type="button"
                onClick={() => setActive({ title: p.title, img: p.img, video: p.video })}
                aria-label={`View ${p.title} in full size`}
                className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-300 flex items-center justify-center cursor-pointer"
              >
                <span className="relative rounded-full">
                  <span className="absolute -inset-[2px] rounded-full animated-gradient-border" />
                  <span className="relative inline-block rounded-full px-5 py-2.5 bg-white text-bg text-sm">
                    View — <span className="font-display italic">{p.title}</span>
                  </span>
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl w-full p-0 bg-bg border-stroke overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>{active?.title ?? "Preview"}</DialogTitle>
          </VisuallyHidden>
          {active && (
            <div className="relative">
              {active.video ? (
                <video
                  src={active.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-auto max-h-[85vh] object-contain bg-bg"
                />
              ) : (
                <img
                  src={active.img}
                  alt={active.title}
                  className="w-full h-auto max-h-[85vh] object-contain bg-bg"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/90 to-transparent px-6 py-4">
                <div className="text-xs text-accent uppercase tracking-[0.3em] mb-1">Showcase</div>
                <div className="text-text-primary text-lg font-display italic">{active.title}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
