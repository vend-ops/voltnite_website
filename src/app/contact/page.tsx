import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Tell Voltnite about your hardware, embedded systems, IoT or cloud software project.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact Us | Voltnite" },
};
export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <main id="main-content" className="inner-page">
      <Container className="contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">CONTACT VOLTNITE</p>
          <h1>Let’s Build Together</h1>
          <p>Have an idea or a project in mind? Tell us about it.</p>
          <p>
            From electronics and embedded systems to connected devices and cloud software,
            share what you’re building and where you need our engineering team.
          </p>
        </div>
        <ContactForm />
      </Container>
    </main>
  );
}
