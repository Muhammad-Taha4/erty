import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import HlsVideo from "./HlsVideo";
import { joinWaitlist } from "@/lib/waitlist.functions";

const SOCIALS = ["Vision", "How It Works", "FAQ", "Contact"];

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const mountedAt = useRef<number>(Date.now());
  const submit = useServerFn(joinWaitlist);

  const [form, setForm] = useState({ name: "", company: "", website: "", email: "", hp: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 15, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setErrors({});

    // Client-side checks (mirror server schema)
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.company.trim()) next.company = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Invalid email";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      await submit({
        data: {
          name: form.name,
          company: form.company,
          website: form.website,
          email: form.email,
          hp: form.hp,
          ts: mountedAt.current,
        },
      });
      setDone(true);
      toast.success("You're on the list — we'll be in touch soon.");
      setForm({ name: "", company: "", website: "", email: "", hp: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const text = "QYLMORA • REIMAGINING JEWELRY RETAIL • ";

  const inputClass =
    "w-full rounded-full bg-surface border border-stroke px-5 py-3 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-white/30 transition";

  return (
    <section id="contact" className="relative bg-bg pt-12 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo flipY />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="overflow-hidden py-6 md:py-8">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/90"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="px-2">
                {text}
              </span>
            ))}
          </div>
        </div>

        <div id="waitlist" className="flex flex-col items-center text-center mt-6 mb-12 max-w-xl mx-auto">
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-5">Waitlist</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-5 leading-[1.05]">
            Help shape the future of jewelry retail.
          </h2>
          <p className="text-sm md:text-base text-muted mb-7 max-w-md">
            Hi, I'm Harshit, founder of QYLMORA. We're exploring how immersive technology can help jewelry businesses
            create more confident shopping experiences — and we're speaking with retailers and brands to build the
            right solution.
          </p>

          {done ? (
            <div className="rounded-2xl border border-stroke bg-surface/60 backdrop-blur p-6 w-full">
              <p className="text-text-primary text-lg font-display italic mb-1">Thank you ✦</p>
              <p className="text-muted text-sm">You're on the list. We'll reach out soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                value={form.hp}
                onChange={handleChange("hp")}
                aria-hidden="true"
                className="hidden"
              />
              <div className="flex flex-col text-left">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  maxLength={80}
                  onChange={handleChange("name")}
                  className={`${inputClass} ${errors.name ? "border-red-500/60" : ""}`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="text-[11px] text-red-400 mt-1 ml-4">{errors.name}</span>}
              </div>
              <div className="flex flex-col text-left">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={form.company}
                  maxLength={120}
                  onChange={handleChange("company")}
                  className={`${inputClass} ${errors.company ? "border-red-500/60" : ""}`}
                  aria-invalid={!!errors.company}
                />
                {errors.company && <span className="text-[11px] text-red-400 mt-1 ml-4">{errors.company}</span>}
              </div>
              <input
                type="url"
                placeholder="Website (optional)"
                value={form.website}
                maxLength={200}
                onChange={handleChange("website")}
                className={inputClass}
              />
              <div className="flex flex-col text-left">
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  maxLength={200}
                  onChange={handleChange("email")}
                  className={`${inputClass} ${errors.email ? "border-red-500/60" : ""}`}
                  aria-invalid={!!errors.email}
                  required
                />
                {errors.email && <span className="text-[11px] text-red-400 mt-1 ml-4">{errors.email}</span>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group relative rounded-full sm:col-span-2 mt-2 disabled:opacity-60"
              >
                <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity animated-gradient-border" />
                <span className="relative inline-flex w-full items-center justify-center rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-all">
                  {submitting ? "Joining…" : "Join The Waitlist ↗"}
                </span>
              </button>
            </form>
          )}

          <p className="text-xs text-muted mt-2">
            No commitment required. Early access invitations will be sent to waitlist members first.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8 border-t border-stroke">
          <div className="flex items-center gap-2 text-xs text-muted text-center md:text-left">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="font-display italic text-text-primary text-sm mr-2">QYLMORA</span>
            <span className="hidden sm:inline">Reimagining how jewelry is discovered, experienced, and purchased.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-muted hover:text-text-primary transition-colors uppercase tracking-[0.2em]"
              >
                {s}
              </a>
            ))}
          </div>
          <div className="text-xs text-muted">© 2026 QYLMORA. All Rights Reserved.</div>
        </div>
      </div>
    </section>
  );
}
