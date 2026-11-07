import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description, alternates: { canonical: `/projects/${slug}` }, openGraph: { title: `${project.title} | Voltnite`, description: project.description, url: `/projects/${slug}`, images: [{ url: project.image, alt: project.imageAlt }] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main id="main-content" className="inner-page"><Container><Link className="text-link back-link" href="/projects"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link><article className="project-detail"><div className="project-detail-image"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) calc(100vw - 40px), 420px" preload /><p>Visual from the supplied design reference.</p></div><div><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="detail-description">{project.overview}</p><h2>Project scope</h2><ul className="scope-list">{project.scope.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul><Link href="/contact" className="button button-primary">Discuss a project <ArrowRight size={16} aria-hidden="true" /></Link></div></article></Container></main>;
}
