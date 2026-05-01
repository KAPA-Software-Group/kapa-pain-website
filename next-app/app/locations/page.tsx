import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Locations | Precision Pain Centre",
  description:
    "Browse Precision Care Centre locations in Toronto, Brampton, Hamilton, and Guelph, with contact information and booking access.",
}

const contactEmail = "info@precisioncare.ca"
const contactPhone = "289-752-9388"
const contactPhoneHref = "tel:2897529388"

const locationCards = [
  {
    name: "Brampton",
    addressLines: [
      "18 Kensington Road, Unit 200 and Unit 502",
      "Brampton, ON",
      "L6T 4S5",
    ],
    coordinates: "43.7315° N, 79.7624° W",
    googleMapsUrl:
      "https://www.google.com/maps/search/18+Kensington+Road,+Brampton,+ON+L6T+4S5",
    mapEmbedUrl:
      "https://www.google.com/maps?q=18%20Kensington%20Road%2C%20Brampton%2C%20ON%20L6T%204S5&output=embed",
  },
  {
    name: "Hamilton",
    addressLines: [
      "25 Charlton Avenue East, Unit 101",
      "Hamilton, ON",
      "L8N 1Y2",
    ],
    coordinates: "43.2557° N, 79.8711° W",
    googleMapsUrl:
      "https://www.google.com/maps/search/25+Charlton+Avenue+East,+Hamilton,+ON+L8N+1Y2",
    mapEmbedUrl:
      "https://www.google.com/maps?q=25%20Charlton%20Avenue%20East%2C%20Hamilton%2C%20ON%20L8N%201Y2&output=embed",
  },
  {
    name: "Toronto",
    addressLines: ["Coming Soon..."],
    coordinates: undefined,
    googleMapsUrl: undefined,
    mapEmbedUrl: undefined,
  },
  {
    name: "Guelph",
    addressLines: ["Coming Soon..."],
    coordinates: undefined,
    googleMapsUrl: undefined,
    mapEmbedUrl: undefined,
  },
] as const

const locationsPageStyles = `
  .locations-page-scope .section-inner {
    max-width: 1320px;
  }

  .locations-page-intro {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(280px, 0.75fr);
    gap: clamp(32px, 5vw, 72px);
    align-items: start;
    margin-bottom: clamp(42px, 7vw, 84px);
  }

  .locations-page-copy {
    position: relative;
    max-width: 620px;
    margin-top: 42px;
    padding: clamp(24px, 3vw, 34px);
    border: 1px solid rgba(62, 57, 51, 0.13);
    background:
      linear-gradient(
        145deg,
        rgba(246, 239, 227, 0.9),
        rgba(229, 222, 211, 0.52)
      ),
      rgba(246, 239, 227, 0.7);
    box-shadow: 0 24px 60px rgba(31, 29, 26, 0.06);
    overflow: hidden;
  }

  .locations-page-copy::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: rgba(159, 118, 87, 0.54);
  }

  .locations-page-grid {
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid var(--hairline);
    background: rgba(246, 239, 227, 0.46);
    box-shadow: 0 28px 80px rgba(31, 29, 26, 0.08);
  }

  .locations-page-card {
    display: grid;
    grid-template-columns: minmax(260px, 0.72fr) minmax(320px, 1fr);
    gap: clamp(28px, 5vw, 72px);
    align-items: stretch;
    min-height: 360px;
    border-right: none;
    border-bottom: 1px solid var(--hairline);
    transition:
      border-color 280ms ease,
      box-shadow 280ms ease,
      transform 520ms var(--ease);
  }

  .locations-page-card:nth-child(2n) {
    border-right: none;
  }

  .locations-page-card:nth-last-child(-n + 2) {
    border-bottom: 1px solid var(--hairline);
  }

  .locations-page-card:last-child {
    border-bottom: none;
  }

  .locations-page-address {
    margin-bottom: 32px;
  }

  .locations-page-meta {
    display: grid;
    gap: 10px;
    margin-bottom: 28px;
    font-family: var(--f-sans);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(62, 57, 51, 0.64);
  }

  .locations-page-map {
    position: relative;
    min-height: 280px;
    height: 100%;
    margin: 0;
    overflow: hidden;
    border: 1px solid rgba(62, 57, 51, 0.14);
    background:
      linear-gradient(
        145deg,
        rgba(246, 239, 227, 0.9),
        rgba(216, 203, 187, 0.52)
      ),
      var(--vanilla);
  }

  .locations-page-map::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(
        135deg,
        rgba(246, 239, 227, 0.3),
        rgba(159, 118, 87, 0.22) 46%,
        rgba(62, 57, 51, 0.16)
      ),
      radial-gradient(
        circle at 18% 16%,
        rgba(216, 203, 187, 0.2),
        transparent 36%
      );
    mix-blend-mode: multiply;
    opacity: 0.72;
  }

  .locations-page-map iframe {
    width: 100%;
    height: 100%;
    border: 0;
    filter: sepia(0.58) saturate(0.72) hue-rotate(338deg) contrast(0.9)
      brightness(1.04);
    opacity: 0.88;
    transform: scale(1);
    transition:
      opacity 420ms ease,
      transform 720ms var(--ease);
  }

  .locations-page-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 18px 24px;
    align-items: center;
    margin-top: 0;
  }

  .locations-page-unavailable {
    font-family: var(--f-sans);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(62, 57, 51, 0.42);
  }

  .locations-page-card[data-coming-soon="true"] {
    min-height: auto;
  }

  .locations-page-card[data-coming-soon="true"] .locations-page-address {
    margin-bottom: 0;
  }

  @media (hover: hover) and (pointer: fine) {
    .locations-page-card:hover {
      border-color: rgba(159, 118, 87, 0.34);
      box-shadow: 0 30px 72px rgba(31, 29, 26, 0.08);
      transform: translateY(-3px);
    }

    .locations-page-card[data-coming-soon="true"]:hover {
      box-shadow: 0 18px 46px rgba(31, 29, 26, 0.05);
      transform: translateY(-2px);
    }

    .locations-page-card:hover .locations-page-map iframe {
      opacity: 0.96;
      transform: scale(1.015);
    }
  }

  .locations-reveal-root.is-reveal-enabled .locations-page-scope [data-locations-reveal],
  .locations-reveal-root.is-reveal-enabled .procedure-cta-section [data-locations-reveal] {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    transition:
      opacity 700ms var(--ease),
      transform 700ms var(--ease),
      border-color 280ms ease,
      box-shadow 280ms ease;
    will-change: opacity, transform;
  }

  .locations-reveal-root.is-reveal-enabled .locations-page-scope [data-locations-reveal].is-loaded,
  .locations-reveal-root.is-reveal-enabled .procedure-cta-section [data-locations-reveal].is-loaded {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    will-change: auto;
  }

  @media (max-width: 1024px) {
    .locations-page-intro,
    .locations-page-card {
      grid-template-columns: 1fr;
    }

    .locations-page-map {
      height: clamp(220px, 38vw, 320px);
      min-height: 220px;
    }

    .locations-page-card:last-child {
      border-bottom: none;
    }
  }

  @media (max-width: 768px) {
    .locations-page-intro {
      align-items: start;
      margin-bottom: 40px;
    }

    .locations-page-copy {
      margin-top: 0;
      max-width: none;
      padding: 24px;
    }

    .locations-page-card {
      min-height: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .locations-page-card,
    .locations-page-map iframe,
    .locations-reveal-root.is-reveal-enabled .locations-page-scope [data-locations-reveal],
    .locations-reveal-root.is-reveal-enabled .locations-page-scope [data-locations-reveal].is-loaded,
    .locations-reveal-root.is-reveal-enabled .procedure-cta-section [data-locations-reveal],
    .locations-reveal-root.is-reveal-enabled .procedure-cta-section [data-locations-reveal].is-loaded {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`

