"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Mail, Phone, User } from "lucide-react";

type QuoteRequestService = {
  slug: string;
  name: string;
};

type QuoteRequestFormProps = {
  endpoint: string;
  phone: string;
  services: QuoteRequestService[];
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const demoMessage =
  "Thanks — this is a demo. When we launch on your domain, enquiries will go to your email address.";

const sentMessage = "Thanks — your message has been delivered.";

export function QuoteRequestForm({
  endpoint,
  phone,
  services,
}: QuoteRequestFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const isSubmitting = submitState.status === "submitting";

  if (submitState.status === "success") {
    return (
      <div className="rounded-3xl border border-(--color-primary)/20 bg-(--color-primary)/10 p-6 shadow-sm ring-1 ring-(--color-foreground)/5">
        <div className="text-sm font-semibold text-(--color-foreground)">
          {submitState.message}
        </div>
      </div>
    );
  }

  return (
    <form
      className="w-full max-w-full overflow-x-hidden rounded-3xl border border-(--color-foreground)/10 bg-(--color-secondary)/6 p-4 shadow-sm ring-1 ring-(--color-foreground)/5 sm:p-6"
      onSubmit={async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        setSubmitState({ status: "submitting" });

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: String(formData.get("name") ?? ""),
              email: String(formData.get("email") ?? ""),
              phone: String(formData.get("phone") ?? ""),
              postcode: String(formData.get("postcode") ?? ""),
              service: String(formData.get("service") ?? ""),
              message: String(formData.get("message") ?? ""),
              consent: formData.get("consent") === "on",
            }),
          });

          const payload = (await response.json().catch(() => null)) as {
            mode?: "demo" | "sent";
            message?: string;
            error?: string;
          } | null;

          if (!response.ok) {
            setSubmitState({
              status: "error",
              message:
                payload?.error ??
                "Sorry, something went wrong. Please try again.",
            });
            return;
          }

          const message =
            payload?.message ??
            (payload?.mode === "demo" ? demoMessage : sentMessage);

          form.reset();
          setSubmitState({ status: "success", message });
        } catch {
          setSubmitState({
            status: "error",
            message: "Sorry, something went wrong. Please try again.",
          });
        }
      }}
      aria-busy={isSubmitting}
    >
      {submitState.status === "error" ? (
        <div className="mb-5 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-medium text-(--color-foreground)">
          {submitState.message}
        </div>
      ) : null}

      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <label className="min-w-0 space-y-2 text-sm font-semibold text-(--color-foreground)">
          <span className="block pb-0.5 pl-1">Full name</span>
          <div className="relative">
            <User
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
            />
            <input
              name="name"
              autoComplete="name"
              required
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-4 pl-11 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold text-(--color-foreground)">
          <span className="block pb-0.5 pl-1">Email</span>
          <div className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-4 pl-11 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold text-(--color-foreground)">
          <span className="block pb-0.5 pl-1">Phone</span>
          <div className="relative">
            <Phone
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
            />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              required
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-4 pl-11 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold text-(--color-foreground)">
          <span className="block pb-0.5 pl-1">Postcode</span>
          <input
            name="postcode"
            autoComplete="postal-code"
            required
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-(--color-foreground)/10 bg-white px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold text-(--color-foreground) sm:col-span-2">
          <span className="block pb-0.5 pl-1">Service</span>
          <div className="relative">
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-foreground)/45"
            />
            <select
              name="service"
              required
              disabled={isSubmitting}
              className="w-full appearance-none rounded-2xl border border-(--color-foreground)/10 bg-white py-3 pr-11 pl-4 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25 disabled:cursor-not-allowed disabled:opacity-70"
              defaultValue=""
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.slug} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="min-w-0 space-y-2 text-sm font-semibold text-(--color-foreground) sm:col-span-2">
          <span className="block pb-0.5 pl-1">Message (optional)</span>
          <textarea
            name="message"
            rows={5}
            disabled={isSubmitting}
            className="w-full resize-none rounded-2xl border border-(--color-foreground)/10 bg-white px-4 py-3 text-sm font-medium text-(--color-foreground) shadow-sm outline-none transition focus:border-(--color-primary)/40 focus:ring-2 focus:ring-(--color-primary)/25 disabled:cursor-not-allowed disabled:opacity-70"
          />
        </label>
      </div>

      <label className="mt-5 flex min-w-0 items-start gap-3 rounded-2xl border border-(--color-foreground)/10 bg-(--color-foreground)/5 px-4 py-3 text-sm text-(--color-foreground)/75">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={isSubmitting}
          className="mt-1 h-4 w-4 shrink-0 rounded border-(--color-foreground)/30 text-(--color-primary) disabled:cursor-not-allowed"
        />
        <span className="min-w-0 break-words">
          I consent to being contacted about my enquiry. You can also call{" "}
          {phone} for a faster response.
        </span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)/40 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Send quote request
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
        <div className="text-xs text-(--color-foreground)/60">
          Typical response within 24 hours.
        </div>
      </div>
    </form>
  );
}
