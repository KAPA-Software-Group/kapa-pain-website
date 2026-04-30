import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { ProcedurePathwayScroll } from "@/components/procedure-pathway-scroll"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  getPatientProcedureHref,
  patientProcedureHubGroups,
  patientProcedurePages,
  patientProcedureSharedExpectations,
  patientProcedureUrgentCareNotes,
} from "@/lib/patient-procedures"

const hubPathwaySteps = [
  {
    title: "Assessment",
    eyebrow: "Step 01",
    description:
      "Review history, function, prior treatment, and imaging to understand the likely pain source.",
    visualTitle: "Assessment Snapshot",
    visualCopy:
      "Placeholder for intake, imaging review, and baseline function visuals.",
    accent: "#8d6b55",
  },
  {
    title: "Targeted Treatment",
    eyebrow: "Step 02",
    description:
      "Use image-guided injections, blocks, or ablation when they fit the diagnosis and care plan.",
    visualTitle: "Procedure Planning",
    visualCopy:
      "Placeholder for image-guided planning, anatomy views, and treatment focus.",
    accent: "#6f8b8f",
  },
  {
    title: "Recovery & Follow-Up",
    eyebrow: "Step 03",
    description:
      "Track response, follow aftercare instructions, and adjust the next step based on results.",
    visualTitle: "Recovery Monitoring",
    visualCopy:
      "Placeholder for aftercare guidance, progress checks, and next-step review.",
    accent: "#7c815e",
  },
]

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
                  Patient-friendly information about chronic pain assessment,
                  image-guided procedures, recovery expectations, and when to
                  contact the clinic.
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
                  <span className="procedure-fact-label">How To Start</span>
                  <p className="procedure-fact-value">
                    Start with assessment if your diagnosis is still evolving,
                    or choose the procedure family that matches your care plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section procedure-hub-intro-section">
          <div className="section-inner">
            <ProcedurePathwayScroll
              label="Clinic Approach"
              title="A clear path from assessment to targeted care."
              copy="Precision Care Centre uses a multidisciplinary approach to identify the source of pain, match treatment to the diagnosis, and support recovery with practical follow-up guidance."
              steps={hubPathwaySteps}
            />
          </div>
        </section>

        {patientProcedureHubGroups.map((group) => (
          <section
            key={group.title}
            id={group.title
              .toLowerCase()
              .replaceAll(" ", "-")
              .replaceAll("&", "and")}
            className="procedure-section procedure-hub-group-section"
          >
            <div className="section-inner">
              <div className="procedure-group-layout">
                <div className="procedure-group-aside">
                  <div className="section-label">Procedure Group</div>
                  <h2 className="procedure-section-title">{group.title}</h2>
                  <p className="procedure-section-copy">{group.description}</p>
                </div>

                <div className="procedure-card-grid procedure-hub-card-grid">
                  {group.slugs.map((slug, cardIndex) => {
                    const page = patientProcedurePages.find(
                      (entry) => entry.slug === slug
                    )

                    if (!page) {
                      return null
                    }

                    return (
                      <article
                        key={page.slug}
                        className="procedure-card procedure-hub-card"
                        style={{ "--stagger": cardIndex } as CSSProperties}
                      >
                        <div className="procedure-card-topline">
                          <span className="procedure-card-index">
                            {String(cardIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="procedure-card-eyebrow">
                            {page.eyebrow}
                          </span>
                        </div>
                        <h3 className="procedure-card-title">{page.title}</h3>
                        <p className="procedure-card-copy">
                          {page.cardSummary}
                        </p>
                        <ul className="procedure-card-list">
                          {page.cardHighlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                        <Link
                          href={getPatientProcedureHref(page.slug)}
                          className="procedure-card-link"
                        >
                          <span>View Procedure Details</span>
                        </Link>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="procedure-section procedure-section-muted">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">What Patients Can Expect</div>
              <h2 className="procedure-section-title">
                What patients can expect across procedures.
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
                Symptoms that need prompt medical attention.
              </h2>
              <p className="procedure-section-copy">
                Procedure-specific aftercare may vary. Contact the clinic or
                seek urgent care if you develop concerning symptoms after an
                injection or procedure.
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
