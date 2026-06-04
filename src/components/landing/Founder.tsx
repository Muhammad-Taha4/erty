import { motion } from "framer-motion";

import harshitAsset from "@/assets/harshit.jpg.asset.json";
import taimanAsset from "@/assets/taiman.jpg.asset.json";

const FADE = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

type F = {
  label: string;
  name: string;
  img: string;
  bio: string[];
  reverse?: boolean;
};

const FOUNDERS: F[] = [
  {
    label: "Meet The Founder",
    name: "Harshit",
    img: harshitAsset.url,
    bio: [
      "Hi, I'm Harshit — founder of QYLMORA.",
      "Exploring how immersive technology can help jewelry businesses create more confident shopping experiences and stronger customer engagement.",
    ],
  },
  {
    label: "Meet The Co-Founder",
    name: "Taiman",
    img: taimanAsset.url,
    reverse: true,
    bio: [
      "Hi, I'm Taiman — co-founder of QYLMORA.",
      "Focused on crafting the product, technology, and experience layer that brings our vision of immersive jewelry commerce to life.",
    ],
  },
];

export default function Founder() {
  return (
    <section id="founder" className="bg-bg py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...FADE} className="mb-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Founders</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
            Building the future of <span className="font-display italic">jewelry commerce</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-14">
          {FOUNDERS.map((f, i) => (
            <motion.div
              key={f.name}
              {...FADE}
              transition={{ ...FADE.transition, delay: i * 0.1 }}
              className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${f.reverse ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Portrait */}
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-stroke bg-surface">
                  <img
                    src={f.img}
                    alt={`${f.name}, ${f.label.toLowerCase()} of QYLMORA`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    width={1024}
                    height={1280}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
                </div>
                <div className="absolute -inset-2 rounded-3xl border border-accent/15 -z-10" />
              </div>

              {/* Copy */}
              <div className={`relative ${f.reverse ? "md:pr-4" : "md:pl-4"}`}>
                <div className="text-xs text-accent uppercase tracking-[0.3em] mb-3">{f.label}</div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary mb-5 leading-tight">
                  {f.name}
                </h3>
                <div className="space-y-3 max-w-md">
                  {f.bio.map((p, idx) => (
                    <p key={idx} className="text-muted text-sm md:text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-px bg-stroke" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted">QYLMORA · 2026</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...FADE} transition={{ ...FADE.transition, delay: 0.2 }} className="mt-10">
          <a href="#waitlist" className="group relative inline-flex rounded-full">
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity animated-gradient-border" />
            <span className="relative inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 bg-text-primary text-bg">
              Join the conversation ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
