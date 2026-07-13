"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

/**
 * Page-exit curtain transition. A document-level click interceptor catches
 * plain left-clicks on internal links, wipes a brand-gradient curtain up from
 * the bottom, then pushes the route. When the pathname changes the curtain
 * lifts from the top, choreographed with the new page's template fade-in.
 *
 * Safety rails: reduced-motion users navigate natively (no interception),
 * the curtain rests at scaleY(0) with pointer-events none (content is never
 * blocked if JS fails or idles), double-clicks are ignored mid-transition,
 * and a 3s failsafe force-clears the curtain so a slow route can never
 * permanently cover the page.
 */
export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  /** Curtain fully covers the page and is waiting for the new route. */
  const coveringRef = useRef(false);
  /** A transition is in flight — guards double-clicks. */
  const busyRef = useRef(false);
  /** Skip the reveal logic on the very first mount. */
  const firstMountRef = useRef(true);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Force the curtain back to its hidden resting state. */
  const hardReset = useCallback(() => {
    if (failsafeRef.current !== null) {
      clearTimeout(failsafeRef.current);
      failsafeRef.current = null;
    }
    const panel = panelRef.current;
    const mark = markRef.current;
    const root = rootRef.current;
    if (panel && mark) {
      gsap.killTweensOf([panel, mark]);
      gsap.set(panel, { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set(mark, { opacity: 0 });
    }
    if (root) root.style.pointerEvents = "none";
    coveringRef.current = false;
    busyRef.current = false;
  }, []);

  // Intercept internal link clicks and run the curtain-in wipe.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target instanceof Element)) return;

      const anchor = e.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      // Only same-origin internal paths ("/..." but not protocol-relative "//...").
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;

      // Reduced motion: let Next handle navigation natively.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Skip hash-only links / anything that doesn't change the pathname.
      const dest = new URL(href, window.location.href);
      if (dest.pathname === window.location.pathname) return;

      e.preventDefault();
      if (busyRef.current) return; // already transitioning — swallow the click

      const root = rootRef.current;
      const panel = panelRef.current;
      const mark = markRef.current;
      if (!root || !panel || !mark) {
        router.push(dest.pathname + dest.search + dest.hash);
        return;
      }

      busyRef.current = true;
      root.style.pointerEvents = "auto";

      // Failsafe: never leave the page covered for more than 3s.
      failsafeRef.current = setTimeout(hardReset, 3000);

      gsap.killTweensOf([panel, mark]);
      gsap
        .timeline({
          onComplete: () => {
            coveringRef.current = true;
            router.push(dest.pathname + dest.search + dest.hash);
          },
        })
        .fromTo(
          panel,
          { scaleY: 0, transformOrigin: "50% 100%" },
          { scaleY: 1, duration: 0.45, ease: "power4.inOut" },
          0
        )
        .fromTo(
          mark,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
          0.18
        );
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (revealDelayRef.current !== null) clearTimeout(revealDelayRef.current);
      hardReset();
    };
  }, [router, hardReset]);

  // When the route lands, lift the curtain (slightly after the template fade-in starts).
  useEffect(() => {
    if (firstMountRef.current) {
      firstMountRef.current = false;
      return;
    }
    if (!coveringRef.current) return;

    const panel = panelRef.current;
    const mark = markRef.current;
    if (!panel || !mark) {
      hardReset();
      return;
    }

    revealDelayRef.current = setTimeout(() => {
      revealDelayRef.current = null;
      if (failsafeRef.current !== null) {
        clearTimeout(failsafeRef.current);
        failsafeRef.current = null;
      }
      gsap.killTweensOf([panel, mark]);
      gsap
        .timeline({ onComplete: hardReset })
        .to(mark, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0)
        .fromTo(
          panel,
          { scaleY: 1, transformOrigin: "50% 0%" },
          { scaleY: 0, duration: 0.5, ease: "power4.inOut" },
          0
        );
    }, 150);

    return () => {
      if (revealDelayRef.current !== null) {
        clearTimeout(revealDelayRef.current);
        revealDelayRef.current = null;
      }
    };
  }, [pathname, hardReset]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95]"
    >
      <div
        ref={panelRef}
        className="bg-grad absolute inset-0"
        style={{ transform: "scaleY(0)", transformOrigin: "50% 100%" }}
      />
      <span
        ref={markRef}
        className="display absolute inset-0 flex items-center justify-center text-2xl font-semibold tracking-[0.4em] text-white"
        style={{ opacity: 0 }}
      >
        AGENTIX
      </span>
    </div>
  );
}
