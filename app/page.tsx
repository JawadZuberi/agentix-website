import { Hero } from "@/components/Hero";
import { StatementMarquee } from "@/components/sections/StatementMarquee";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { FeaturedSolutions } from "@/components/sections/FeaturedSolutions";
import { WorkPreview } from "@/components/sections/WorkPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { ContactSection } from "@/components/sections/ContactSection";
import { servicesLd, faqLd, jsonLdScript } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(servicesLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqLd())}
      />
      <Hero />
      <StatementMarquee />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <Process />
      <Industries />
      <FeaturedSolutions />
      <WorkPreview />
      <Testimonials />
      <Faq />
      <FinalCta />
      <ContactSection />
    </>
  );
}
