import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { LocationsBackground } from "@/components/ui/locations-background"
import { locations } from "@/lib/locations"

export const metadata: Metadata = {
  title: "Locations — Precision Pain Centre",
  description:
    "Precision Pain Centre clinic locations in Brampton and Hamilton, Ontario, with Toronto and Guelph coming soon.",
}

export default function LocationsPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell">
        {/* ── Dark hero ── */}
        <section className="inner-hero">
          <div className="section-inner inner-hero-content">
            <div className="section-label">Clinic Access</div>
            <h1 className="inner-hero-title">Locations</h1>
            <p className="inner-hero-copy">
              Currently seeing patients in Brampton and Hamilton.
              Toronto and Guelph locations are on the way.
            </p>
          </div>
        </section>

        {/* ── Location cards ── */}
        <section className="loc-page-body">
          <LocationsBackground />
          <div className="loc-page-list">
            {locations.map((loc, i) => {
              const isOpen = loc.status === "open"
              return (
                <div key={loc.slug} className="loc-page-row">
                  {/* Left — name + address */}
                  <div>
                    <div className="loc-page-meta">
                      <span className="loc-page-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          isOpen
                            ? "loc-page-badge loc-page-badge-open"
                            : "loc-page-badge loc-page-badge-soon"
                        }
                      >
                        {isOpen ? "Open" : "Coming Soon"}
                      </span>
                    </div>

                    <h2
                      className="loc-page-name"
                      style={{ opacity: isOpen ? 1 : 0.32 }}
                    >
                      {loc.name}
                    </h2>

                    <address className="loc-page-address">
                      {loc.addressLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </address>
                  </div>

                  {/* Right — contact + actions */}
                  <div className="loc-page-right">
                    <p className="loc-page-contact-label">Contact</p>
                    <a href="tel:2897529388" className="loc-page-contact-line">
                      289-752-9388
                    </a>
                    <a
                      href="mailto:info@precisioncare.ca"
                      className="loc-page-contact-line"
                    >
                      info@precisioncare.ca
                    </a>

                    {loc.coordinates && (
                      <p className="loc-page-coords">{loc.coordinates}</p>
                    )}

                    <div className="loc-page-actions">
                      {loc.googleMapsUrl && (
                        <a
                          href={loc.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="loc-page-map-link"
                        >
                          View on Google Maps&nbsp;→
                        </a>
                      )}
                      <Link href="/contact-us" className="btn-ghost">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
