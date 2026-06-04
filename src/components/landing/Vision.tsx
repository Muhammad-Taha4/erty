import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Virtual Try-On",
    desc: "Let customers see jewelry on themselves before they ever step into a store.",
  },
  {
    title: "Interactive 3D Models",
    desc: "Photorealistic, rotatable models so every detail is explored with confidence.",
  },
  {
    title: "Available Everywhere",
    desc: "Web, mobile, and in-store — a consistent immersive experience across every channel.",
  },
];

const FADE = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function Vision() {
  return (
    <section id="vision" className="relative z-10 bg-bg py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...FADE} className="mb-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Vision</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
            Imagine every customer could <span className="font-display italic">experience jewelry</span> before buying
          </h2>
          <p className="text-muted mt-4 max-w-xl">
            A future where customers can explore, interact with, and visualize jewelry before making a purchase.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...FADE}
              transition={{ ...FADE.transition, delay: i * 0.1 }}
              className="group relative rounded-3xl border border-stroke bg-surface p-8 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px accent-gradient opacity-40" />
              <div className="text-xs text-accent uppercase tracking-[0.3em] mb-6">0{i + 1}</div>
              <h3 className="text-2xl text-text-primary mb-3 font-display italic">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
