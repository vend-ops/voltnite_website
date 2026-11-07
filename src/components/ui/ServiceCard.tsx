import type { LucideIcon } from "lucide-react";

export default function ServiceCard({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return <article className="service-card"><Icon size={39} strokeWidth={1.7} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>;
}
