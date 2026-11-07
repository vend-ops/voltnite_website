import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

export default function HeroSection() {
  return <section className="hero" aria-labelledby="hero-heading"><div className="hero-stage">
    <div className="hero-art"><Image quality={95} src="/images/voltnite-controller-hero-branded.webp" alt="Reference illustration of a black IoT controller displaying the supplied Voltnite lightning V logo and wordmark" fill sizes="(max-width: 767px) 100vw, 641px" preload /></div>
    <Container><div className="hero-copy"><p className="eyebrow">HARDWARE <span>·</span> SOFTWARE <span>·</span> CONNECTED SYSTEMS</p><h1 id="hero-heading"><span>We Build Intelligent</span><span>Hardware &amp; Software</span></h1><p className="hero-description">IoT, embedded systems and cloud software to connect<br className="desktop-break" /> machines, devices and real-world operations.</p><div className="hero-actions"><Link href="/projects" className="button button-primary">Explore Projects <ArrowRight size={16} aria-hidden="true" /></Link><Link href="#services" className="button button-outline">Our Services</Link></div></div></Container>
  </div></section>;
}
