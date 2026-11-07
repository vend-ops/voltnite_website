"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, Copy, LoaderCircle } from "lucide-react";
import { validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

export default function ContactForm({ deliveryConfigured }: { deliveryConfigured: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState("");

  function readFields() {
    const data = new FormData(formRef.current!);
    return Object.fromEntries(["name", "email", "company", "details"].map((key) => [key, data.get(key)]));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { fields, errors: nextErrors } = validateContact(readFields());
    setErrors(nextErrors);
    setCopied(false);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      formRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setDraft(`Name: ${fields.name}\nEmail: ${fields.email}\n${fields.company ? `Company: ${fields.company}\n` : ""}\nProject details:\n${fields.details}`);
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields), signal: AbortSignal.timeout(15_000) });
      const result = await response.json();
      if (result.errors) setErrors(result.errors);
      setStatus(response.ok ? "success" : "error");
      setMessage(result.message || "Delivery could not be confirmed. Please try again later.");
      if (response.ok) { formRef.current?.reset(); setDraft(""); }
    } catch {
      setStatus("error"); setMessage("Delivery could not be confirmed. Your enquiry is still here; please try again later or copy a draft.");
    }
  }

  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setCopied(true); }
    catch { setMessage("Copy is unavailable in this browser. Select and copy your enquiry from the draft below."); }
  }

  function field(key: keyof ContactFields, label: string, type = "text", maxLength = 100, required = true) {
    return <div className="form-field"><label htmlFor={key}>{label}{!required && <span> (optional)</span>}</label><input id={key} name={key} type={type} maxLength={maxLength} required={required} autoComplete={key === "name" ? "name" : key === "email" ? "email" : "organization"} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}</div>;
  }

  return <form className="contact-form" ref={formRef} onSubmit={submit} noValidate>
    {!deliveryConfigured && <p className="delivery-notice">Online delivery is not connected yet. You can complete and validate your enquiry, then copy a draft. Nothing will be sent.</p>}
    <div className="form-row">{field("name", "Name")}{field("email", "Email", "email", 254)}</div>
    {field("company", "Company", "text", 150, false)}
    <div className="form-field"><label htmlFor="details">Project Details</label><textarea id="details" name="details" rows={6} minLength={20} maxLength={5000} required aria-invalid={!!errors.details} aria-describedby={errors.details ? "details-error" : "details-hint"} /><p className="field-hint" id="details-hint">Tell us what you’re building and what help you need. 20–5,000 characters.</p>{errors.details && <p className="field-error" id="details-error">{errors.details}</p>}</div>
    <button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? <><LoaderCircle className="loading-icon" size={16} aria-hidden="true" />{deliveryConfigured ? "Submitting…" : "Validating…"}</> : <>{deliveryConfigured ? "Send enquiry" : "Validate enquiry"}<ArrowRight size={16} aria-hidden="true" /></>}</button>
    {message && <p className={`form-message ${status === "success" ? "form-success" : ""}`} role="status">{message}</p>}
    {draft && status === "error" && <div className="enquiry-draft"><div className="draft-heading"><strong>Your enquiry draft</strong><button className="text-link" type="button" onClick={copyDraft}>{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copied ? "Copied" : "Copy enquiry"}</button></div><pre tabIndex={0}>{draft}</pre></div>}
  </form>;
}
