import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How personal information is handled when you use this website and request a quote.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-(--color-background) text-(--color-foreground)">
      <Container className="space-y-12 py-16 sm:py-16">
        <div className="space-y-6">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-foreground)/60">
            <Link href="/" className="hover:text-(--color-foreground)">
              Home
            </Link>
            <span>/</span>
            <span className="text-(--color-foreground)">Privacy Policy</span>
          </nav>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-(--color-foreground)/70 sm:text-lg">
              This policy explains how personal information is handled when you
              browse this website and request a quote.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Who We Are (Controller)
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              For data protection purposes, the business advertised on this
              website is the controller of your personal information. Contact
              details for the controller are provided on the{" "}
              <Link
                href="/contact"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary)/80"
              >
                contact page
              </Link>
              .
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              This website may be developed, maintained, and hosted by
              third-party technical service providers on behalf of the
              controller. Those providers act as processors and are permitted to
              process personal information only on the controller’s
              instructions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Information We Collect
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              When you request a quote or contact us, we may collect the details
              you provide, such as your name, email address, phone number,
              postcode, the service you’re interested in, and any message you
              include.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We also collect limited technical information when you browse the
              site (for example, device and browser information, approximate
              location, and pages viewed). This is typically collected via
              cookies or similar technologies, where enabled.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              If you contact us by phone or email, we will process the
              information you provide. Calls may be recorded where necessary for
              training, dispute resolution, or compliance, and we will inform
              you where call recording is in use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              How We Use Your Information
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-(--color-foreground)/70">
              <li>To respond to enquiries and provide quotes.</li>
              <li>To arrange site visits, appointments, and follow-ups.</li>
              <li>To improve our website, content, and user experience.</li>
              <li>To prevent fraud and keep the website secure.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Legal Bases (UK GDPR)
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-(--color-foreground)/70">
              <p>
                We process personal information under the UK General Data
                Protection Regulation and the Data Protection Act 2018. The
                lawful basis depends on the purpose:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Responding to quote requests and arranging visits: contract
                  and/or steps prior to entering into a contract.
                </li>
                <li>
                  Customer service, record keeping, and dispute handling:
                  legitimate interests and/or legal obligation.
                </li>
                <li>
                  Security and fraud prevention: legitimate interests and, where
                  relevant, legal obligation.
                </li>
                <li>
                  Analytics and marketing cookies/pixels: consent (where
                  required for non-essential cookies).
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Sharing Your Information
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We may share information with service providers that help us run
              the website and communicate with you (for example, website
              hosting, form handling, and email delivery). These providers are
              only permitted to process personal information on our instructions
              and for the purposes described in this policy.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We may also share information where required by law, to enforce
              our rights, or to protect our customers and business.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Cookies, Analytics, and Advertising
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We may use analytics and marketing technologies to understand
              website traffic and improve performance. Depending on how the site
              is configured, this may include tools such as Google Analytics or
              advertising pixels such as Facebook Pixel. If these tools are not
              enabled, your browser will not load them.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              You can control cookies through your browser settings. Where
              non-essential cookies are used, we will seek your consent through
              a cookie notice or preference settings before placing them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Embedded Content (Maps)
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Some pages may include embedded maps (for example, Google Maps).
              Embedded content can behave as if you visited the provider’s
              website and may set cookies or collect usage data. Please review
              the provider’s privacy policy for details.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Data Retention
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We keep enquiry and quote information for as long as needed to
              respond to you and manage our relationship. As a guide, we
              typically retain unsuccessful enquiry records for up to 24 months,
              and customer records for up to 6 years for accounting, tax, and
              legal purposes, unless a longer period is required or a shorter
              period is appropriate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              International Transfers
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Some service providers we use (such as analytics, advertising, or
              email delivery providers) may process personal information outside
              the UK. Where this happens, the controller will ensure appropriate
              safeguards are in place, such as adequacy regulations or approved
              contractual protections.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Security
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We use appropriate technical and organisational measures designed
              to protect personal information, including access controls, least
              privilege, and reputable hosting and email providers. No method of
              transmission or storage is completely secure, but we take steps to
              reduce risk and respond to incidents where they occur.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Your Rights
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              You may have rights to access, correct, or delete your personal
              information, and to object to or restrict certain processing. You
              may also have the right to data portability and the right to
              withdraw consent where processing is based on consent. To make a
              request, please contact us via the{" "}
              <Link
                href="/contact"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary)/80"
              >
                contact page
              </Link>
              .
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              You also have the right to lodge a complaint with the UK
              Information Commissioner’s Office (ICO). See{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary)/80"
              >
                ico.org.uk/make-a-complaint
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Automated Decision-Making
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We do not use automated decision-making or profiling that produces
              legal effects or similarly significant impacts on you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Children
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              This website is not intended for children, and we do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-(--color-foreground)">
              Changes To This Policy
            </h2>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              We may update this policy from time to time to reflect changes in
              our website or how we operate. The latest version will always be
              available on this page.
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/70">
              Last updated: 26 January 2026.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
