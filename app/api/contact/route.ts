import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";
import { site } from "@/lib/site";

/**
 * Contact form handler.
 * - Validates with the shared zod schema.
 * - Sends email via Resend when RESEND_API_KEY is set.
 * - Falls back to logging in dev so the form never hard-breaks without a key.
 *
 * Env: RESEND_API_KEY, CONTACT_TO (optional, defaults to site.email),
 *      CONTACT_FROM (optional, must be a Resend-verified sender).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, phone, company, service, budget, message, website } = parsed.data;

  // Honeypot tripped — pretend success, drop silently.
  if (website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || "Agentix Solution <onboarding@resend.dev>";

  const text = [
    `New enquiry via ${site.name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Company: ${company || "—"}`,
    `Service Interested In: ${service || "—"}`,
    `Budget: ${budget || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  if (!apiKey) {
    // Dev fallback: no key configured. Log and succeed so the UX is testable.
    console.warn("[contact] RESEND_API_KEY not set — logging submission instead:\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` · ${company}` : ""}`,
      text,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Could not send. Try email instead." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
