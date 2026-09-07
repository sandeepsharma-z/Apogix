"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";

const links = [["Home", "/"], ["Features", "/features"], ["Integrations", "/integrations"], ["Pricing", "/pricing"], ["About", "/about"], ["Contact", "/contact"]];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 8);
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setMobile(false); };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("scroll", scroll); document.removeEventListener("pointerdown", outside); };
  }, []);
  return <header ref={root} className="site-header" data-scrolled={scrolled} onKeyDown={event => {
    if (event.key === "Escape" && mobile) { setMobile(false); root.current?.querySelector<HTMLButtonElement>(".mobile-nav-toggle")?.focus(); }
  }}>
    <div className="container nav">
      <a className="brand" href="/" aria-label="Apogix home"><Image className="brand-logo" src="/apogix-logo.webp" alt="Apogix" width={139} height={40} priority/></a>
      <button className="mobile-nav-toggle" aria-label={mobile ? "Close navigation" : "Open navigation"} aria-expanded={mobile} aria-controls="main-navigation" onClick={() => setMobile(!mobile)}>{mobile ? "\u2715" : "\u2630"}</button>
      <nav id="main-navigation" aria-label="Main navigation" className={`nav-links ${mobile ? "is-mobile-open" : ""}`}>
        {links.map(([label, href]) => <a key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMobile(false)}>{label}</a>)}
      </nav>
      <div className="nav-actions"><a className="header-login" href="/login">Log in</a><a className="btn btn--primary" href="/signup">Start creating <ArrowRight width={16} height={16}/></a></div>
    </div>
  </header>;
}
