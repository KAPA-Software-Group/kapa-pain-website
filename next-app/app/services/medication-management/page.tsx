import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Medication Management | Precision Care Centre",
  description:
    "Precision Care Centre provides comprehensive medication management for chronic pain, including opioid therapy, adjunct medications, and ongoing monitoring.",
}

const WHAT_TO_EXPECT = [
  {
    title: "Initial Medication Review",
    description:
      "Your current medications, pain history, and prior treatment responses are reviewed to build a clear picture of what has and has not worked.",
  },
  {
    title: "Personalized Medication Plan",
    description:
      "A tailored plan is developed that may include analgesics, adjunct therapies, or changes to existing prescriptions based on your diagnosis.",
  },
  {
    title: "Regular Monitoring",
    description:
      "Ongoing appointments track your response to medications, side effects, and overall function to ensure the plan remains appropriate over time.",
  },
  {
    title: "Titration and Adjustment",
    description:
      "Dosages and medication types are adjusted as needed based on clinical response, tolerance, and changes in your condition.",
  },
]

const MEDICATION_TYPES = [
  "Analgesic medications (non-opioid and opioid)",
  "Neuropathic pain agents (e.g., gabapentin, pregabalin)",
  "Anti-inflammatory medications",
  "Muscle relaxants",
  "Topical agents",
  "Adjunct medications for sleep and mood",
]

export default function MedicationManagementPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell procedure-shell">
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Services</div>
              <h1 className="inner-hero-title">Medication Management</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Ongoing prescription oversight and monitoring to ensure your
                pain medications are working safely and effectively as part of
                your broader care plan.
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
                  A structured approach to pain medication.
                </h2>
                <p className="procedure-section-copy">
                  Effective chronic pain management often requires careful
                  medication selection, dosing, and monitoring. Our team works
                  with patients to find the right balance — minimizing side
                  effects while maximizing function and quality of life.
                </p>
                <p className="procedure-section-copy" style={{ marginTop: "16px" }}>
                  Medication management at Precision Care Centre is not
                  one-size-fits-all. It is guided by your diagnosis, response
                  history, and treatment goals, and is regularly reassessed to
                  reflect changes in your condition.
                </p>
              </div>

              <div className="procedure-card-grid" data-card-count="1" style={{ alignContent: "start" }}>
                <article className="procedure-card">
                  <div className="procedure-card-topline">
                    <span className="procedure-card-eyebrow">Medication Types</span>
                  </div>
                  <h3 className="procedure-card-title">
                    Medications we may prescribe or review
                  </h3>
                  <ul className="procedure-card-list">
                    {MEDICATION_TYPES.map((med) => (
                      <li key={med}>{med}</li>
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
                What patients can expect from medication management.
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
                Questions about your current medications or pain management?
              </h2>
              <p className="procedure-cta-copy">
                Reach out to the clinic to discuss whether a medication review
                or adjustment is right for you.
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
