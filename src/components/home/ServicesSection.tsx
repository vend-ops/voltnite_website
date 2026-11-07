import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export default function ServicesSection() {
  return <section id="services" className="services-section" aria-label="Engineering services"><Container><SectionHeading eyebrow="WHAT WE DO" title="Our Engineering Services" /><div className="services-grid">{services.map((service) => <ServiceCard key={service.title} {...service} />)}</div></Container></section>;
}
