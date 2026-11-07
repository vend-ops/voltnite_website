import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";

export default function AboutSection() {
  return <section id="about" className="about-section" aria-labelledby="about-heading"><Container className="about-grid">
    <div className="about-image"><Image quality={95} src="/images/voltnite-engineering-lab.webp" alt="Reference illustration of an electronics workbench with PCB design on a laptop, a prototype circuit board and an oscilloscope" fill sizes="(max-width: 767px) calc(100vw - 40px), 465px" /></div>
    <div className="about-copy"><p className="eyebrow">ABOUT VOLTNITE</p><h2 id="about-heading">A Hardware-Software Engineering Company</h2><p>Voltnite builds practical and reliable technology solutions by combining electronics, embedded systems, IoT and cloud software. We design, develop and deploy products for real-world use, from concept to production.</p><ul className="about-features">{["Product Design & Development", "End-to-End Implementation", "Deployment & Support"].map((feature) => <li key={feature}><span className="check-icon"><Check size={11} strokeWidth={3} aria-hidden="true" /></span>{feature}</li>)}</ul></div>
  </Container></section>;
}
