import type { Metadata } from "next"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  getPatientProcedureHref,
  patientProcedureHubGroups,
  patientProcedurePages,
  patientProcedureSharedExpectations,
  patientProcedureUrgentCareNotes,
} from "@/lib/patient-procedures"

export const metadata: Metadata = {
  title: "Patient Procedures | Precision Pain Centre",
  description:
    "Explore patient procedure information from Precision Care Centre, including nerve procedures, epidural injections, joint injections, SGB, and chronic pain assessment.",
}

export default function PatientProceduresPage() {
  return (
    <>
      <SiteHeader />

      <main className="page-shell procedure-shell">
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="section-label">Patient Procedures</div>
            <div className="procedure-hero-grid procedure-hub-hero-grid">
              <div className="procedure-hero-copy-wrap">
                <h1 className="inner-hero-title">Patient Procedures</h1>
                <p className="inner-hero-copy procedure-hero-copy">
                  Explore how Precision Care Centre approaches assessment,
                  diagnosis, image-guided treatment, recovery, and follow-up
                  across the clinic&apos;s core pain procedures.
                </p>
                <div className="procedure-hero-actions">
                  <a href="tel:2897529388" className="btn-primary">
                    Call to Discuss Your Options
                  </a>
                  <Link
                    href={getPatientProcedureHref(
                      "chronic-pain-assessment-medical-management"
                    )}
                    className="btn-ghost"
                  >
                    Start With Assessment
                  </Link>
                </div>
              </div>

              <div className="procedure-facts">
                <div className="procedure-fact">
                  <span className="procedure-fact-label">Care Model</span>
                  <p className="procedure-fact-value">
                    Multidisciplinary, image-guided, and personalized
                  </p>
                </div>
                <div className="procedure-fact">
                  <span className="procedure-fact-label">
                    What You Will Find
                  </span>
                  <p className="procedure-fact-value">
                    Clear explanations, candidacy guidance, recovery details,
                    and safety information
                  </p>
                </div>
                <div className="procedure-fact">
                  <span className="procedure-fact-label">
                    How To Use This Hub
                  </span>
                  <p className="procedure-fact-value">
                    Start with assessment if your diagnosis is still evolving,
                    then move into the specific procedure pages that match your
                    care plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">Clinic Approach</div>
              <h2 className="procedure-section-title">
                One section, organized by real decision points.
              </h2>
            </div>

            <div className="procedure-intro-grid">
              <p className="procedure-paragraph">
                This section is designed as a hub with dedicated pages for major
                procedure families. Patients should not have to dig through one
                oversized page or open a chain of hidden accordions to find
                recovery instructions, risks, alternatives, or when to contact
                the clinic.
              </p>
              <p className="procedure-paragraph">
                The structure reflects how care decisions are actually made:
                assessment first, then diagnostic and therapeutic procedures,
                then advanced options when needed. That makes the information
                easier to scan, easier to trust, and easier to use before a
                consultation.
              </p>
            </div>
          </div>
        </section>

        {patientProcedureHubGroups.map((group) => (
          <section key={group.title} className="procedure-section">
            <div className="section-inner">
              <div className="procedure-section-header">
                <div className="section-label">Procedure Group</div>
                <h2 className="procedure-section-title">{group.title}</h2>
                <p className="procedure-section-copy">{group.description}</p>
              </div>

              <div className="procedure-card-grid">
                {group.slugs.map((slug) => {
                  const page = patientProcedurePages.find(
                    (entry) => entry.slug === slug
                  )

                  if (!page) {
                    return null
                  }

                  return (
                    <article key={page.slug} className="procedure-card">
                      <h3 className="procedure-card-title">{page.title}</h3>
                      <p className="procedure-card-copy">{page.cardSummary}</p>
                      <ul className="procedure-card-list">
                        {page.cardHighlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                      <Link
                        href={getPatientProcedureHref(page.slug)}
                        className="procedure-card-link"
                      >
                        View procedure details
                      </Link>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        ))}

        <section className="procedure-section procedure-section-muted">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">What Patients Can Expect</div>
              <h2 className="procedure-section-title">
                Consistent standards across the section.
              </h2>
            </div>

            <div className="procedure-card-grid">
              {patientProcedureSharedExpectations.map((item) => (
                <article key={item.title} className="procedure-card">
                  <h3 className="procedure-card-title">{item.title}</h3>
                  <p className="procedure-card-copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="procedure-section procedure-section-alert">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">Safety</div>
              <h2 className="procedure-section-title">
                Red flags should stay visible.
              </h2>
              <p className="procedure-section-copy">
                Each dedicated page includes procedure-specific aftercare and
                contact guidance. The symptoms below are examples of the kind of
                red flags that should never be hidden behind collapsed content.
              </p>
            </div>

            <ul className="procedure-bullet-list">
              {patientProcedureUrgentCareNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Book Or Ask Questions</div>
              <h2 className="procedure-cta-title">
                Need help finding the right page or the right next step?
              </h2>
              <p className="procedure-cta-copy">
                Start with the assessment page if the pain source is still being
                worked up, or call the clinic if you want help understanding
                which procedure page is most relevant.
              </p>
            </div>

            <div className="procedure-cta-panel">
              <div className="procedure-cta-actions">
                <a href="tel:2897529388" className="btn-primary">
                  Call to Discuss Your Options
                </a>
                <Link
                  href={getPatientProcedureHref(
                    "chronic-pain-assessment-medical-management"
                  )}
                  className="btn-ghost"
                >
                  Start With Assessment
                </Link>
              </div>
              <p className="procedure-cta-note">
                For referral logistics, next steps, or preparing for a visit,
                the clinic can direct you to the right pathway.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
