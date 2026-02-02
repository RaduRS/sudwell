import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site.config";

export const runtime = "nodejs";

const demoMessage =
  "Thanks — this is a demo. When we launch on your domain, enquiries will go to your email address.";

const sentMessage = "Thanks — your message has been delivered.";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  service: string;
  message?: string;
  consent: boolean;
};

const asTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const parseRequestBody = async (request: Request): Promise<QuotePayload> => {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    return {
      name: asTrimmedString(body.name),
      email: asTrimmedString(body.email),
      phone: asTrimmedString(body.phone),
      postcode: asTrimmedString(body.postcode),
      service: asTrimmedString(body.service),
      message: asTrimmedString(body.message) || undefined,
      consent: Boolean(body.consent),
    };
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const body = await request.formData();
    return {
      name: asTrimmedString(body.get("name")),
      email: asTrimmedString(body.get("email")),
      phone: asTrimmedString(body.get("phone")),
      postcode: asTrimmedString(body.get("postcode")),
      service: asTrimmedString(body.get("service")),
      message: asTrimmedString(body.get("message")) || undefined,
      consent: body.get("consent") === "on" || body.get("consent") === "true",
    };
  }

  return {
    name: "",
    email: "",
    phone: "",
    postcode: "",
    service: "",
    consent: false,
  };
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(request: Request) {
  const payload = await parseRequestBody(request);

  if (!payload.name || payload.name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!payload.phone || payload.phone.length < 6) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }
  if (!payload.postcode || payload.postcode.length < 4) {
    return NextResponse.json(
      { error: "Please enter your postcode." },
      { status: 400 },
    );
  }
  if (!payload.service) {
    return NextResponse.json(
      { error: "Please select a service." },
      { status: 400 },
    );
  }
  if (!payload.consent) {
    return NextResponse.json(
      { error: "Please confirm consent to be contacted." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json({ ok: true, mode: "demo", message: demoMessage });
  }

  const from = siteConfig.integrations.resendFromEmail;
  const to = siteConfig.contact.email;
  const subject = `New quote request: ${payload.service}`;

  const text = [
    `New quote request for ${siteConfig.company.tradingName}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Postcode: ${payload.postcode}`,
    `Service: ${payload.service}`,
    "",
    "Message:",
    payload.message ? payload.message : "(none)",
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      reply_to: payload.email,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: "Failed to deliver message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "sent", message: sentMessage });
}

