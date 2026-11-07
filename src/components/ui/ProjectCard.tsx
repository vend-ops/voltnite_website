import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <div className="project-card-image"><Image quality={95} src={project.image} alt={project.imageAlt} fill sizes="(max-width: 479px) 38vw, (max-width: 767px) 156px, (max-width: 1023px) 28vw, 156px" /></div>
    <div className="project-card-copy"><h3>{project.title}</h3><p>{project.description}</p><Link className="text-link" href={`/projects/${project.slug}`}>View Project <ArrowRight size={14} aria-hidden="true" /><span className="sr-only">: {project.title}</span></Link></div>
  </article>;
}
