import Link from "next/link";

/**
 * Brand logo. Renders the gradient pyramid mark (an SVG approximation of the
 * Agentix Solution logo) + wordmark. Drop the real asset at /public/logo.png
 * and set `useImage` to true, or replace this mark with the official SVG.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Agentix Solution — home">
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="agx" x1="6" y1="44" x2="42" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2e3192" />
            <stop offset="0.5" stopColor="#7a2e8f" />
            <stop offset="1" stopColor="#e2542c" />
          </linearGradient>
        </defs>
        {/* stacked-pyramid mark */}
        <path d="M24 5 41 35H7L24 5Z" stroke="url(#agx)" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M24 18 31 30H17L24 18Z" stroke="url(#agx)" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M6 41h36" stroke="url(#agx)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="display text-lg font-bold tracking-tight text-gradient">
            AGENTIX
          </span>
          <span className="text-[0.6rem] font-medium tracking-[0.35em] text-faint">
            SOLUTION
          </span>
        </span>
      )}
    </Link>
  );
}
