import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/lib/constants";

export default function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><div><Link className="brand" href="/" aria-label="Voltnite home"><Image src="/brand/voltnite-logo-light.webp" alt="VOLTNITE" width={1699} height={362} sizes="160px" quality={95} /></Link><p className="tagline">Powering Infinite Intelligence.</p></div><nav aria-label="Footer navigation">{navigation.map(({ label, href }) => <Link href={href} key={label}>{label === "Contact Us" ? "Contact" : label}</Link>)}</nav></div>
    <div className="footer-bottom"><span>{}</span><span>© {new Date().getFullYear()} Voltnite. All rights reserved.</span></div>
  </div></footer>;
}
