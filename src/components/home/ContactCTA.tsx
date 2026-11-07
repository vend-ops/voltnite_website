import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

export default function ContactCTA() {
  return <section className="cta-section" aria-labelledby="cta-heading"><Container className="cta-banner"><div className="cta-copy"><h2 id="cta-heading">Let’s Build Together</h2><p>Have an idea or a project in mind? Get in touch with our engineering team.</p></div><Link href="/contact" className="button button-white">Contact Us <ArrowRight size={16} aria-hidden="true" /></Link></Container></section>;
}
