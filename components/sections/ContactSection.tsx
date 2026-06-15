import { ContactForm } from "@/components/ContactForm";
import { Aurora } from "@/components/ui/Aurora";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { AnimatedText } from "@/components/AnimatedText";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { contactInfo } from "@/lib/content";
import { site } from "@/lib/site";

const points = [
  "A short discovery call to understand the outcome",
  "An honest take on whether AI actually helps here",
  "A scoped proposal with a clear price and timeline",
];

/** Home-page contact section — reuses the working ContactForm + /api/contact flow. */
export function ContactSection() {
  return (
    <>
      <SectionDivider className="container-x" />
      <section id="contact" className="bg-aurora relative py-24 sm:py-32">
        <Aurora className="absolute inset-0 -z-10" intensity="soft" />

        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: pitch + details */}
          <div>
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
            </Reveal>
            <h2 className="display mt-5 text-balance text-4xl font-bold sm:text-5xl">
              <AnimatedText text="Let's build something" as="span" />{" "}
              <span className="text-gradient">
                <AnimatedText text="intelligent together." as="span" delay={0.12} />
              </span>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                {contactInfo.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 space-y-4">
                {points.map((p, i) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-grad text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-muted">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3 rounded-3xl border border-line bg-surface/40 p-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="display hover-underline mt-1 block w-fit text-lg font-semibold text-gradient"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">Call</p>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="hover-underline mt-1 block w-fit text-sm font-medium text-fg"
                  >
                    {site.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-faint">Office</p>
                  <p className="mt-1 text-sm text-muted">{site.location}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: the form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
