import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Aurora } from "@/components/ui/Aurora";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line">
      <Aurora className="absolute inset-x-0 bottom-0 -z-10 h-[60%]" intensity="soft" />
      <div className="container-x py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}. AI automation, web and mobile development, custom software, and digital growth systems for modern businesses.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-fg">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover-underline inline-flex w-fit text-sm text-muted hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-fg">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover-underline inline-flex w-fit text-sm text-muted hover:text-fg"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-fg">Get in touch</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover-underline inline-flex w-fit hover:text-fg"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="hover-underline inline-flex w-fit hover:text-fg"
                >
                  {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
            <div className="mt-4 flex gap-3">
              {Object.entries(site.social).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="shine grid size-9 place-items-center rounded-full border border-line text-xs capitalize text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
                  aria-label={key}
                  title={key[0].toUpperCase() + key.slice(1)}
                >
                  {key[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>AI Automation · AI Agents · Software &amp; SaaS · Web, App &amp; Ecommerce · Digital Growth</p>
        </div>
      </div>
    </footer>
  );
}