const locationsRevealScript = `
  (() => {
    const loadReveals = () => {
      const root = document.querySelector("[data-locations-reveal-root]");
      if (!root) return;

      root.classList.add("is-reveal-enabled");

      const revealItems = Array.from(root.querySelectorAll("[data-locations-reveal]"));

      if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-loaded"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-loaded");
            activeObserver.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.14,
        }
      );

      revealItems.forEach((item) => observer.observe(item));
    };

    window.requestAnimationFrame(loadReveals);
  })();
`

type LocationCardProps = (typeof locationCards)[number]

function LocationCard({
  addressLines,
  coordinates,
  googleMapsUrl,
  mapEmbedUrl,
  name,
}: LocationCardProps) {
  const isComingSoon = !mapEmbedUrl

  return (
    <article
      className="loc-card locations-page-card"
      data-coming-soon={isComingSoon}
      data-locations-reveal="card"
    >
      <div>
        <span className="loc-tag">Clinic Location</span>
        <h2 className="loc-city">{name}</h2>

        <address className="loc-address locations-page-address">
          {addressLines.map((line) => (
            <span key={`${name}-${line}`}>
              {line}
              <br />
            </span>
          ))}
        </address>

        {isComingSoon ? null : (
          <>
            <div className="loc-divider" />

            <div className="locations-page-meta">
              <a href={`mailto:${contactEmail}`} className="loc-phone">
                {contactEmail}
              </a>
              <a href={contactPhoneHref} className="loc-phone">
                {contactPhone}
              </a>
              {coordinates ? <span>{coordinates}</span> : null}
            </div>

            <div className="locations-page-actions">
              <Link href="/contact-us" className="btn-primary">
                Contact Us
              </Link>
              {googleMapsUrl ? (
                <a
                  href={googleMapsUrl}
                  className="btn-ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Map
                </a>
              ) : null}
            </div>
          </>
        )}
      </div>

      {mapEmbedUrl ? (
        <div className="locations-page-map">
          <iframe
            src={mapEmbedUrl}
            title={`${name} clinic map`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}
    </article>
  )
}

export default function LocationsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: locationsPageStyles }} />
      <Script
        id="locations-reveal-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: locationsRevealScript }}
      />
      <SiteHeader overlay />

      <main
        className="page-shell locations-reveal-root"
        data-locations-reveal-root
      >
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Clinic Access</div>
              <h1 className="inner-hero-title">Locations</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Browse Precision Care Centre locations in Toronto, Brampton,
                Hamilton, and Guelph, with contact details and direct clinic
                access.
              </p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section locations-page-scope">
          <div className="section-inner">
            <div className="locations-page-intro" data-locations-reveal="intro">
              <div>
                <div className="section-label">Clinic Locations</div>
                <h2 className="procedure-section-title">
                  Find the clinic location closest to your care plan.
                </h2>
              </div>
              <p className="procedure-section-copy locations-page-copy">
                Patients and referring providers can use the location details
                below for address information, maps, and clinic contact access.
              </p>
            </div>

            <div className="locations-page-grid">
              {locationCards.map((location) => (
                <LocationCard key={location.name} {...location} />
              ))}
            </div>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Next Step</div>
              <h2 className="procedure-cta-title">
                Need help with appointment or location details?
              </h2>
              <p className="procedure-cta-copy">
                Contact the clinic for booking support, referral questions, or
                current visit details before attending an appointment.
              </p>
            </div>

            <div className="procedure-cta-panel" data-locations-reveal="cta">
              <div className="procedure-cta-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
