import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { LocationsBackground } from "@/components/ui/locations-background"
import { getLocationBySlug, locations, SHARED_FAX } from "@/lib/locations"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocationBySlug(slug)
  if (!loc) return {}
  return {
    title: `${loc.name} - Precision Pain Centre`,
    description:
      loc.status === "open"
        ? `Precision Pain Centre ${loc.name} - ${loc.addressLines.join(", ")}.`
        : `Precision Pain Centre is opening a ${loc.name} clinic soon.`,
  }
}

export default async function LocationDetailPage({ params }: Props) {
  const { slug } = await params
  const loc = getLocationBySlug(slug)
  if (!loc) notFound()

  const isOpen = loc.status === "open"

  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell hero-drawer-reveal">
        {/* ── Dark hero ── */}
        <section className="inner-hero">
          <div className="section-inner inner-hero-content">
            <div className="section-label">Location</div>
            <h1 className="inner-hero-title">{loc.name}</h1>
            <p className="inner-hero-copy">
              {isOpen
                ? loc.addressLines.join("  ·  ")
                : "This location is coming soon."}
            </p>
          </div>
        </section>

        {/* ── Detail panel ── */}
        <section className="loc-page-body">
          <LocationsBackground />
          <div className="loc-page-list loc-page-list-detail">
            <div className="loc-page-row">
              {/* Left - address + map */}
              <div>
                <p className="loc-page-contact-label">Address</p>
                <address className="loc-page-address loc-page-address-lg">
                  {loc.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </address>

                {loc.coordinates && (
                  <p className="loc-page-coords" style={{ marginTop: 20 }}>
                    {loc.coordinates}
                  </p>
                )}

                {loc.googleMapsUrl && (
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="loc-page-map-link"
                    style={{ marginTop: 28, display: "inline-block" }}
                  >
                    View on Google Maps&nbsp;→
                  </a>
                )}
              </div>

              {/* Right - contact + CTAs */}
              <div className="loc-page-right">
                <p className="loc-page-contact-label">Contact</p>
                {loc.phone && (
                  <a
                    href={`tel:${loc.phone.replace(/[^0-9]/g, "")}`}
                    className="loc-page-contact-line"
                  >
                    {loc.phone}
                  </a>
                )}
                {loc.email && (
                  <a
                    href={`mailto:${loc.email}`}
                    className="loc-page-contact-line"
                  >
                    {loc.email}
                  </a>
                )}
                <span className="loc-page-contact-line">
                  Fax: {SHARED_FAX}
                </span>

                <div className="loc-page-actions" style={{ marginTop: 40 }}>
                  <Link href="/contact-us" className="btn-primary">
                    Contact Us
                  </Link>
                  <Link href="/locations" className="btn-ghost">
                    ← All Locations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
