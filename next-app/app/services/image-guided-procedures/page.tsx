import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Image Guided Procedures | Precision Care Centre",
  description:
    "Precision Care Centre uses real-time ultrasound and fluoroscopy imaging to guide injections and interventions for accurate, safe pain management.",
}

const WHAT_TO_EXPECT = [
  {
    title: "Pre-Procedure Preparation",
    description:
      "Your care team will review your imaging, medical history, and current medications before the procedure. You may be asked to fast or pause certain medications.",
  },
  {
    title: "During the Procedure",
    description:
      "A trained clinician uses live imaging — ultrasound or fluoroscopy — to guide the needle to the exact target. Most procedures take 15 to 45 minutes.",
  },
  {
    title: "Post-Procedure Recovery",
    description:
      "You will be monitored briefly after the procedure. Mild soreness at the injection site is common. Most patients can resume light activity within 24 hours.",
  },
  {
    title: "Follow-Up",
    description:
      "A follow-up appointment is typically scheduled to assess your response and determine next steps in your care plan.",
  },
]

const COMMON_USES = [
  "Joint injections (shoulder, hip, knee, ankle)",
  "Nerve blocks and diagnostic injections",
  "Epidural steroid injections",
  "Tendon and bursa injections",
  "Trigger point injections",
  "Radiofrequency ablation guidance",
]

export default function ImageGuidedProceduresPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell procedure-shell">
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Services</div>
              <h1 className="inner-hero-title">Image Guided Procedures</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Real-time imaging technology — including ultrasound and
                fluoroscopy — allows our team to precisely target the source of
                pain with greater accuracy and reduced risk.
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
                  Precision placement guided by live imaging.
                </h2>
                <p className="procedure-section-copy">
                  Image-guided procedures use real-time visual feedback to
                  direct instruments to the correct anatomical location. This
                  approach reduces procedural guesswork, improves accuracy, and
                  lowers the risk of complications compared to unguided
                  injections.
                </p>
                <p className="procedure-section-copy" style={{ marginTop: "16px" }}>
                  At Precision Care Centre, imaging guidance is used across a
                  wide range of interventional procedures to ensure each
                  treatment is delivered exactly where it is needed.
                </p>
              </div>

              <div className="procedure-card-grid" data-card-count="1" style={{ alignContent: "start" }}>
                <article className="procedure-card">
                  <div className="procedure-card-topline">
                    <span className="procedure-card-eyebrow">Common Uses</span>
                  </div>
                  <h3 className="procedure-card-title">
                    Procedures that use imaging guidance
                  </h3>
                  <ul className="procedure-card-list">
                    {COMMON_USES.map((use) => (
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
                What patients can expect from an image-guided procedure.
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
                Have questions about image-guided procedures?
              </h2>
              <p className="procedure-cta-copy">
                Call the clinic or explore other services to find the right
                approach for your pain management needs.
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
