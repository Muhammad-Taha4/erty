import { useEffect } from "react";


export default function Hero() {
  useEffect(() => {
    let cleanupFns: Array<() => void> = [];

    // Inject styles once
    const styleId = "hero-star-keyframes";
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = `
@keyframes tw{0%,100%{opacity:0.18}50%{opacity:0.8}}
nav.scrolled{background:rgba(6,9,18,0.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,0.08);}

/* Hero copy responsive */
#heroCopy h1{font-size:clamp(28px, 5.4vw, 72px);}
#heroCopy p{font-size:clamp(14px, 1.6vw, 17px);max-width:min(92vw,460px);padding:0 16px;}
#heroCopy a{padding:13px 26px;}
#deviceStage{width:min(92vw,1180px);max-width:1180px;top:50%;}
#hint{font-size:clamp(11px,1vw,13px);}

@media (max-width: 991px) {
  #deviceStage{width:min(94vw,820px);top:53%;}
}

@media (max-width: 767px){
  #heroCopy{padding-top:8vh;justify-content:flex-start !important;align-items:center;}
  #heroCopy h1{margin-top:14vh;margin-bottom:12px;font-size:clamp(30px, 8vw, 45px);}
  #heroCopy p{margin-bottom:20px;max-width:min(88vw,360px);font-size:clamp(14px, 3.4vw, 16px);}
  #heroCopy a{padding:12px 22px;font-size:13px;}
  #deviceStage{width:min(96vw,520px);top:56%;transform:translate(-50%,-56%);}
  #device{border-radius:16px;}
  #heroGrid{background-size:34px 34px;}
  #heroGlow{width:170px;height:170px;bottom:28%;}
  #hint{bottom:18px;letter-spacing:0.16em;}
}

@media (max-width: 479px) {
  #heroCopy h1{font-size:clamp(26px,9vw,38px);}
  #heroCopy p{max-width:min(92vw,320px);font-size:14px;}
  #deviceStage{width:min(96vw,420px);top:58%;transform:translate(-50%,-58%);}
}
`;
      document.head.appendChild(styleEl);
    }

    // Generate stars
    const starsEl = document.getElementById("stars");
    if (starsEl) {
      starsEl.innerHTML = "";
      for (let i = 0; i < 90; i++) {
        const s = document.createElement("span");
        const size = 0.6 + Math.random() * 2;
        s.style.cssText = `position:absolute;background:#fff;border-radius:50%;opacity:0.5;left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;animation:tw 4s infinite ease-in-out;animation-delay:${Math.random() * 4}s;`;
        starsEl.appendChild(s);
      }
    }

    // Navbar scroll effect
    const navEl = document.querySelector("nav");
    const onScroll = () => {
      if (!navEl) return;
      if (window.scrollY > 80) navEl.classList.add("scrolled");
      else navEl.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanupFns.push(() => window.removeEventListener("scroll", onScroll));

    // GSAP ScrollTrigger — responsive via matchMedia
    let mm: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();

      const build = (scale: number, end: string) => {
        // Reset to resting state so progress 0 always equals the hero's
        // normal centered/correct-size layout.
        gsap.set("#deviceStage", { scale: 1 });
        gsap.set("#heroCopy", { scale: 1, opacity: 1 });
        gsap.set(["#heroGrid", "#heroGlow"], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end,
            pin: true,
            pinSpacing: true,
            pinType: "fixed",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo("#deviceStage", { scale: 1 }, { scale, ease: "power1.in", duration: 1, immediateRender: false }, 0)
          .to("#device", {
            borderRadius: 0,
            borderColor: "rgba(201,168,106,0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            ease: "power1.in",
            duration: 1,
          }, 0)
          .to("#heroGrid", { opacity: 0, ease: "power2.in", duration: 0.5 }, 0)
          .to("#heroGlow", { opacity: 0, ease: "power2.in", duration: 0.5 }, 0)
          .fromTo("#heroCopy", { scale: 1, opacity: 1 }, { scale: 1.08, opacity: 1, ease: "none", duration: 1, immediateRender: false }, 0)
          .to("#hint", { opacity: 0, duration: 0.2 }, 0);

        return () => { tl.kill(); };
      };

      mm.add("(min-width: 1200px)", () => build(2.35, "+=140%"));
      mm.add("(min-width: 768px) and (max-width: 1199px)", () => build(2.0, "+=130%"));
      mm.add("(max-width: 767px)", () => build(1.7, "+=120%"));

      // Images shift pin start/end — refresh after full load and on resize.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      window.addEventListener("resize", onLoad);
      cleanupFns.push(() => {
        window.removeEventListener("load", onLoad);
        window.removeEventListener("resize", onLoad);
      });
      // Catch images that finish after mount but before window load.
      Promise.resolve().then(() => ScrollTrigger.refresh());
    })();

    return () => {
      cleanupFns.forEach((fn) => fn());
      if (mm) mm.revert();
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);


  return (
    <section
      id="hero"
      style={{
        position: "relative",        minHeight: "100svh",        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#0a0e27",
        backgroundImage:
          "radial-gradient(70% 55% at 50% 32%, rgba(37,71,168,0.55), rgba(30,58,138,0.28) 38%, transparent 70%), radial-gradient(120% 90% at 50% 120%, rgba(10,14,39,0.9), transparent 60%), linear-gradient(180deg, #0c1130 0%, #0a0e27 55%, #060920 100%)",
        zIndex: 0,
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      {/* Stars layer */}
      <div
        id="stars"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Device and locked hands stage */}
      <div
        id="deviceStage"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(92vw, 1180px)",
          maxWidth: "1180px",
          maxHeight: "85vh",
          aspectRatio: "1.571",
          transformOrigin: "center 60%",
          willChange: "transform",
          zIndex: 2,
        }}
      >
        {/* Device frame */}
        <div
          id="device"
          style={{
            position: "absolute",
            inset: 0,
          borderRadius: "20px",
          border: "1.5px solid rgba(120,160,255,0.42)",
          background: "#070b22",
          overflow: "hidden",
          }}
        >

        {/* Device atmosphere */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(62% 42% at 50% 64%, rgba(37,71,168,0.32), transparent 58%), linear-gradient(180deg, #0c1130 0%, #0a0e27 46%, #060920 100%)",
          }}
        />

        {/* Perspective grid */}
        <div
          id="heroGrid"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-2%",
            transform: "translateX(-50%) perspective(420px) rotateX(62deg)",
            width: "160%",
            height: "110%",
            backgroundImage:
              "linear-gradient(rgba(120,160,255,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,255,0.14) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage:
              "radial-gradient(45% 55% at 50% 100%, #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(45% 55% at 50% 100%, #000 0%, transparent 75%)",
            willChange: "opacity",
          }}
        />

        {/* Core glow */}
        <div
          id="heroGlow"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "30%",
            transform: "translate(-50%, 50%)",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(140,175,255,0.5), transparent 60%)",
            filter: "blur(8px)",
            willChange: "opacity",
          }}
        />

        {/* Edge vignette to keep device edges dark at high scale */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 50%, transparent 55%, #060920 100%)",
          }}
        />


        </div>
      </div>


      {/* Hero copy */}
      <div
        id="heroCopy"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "16px",
            padding: "0 16px",
          }}
        >
          Help Customers Buy Jewelry
          <br />
          With Confidence
        </h1>
        <p
          style={{
            color: "#c4ccde",
            textAlign: "center",
            lineHeight: 1.6,
            marginBottom: "28px",
          }}
        >
          QYLMORA is building immersive 3D visualization and virtual try-on
          experiences that help jewelry brands create more confident buying
          journeys.
        </p>
        <a
          href="#waitlist"
          style={{
            display: "inline-block",
            padding: "13px 26px",
            borderRadius: "999px",
            background: "#fff",
            color: "#0a0d16",
            fontWeight: 600,
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          Join The Waitlist
        </a>
      </div>

      <div
        id="hint"
        style={{
          position: "absolute",
          bottom: "26px",
          left: "50%",
          transform: "translateX(-50%)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "#6b7488",
          fontSize: "12.5px",
          zIndex: 10,
        }}
      >
        scroll
      </div>
    </section>
  );
}
