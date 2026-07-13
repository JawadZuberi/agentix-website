"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { nav } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!progressRef.current) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Page scroll progress: one scrubbed ScrollTrigger spanning the
        // whole document. Bar starts at scaleX 0 (invisible), so under
        // reduced-motion / no-JS nothing shows.
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "max",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-x">
        <div
          className={`relative flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "glass glow backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover-underline rounded-full px-4 py-2 text-sm transition-colors ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button
              href="/contact"
              arrow
              className="px-5 py-2.5 hover:scale-[1.03]"
            >
              Start a project
            </Button>
          </div>

          <button
            className="md:hidden rounded-lg p-2 text-fg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-current transition-transform ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-transform ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>

          {/* Page scroll-progress bar, hugging the pill's bottom edge */}
          <div
            ref={progressRef}
            aria-hidden="true"
            className="bg-grad pointer-events-none absolute inset-x-3 bottom-0 h-0.5 origin-left scale-x-0 rounded-full"
          />
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="glass glow mt-2 rounded-2xl p-4 md:hidden">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover-underline inline-flex w-fit rounded-lg px-3 py-3 text-base text-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/contact" arrow className="mt-2 justify-center">
                Start a project
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
