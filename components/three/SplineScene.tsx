"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWebGLEnabled } from "@/lib/useWebGLEnabled";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Spline runtime is heavy and WebGL-only — load it client-side, lazily.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

/* ------------------------------------------------------------------ */
/* Narrow adapter types — the Spline Application type doesn't expose   */
/* these APIs publicly, so we probe them defensively at runtime.       */
/* ------------------------------------------------------------------ */

type SplineVec3 = { x: number; y: number; z: number };

type SplineObjectLike = {
  name?: string;
  rotation?: SplineVec3;
  position?: SplineVec3;
  children?: unknown[];
};

type SplineAppLike = {
  setBackgroundColor?: (c: string) => void;
  getAllObjects?: () => SplineObjectLike[];
  findObjectByName?: (name: string) => SplineObjectLike | undefined;
};

const PREFERRED_NAME = /robot|bot|body|group|scene/i;
const NAME_CANDIDATES = ["Robot", "robot", "Bot", "Body", "Group", "Scene"];

function isRotatable(o: SplineObjectLike | null | undefined): o is SplineObjectLike & { rotation: SplineVec3 } {
  return Boolean(
    o &&
      o.rotation &&
      typeof o.rotation.x === "number" &&
      typeof o.rotation.y === "number"
  );
}

/**
 * Defensively find an object worth rotating. Returns null (and the scene
 * keeps working untouched) if the Spline API surface has changed.
 */
function findRotatableObject(app: SplineAppLike): (SplineObjectLike & { rotation: SplineVec3 }) | null {
  try {
    // Strategy 1: direct lookup by common names.
    for (const name of NAME_CANDIDATES) {
      const obj = app.findObjectByName?.(name);
      if (isRotatable(obj)) return obj;
    }

    // Strategy 2: scan all objects.
    const all = app.getAllObjects?.();
    if (!Array.isArray(all) || all.length === 0) return null;

    const usable = all.filter(
      (o): o is SplineObjectLike & { rotation: SplineVec3 } =>
        isRotatable(o) && typeof o.name === "string" && o.name.length > 0
    );
    if (usable.length === 0) return null;

    // 2a: prefer names that look like the hero subject.
    const preferred = usable.find((o) => PREFERRED_NAME.test(o.name ?? ""));
    if (preferred) return preferred;

    // 2b: else the object with the most children (likely the root group).
    let best = usable[0];
    let bestKids = Array.isArray(best.children) ? best.children.length : 0;
    for (const o of usable) {
      const kids = Array.isArray(o.children) ? o.children.length : 0;
      if (kids > bestKids) {
        best = o;
        bestKids = kids;
      }
    }
    return best;
  } catch {
    return null;
  }
}

/** Soft brand-gradient glow used while loading and as the low-power fallback. */
function Glow() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="animate-float size-3/4 rounded-full bg-grad opacity-20 blur-3xl" />
    </div>
  );
}

/**
 * Embeds a Spline scene. Renders the live 3D scene on capable devices and a
 * soft gradient glow on low-power / reduced-motion (keeps the page fast).
 *
 * On desktop (no reduced motion) the hero object also reacts to scroll
 * (slow Y turn + gentle X tilt, scrubbed) and to pointer movement over the
 * wrapper (small additive parallax). Both are no-ops if no rotatable object
 * can be discovered in the scene.
 *
 * The scroll rotation is anchored to the HERO section (via `sectionRef` +
 * `scrollEnd`) so it shares the hero's pin clock: the robot finishes turning
 * exactly as the section unpins, instead of running on an independent
 * document-body trigger that would keep rotating after the hero releases.
 * Falls back to a self-contained document-body trigger if no ref is passed.
 */
