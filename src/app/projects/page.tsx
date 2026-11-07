import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import ContactCTA from "@/components/home/ContactCTA";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Our Projects", description: "Explore Voltnite's IoT payment controller, fleet operations platform, and custom hardware and software solutions.", alternates: { canonical: "/projects" }, openGraph: { url: "/projects", title: "Our Projects | Voltnite" } };

export default function ProjectsPage() {
  return <main id="main-content" className="inner-page"><Container className="container-wide"><div className="page-intro"><p className="eyebrow">HARDWARE · SOFTWARE · CONNECTED SYSTEMS</p><h1>Our Projects</h1><p>Connected hardware and software for real-world operations.</p></div><div className="projects-grid project-index">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Container><ContactCTA /></main>;
}
