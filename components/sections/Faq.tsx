"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-x py-24 sm:py-32">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Questions, <span className="text-gradient">answered.</span>
          </>
        }
      />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="group">
              <button
                className="flex w-full items-center justify-between gap-4 rounded-lg py-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-label={`Toggle answer: ${f.q}`}
              >
                <span
                  className={`text-lg font-medium transition-colors duration-300 group-hover:text-gradient ${
                    isOpen ? "text-gradient" : "text-fg"
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-transparent bg-grad text-white"
                      : "border-line-strong text-fg group-hover:border-line-strong group-hover:bg-surface"
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen
                    ? "grid-rows-[1fr] pb-6 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="overflow-hidden text-muted">{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
