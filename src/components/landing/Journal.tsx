import { motion } from "framer-motion";
import j1 from "@/assets/j1.jpeg.asset.json";
import j2 from "@/assets/j2.jpeg.asset.json";
import j3 from "@/assets/j3.jpeg.asset.json";
import j4 from "@/assets/j4.jpeg.asset.json";
import { resolveAssetUrl } from "@/lib/asset";

const ENTRIES = [
  { title: "Not sure how jewelry will look on them", img: resolveAssetUrl(j1.url), read: "Hesitation #1", date: "Customer psychology" },
  { title: "Want to compare multiple designs side by side", img: resolveAssetUrl(j2.url), read: "Hesitation #2", date: "Customer psychology" },
  { title: "Fear making the wrong choice", img: resolveAssetUrl(j3.url), read: "Hesitation #3", date: "Customer psychology" },
  { title: "Cannot visualize customizations or final piece", img: resolveAssetUrl(j4.url), read: "Hesitation #4", date: "Customer psychology" },
];

export default function Journal() {
  return (
    <section id="hesitations" className="bg-bg py-10 md:py-14">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Customer Psychology</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
              Why customers <span className="font-display italic">hesitate</span> before buying
            </h2>
            <p className="text-muted mt-4 max-w-md">QYLMORA is being built to solve these confidence gaps — closing the distance between curiosity and purchase.</p>
          </div>
          <a href="#waitlist" className="group relative hidden md:inline-flex rounded-full self-start md:self-auto">
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity animated-gradient-border" />
            <span className="relative inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 bg-surface border border-stroke text-text-primary">
              Join the waitlist <span className="text-[10px]">→</span>
            </span>
          </a>
        </motion.div>

        <div className="space-y-4">
          {ENTRIES.map((e, i) => (
            <motion.a
              key={e.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors group"
            >
              <img src={e.img} alt="" className="w-16 h-16 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg text-text-primary truncate group-hover:text-white transition-colors">
                  {e.title}
                </h3>
                <p className="text-xs text-muted mt-1">{e.read} · {e.date}</p>
              </div>
              <span className="hidden sm:inline-block text-muted group-hover:text-text-primary transition-colors pr-4">↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
