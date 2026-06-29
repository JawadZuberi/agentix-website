"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WorkCard } from "@/components/WorkCard";
import { Reveal } from "@/components/Reveal";
import type { CaseStudy } from "@/lib/content";

type Tab = { label: string; count: number };

/**
 * WorkGallery — filterable portfolio grid.
 * Renders a row of service-filter tabs ("All" + each distinct service that
 * appears across the cases, with a per-tab count) and an animated, responsive
 * grid of WorkCards (each in Reveal). Filtering animates via layout + presence.
 */
export function WorkGallery({ cases }: { cases: CaseStudy[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("All");

  // Distinct services across all cases, in first-seen order, each with a count.
  const tabs = useMemo<Tab[]>(() => {
    const counts = new Map<string, number>();
    for (const c of cases) {
      for (const s of c.services) {
        counts.set(s, (counts.get(s) ?? 0) + 1);
      }
    }
    const serviceTabs: Tab[] = [...counts.entries()].map(([label, count]) => ({
      label,
      count,
    }));
    return [{ label: "All", count: cases.length }, ...serviceTabs];
  }, [cases]);

  const filtered = useMemo(
    () =>
      active === "All"
        ? cases
        : cases.filter((c) => c.services.includes(active)),
    [cases, active],
  );

  return (
    <section className="container-x">
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter work by service"
        className="flex flex-wrap gap-2.5"
      >
        {tabs.map((tab) => {
          const isActive = tab.label === active;
          return (
            <button
              key={tab.label}
              role="tab"
              aria-selected={isActive}
              data-cursor
              onClick={() => setActive(tab.label)}
              className={`group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                isActive
                  ? "border-transparent text-bg"
                  : "border-line bg-surface/40 text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="work-tab-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{tab.label}</span>
              <span
                className={`relative grid min-w-5 place-items-center rounded-full px-1.5 text-[11px] tabular-nums transition-colors duration-300 ${
                  isActive
                    ? "bg-bg/15 text-bg"
                    : "bg-fg/[0.06] text-faint group-hover:bg-fg/10"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="mt-6 text-sm text-faint" aria-live="polite">
        Showing{" "}
        <span className="font-medium text-fg tabular-nums">
          {filtered.length}
        </span>{" "}
        {filtered.length === 1 ? "project" : "projects"}
        {active !== "All" && (
          <>
            {" "}
            in <span className="text-fg">{active}</span>
          </>
        )}
      </p>

      {/* Grid */}
      <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.slug}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
              transition={{
                duration: 0.45,
                delay: reduce ? 0 : (i % 2) * 0.05,
                ease: [0.16, 1, 0.3, 1],
                layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <Reveal>
                <WorkCard item={item} />
              </Reveal>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state (defensive — current data always has matches) */}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-3xl border border-line bg-surface/40 p-12 text-center">
          <p className="text-lg font-medium text-fg">No projects here yet.</p>
          <p className="mt-2 text-sm text-muted">
            We&rsquo;re always shipping new work. Try another service or view all
            projects.
          </p>
          <button
            data-cursor
            onClick={() => setActive("All")}
            className="hover-underline mt-5 text-sm font-medium text-fg"
          >
            View all work
          </button>
        </div>
      )}
    </section>
  );
}
