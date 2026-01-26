import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "General terms for quotes, bookings, and driveway and paving services.",
};

export default function TermsPage() {
  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-12 py-16 sm:py-16">
        <div className="space-y-6">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
            <Link href="/" className="hover:text-(--color-foreground)">
              Home
            </Link>
            <span>/</span>
            <span className="text-(--color-foreground)">Terms</span>
          </nav>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Terms &amp; Conditions
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
              These terms set out the basis on which we provide driveway and
              paving services. If anything is unclear, please contact us before
              booking.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              About These Terms
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              In these terms, “we”, “us” and “our” refers to the business
              advertised on this website. Our contact details are provided on
              the{" "}
              <Link
                href="/contact"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary)/80"
              >
                contact page
              </Link>
              . “You” and “your” refers to the customer.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              These terms apply to our services and to your use of this website.
              If there is a conflict between these terms and an agreed written
              quote or contract, the written quote/contract will take priority.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Website Information and Third-Party Providers
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Content on this website is provided for general information only
              and may be updated from time to time. It does not constitute
              professional advice and should not be relied upon as the sole
              basis for decisions.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              This website may be developed, maintained, and hosted by third
              parties on our behalf. Those technical providers are not a party
              to any contract for services between you and us, and they are not
              responsible for our services, quotes, workmanship, scheduling, or
              customer communications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Quotes and Scope of Work
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Quotes are based on the information available at the time,
              including measurements, access, ground conditions, and the agreed
              specification. Any changes to the specification, materials, layout
              or quantities may require a revised quote.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              If we discover issues that could not reasonably have been
              identified in advance (such as unsuitable sub-base, hidden
              obstructions, or drainage problems), we will explain the options
              and any cost or timeline impact before proceeding.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Quotes are normally valid for a limited period and may be subject
              to change due to material price movements or changes to access and
              site conditions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Consumer Rights
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              If you are a consumer, you have legal rights in relation to
              services not being carried out with reasonable care and skill, and
              other rights under applicable consumer protection laws. Nothing in
              these terms affects your statutory rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Scheduling and Access
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Start dates and durations are estimates and can be affected by
              weather, material availability, and site conditions. You agree to
              provide safe and reasonable access to the work area, including
              access for vehicles and deliveries where required.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              You are responsible for confirming any restrictions (such as
              parking controls, permits, underground services, or boundary
              constraints) that could affect the works.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              You should ensure valuables and fragile items are removed from the
              work area and that children and pets are kept safely away from the
              site during works.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Variations
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Any change requested by you after the quote is agreed (including
              changes to design, materials, or additional works) may be treated
              as a variation. We will confirm any variation and its cost before
              it is carried out.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Payments
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Payment terms will be set out in your quote or invoice. Where a
              deposit is requested, your booking is only confirmed once the
              deposit is received. Late payments may delay scheduling or
              completion.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Unless otherwise agreed in writing, all payments are due in
              cleared funds. We may charge reasonable costs incurred in
              recovering overdue amounts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Cancellations
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              If you need to cancel or reschedule, please notify us as soon as
              possible. Where we have incurred costs for materials, skips, or
              third-party bookings, those costs may be chargeable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Cancellation Rights (Consumers)
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              If you are a consumer and you enter into a contract with us at a
              distance (for example, online, by email, or by phone) or
              off-premises, you may have a legal right to cancel within 14 days.
              If you request that we start work during the cancellation period,
              you may be required to pay for work completed up to the date of
              cancellation. Some contracts may not be cancellable in the same
              way (for example, where services are fully performed).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Materials and Appearance
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Natural variations in colour and texture can occur between batches
              of paving, stone, gravel, and resin systems. Minor differences are
              normal and are not considered defects.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Where the works connect to existing surfaces or structures, a
              visible join line or level transition may be unavoidable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Waste Removal and Site Cleanliness
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We will aim to keep the site reasonably tidy during works and
              remove waste as agreed. Skip placement and removal depends on
              access and local restrictions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Guarantees and Aftercare
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Any workmanship guarantee and aftercare guidance will be provided
              as part of your quote or handover. Guarantees do not cover damage
              caused by misuse, third parties, severe weather, ground movement,
              or lack of maintenance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Liability
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We are not responsible for pre-existing faults or defects on the
              property. We will take reasonable care when carrying out works,
              but we cannot guarantee that all hidden services or underground
              obstructions can be identified.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              To the fullest extent permitted by law, we are not liable for
              indirect or consequential loss. We are not liable for delays or
              failures caused by events outside our reasonable control (for
              example, severe weather, supply chain disruption, or access
              restrictions).
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Nothing in these terms excludes or limits liability that cannot be
              excluded by law, including liability for death or personal injury
              caused by negligence, fraud, or fraudulent misrepresentation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Third-Party Links and Embedded Content
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              This website may link to or embed third-party services (such as
              maps). We do not control those third-party services and are not
              responsible for their content, availability, or privacy practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Complaints and Contact
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              If you have a concern, please contact us promptly so we can
              investigate and put things right. You can reach us via the{" "}
              <Link
                href="/contact"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary)/80"
              >
                contact page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Governing Law
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              These terms are governed by the laws of England and Wales, and
              disputes are subject to the exclusive jurisdiction of the courts
              of England and Wales.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
