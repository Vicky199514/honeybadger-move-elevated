import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LogoMark } from "@/components/Logo";


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-ink/85 backdrop-blur-md transition-[padding,background-color] duration-300",
        scrolled ? "py-2 bg-ink/95 border-b border-hairline-ink" : "py-4",
      )}
    >
      <div className="shell flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-sm font-extrabold tracking-[0.24em] text-bone uppercase sm:text-base"
          aria-label="Honey Badger Outfits — home"
        >
          <LogoMark className="size-8 sm:size-9" />
          Honey<span className="text-accent">·</span>Badger
        </Link>


        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow text-bone/70 transition-colors hover:text-bone"
              activeProps={{ className: "eyebrow text-bone" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton className="hidden sm:inline-flex" size="md">
            Order
          </WhatsAppButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-sm border border-hairline-ink text-bone lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-hairline-ink bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-b border-hairline-ink py-4 font-display text-lg font-extrabold tracking-tight text-bone uppercase last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppButton className="my-4" size="lg" />
        </nav>
      </div>
    </header>
  );
}
