import { motion } from "framer-motion";

const STATS = [
  { num: "3D", label: "Photorealistic Models" },
  { num: "AR", label: "Virtual Try-On" },
  { num: "24/7", label: "Available Everywhere" },
];

export default function Stats() {
  return (
    <section className="bg-bg py-10 md:py-14 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <div className="text-6xl md:text-7xl lg:text-8xl font-display text-text-primary leading-none">{s.num}</div>
            <div className="text-xs text-muted uppercase tracking-[0.3em] mt-4">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