export default function SplineScene({
  url,
  className,
  sectionRef,
  scrollEnd,
}: {
  url: string;
  className?: string;
  /** Hero section to anchor the scroll rotation to (shares the pin clock). */
  sectionRef?: RefObject<HTMLElement | null>;
  /** ScrollTrigger `end` matched to the hero pin so rotation completes at release. */
  scrollEnd?: string;
}) {
  const webgl = useWebGLEnabled();
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Dispose scroll/pointer wiring on unmount.
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  if (!webgl) {
    return (
      <div className={className}>
        <Glow />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={`${className ?? ""} overflow-hidden`}>
      {!loaded && <Glow />}
      {/* Render the scene taller than the frame and clip the bottom, so the
          free-tier "Built with Spline" badge (drawn at the canvas bottom) is
          cut off — without an opaque mask that would block the background glow. */}
      <div className="absolute inset-x-0 top-0" style={{ height: "calc(100% + 80px)" }}>
        <Suspense fallback={<Glow />}>
          <Spline
            scene={url}
            onLoad={(spline: unknown) => {
              const app = spline as SplineAppLike;
              // Make the scene's baked background transparent so only the
              // 3D object shows over the page.
              try {
                app.setBackgroundColor?.("transparent");
              } catch {
                /* non-fatal — scene still renders */
              }
              setLoaded(true);

              // Tear down any previous wiring (e.g. fast-refresh re-load).
              cleanupRef.current?.();
              cleanupRef.current = null;

              const target = findRotatableObject(app);
              if (!target) return; // plain scene keeps working

              // Capture the initial rotation as the base so re-mounts
              // never drift the object.
              const base = { x: target.rotation.x, y: target.rotation.y };
              const state = { scroll: 0, px: 0, py: 0 };

              const apply = () => {
                try {
                  const r = target.rotation;
                  if (!r) return;
                  // Scroll: up to ~0.9 rad on Y; X tilts to ~0.15 rad and
                  // eases back (sine arc). Pointer offsets add on top.
                  r.y = base.y + state.scroll * 0.9 + state.px;
                  r.x =
                    base.x +
                    Math.sin(state.scroll * Math.PI) * 0.15 +
                    state.py;
                } catch {
                  /* Spline internals changed — never crash the hero */
                }
              };

              const mm = gsap.matchMedia();
              mm.add(
                "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
                () => {
                  // Anchor to the hero section (same trigger + end as the
                  // hero pin) so the rotation and the pin share one clock and
                  // finish together. Fall back to the whole document only when
                  // no section ref was provided (component used standalone).
                  const st = ScrollTrigger.create({
                    trigger: sectionRef?.current ?? document.body,
                    start: "top top",
                    end: scrollEnd ?? "+=180%",
                    scrub: 1,
                    onUpdate: (self) => {
                      state.scroll = self.progress;
                      apply();
                    },
                  });

                  // Pointer parallax — quickTo lerps the proxy (no extra
                  // tickers) and each update re-applies the combined pose.
                  const toPx = gsap.quickTo(state, "px", {
                    duration: 0.6,
                    ease: "power3.out",
                    onUpdate: apply,
                  });
                  const toPy = gsap.quickTo(state, "py", {
                    duration: 0.6,
                    ease: "power3.out",
                    onUpdate: apply,
                  });

                  const el = wrapperRef.current;
                  const onPointerMove = (e: PointerEvent) => {
                    const rect = el?.getBoundingClientRect();
                    if (!rect || rect.width === 0 || rect.height === 0) return;
                    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                    toPx(nx * 0.08);
                    toPy(ny * 0.08);
                  };
                  const onPointerLeave = () => {
                    toPx(0);
                    toPy(0);
                  };
                  el?.addEventListener("pointermove", onPointerMove);
                  el?.addEventListener("pointerleave", onPointerLeave);

                  return () => {
                    st.kill();
                    el?.removeEventListener("pointermove", onPointerMove);
                    el?.removeEventListener("pointerleave", onPointerLeave);
                    // Restore the captured base pose.
                    try {
                      const r = target.rotation;
                      if (r) {
                        r.x = base.x;
                        r.y = base.y;
                      }
                    } catch {
                      /* noop */
                    }
                  };
                }
              );

              cleanupRef.current = () => mm.revert();
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>
    </div>
  );
}
