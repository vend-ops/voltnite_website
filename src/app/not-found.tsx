import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return <main id="main-content" className="inner-page"><Container><div className="page-intro"><p className="eyebrow">404</p><h1>Page not found</h1><p>The page you’re looking for isn’t here.</p><Link className="button button-primary" href="/">Back to home</Link></div></Container></main>;
}
