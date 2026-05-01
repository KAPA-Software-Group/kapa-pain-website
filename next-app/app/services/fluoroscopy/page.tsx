import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Fluoroscopy | Precision Care Centre",
  description:
    "Precision Care Centre uses fluoroscopy — live X-ray imaging — to guide spinal and joint injections with precision and contrast verification.",
}

const WHAT_TO_EXPECT = [
  {
    title: "Before the Procedure",
    description:
      "You will be asked about allergies (particularly to contrast dye), medications, and any kidney or thyroid conditions before the procedure begins.",
  },
  {
    title: "During the Procedure",
    description:
      "You will be positioned on a procedure table. The fluoroscope displays live X-ray images as the needle is advanced. Contrast dye may be injected to confirm placement.",
  },
  {
    title: "What You Will Feel",
    description:
      "You may feel pressure or mild discomfort during needle insertion. Local anesthetic is typically used to minimize pain at the injection site.",
  },
  {
    title: "After the Procedure",
    description:
      "You will be monitored for a short period. Temporary soreness or warmth near the injection site is common. Results are reviewed at a follow-up appointment.",
  },
]

const FLUOROSCOPY_USES = [
  "Cervical, thoracic, and lumbar epidural injections",
  "Facet joint injections and medial branch blocks",
  "Sacroiliac joint injections",
  "Selective nerve root blocks",
  "Discography",
  "Radiofrequency ablation guidance",
]

export default function FluoroscopyPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell procedure-shell">
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Services</div>
              <h1 className="inner-hero-title">Fluoroscopy</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Live X-ray imaging used during interventional procedures to
                confirm precise needle placement and verify contrast dye spread
                before medication is delivered.
              </p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
                <Link href="/services" className="btn-ghost">
                  Back to Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section">
          <div className="section-inner">
            <div className="procedure-group-layout" data-card-count="2">
              <div className="procedure-group-aside">
                <div className="section-label">Overview</div>
                <h2 className="procedure-section-title">
                  Real-time X-ray guidance for spinal procedures.
                </h2>
                <p className="procedure-section-copy">
                  Fluoroscopy is a continuous X-ray imaging technique that
                  allows clinicians to visualize needle position in real time
                  during interventional procedures. It is particularly valuable
                  for spinal injections where precise depth and angle are
                  critical to both safety and effectiveness.
                </p>
                <p className="procedure-section-copy" style={{ marginTop: "16px" }}>
                  Contrast dye is often used in combination with fluoroscopy to
                  confirm that medication spreads to the intended anatomical
                  space before the therapeutic agent is delivered.
                </p>
              </div>

              <div className="procedure-card-grid" data-card-count="1" style={{ alignContent: "start" }}>
                <article className="procedure-card">
                  <div className="procedure-card-topline">
                    <span className="procedure-card-eyebrow">Common Uses</span>
                  </div>
                  <h3 className="procedure-card-title">
                    Procedures that use fluoroscopy
                  </h3>
                  <ul className="procedure-card-list">
                    {FLUOROSCOPY_USES.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section procedure-section-muted">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">What to Expect</div>
              <h2 className="procedure-section-title">
                What patients can expect during a fluoroscopy-guided procedure.
              </h2>
            </div>

            <div className="procedure-card-grid">
              {WHAT_TO_EXPECT.map((item) => (
                <article key={item.title} className="procedure-card">
                  <h3 className="procedure-card-title">{item.title}</h3>
                  <p className="procedure-card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Get Started</div>
              <h2 className="procedure-cta-title">
                Questions about fluoroscopy-guided procedures?
              </h2>
              <p className="procedure-cta-copy">
                Call the clinic to discuss whether a fluoroscopy-guided
                injection is part of your recommended treatment plan.
              </p>
            </div>

            <div className="procedure-cta-panel">
              <div className="procedure-cta-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
                <Link href="/services" className="btn-ghost">
                  All Services
                </Link>
              </div>
              <p className="procedure-cta-note">
                A referral from your family physician may be required.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
