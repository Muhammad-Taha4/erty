import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Capture a Photo", desc: "A simple customer photo becomes the foundation of the experience." },
  { n: "02", title: "Generate a Realistic 3D Model", desc: "Qylmora creates a photorealistic 3D model of the customer, providing a personalized way to explore jewelry collections." },
  { n: "03", title: "Choose Any Design, Instantly Visualize It", desc: "Customers browse the collection and select any necklace, earrings, bracelet, or ring. The chosen piece instantly appears on their 3D model, allowing them to view it from every angle and compare multiple designs." },
  { n: "04", title: "Decide with Confidence", desc: "Explore more designs, compare options side by side, and make jewelry purchases with greater confidence." },
];

const FADE = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-bg py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...FADE} className="mb-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
            From Photo to <span className="font-display italic">Immersive Jewelry Discovery</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              {...FADE}
              transition={{ ...FADE.transition, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr_auto] items-start md:items-center gap-6 rounded-3xl border border-stroke bg-surface p-6 md:p-8"
            >
              <div className="text-3xl md:text-5xl font-display italic text-accent">{s.n}</div>
              <div>
                <h3 className="text-xl md:text-2xl text-text-primary mb-1">{s.title}</h3>
                <p className="text-muted text-sm max-w-xl">{s.desc}</p>
              </div>
              <div className="hidden md:block text-muted text-xs uppercase tracking-[0.3em]">Step</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
