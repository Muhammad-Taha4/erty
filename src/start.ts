import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Security headers — applied to every server response
const securityHeadersMiddleware = createMiddleware().server(async ({ next }) => {
  const response = await next();
  const res = response instanceof Response ? response : (response as any)?.response;
  const target: Response | undefined = res instanceof Response ? res : undefined;
  if (target) {
    const h = target.headers;
    // Anti-clickjacking
    if (!h.has("X-Frame-Options")) h.set("X-Frame-Options", "SAMEORIGIN");
    // MIME sniffing
    if (!h.has("X-Content-Type-Options")) h.set("X-Content-Type-Options", "nosniff");
    // Referrer
    if (!h.has("Referrer-Policy")) h.set("Referrer-Policy", "strict-origin-when-cross-origin");
    // Permissions
    if (!h.has("Permissions-Policy"))
      h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
    // HSTS (only meaningful over HTTPS, harmless otherwise)
    if (!h.has("Strict-Transport-Security"))
      h.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    // Content Security Policy — permissive to allow framer/gstatic images, gsap, etc.
    if (!h.has("Content-Security-Policy")) {
      h.set(
        "Content-Security-Policy",
        [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' data: https://fonts.gstatic.com",
          "img-src 'self' data: blob: https:",
          "media-src 'self' blob: https:",
          "connect-src 'self' https: wss:",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      );
    }
  }
  return response;
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeadersMiddleware, errorMiddleware],
}));
