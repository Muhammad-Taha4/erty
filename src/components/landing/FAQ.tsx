import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What is Qylmora building?",
    a: "We're building immersive 3D visualization experiences for jewelry brands, helping customers explore and discover jewelry with greater confidence online and in-store.",
  },
  {
    q: "Is this a live AR try-on?",
    a: "No. Qylmora goes beyond traditional AR overlays by creating photorealistic 3D digital experiences that help customers understand jewelry from every angle.",
  },
  {
    q: "How is Qylmora different from traditional product photos?",
    a: "Traditional photos show only a few static views. Qylmora enables customers to interact with realistic 3D jewelry experiences and explore more designs before making a purchase.",
  },
  {
    q: "Will customers need to download an app?",
    a: "No. The experience is being designed to work seamlessly through web and in-store environments.",
  },
  {
    q: "Do I need special photography or equipment?",
    a: "No. Our goal is to make onboarding simple and accessible without requiring expensive hardware or complicated setups.",
  },
  {
    q: "How can Qylmora help increase sales?",
    a: "Qylmora helps customers explore more jewelry designs, interact with products in a more engaging way, and make purchase decisions with greater confidence. The goal is to create a richer shopping experience that can lead to higher customer engagement and more sales opportunities.",
  },
  {
    q: "Is the product available today?",
    a: "We're currently building the platform and working closely with early partners. Join the waitlist to receive updates and early access opportunities.",
  },
  {
    q: "Is there any commitment to joining the waitlist?",
    a: "No. Joining the waitlist is completely free and simply gives you access to product updates and early access opportunities.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bg py-10 md:py-14">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
            Frequently asked <span className="font-display italic">questions</span>
          </h2>
        </motion.div>

        <div className="divide-y divide-stroke border-t border-b border-stroke">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="text-lg md:text-xl text-text-primary group-hover:text-accent transition-colors">
                    {f.q}
                  </span>
                  <span
                    className={`text-2xl text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted pb-6 pr-12 max-w-2xl leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
