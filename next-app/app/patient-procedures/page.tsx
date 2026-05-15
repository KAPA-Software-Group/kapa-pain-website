import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { PatientProcedureCenteringStyles } from "@/components/procedure-page"
import { PatientProcedureReveal } from "@/components/patient-procedure-reveal"
import { ProcedurePathwayScroll } from "@/components/procedure-pathway-scroll"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import assessmentImage from "@/public/media/Patient Procedures/AssessmentImage.png"
import followUpImage from "@/public/media/Patient Procedures/FollowUpImage.png"
import igpImage from "@/public/media/Patient Procedures/IGPImage.png"
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
    imageSrc: assessmentImage,
    imageAlt: "Clinician reviewing a patient assessment",
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
    imageSrc: igpImage,
    imageAlt: "Image-guided procedure planning",
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
    imageSrc: followUpImage,
    imageAlt: "Patient follow-up and recovery discussion",
    accent: "#7c815e",
  },
]

export const metadata: Metadata = {
  title: "Patient Procedures | Precision Pain Centre",
  description:
    "Explore patient procedure information from Precision Care Centre, including nerve procedures, epidural injections, joint injections, SGB, and chronic pain assessment.",
}

const patientProceduresPageStyles = `
  .patient-procedures-reveal-root .procedure-group-aside {
    position: static;
  }

  .patient-procedures-reveal-root .procedure-hub-card {
    animation: none;
  }

  .patient-procedures-reveal-root .procedure-hub-card-grid,
  .patient-procedures-reveal-root .procedure-hub-card-grid[data-card-count="1"],
  .patient-procedures-reveal-root .procedure-hub-card-grid[data-card-count="3"],
  .patient-procedures-reveal-root .procedure-hub-card-grid[data-card-count="4"] {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }

  .patient-procedures-reveal-root .procedure-hub-card-grid[data-card-count="3"] .procedure-card-topline,
  .patient-procedures-reveal-root .procedure-hub-card-grid[data-card-count="4"] .procedure-card-topline {
    align-items: center;
    flex-direction: row;
  }

  .patient-procedures-reveal-root .procedure-hub-card-grid[data-card-count="3"] .procedure-card-title,
  .patient-procedures-reveal-root .procedure-hub-card-grid[data-card-count="4"] .procedure-card-title {
    hyphens: manual;
  }

  .patient-procedures-reveal-root .procedure-hub-card {
    min-height: 0;
  }

  .patient-procedures-reveal-root .procedure-hub-card-link {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .patient-procedures-reveal-root .procedure-hub-card-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    width: fit-content;
    font-family: var(--f-sans);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--clay-dark);
    pointer-events: none;
    transition: gap 0.42s var(--ease);
  }

  .patient-procedures-reveal-root .procedure-hub-card-cta::after {
    content: "";
    width: 34px;
    height: 1px;
    background: rgba(159, 118, 87, 0.58);
    transition:
      width 0.52s var(--ease),
      background 0.3s ease;
  }

  .patient-procedures-reveal-root .procedure-hub-card-link:hover .procedure-hub-card-cta,
  .patient-procedures-reveal-root .procedure-hub-card-link:focus-visible .procedure-hub-card-cta {
    gap: 16px;
  }

  .patient-procedures-reveal-root .procedure-hub-card-link:hover .procedure-hub-card-cta::after,
  .patient-procedures-reveal-root .procedure-hub-card-link:focus-visible .procedure-hub-card-cta::after {
    width: 96px;
    background: var(--clay-dark);
  }

  .patient-procedures-reveal-root .procedure-hub-card-link:focus-visible {
    outline: 2px solid rgba(159, 118, 87, 0.58);
    outline-offset: 4px;
  }

  .patient-procedures-reveal-root.is-reveal-enabled [data-patient-procedures-reveal] {
    opacity: 0;
    transform: translate3d(0, 32px, 0);
    transition:
      opacity 780ms var(--ease),
      transform 780ms var(--ease),
      border-color 280ms ease,
      box-shadow 280ms ease;
    will-change: opacity, transform;
  }

  .patient-procedures-reveal-root.is-reveal-enabled [data-patient-procedures-reveal].is-loaded {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    will-change: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .patient-procedures-reveal-root.is-reveal-enabled [data-patient-procedures-reveal],
    .patient-procedures-reveal-root.is-reveal-enabled [data-patient-procedures-reveal].is-loaded {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`

export default function PatientProceduresPage() {
  return (
    <>
      <SiteHeader overlay />
      <PatientProcedureCenteringStyles />
      <style>{patientProceduresPageStyles}</style>
      <PatientProcedureReveal
        rootSelector="[data-patient-procedures-reveal-root]"
        itemSelector="[data-patient-procedures-reveal]"
      />

      <main
        className="page-shell procedure-shell patient-procedure-shell patient-procedures-reveal-root hero-drawer-reveal"
        data-patient-procedures-reveal-root
      >
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Patient Procedures</div>
              <h1 className="inner-hero-title">Patient Procedures</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Patient-friendly information about chronic pain assessment,
                image-guided procedures, recovery expectations, and when to
                contact the clinic.
              </p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
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
              <div
                className="procedure-group-layout"
                data-card-count={group.slugs.length}
                data-patient-procedures-reveal="group"
              >
                <div className="procedure-group-aside">
                  <div className="section-label">Procedure Group</div>
                  <h2 className="procedure-section-title">{group.title}</h2>
                  <p className="procedure-section-copy">{group.description}</p>
                </div>

                <div
                  className="procedure-card-grid procedure-hub-card-grid"
                  data-card-count={group.slugs.length}
                >
                  {group.slugs.map((slug, cardIndex) => {
                    const page = patientProcedurePages.find(
                      (entry) => entry.slug === slug
                    )

                    if (!page) {
                      return null
                    }

                    return (
                      <Link
                        key={page.slug}
                        href={getPatientProcedureHref(page.slug)}
                        className="procedure-card procedure-hub-card procedure-hub-card-link"
                        style={{ "--stagger": cardIndex } as CSSProperties}
                      >
                        <div className="procedure-card-topline">
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
                        <span className="procedure-hub-card-cta">
                          <span>View Procedure Details</span>
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="procedure-section procedure-section-muted">
          <div
            className="section-inner"
            data-patient-procedures-reveal="expectations"
          >
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
          <div
            className="section-inner"
            data-patient-procedures-reveal="safety"
          >
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
          <div
            className="section-inner procedure-cta-grid"
            data-patient-procedures-reveal="cta"
          >
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
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
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
