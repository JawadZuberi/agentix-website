/**
 * SectionDivider — thin full-width hairline with a moving gradient shine.
 * Server component. Shine animation is disabled under reduced-motion (globals.css).
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`section-divider ${className ?? ""}`}
    />
  );
}
