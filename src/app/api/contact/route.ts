import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Use a JSON request." }, { status: 415 });
  }
  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("host");
  if (origin && origin !== `http://${requestHost}` && origin !== `https://${requestHost}`) {
    return NextResponse.json({ message: "This request could not be accepted." }, { status: 403 });
  }
  try {
    if (Number(request.headers.get("content-length")) > 20_000) {
      return NextResponse.json({ message: "Your enquiry is too long." }, { status: 413 });
    }
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 20_000) return NextResponse.json({ message: "Your enquiry is too long." }, { status: 413 });
    let payload: unknown;
    try { payload = JSON.parse(raw); } catch { return NextResponse.json({ message: "The enquiry could not be read." }, { status: 400 }); }
    const { fields, errors } = validateContact(payload);
    if (Object.keys(errors).length) return NextResponse.json({ errors, message: "Please check the highlighted fields." }, { status: 400 });

    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (!webhook) return NextResponse.json({ message: "Online delivery is not connected yet. Your enquiry has not been sent. You can copy it below to keep a draft." }, { status: 503 });

    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify({ ...fields, source: "voltnite.com" }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery provider rejected the enquiry");
    return NextResponse.json({ message: "Your enquiry has been submitted. Thank you for getting in touch." });
  } catch {
    return NextResponse.json({ message: "Delivery could not be confirmed. Your enquiry is still here; please try again later or copy a draft." }, { status: 502 });
  }
}
