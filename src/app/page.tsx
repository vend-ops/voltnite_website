import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import AboutSection from "@/components/home/AboutSection";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return <main id="main-content"><HeroSection /><ServicesSection /><ProjectsSection /><AboutSection /><ContactCTA /></main>;
}
