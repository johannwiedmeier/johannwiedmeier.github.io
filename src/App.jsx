import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Button({ children, variant = "primary", size = "md", className = "", as = "button", href, ...props }) {
  const Component = as === "a" ? "a" : "button";
  const base =
    "inline-flex items-center justify-center font-medium tracking-[0.02em] transition focus:outline-none focus:ring-2 focus:ring-[#c8913a] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    primary: "bg-[#c8913a] text-[#111210] hover:bg-[#dfb06a]",
    secondary: "border border-[#c8913a]/35 bg-transparent text-[#f7f4ee] hover:border-[#c8913a]/70 hover:text-white",
    light: "border border-[#ded8ca] bg-[#fdfcf9] text-[#111210] hover:bg-[#f7f4ee]",
    dark: "bg-[#111210] text-[#f7f4ee] hover:bg-[#2a2a27]",
  };
  const sizes = {
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-base",
  };

  return (
    <Component href={href} className={cx(base, variants[variant], sizes[size], "rounded-sm", className)} {...props}>
      {children}
    </Component>
  );
}

function Card({ children, className = "", style, ...props }) {
  return (
    <div className={cx("border border-[#e5dfd3] bg-[#fdfcf9]", className)} style={style} {...props}>
      {children}
    </div>
  );
}

