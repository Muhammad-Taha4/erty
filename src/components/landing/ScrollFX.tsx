import { useEffect } from "react";

export default function ScrollFX() {
  useEffect(() => {
    const mmHandlers: Array<{ el: Element; move: any; leave: any }> = [];

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // 1. Scroll reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      // 2. Floating cards parallax
      gsap.utils.toArray<HTMLElement>(".float-card").forEach((card) => {
        const depth = parseFloat(card.dataset.depth || "1");
        gsap.fromTo(
          card,
          { y: 60 * depth, opacity: 0 },
          {
            y: -30 * depth,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".report-stage",
              start: "top 90%",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // 3. Stat counters
      gsap.utils.toArray<HTMLElement>(".big[data-count]").forEach((el) => {
        const end = +(el.dataset.count || "0");
        const suf = el.dataset.suffix || (end === 50 ? "M+" : "");
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(
              { v: 0 },
              {
                v: end,
                duration: 1.6,
                ease: "power2.out",
                onUpdate() {
                  el.textContent =
                    Math.round((this.targets()[0] as any).v) + suf;
                },
              }
            );
          },
        });
      });

      // 4. Magnetic buttons
      document.querySelectorAll<HTMLElement>(".btn").forEach((b) => {
        const move = (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          gsap.to(b, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.3,
            duration: 0.3,
          });
        };
        const leave = () =>
          gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        b.addEventListener("mousemove", move);
        b.addEventListener("mouseleave", leave);
        mmHandlers.push({ el: b, move, leave });
      });

      ScrollTrigger.refresh();
    })();

    return () => {
      mmHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);

  return null;
}
