import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const WaitlistSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  company: z.string().trim().min(1, "Company is required").max(120),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^https?:\/\/.+\..+/.test(v) || /^[a-z0-9-]+\.[a-z]{2,}/i.test(v), {
      message: "Enter a valid website",
    }),
  email: z.string().trim().toLowerCase().email("Invalid email").max(200),
  // Honeypot — must be empty
  hp: z.string().max(0).optional().default(""),
  // Timing trap — submissions faster than 1.5s are bots
  ts: z.number().int().nonnegative(),
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input) => WaitlistSchema.parse(input))
  .handler(async ({ data }) => {
    // Layer 1: honeypot (already validated empty)
    // Layer 2: timing trap
    const elapsed = Date.now() - data.ts;
    if (elapsed < 1500) {
      // Pretend success to not tip off bots
      return { ok: true };
    }
    // Layer 3: validated payload — log for now
    console.log("[waitlist]", {
      name: data.name,
      company: data.company,
      website: data.website,
      email: data.email,
      elapsedMs: elapsed,
    });
    return { ok: true };
  });
