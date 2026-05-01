import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Services | Precision Care Centre",
  description:
    "Precision Care Centre offers image-guided procedures, medication management, and fluoroscopy-assisted treatments for chronic pain.",
}

const SERVICES = [
  {
    href: "/services/image-guided-procedures",
    eyebrow: "Precision Targeting",
    title: "Image Guided Procedures",
    summary:
      "Real-time imaging technology used to precisely place injections and instruments for maximum accuracy and safety.",
    highlights: [
      "Ultrasound-guided injections",
      "Minimally invasive approach",
      "Reduced procedural risk",
      "Improved treatment accuracy",
    ],
  },
  {
    href: "/services/medication-management",
    eyebrow: "Ongoing Care",
    title: "Medication Management",
    summary:
      "Comprehensive review, prescription, and monitoring of pain medications tailored to your diagnosis and tolerance.",
    highlights: [
      "Personalized medication plans",
      "Opioid and adjunct therapy",
      "Regular monitoring and titration",
      "Side effect management",
    ],
  },
  {
    href: "/services/fluoroscopy",
    eyebrow: "Imaging Guidance",
    title: "Fluoroscopy",
    summary:
      "Live X-ray imaging used during spinal and joint procedures to ensure precise needle placement and contrast confirmation.",
    highlights: [
      "Real-time X-ray guidance",
      "Spinal injection accuracy",
      "Contrast dye confirmation",
      "Used for epidurals and facet joints",
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell procedure-shell">
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Our Services</div>
              <h1 className="inner-hero-title">Services</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Precision Care Centre provides targeted, evidence-informed
                services for chronic pain — from imaging-guided interventions to
                ongoing medication oversight.
              </p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
                <Link href="/contact-us" className="btn-ghost">
                  Contact the Clinic
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section procedure-hub-group-section">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">What We Offer</div>
              <h2 className="procedure-section-title">
                A focused range of pain management services.
              </h2>
              <p className="procedure-section-copy">
                Each service is designed to work together as part of a
                comprehensive, individualized care plan.
              </p>
            </div>

            <div
              className="procedure-card-grid procedure-hub-card-grid"
              data-card-count={SERVICES.length}
            >
              {SERVICES.map((service, i) => (
                <article
                  key={service.href}
                  className="procedure-card procedure-hub-card"
                  style={{ "--stagger": i } as CSSProperties}
                >
                  <div className="procedure-card-topline">
                    <span className="procedure-card-eyebrow">
                      {service.eyebrow}
                    </span>
                  </div>
                  <h3 className="procedure-card-title">{service.title}</h3>
                  <p className="procedure-card-copy">{service.summary}</p>
                  <ul className="procedure-card-list">
                    {service.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <Link href={service.href} className="procedure-card-link">
                    <span>Learn More</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Book Or Ask Questions</div>
              <h2 className="procedure-cta-title">
                Not sure which service is right for you?
              </h2>
              <p className="procedure-cta-copy">
                Call the clinic or send a message and we can help direct you to
                the most appropriate service or procedure for your situation.
              </p>
            </div>

            <div className="procedure-cta-panel">
              <div className="procedure-cta-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
                <Link href="/contact-us" className="btn-ghost">
                  Contact the Clinic
                </Link>
              </div>
              <p className="procedure-cta-note">
                A referral may be required. Contact the clinic for details on
                how to get started.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
