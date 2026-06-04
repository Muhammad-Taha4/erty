import { motion } from "framer-motion";

const IN_STORE = [
  "Limited inventory on display",
  "Difficult to showcase all variations",
  "Customers struggle to visualize products",
  "Time-consuming consultations",
];
const ONLINE = [
  "Static images limit engagement",
  "Customers cannot experience products realistically",
  "Lower purchase confidence",
  "Higher abandonment rates",
];

const FADE = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function Problem() {
  return (
    <section id="problem" className="bg-bg py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div {...FADE} className="mb-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">The Problem</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
            Jewelry shopping has changed. <span className="font-display italic">The experience hasn't.</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl">
            Customers expect confidence before making one of their most personal purchases. Yet most jewelry experiences still rely on static photos, limited displays, and traditional product presentations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "In-Store Challenges", items: IN_STORE },
            { title: "Online Challenges", items: ONLINE },
          ].map((col, idx) => (
            <motion.div
              key={col.title}
              {...FADE}
              transition={{ ...FADE.transition, delay: idx * 0.1 }}
              className="rounded-3xl border border-stroke bg-surface p-8 md:p-10"
            >
              <h3 className="text-2xl md:text-3xl text-text-primary mb-6 font-display italic">{col.title}</h3>
              <ul className="space-y-4">
                {col.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-px w-5 bg-accent shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
