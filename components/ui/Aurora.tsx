"use client";

/**
 * Aurora — animated brand-gradient ambient background.
 * Large soft blurred radial blobs in brand colors that slowly drift/scale.
 * Static under prefers-reduced-motion (handled in globals.css).
 */
export function Aurora({
  className,
  intensity = "soft",
}: {
  className?: string;
  intensity?: "soft" | "bold";
}) {
  const opacity = intensity === "bold" ? 0.4 : 0.25;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className ?? ""}`}
    >
      <div className="aurora-blob aurora-blob-1" style={{ opacity }} />
      <div className="aurora-blob aurora-blob-2" style={{ opacity }} />
      <div className="aurora-blob aurora-blob-3" style={{ opacity }} />
    </div>
  );
}
