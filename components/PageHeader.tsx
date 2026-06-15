import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/AnimatedText";

/** Standard hero band for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <header className="container-x pb-12 pt-40 sm:pt-48">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      {typeof title === "string" ? (
        <AnimatedText
          as="h1"
          text={title}
          delay={0.05}
          className="display mt-6 block max-w-4xl text-balance text-5xl font-bold sm:text-6xl lg:text-7xl"
        />
      ) : (
        <Reveal delay={0.05}>
          <h1 className="display mt-6 max-w-4xl text-balance text-5xl font-bold sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
      )}
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
