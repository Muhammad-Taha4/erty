import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/qylmora-logo.png.asset.json";
import { resolveAssetUrl } from "@/lib/asset";

const LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "#home" },
  { label: "Vision", href: "#vision" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const sections = LINKS.map((l) => document.querySelector(l.href));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && (section as HTMLElement).offsetTop <= scrollPos) {
          setActive(LINKS[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(label);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-6 px-3 md:px-4">
        <nav
          className={`flex items-center gap-1 rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow w-full max-w-[680px] md:w-auto ${
            scrolled ? "shadow-md shadow-black/10" : ""
          }`}
        >
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home", "Home")}
            className="group relative h-9 flex items-center px-2 transition-transform hover:scale-105 shrink-0"
          >
            <img src={resolveAssetUrl(logoAsset.url)} alt="QYLMORA" className="h-6 md:h-7 w-auto object-contain" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            <div className="w-px h-5 bg-stroke mx-1" />
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleClick(e, l.href, l.label)}
                className={`text-sm rounded-full px-4 py-2 transition-colors ${
                  active === l.label
                    ? "text-text-primary bg-stroke/50"
                    : "text-muted hover:text-text-primary hover:bg-stroke/50"
                }`}
              >
                {l.label}
              </a>
            ))}
            <div className="w-px h-5 bg-stroke mx-1" />
          </div>

          <div className="flex-1 md:hidden" />

          {/* CTA — hidden on smallest, visible from sm+ */}
          <a
            href="#waitlist"
            onClick={(e) => handleClick(e, "#waitlist", "Waitlist")}
            className="relative group rounded-full hidden sm:inline-flex shrink-0"
          >
            <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity animated-gradient-border" />
            <span className="relative inline-flex items-center gap-1 text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-surface text-text-primary backdrop-blur-md">
              Join Waitlist <span className="text-[10px]">↗</span>
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full text-text-primary hover:bg-stroke/50 transition-colors shrink-0"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-bg/85 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-3 px-8">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleClick(e, l.href, l.label)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`text-2xl font-display italic transition-all duration-500 ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              } ${active === l.label ? "text-text-primary" : "text-muted"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={(e) => handleClick(e, "#waitlist", "Waitlist")}
            style={{ transitionDelay: open ? `${LINKS.length * 40}ms` : "0ms" }}
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-text-primary text-bg text-sm transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Join Waitlist ↗
          </a>
        </div>
      </div>
    </>
  );
}
