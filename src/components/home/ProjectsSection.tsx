import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return <section id="projects" className="projects-section" aria-label="Featured projects"><Container className="container-wide"><SectionHeading eyebrow="FEATURED PROJECTS" title="Our Work" /><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Container></section>;
}
