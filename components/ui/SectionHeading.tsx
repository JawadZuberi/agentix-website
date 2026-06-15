import { Reveal } from "@/components/Reveal";
import { AnimatedText } from "@/components/AnimatedText";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/50 px-3 py-1 text-xs font-medium tracking-wide text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg">
      <span className="size-1.5 rounded-full bg-grad transition-transform duration-300 group-hover:scale-150" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      {typeof title === "string" ? (
        <AnimatedText
          as="h2"
          text={title}
          delay={0.05}
          className="display mt-5 block text-balance text-4xl font-bold sm:text-5xl"
        />
      ) : (
        <Reveal delay={0.05}>
          <h2 className="display mt-5 text-balance text-4xl font-bold sm:text-5xl">
            {title}
          </h2>
        </Reveal>
      )}
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-lg leading-relaxed text-muted ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
