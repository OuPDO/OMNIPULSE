import { JsonLd } from "@/components/seo/JsonLd";

const features = [
  {
    title: "CRM & Kundenverwaltung",
    description:
      "Alle Kundendaten, Kontakte und Interaktionen an einem Ort. Nahtlose Integration mit bestehenden Workflows.",
    icon: "users",
  },
  {
    title: "Projektmanagement",
    description:
      "Aufgaben, Deadlines und Ressourcen im Blick. Von der Planung bis zur Abrechnung alles in einem System.",
    icon: "kanban",
  },
  {
    title: "SEO & Google Ads",
    description:
      "Keyword-Tracking, technische Audits und Kampagnen-Management. Datengetriebene Entscheidungen in Echtzeit.",
    icon: "search",
  },
  {
    title: "Reporting & Analytics",
    description:
      "Automatisierte Reports für Kunden und Teams. KPIs auf einen Blick, exportierbar und teilbar.",
    icon: "chart",
  },
] as const;

const stats = [
  { value: "98%", label: "Kundenzufriedenheit" },
  { value: "40%", label: "Zeitersparnis" },
  { value: "250+", label: "Verwaltete Projekte" },
  { value: "24/7", label: "System-Verfügbarkeit" },
] as const;

function FeatureIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "users":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "kanban":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="6" height="14" x="2" y="7" rx="1" />
          <rect width="6" height="10" x="9" y="3" rx="1" />
          <rect width="6" height="12" x="16" y="5" rx="1" />
        </svg>
      );
    case "search":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
          <path d="M11 8v6" />
          <path d="M8 11h6" />
        </svg>
      );
    case "chart":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="m7 11 4-4 4 4 6-6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ObladenMedia",
          url: "https://omnipulse.oblm.de",
          description:
            "Digitale Agenturplattform für modernes Agenturmanagement.",
        }}
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              ObladenMedia
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Ihre digitale Agenturplattform
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              OMNIPULSE vereint CRM, Projektmanagement, SEO-Tools und Reporting
              in einer zentralen Plattform. Weniger Reibung, mehr Ergebnisse
              &mdash; f&uuml;r Agenturen, die wachsen wollen.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Beratung buchen
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Mehr erfahren
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="bg-muted/50 px-6 py-24 sm:py-32 lg:px-8"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2
                id="features-heading"
                className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                Alles, was Ihre Agentur braucht
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Modulare Werkzeuge, die nahtlos zusammenarbeiten.
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FeatureIcon icon={feature.icon} />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Stats Section */}
        <section
          className="bg-secondary px-6 py-24 sm:py-32 lg:px-8"
          aria-labelledby="stats-heading"
        >
          <div className="mx-auto max-w-5xl">
            <h2
              id="stats-heading"
              className="text-center font-heading text-3xl font-semibold tracking-tight text-secondary-foreground sm:text-4xl"
            >
              Zahlen, die f&uuml;r sich sprechen
            </h2>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-secondary-foreground/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className="bg-background px-6 py-24 sm:py-32 lg:px-8"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="cta-heading"
              className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Bereit f&uuml;r effizienteres Agenturmanagement?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Vereinbaren Sie eine unverbindliche Demo und entdecken Sie, wie
              OMNIPULSE Ihren Arbeitsalltag transformiert.
            </p>
            <div className="mt-10">
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Kostenlose Demo vereinbaren
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ObladenMedia. Alle Rechte
            vorbehalten.
          </p>
          <nav aria-label="Footer-Navigation">
            <ul className="flex gap-6 text-sm text-muted-foreground">
              <li>
                <a
                  href="/impressum"
                  className="transition-colors hover:text-foreground"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="/datenschutz"
                  className="transition-colors hover:text-foreground"
                >
                  Datenschutz
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
