import { motion } from "framer-motion";

const BENEFITS = [
  { title: "Increase Purchase Confidence", desc: "Help customers commit by removing visualization uncertainty." },
  { title: "Showcase Entire Collections", desc: "Display every variation without physical inventory limits." },
  { title: "Enable Design Discovery", desc: "Let customers explore and compare more designs than a physical showcase can display." },
  { title: "Modernize the Jewelry Buying Experience", desc: "Transform traditional browsing into an interactive and immersive experience." },
];

const FADE = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function Benefits() {
  return (
    <section id="benefits" className="bg-bg py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...FADE} className="mb-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Benefits</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
            Why jewelry brands are <span className="font-display italic">joining early</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              {...FADE}
              transition={{ ...FADE.transition, delay: i * 0.08 }}
              className="rounded-3xl border border-stroke bg-surface p-8 md:p-10"
            >
              <h3 className="text-2xl text-text-primary mb-3 font-display italic">{b.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
