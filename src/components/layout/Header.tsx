"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" href="/" aria-label="Voltnite home" onClick={() => setOpen(false)}><Image src="/brand/voltnite-logo-light.webp" width={1699} height={362} sizes="(max-width: 1023px) 170px, 186px" quality={95} alt="VOLTNITE" preload /></Link>
    <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="main-navigation" aria-label="Main navigation" className={`main-navigation ${open ? "is-open" : ""}`} onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus(); } }}>
      {navigation.map(({ label, href }) => {
        const active = href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);
        return <Link key={label} href={href} aria-current={active ? "page" : undefined} className={`${label === "Contact Us" ? "button button-primary nav-contact" : "nav-link"} ${active ? "is-active" : ""}`} onClick={() => setOpen(false)}>{label}</Link>;
      })}
    </nav>
  </div></header>;
}
