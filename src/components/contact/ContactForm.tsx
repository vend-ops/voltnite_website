"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Check, Copy, ExternalLink, Mail } from "lucide-react";
import { validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [draft, setDraft] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState("");
  const [gmailUrl, setGmailUrl] = useState("");

  function readFields() {
    const data = new FormData(formRef.current!);
    return Object.fromEntries(["name", "email", "company", "details"].map((key) => [key, data.get(key)]));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { fields, errors: nextErrors } = validateContact(readFields());
    setErrors(nextErrors);
    setCopied(false);
    setCopyFeedback("");

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      formRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstField}"]`)?.focus();
      return;
    }

    const companyPart = fields.company ? ` (${fields.company})` : "";
    const subject = `Project Enquiry from ${fields.name}${companyPart}`;
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\n${fields.company ? `Company: ${fields.company}\n` : ""}\nProject Details:\n${fields.details}`;

    const mailto = `mailto:info@voltnite.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=info@voltnite.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setDraft(body);
    setMailtoUrl(mailto);
    setGmailUrl(gmail);
    setStatus("ready");

    // Automatically trigger user's default email client
    if (typeof window !== "undefined") {
      window.location.href = mailto;
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setCopyFeedback("Copied to clipboard!");
    } catch {
      setCopyFeedback("Copy is unavailable in this browser. You can select and copy from the draft box below.");
    }
  }

  function field(key: keyof ContactFields, label: string, type = "text", maxLength = 100, required = true) {
    return (
      <div className="form-field">
        <label htmlFor={key}>
          {label}{!required && <span> (optional)</span>}
        </label>
        <input
          id={key}
          name={key}
          type={type}
          maxLength={maxLength}
          required={required}
          autoComplete={key === "name" ? "name" : key === "email" ? "email" : "organization"}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        />
        {errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}
      </div>
    );
  }

  if (status === "ready") {
    return (
      <div className="contact-form">
        <div style={{ textAlign: "center", paddingBottom: "18px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#eef9f3",
              color: "#146344",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
            }}
          >
            <Check size={26} aria-hidden="true" />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
            Ready to Send Email
          </h2>
          <p style={{ fontSize: "14px", color: "var(--body-text)", lineHeight: "1.6" }}>
            Your default email app should open automatically with your enquiry addressed to{" "}
            <strong style={{ color: "var(--heading)" }}>info@voltnite.com</strong>.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBlock: "14px 20px" }}>
          <a
            href={mailtoUrl}
            className="button button-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Mail size={16} aria-hidden="true" />
            Open Default Email Client
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-outline"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Open in Gmail Web
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="enquiry-draft">
          <div className="draft-heading">
            <strong>Enquiry Draft</strong>
            <button className="text-link" type="button" onClick={copyDraft}>
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? "Copied" : "Copy enquiry"}
            </button>
          </div>
          {copyFeedback && <p style={{ fontSize: "12px", color: "#146344", marginTop: "4px" }}>{copyFeedback}</p>}
          <pre tabIndex={0}>{draft}</pre>
        </div>

        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <button
            type="button"
            className="text-link"
            onClick={() => setStatus("idle")}
            style={{ fontSize: "13px" }}
          >
            <ArrowLeft size={14} aria-hidden="true" /> Edit or send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        {field("name", "Name")}
        {field("email", "Email", "email", 254)}
      </div>
      {field("company", "Company", "text", 150, false)}
      <div className="form-field">
        <label htmlFor="details">Project Details</label>
        <textarea
          id="details"
          name="details"
          rows={6}
          minLength={20}
          maxLength={5000}
          required
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? "details-error" : "details-hint"}
        />
        <p className="field-hint" id="details-hint">
          Tell us what you’re building and what help you need. 20–5,000 characters.
        </p>
        {errors.details && <p className="field-error" id="details-error">{errors.details}</p>}
      </div>
      <button className="button button-primary" type="submit">
        <Mail size={16} aria-hidden="true" />
        Send Enquiry
      </button>
    </form>
  );
}
