import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "@/components/Icon";

type Variant = "primary" | "ghost" | "outline";

const base =
  "shine group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-grad text-white shadow-[0_18px_50px_-20px_#7a2e8f] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-18px_#c0392b]",
  outline:
    "border-grad text-fg hover:-translate-y-0.5",
  ghost: "text-muted hover:text-fg",
};

type Props = {
  variant?: Variant;
  arrow?: boolean;
  href?: string;
} & ComponentProps<"button"> &
  Partial<ComponentProps<typeof Link>>;

export function Button({
  variant = "primary",
  arrow = false,
  href,
  className = "",
  children,
  ...props
}: Props) {
  const content = (
    <>
      {children}
      {arrow && (
        <Icon
          name="arrow"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {content}
    </button>
  );
}
