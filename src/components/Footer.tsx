import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import { footerLinks, nav, site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/WhatsAppButton";
import { LogoMark } from "@/components/Logo";


export function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-28 text-bone/70 lg:pb-16">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-[0.12em] text-bone uppercase">
              <LogoMark className="size-10" />
              Honey Badger<span className="text-accent">.</span>
            </p>

            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Men's clothing focused on comfortable, functional and modern everyday wear.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-sm border border-hairline-ink text-bone transition-colors hover:bg-accent hover:text-ink"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppGlyph />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-sm border border-hairline-ink text-bone transition-colors hover:bg-accent hover:text-ink"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="grid size-11 place-items-center rounded-sm border border-hairline-ink text-bone transition-colors hover:bg-accent hover:text-ink"
                aria-label="Email us"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="eyebrow text-bone">Navigation</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-bone">Information</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-bone">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline-ink pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Honey Badger Outfits. All rights reserved.</p>
          <p>{site.instagramHandle}</p>
        </div>
      </div>
    </footer>
  );
}
