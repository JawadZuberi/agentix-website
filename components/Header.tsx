"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { nav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
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
