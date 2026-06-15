import type { SVGProps } from "react";

/**
 * Minimal stroke icon set used by service cards and UI.
 * Keys map to the `icon` field in lib/content.ts.
 */
const paths: Record<string, React.ReactNode> = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 9-12H12l1-8Z" />,
  agent: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M12 1v1.5M19 8h1.5M3.5 8H5" />
    </>
  ),
  code: <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  stack: <path d="m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5" />,
  cube: (
    <>
      <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
      <path d="m12 2 9 5-9 5-9-5M12 12v10" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  crm: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 4v16" />
      <path d="M12.5 13h5M12.5 16.5h3" />
    </>
  ),
  api: (
    <>
      <path d="M7 8 3 12l4 4M17 8l4 4-4 4" />
      <path d="M14 5 10 19" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M19 8a4 4 0 0 1 0 8" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3h2l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.4a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-2 1-2 5-2 5s4 0 5-2M9 13a13 13 0 0 1 9-9c2 0 3 1 3 3a13 13 0 0 1-9 9l-3-3Z" />
      <circle cx="15" cy="9" r="1.5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? paths.bolt}
    </svg>
  );
}