function SvgIcon({ children, className = "h-5 w-5", viewBox = "0 0 24 24" }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const Icons = {
  ArrowRight: (props) => (
    <SvgIcon {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </SvgIcon>
  ),
  Menu: (props) => (
    <SvgIcon {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </SvgIcon>
  ),
  X: (props) => (
    <SvgIcon {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgIcon>
  ),
  DotGrid: (props) => (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="25" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="25" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="7" cy="25" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="25" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="25" cy="25" r="1.5" fill="currentColor" stroke="none" />
    </SvgIcon>
  ),
};

const problemCards = [
  {
    number: "01",
    quote: "Jede Entscheidung läuft über mich. Mein Team wartet.",
    title: "Du bist der Engpass",
    text: "Du hast gute Leute eingestellt, aber der Betrieb hängt weiterhin von deinem Kontext, deinen Freigaben und deinem Urteil ab. Skalierung fühlt sich unmöglich an, weil du dich nicht klonen kannst.",
  },
  {
    number: "02",
    quote: "Wir haben zwölf Tools. Niemand weiß genau, wie sie zusammenhängen.",
    title: "Automatisierung klingt gut. Aber niemand besitzt das Thema.",
    text: "Jedes Tool wurde gekauft, um ein Problem zu lösen. Inzwischen sind die Tools selbst Teil des Problems. Manuelle Schritte schließen die Lücken und Informationen liegen gleichzeitig an drei Orten.",
  },
  {
    number: "03",
    quote: "Ich verbringe die halbe Woche mit Dingen, die ein guter Prozess überflüssig machen würde.",
    title: "Du machst Arbeit mit wenig Hebel — obwohl dein Kopf woanders mehr Wert schafft",
    text: "Du hast das Unternehmen gestartet, weil du in etwas Bestimmtem besonders gut bist. Aber der Betrieb fordert deine Aufmerksamkeit für fast alles — nur nicht dafür.",
  },
];

const capabilities = [
  "Prozessmapping & Engpassanalyse",
  "Workflow-Automatisierung & Tool-Integration",
  "Klare Verantwortlichkeiten & Entscheidungswege",
  "Technical Operations, DevOps & Plattform-Koordination",
  "KI-Einsatz für interne Abläufe",
  "Partnerkoordination bei Spezialthemen",
];

const services = [
  {
    name: "Operations Audit",
    price: "4.500 € – 9.500 € · Festpreis",
    desc: "Eine Diagnose, wie dein Unternehmen tatsächlich arbeitet. Keine Verpflichtung über das Audit hinaus. Du erhältst eine konkrete Roadmap für die Verbesserungen mit dem größten Hebel.",
    includes: [
      "Zeitnutzungsanalyse für Geschäftsführung & Team",
      "Prozess- & Automatisierungs-Mapping",
      "Review des Tool-Stacks",
      "Identifikation der Engpässe",
      "Priorisierte Maßnahmen-Roadmap",
      "Schätzung von Zeit- und Kosteneinsparungen",
    ],
  },
  {
    name: "Automatisierungs-Sprint",
    price: "nach dem Audit · fixer Scope",
    desc: "Wir nehmen die Ergebnisse des Audits und setzen die wirkungsvollsten Verbesserungen um: Automatisierung, Tool-Integration, Verantwortlichkeitsdesign und Koordination von Spezialisten.",
    includes: [
      "Umsetzung von Workflow-Automatisierung",
      "Tool-Integration & Bereinigung",
      "Koordination spezialisierter Partner",
      "Design von Verantwortlichkeiten & Accountability",
      "Handover-Dokumentation",
      "30 Tage Support-Fenster",
    ],
  },
  {
    name: "Operations Retainer",
    price: "optional · ab 3.000 € / Monat",
    desc: "Laufende Begleitung für wachsende Unternehmen. Wir bleiben nah dran, verbessern kontinuierlich und skalieren das Betriebssystem mit Team und Umsatz.",
    includes: [
      "Monatlicher Operations Review",
      "Kontinuierliche Verbesserung der Automatisierung",
      "Einbindung von Spezialisten bei Bedarf",
      "Coaching für Teamprozesse",
      "Support zu Geschäftszeiten",
      "Moderation der Quartalsplanung",
    ],
  },
];

const partnerTags = [
  "Performance Marketing",
  "Brand & Design",
  "Technische Infrastruktur",
  "Content & Video",
  "Softwareentwicklung",
  "HR & Recruiting",
  "Legal & Compliance",
  "Data & Analytics",
];

const navItems = [
  { href: "#ueber-mich", label: "Über mich" },
  { href: "#services", label: "Angebot" },
  { href: "#network", label: "Netzwerk" },
  { href: "#contact", label: "Kontakt" },
];

const aboutHighlights = [
  ["Softwarearchitektur", "iSAQB-zertifiziert, DDD, ADRs, hexagonale Architektur, Microservices und Self-Contained Systems."],
  ["DevSecOps & Plattformen", "Kubernetes, Argo CD, Helm, Docker, CI/CD, Monitoring, Security Reviews und produktionsnahe Deployments."],
  ["Cloud & Backend", "AWS, Java, Spring, Quarkus, PostgreSQL, Kafka, Redis, Terraform und robuste API- und Datenarchitekturen."],
  ["Operations-Denken", "Projektplanung, Teamkoordination, Workshops, Best Practices und Übersetzung zwischen Business, Entwicklung und Betrieb."],
];

const aboutProofPoints = [
  "DevSecOps in KRITIS-Umgebung mit Verantwortung für Produktivsetzungen, Security Reviews und sicherheitskritische Prozesse.",
  "Entwicklung im Umfeld der elektronischen Patientenakte für 37 Millionen Versicherte.",
  "Architektur, DevOps und Feature-Verantwortung bei Stammdaten, Abonnements und Payments inklusive Pentest-Support und Lasttests.",
  "Lead Development für ein Bahn-System mit Skalierung auf 10.000 Anfragen pro Sekunde und 95% der Requests unter 30 ms.",
  "Security Audit für eine Tanzschul-App als Kundenprojekt mit Fokus auf Risiken, technische Befunde und umsetzbare Maßnahmen.",
];

const contactEmail = "mail@johannwiedmeier.de";
const contactHref = `mailto:${contactEmail}?subject=Anfrage%20Operations%20Audit`;
const collaborationHref = `mailto:${contactEmail}?subject=Anfrage%20Zusammenarbeit`;
const portraitSrc = "/johann-wiedmeier.jpg";

function SectionLabel({ children, className = "" }) {
  return <p className={cx("mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[#c8913a]", className)}>{children}</p>;
}

function SectionTitle({ children, light = false, center = false, className = "" }) {
  return (
    <h2
      className={cx(
        "max-w-3xl font-serif text-4xl font-normal leading-[1.08] tracking-[-0.02em] md:text-6xl",
        light ? "text-[#f7f4ee]" : "text-[#111210]",
        center && "mx-auto text-center",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function CheckItem({ children, light = false }) {
  return (
    <li className={cx("flex items-start gap-3 text-sm leading-6", light ? "text-[#f7f4ee]/85" : "text-[#7a786f]")}>
      <span className="mt-0.5 text-[#c8913a]">→</span>
      <span>{children}</span>
    </li>
  );
}

function LegalPage({ title, children }) {
  return (
    <section className="bg-[#fdfcf9] px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <a href="#top" className="mb-10 inline-flex text-sm font-medium tracking-[0.03em] text-[#7a786f] transition hover:text-[#111210]">
          ← Zurück zur Startseite
        </a>
        <SectionLabel>Rechtliches</SectionLabel>
        <h1 className="font-serif text-5xl font-normal leading-tight tracking-[-0.02em] text-[#111210] md:text-7xl">
          {title}
        </h1>
        <div className="mt-12 space-y-10 text-base leading-8 text-[#5f5d55]">
          {children}
        </div>
      </div>
    </section>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="border-t border-[#e5dfd3] pt-8">
      <h2 className="mb-4 font-serif text-2xl font-medium text-[#111210]">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalSection title="Angaben gemäß § 5 DDG">
        <p>
          Johann Wiedmeier<br />
          Berliner Straße 10<br />
          60311 Frankfurt am Main
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon: <a className="text-[#111210] underline decoration-[#c8913a]/50 underline-offset-4" href="tel:+491742455475">+49 174 2455475</a><br />
          E-Mail: <a className="text-[#111210] underline decoration-[#c8913a]/50 underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-ID">
        <p>USt-ID: DE 327 475 030</p>
      </LegalSection>

      <LegalSection title="Verantwortlich nach § 18 Abs. 2 MStV">
        <p>
          Johann Wiedmeier<br />
          Berliner Straße 10<br />
          60311 Frankfurt am Main
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <LegalSection title="Verantwortlicher">
        <p>
          Johann Wiedmeier<br />
          Berliner Straße 10<br />
          60311 Frankfurt am Main<br />
          E-Mail: <a className="text-[#111210] underline decoration-[#c8913a]/50 underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      </LegalSection>

      <LegalSection title="Hosting und Server-Logfiles">
        <p>
          Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige Daten in Server-Logfiles. Dazu können IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Datei, übertragene Datenmenge, Referrer-URL, Browser, Betriebssystem und anfragender Provider gehören.
        </p>
        <p>
          Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website, zur Fehleranalyse und zur Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </LegalSection>

      <LegalSection title="Kontakt per E-Mail">
        <p>
          Wenn du per E-Mail Kontakt aufnimmst, werden die von dir übermittelten Daten verarbeitet, um deine Anfrage zu beantworten und mögliche Anschlussfragen zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um vorvertragliche oder vertragliche Kommunikation geht, andernfalls Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </LegalSection>

      <LegalSection title="Cookies und Tracking">
        <p>
          Diese Website setzt derzeit keine Cookies und verwendet kein Tracking. Falls später Analyse-, Marketing- oder externe Einbettungsdienste ergänzt werden, wird diese Datenschutzerklärung entsprechend aktualisiert.
        </p>
      </LegalSection>

      <LegalSection title="Speicherdauer">
        <p>
          Server-Logfiles werden nur so lange gespeichert, wie es für Betrieb, Sicherheit und Fehleranalyse erforderlich ist, und anschließend gelöscht oder anonymisiert. E-Mail-Anfragen werden gespeichert, solange dies zur Bearbeitung, zur Erfüllung gesetzlicher Aufbewahrungspflichten oder zur Wahrung berechtigter Interessen erforderlich ist.
        </p>
      </LegalSection>

      <LegalSection title="Betroffenenrechte">
        <p>
          Du hast nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen bestimmte Verarbeitungen. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.
        </p>
      </LegalSection>

      <LegalSection title="Sicherheitshinweis">
        <p>
          Die Datenübertragung im Internet kann Sicherheitslücken aufweisen. Insbesondere die Kommunikation per E-Mail kann nicht lückenlos vor dem Zugriff Dritter geschützt werden.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function AboutPage() {
  return (
    <section className="bg-[#fdfcf9] px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <a href="#top" className="mb-10 inline-flex text-sm font-medium tracking-[0.03em] text-[#7a786f] transition hover:text-[#111210]">
          ← Zurück zur Startseite
        </a>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionLabel>Über mich</SectionLabel>
            <h1 className="max-w-3xl font-serif text-5xl font-normal leading-[1.02] tracking-[-0.03em] text-[#111210] md:text-7xl">
              Ich verbinde <em className="text-[#c8913a]">Architektur, DevOps und Operations</em>.
            </h1>
            <p className="mt-8 flex max-w-md flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase leading-6 tracking-[0.12em] text-[#7a786f]">
              <span>Johann Wiedmeier</span>
              <span className="text-[#c8913a]">·</span>
              <span>M.Sc. Informatik</span>
              <span className="text-[#c8913a]">·</span>
              <span>Frankfurt</span>
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[230px_1fr] xl:grid-cols-[280px_1fr]">
            <figure className="self-start overflow-hidden border border-[#e5dfd3] bg-[#f7f4ee] shadow-[0_24px_80px_rgba(17,18,16,0.08)]">
              <img
                src={portraitSrc}
                alt="Johann Wiedmeier"
                className="aspect-[4/5] w-full object-cover object-[50%_20%]"
                width="1265"
                height="1400"
              />
            </figure>

            <div className="space-y-6 text-lg font-light leading-8 text-[#5f5d55]">
              <p>
                Ich bin Johann Wiedmeier, M.Sc. Informatik der TU Darmstadt, Softwarearchitekt und technischer Operations Partner aus Frankfurt. Meine Arbeit liegt dort, wo Geschäftsprozesse, Softwarearchitektur, Plattformbetrieb und Security zusammenkommen.
              </p>
              <p>
                Ich habe in regulierten und hochlastnahen Umgebungen gearbeitet: KRITIS-nahe Systeme, elektronische Patientenakte, Payments, Abonnements, Bahn-Reservierung, Cloud- und Kubernetes-Plattformen. Dadurch schaue ich nicht nur auf Prozesse oder Tools, sondern auf das ganze System dahinter.
              </p>
              <p>
                Für Unternehmen bedeutet das: Ich kann operative Engpässe analysieren, technische Ursachen verstehen, mit Entwicklerteams sprechen, Architekturentscheidungen einordnen und Maßnahmen so planen, dass sie tatsächlich umgesetzt werden.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {aboutHighlights.map(([title, text]) => (
            <Card key={title} className="bg-[#f7f4ee] p-7">
              <Icons.DotGrid className="mb-6 h-8 w-8 text-[#c8913a]" />
              <h2 className="mb-3 font-serif text-2xl font-medium text-[#111210]">{title}</h2>
              <p className="text-sm leading-7 text-[#7a786f]">{text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-y border-[#e5dfd3] py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Nachweisbare Tiefe</SectionLabel>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.02em] text-[#111210] md:text-5xl">
              Nicht nur Beratung. Auch Umsetzung in echten Systemen.
            </h2>
          </div>
          <div className="grid gap-3">
            {aboutProofPoints.map((point) => (
              <div key={point} className="border border-[#e5dfd3] bg-[#fdfcf9] px-5 py-4 text-sm leading-7 text-[#5f5d55]">
                <span className="mr-3 text-[#c8913a]">→</span>
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 bg-[#111210] p-8 text-[#f7f4ee] md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Passende Projekte</SectionLabel>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.02em] md:text-5xl">
              Wenn Technik und Betrieb gemeinsam besser werden müssen.
            </h2>
          </div>
          <div className="grid gap-px bg-[#c8913a]/15 md:grid-cols-3">
            {[
              ["Operations & Automatisierung", "Engpässe sichtbar machen, Prozesse ordnen und wiederholbare Arbeit durch robuste Systeme ersetzen."],
              ["Architektur & DevOps", "Hands-on Unterstützung bei Backend, Plattform, CI/CD, Kubernetes, Security Reviews und technischen Entscheidungen."],
              ["Projekt- und Interim-Rollen", "Softwarearchitekt, DevSecOps Engineer, Cloud/Backend Engineer, Technical Lead oder technischer Projektpartner."],
            ].map(([title, text]) => (
              <div key={title} className="bg-[#111210] p-6">
                <h3 className="font-serif text-2xl font-medium text-[#f7f4ee]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#f7f4ee]/55">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border border-[#c8913a]/30 bg-[#c8913a]/5 p-8 md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c8913a]">Zertifikate & Ausbildung</p>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#5f5d55]">
            M.Sc. Informatik, TU Darmstadt · AWS Certified Solutions Architect - Associate · iSAQB Certified Software Architect - Foundation · Oracle Certified Associate Java Programmer 8 · Professional Scrum Master.
          </p>
          <Button as="a" href={collaborationHref} size="lg" variant="dark" className="mt-8">
            Über Zusammenarbeit sprechen <Icons.ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activePage, setActivePage] = useState(() => window.location.hash.replace("#", ""));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(window.location.hash.replace("#", ""));
      setMobileMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const detailPage = ["ueber-mich", "impressum", "datenschutz"].includes(activePage) ? activePage : null;

  useEffect(() => {
    if (!detailPage) {
      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [detailPage]);

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-[#111210] antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#c8913a]/15 bg-[#111210]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#top" className="font-serif text-xl font-medium tracking-[0.1em] text-[#f7f4ee] no-underline" onClick={() => setMobileMenuOpen(false)}>
            JW<span className="text-[#c8913a]">.</span>OPS
          </a>

          <nav className="hidden items-center gap-9 text-xs font-medium uppercase tracking-[0.08em] text-[#f7f4ee]/55 md:flex" aria-label="Hauptnavigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[#f7f4ee]">{item.label}</a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button as="a" href={contactHref} size="md" variant="primary">
              Operations Audit anfragen <Icons.ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <button
            className="rounded-sm border border-[#f7f4ee]/15 p-2 text-[#f7f4ee] transition hover:border-[#c8913a]/60 hover:text-white md:hidden"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            {mobileMenuOpen ? <Icons.X className="h-5 w-5" /> : <Icons.Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-[#c8913a]/15 bg-[#111210] px-5 pb-5 pt-2 md:hidden"
            aria-label="Mobile Hauptnavigation"
          >
            <div className="mx-auto flex max-w-7xl flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-[#f7f4ee]/10 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#f7f4ee]/70 transition hover:text-[#f7f4ee]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button as="a" href={contactHref} size="lg" variant="primary" className="mt-5 w-full" onClick={() => setMobileMenuOpen(false)}>
                Operations Audit anfragen <Icons.ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-4 text-center text-sm tracking-[0.03em] text-[#f7f4ee]/45 underline decoration-[#c8913a]/40 underline-offset-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {contactEmail}
              </a>
            </div>
          </motion.nav>
        )}
      </header>

      <main id="top">
        {detailPage === "ueber-mich" && <AboutPage />}
        {detailPage === "impressum" && <ImpressumPage />}
        {detailPage === "datenschutz" && <DatenschutzPage />}
        {!detailPage && (
          <>
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#111210] px-5 pb-24 pt-36 md:px-10 md:pt-40">
          <div className="pointer-events-none absolute -right-24 -top-52 h-[620px] w-[620px] rounded-full bg-[#c8913a]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-52 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[#c8913a]/8 blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
              <motion.p variants={fadeUp} className="mb-7 text-xs uppercase tracking-[0.18em] text-[#c8913a]">
                Technical Operations Partner · Frankfurt · DACH
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-serif text-[clamp(3.6rem,8vw,7.2rem)] font-normal leading-[0.95] tracking-[-0.035em] text-[#f7f4ee]">
                Dein Unternehmen<br />
                <em className="text-[#c8913a]">steuert dich.</em>
                <span className="block text-[#f7f4ee]/35">Das sollte es nicht.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-9 max-w-2xl text-lg font-light leading-8 text-[#f7f4ee]/60">
                Ich helfe <strong className="font-normal text-[#f7f4ee]/90">Unternehmen im Wachstum</strong>, operative Engpässe zu beseitigen und ein Betriebssystem aufzubauen, das mehr Umsatz, größere Teams und steigende Komplexität zuverlässig trägt.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button as="a" href={contactHref} size="lg" variant="primary">
                  Operations Audit anfragen
                </Button>
                <a href="#services" className="inline-flex items-center gap-2 text-sm tracking-[0.03em] text-[#f7f4ee]/50 transition hover:text-[#f7f4ee]">
                  Angebot ansehen ↓
                </a>
              </motion.div>
              <motion.p variants={fadeUp} className="mt-4 text-sm tracking-[0.03em] text-[#f7f4ee]/35">
                Direkt per E-Mail:{" "}
                <a className="text-[#f7f4ee]/60 underline decoration-[#c8913a]/40 underline-offset-4 transition hover:text-[#f7f4ee]" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 max-w-2xl border border-[#c8913a]/20 bg-[#c8913a]/5 px-6 py-4 text-sm italic leading-6 text-[#f7f4ee]/50">
                Für Unternehmen, die skalieren wollen: klare Prozesse, robuste Automatisierung und technische Systeme, die Wachstum tragen statt bremsen.
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#f7f4ee] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Das Problem</SectionLabel>
            <SectionTitle>
              Kommt dir davon etwas <em className="text-[#c8913a]">bekannt vor?</em>
            </SectionTitle>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mt-16 grid border border-[#e5dfd3] bg-[#e5dfd3] md:grid-cols-3 md:gap-px">
              {problemCards.map((card) => (
                <motion.div key={card.number} variants={fadeUp} className="relative bg-[#f7f4ee] p-8 md:p-10">
                  <div className="pointer-events-none absolute right-7 top-5 font-serif text-7xl leading-none text-[#e5dfd3]">{card.number}</div>
                  <p className="relative mb-5 border-l-2 border-[#c8913a] pl-4 font-serif text-xl italic leading-7 text-[#2a2a27]">„{card.quote}“</p>
                  <h3 className="relative mb-3 font-serif text-2xl font-medium leading-tight text-[#111210]">{card.title}</h3>
                  <p className="relative text-sm leading-7 text-[#7a786f]">{card.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-[#111210] px-5 py-20 text-[#f7f4ee] md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <SectionLabel>Was ich mache</SectionLabel>
              <SectionTitle light className="max-w-4xl">
                Ich baue das <em className="text-[#c8913a]">Betriebssystem</em>, das deinem Unternehmen fehlt.
              </SectionTitle>
            </div>

            <div>
              <div className="space-y-5 text-lg font-light leading-8 text-[#f7f4ee]/60">
                <p>
                  Ich analysiere, wo Wachstum im Betrieb hängen bleibt, und behebe die Ursachen — durch <strong className="font-normal text-[#f7f4ee]">klarere Verantwortlichkeiten, bessere Prozesse, Automatisierung und technische Umsetzung.</strong>
                </p>
                <p>Das ist kein Folienprojekt. Ziel ist ein Unternehmen, das mehr Komplexität tragen kann, ohne dass jede wichtige Entscheidung oben hängen bleibt.</p>
              </div>

              <div className="mt-10 grid gap-2">
                {capabilities.map((item) => (
                  <div key={item} className="flex items-center gap-4 border border-[#c8913a]/15 px-5 py-4 text-sm text-[#f7f4ee]/65 transition hover:border-[#c8913a]/45 hover:bg-[#c8913a]/5 hover:text-[#f7f4ee]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8913a]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#fdfcf9] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Angebot</SectionLabel>
            <SectionTitle>
              Audit, Umsetzung, laufende <em className="text-[#c8913a]">Begleitung.</em>
            </SectionTitle>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#7a786f]">
              Der Einstieg ist immer das Operations Audit. Erst danach entscheiden wir gemeinsam, ob und welche Umsetzung sinnvoll ist. Die folgenden Schritte sind keine getrennten Produkte, sondern ein klarer Ablauf von Diagnose zu Umsetzung zu optionaler laufender Begleitung.
            </p>

            <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
              <div className="absolute left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] top-8 hidden h-px bg-gradient-to-r from-[#c8913a] via-[#c8913a]/30 to-[#c8913a]/40 lg:block" />
              {services.map((service) => (
                <Card
                  key={service.name}
                  className={cx(
                    "relative flex min-h-[560px] flex-col p-8 pt-20 transition hover:border-[#c8913a]/50",
                    service.name === "Operations Audit" && "border-[#c8913a] shadow-[0_20px_80px_rgba(200,145,58,0.18)]",
                    service.name !== "Operations Audit" && "bg-[#f7f4ee]/70"
                  )}
                >
                  <div
                    className="absolute left-8 top-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#c8913a] bg-[#fdfcf9] font-serif text-xl font-medium text-[#c8913a]"
                  >
                    {service.name === "Operations Audit" ? "1" : service.name === "Automatisierungs-Sprint" ? "2" : "3"}
                  </div>
                  <span className={cx(
                    "mb-4 inline-flex w-fit border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                    service.name === "Operations Audit"
                      ? "border-[#c8913a] bg-[#c8913a] text-[#111210]"
                      : "border-[#c8913a]/30 text-[#c8913a]"
                  )}>
                    {service.name === "Operations Audit" ? "Start" : service.name === "Automatisierungs-Sprint" ? "Folgeschritt" : "Optional"}
                  </span>
                  <h3 className="font-serif text-3xl font-medium text-[#111210]">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm tracking-[0.03em] text-[#c8913a]">{service.price}</p>
                  <p className="mt-6 flex-1 text-sm leading-7 text-[#7a786f]">
                    {service.desc}
                  </p>
                  <ul className="mt-8 space-y-2">
                    {service.includes.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="network" className="border-t border-[#c8913a]/10 bg-[#111210] px-5 py-20 text-[#f7f4ee] md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <SectionLabel>Das Netzwerk</SectionLabel>
              <SectionTitle light>
                Ein Partner. Viele <em className="text-[#c8913a]">Fähigkeiten.</em>
              </SectionTitle>
            </div>
            <div>
              <div className="space-y-4 text-base leading-8 text-[#f7f4ee]/60">
                <p>
                  Du arbeitest mit <strong className="font-medium text-[#f7f4ee]">einem zentralen Ansprechpartner</strong>. Wenn deine Operations Fähigkeiten brauchen, die über mein Profil hinausgehen, bringe ich geprüfte Spezialisten aus meinem Netzwerk ein.
                </p>
                <p>Ich briefe sie, koordiniere sie und bleibe für das Ergebnis verantwortlich. Dadurch sinken die versteckten Koordinationskosten, die entstehen, wenn Freelancer, Agenturen und Dienstleister separat gesteuert werden.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {partnerTags.map((tag) => (
                  <span key={tag} className="border border-[#c8913a]/20 bg-[#c8913a]/5 px-4 py-2 text-sm tracking-[0.03em] text-[#f7f4ee]/70">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ee] px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <SectionLabel>Warum ich</SectionLabel>
              <SectionTitle>
                Business Operations mit <em className="text-[#c8913a]">technischer Tiefe.</em>
              </SectionTitle>
            </div>
            <div>
              <p className="max-w-2xl text-lg font-light leading-8 text-[#5f5d55]">
                10+ Jahre Softwareentwicklung, Architektur und DevSecOps in regulierten und hochlastnahen Umgebungen: KRITIS, elektronische Patientenakte, Payments, Kubernetes, Security Reviews und Performance-Optimierung.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["AWS Solutions Architect", "iSAQB Software Architect", "M.Sc. Informatik"].map((item) => (
                  <div key={item} className="border border-[#e5dfd3] bg-[#fdfcf9] px-4 py-3 text-xs font-medium uppercase tracking-[0.08em] text-[#7a786f]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 border-l-2 border-[#c8913a] pl-5 text-sm leading-7 text-[#7a786f]">
                Kundenbeleg: Security Audit einer Tanzschul-App mit technischer Risikoanalyse und priorisierten Maßnahmen.
              </p>
              <Button as="a" href="#ueber-mich" size="lg" variant="dark" className="mt-8">
                Mehr über meinen Hintergrund <Icons.ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-[#111210] px-5 py-24 text-center md:px-10 md:py-32">
          <div className="pointer-events-none absolute -bottom-56 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-[#c8913a]/10 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <SectionLabel>Starten</SectionLabel>
            <SectionTitle light center>
              Lass uns herausfinden, wohin deine <em className="text-[#c8913a]">Zeit verschwindet.</em>
            </SectionTitle>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#f7f4ee]/45">30 Minuten. Kein Pitch. Ein ehrliches Gespräch darüber, ob dieser Ansatz zu deinem Unternehmen passt.</p>
            <Button as="a" href={contactHref} size="lg" variant="primary" className="mt-10 px-10">
              Operations Audit anfragen <Icons.ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-5 text-sm tracking-[0.03em] text-[#f7f4ee]/35">
              <a className="underline decoration-[#c8913a]/35 underline-offset-4 transition hover:text-[#f7f4ee]/70" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>{" "}
              · Frankfurt, Deutschland
            </p>
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#c8913a]/10 bg-[#0c0d0b] px-5 py-10 text-center md:flex-row md:px-10">
        <div className="font-serif text-lg font-medium tracking-[0.1em] text-[#f7f4ee]/40">
          JW<span className="text-[#c8913a]">.</span>OPS
        </div>
        <div className="text-xs tracking-[0.06em] text-[#f7f4ee]/20">Technical Operations Partner · Frankfurt · DACH</div>
        <div className="flex gap-6 text-xs tracking-[0.06em] text-[#f7f4ee]/20">
          <a href="#ueber-mich" className="hover:text-[#f7f4ee]/60">Über mich</a>
          <a href="#impressum" className="hover:text-[#f7f4ee]/60">Impressum</a>
          <a href="#datenschutz" className="hover:text-[#f7f4ee]/60">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
