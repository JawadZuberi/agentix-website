"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Icon } from "@/components/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Capabilities ticker — a single infinite row of gradient icon + label chips.
 * The track (content duplicated twice, w-max) loops via a GSAP xPercent tween;
 * a ScrollTrigger maps scroll velocity to the loop's timeScale (base 1 → ~4,
 * negative when scrolling up so the ticker reverses) plus a slight skewX
 * (clamped ±6deg), both easing back to normal over ~0.8s ("power3.out").
 * Under reduced-motion no tweens are created — the row renders statically
 * with the edge mask still applied. Server HTML is the same static row.
 */
const items = [
  { label: "AI Automation", icon: "bolt" },
  { label: "AI Agents", icon: "agent" },
  { label: "Software", icon: "stack" },
  { label: "Websites", icon: "code" },
  { label: "Mobile Apps", icon: "mobile" },
  { label: "SaaS", icon: "cube" },
  { label: "CRM", icon: "crm" },
  { label: "Dashboards", icon: "search" },
  { label: "API", icon: "api" },
  { label: "Ecommerce", icon: "cart" },
  { label: "Digital Growth", icon: "megaphone" },
];

function Row({ trackRef }: { trackRef: React.RefObject<HTMLDivElement | null> }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      >
        {row.map((it, i) => (
          <span
            key={`${it.label}-${i}`}
            className="flex shrink-0 items-center gap-10 sm:gap-14"
          >
            <span className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-grad text-white shadow-[0_8px_24px_-10px_#7a2e8f]">
                <Icon name={it.icon} className="size-5" />
              </span>
              <span className="display whitespace-nowrap text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                {it.label}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rotate-45 rounded-[2px] bg-grad opacity-70"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatementMarquee() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Seamless loop: content is rendered twice, so -50% == one full cycle.
        const loop = gsap.to(track, {
          xPercent: -50,
          ease: "none",
          duration: 40,
          repeat: -1,
        });

        // Velocity → timeScale / skew, each on its own proxy object so the
        // decay tweens can overwrite themselves independently.
        const speed = { value: 1 };
        const skew = { value: 0 };
        const applySpeed = () => loop.timeScale(speed.value);
        const applySkew = () => gsap.set(track, { skewX: skew.value });

        ScrollTrigger.create({
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const magnitude = gsap.utils.clamp(
              1,
              4,
              1 + Math.abs(velocity) / 400
            );
            // Scrolling up (negative velocity) reverses the ticker.
            speed.value = velocity < 0 ? -magnitude : magnitude;
            skew.value = gsap.utils.clamp(-6, 6, velocity / 400);
            applySpeed();
            applySkew();

            // Ease both back to normal over ~0.8s.
            gsap.to(speed, {
              value: 1,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
              onUpdate: applySpeed,
            });
            gsap.to(skew, {
              value: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
              onUpdate: applySkew,
            });
          },
        });

        return () => {
          gsap.killTweensOf([speed, skew]);
          gsap.set(track, { clearProps: "transform" });
        };
      });
      // Reduced-motion: no tweens — the row stays static (mask still applied).
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-line bg-bg-2/50 py-12 sm:py-16"
    >
      {/* soft center glow so the band reads as a distinct, premium strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 50%, #7a2e8f12, transparent 70%)",
        }}
      />
      <div className="container-x mb-8 flex justify-center sm:mb-10">
        <Eyebrow>Everything we build, in one place</Eyebrow>
      </div>
      <Row trackRef={trackRef} />
    </section>
  );
}
