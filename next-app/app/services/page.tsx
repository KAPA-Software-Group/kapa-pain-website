import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ServicesHeroBackground } from "@/components/ui/background-snippets"
import {
  getPatientProcedureHref,
  patientProcedureHubGroups,
  patientProcedurePages,
} from "@/lib/patient-procedures"

export const metadata: Metadata = {
  title: "Services | Precision Care Centre",
  description:
    "Precision Care Centre offers image-guided procedures, landmark injections, medication management, and fluoroscopy-assisted treatments for chronic pain.",
}

const SERVICES = [
  {
    href: "/services/image-guided-procedures",
    eyebrow: "Precision Targeting",
    title: "Image-Guided Procedures",
    summary:
      "We offer fluoroscopic-guided and ultrasound-guided injections to locate the injection site with the utmost accuracy. With a correct injection, physicians can make a more accurate diagnosis, better understand where the pain originates, and help alleviate pain.",
    highlights: [
      "Fluoroscopic-guided injections",
      "Ultrasound-guided injections",
      "More accurate diagnosis",
      "Precise pain-source targeting",
    ],
    visual: "Guided injection image",
    imageSrc: "/procedure-images/guidedInjection.png",
    imageAlt: "Image-guided injection procedure",
  },
  {
    href: "/services/landmark-injections",
    eyebrow: "Anatomy-Based Care",
    title: "Landmark Injections",
    summary:
      "Landmark injections use anatomical landmarks and careful physical assessment to target accessible painful muscles, tendons, and soft tissue concerns.",
    highlights: [
      "Anatomy-based targeting",
      "Muscle and soft tissue care",
      "Physical assessment guided",
      "Targeted pain relief",
    ],
    visual: "Landmark injection image",
    imageSrc: "/procedure-images/guidedInjection.png",
    imageAlt: "Landmark injection treatment",
  },
  {
    href: "/services/medication-management",
    eyebrow: "Ongoing Care",
    title: "Medication Management",
    summary:
      "Medication management ensures you are given the right medication and medication combinations to adequately control and reduce pain to achieve therapeutic outcomes. This process includes initial and ongoing medication review.",
    highlights: [
      "Initial medication review",
      "Ongoing medication review",
      "Therapeutic outcome planning",
      "Risk-aware pain control",
    ],
    visual: "Medication review image",
    imageSrc: "/procedure-images/medicationManagement.png",
    imageAlt: "Medication management consultation",
  },
  {
    href: "/services/regenerative-sports-therapy",
    eyebrow: "Sports Recovery",
    title: "Regenerative & Sports Therapy",
    summary:
      "Regenerative and sports therapy supports recovery from musculoskeletal injuries and disorders affecting ligaments, cartilage, tendons, muscle, bone, joints, and chronic degenerative pain.",
    highlights: [
      "PRP and regenerative therapies",
      "Sports medicine recovery",
      "Tendon, ligament, and cartilage concerns",
      "Return-to-function planning",
    ],
    visual: "Regenerative therapy image",
    imageSrc: "/procedure-images/regenerativeSports.png",
    imageAlt: "Regenerative sports therapy treatment",
  },
  {
    href: "/services/fluoroscopy",
    eyebrow: "Imaging Guidance",
    title: "Fluoroscopy",
    summary:
      "We offer fluoroscopy-guided injections to provide real-time imaging and locate the injection site with a high level of accuracy. This allows physicians to place medication more precisely, improve diagnosis, and help relieve pain in areas such as the spine, hip, knee, and shoulder.",
    highlights: [
      "Real-time imaging",
      "Precise medication placement",
      "Spine, hip, knee, and shoulder care",
      "Improved diagnostic clarity",
    ],
    visual: "Fluoroscopy image",
    imageSrc: "/procedure-images/fluoroscopy.png",
    imageAlt: "Fluoroscopy-guided procedure",
  },
]

const assessmentPlanningGroup = patientProcedureHubGroups.find(
  (group) => group.title === "Assessment & Planning"
)

export default function ServicesPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell procedure-shell hero-drawer-reveal">
        <section className="inner-hero procedure-hero">
          <ServicesHeroBackground />
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
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
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section procedure-hub-group-section services-list-section">
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
              className="services-list-grid"
              data-card-count={SERVICES.length}
            >
              {SERVICES.map((service, i) => (
                <article
                  key={service.href}
                  id={service.href.split("/").pop()}
                  className="services-list-card"
                  style={{ "--stagger": i } as CSSProperties}
                >
                  <div
                    className="service-overview-visual"
                    data-has-image="true"
                    aria-label={service.imageAlt}
                  >
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 25vw"
                      className="service-overview-image"
                    />
                    <span>{service.visual}</span>
                  </div>
                  <div className="services-list-card-content">
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
                  </div>
                </article>
              ))}
            </div>

            {assessmentPlanningGroup ? (
              <div
                className="procedure-group-layout services-assessment-planning"
                data-card-count={assessmentPlanningGroup.slugs.length}
              >
                <div className="procedure-group-aside">
                  <h2 className="procedure-section-title">
                    {assessmentPlanningGroup.title}
                  </h2>
                  <p className="procedure-section-copy">
                    {assessmentPlanningGroup.description}
                  </p>
                </div>

                <div
                  className="procedure-card-grid procedure-hub-card-grid"
                  data-card-count={assessmentPlanningGroup.slugs.length}
                >
                  {assessmentPlanningGroup.slugs.map((slug, cardIndex) => {
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
            ) : null}
          </div>
        </section>

        <section className="procedure-cta-section services-cta-section">
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
