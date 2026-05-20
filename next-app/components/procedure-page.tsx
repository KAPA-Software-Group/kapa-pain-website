import Image from "next/image"
import Link from "next/link"
import { PatientProcedureReveal } from "@/components/patient-procedure-reveal"
import { ProcedureQuickFactsCarousel } from "@/components/procedure-quick-facts-carousel"
import { ProcedureSideNav } from "@/components/procedure-side-nav"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import {
  type ProcedurePage,
  type ProcedureVisual,
  getPatientProcedureHref,
  patientProcedurePages,
} from "@/lib/patient-procedures"

function ProcedureImagePlaceholder({ visual }: { visual: ProcedureVisual }) {
  return (
    <div
      className={`service-image-placeholder compact${
        visual.imageSrc ? " has-procedure-image" : ""
      }`}
    >
      {visual.imageSrc ? (
        <>
          <Image
            src={visual.imageSrc}
            alt={visual.imageAlt ?? visual.title}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
            className="service-image-photo"
          />
          <div className="service-image-photo-shade" />
        </>
      ) : (
        <>
          <div className="service-image-grid" />
          <div className="service-image-scan" />
          <div className="service-image-marker service-image-marker-primary" />
          <div className="service-image-marker service-image-marker-secondary" />
        </>
      )}
      <div className="service-image-copy">
        <strong>{visual.title}</strong>
        {visual.copy ? <p>{visual.copy}</p> : null}
      </div>
    </div>
  )
}

const toAnchorId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

type ProcedurePageViewProps = {
  page: ProcedurePage
}

export function PatientProcedureCenteringStyles() {
  return (
    <style>{`
      @media (min-width: 1280px) {
        .patient-procedure-shell.procedure-shell .procedure-section .section-inner {
          padding-left: var(--page-gutter);
          max-width: var(--section-max);
        }

        .patient-procedure-shell.procedure-shell .procedure-hub-group-section .section-inner {
          max-width: 1400px;
        }
      }
    `}</style>
  )
}

const patientProcedureDetailRevealStyles = `
  @media (min-width: 1280px) {
    .patient-procedure-detail-reveal-root .procedure-side-nav {
      transform-origin: left center;
      overflow: visible;
      transition:
        transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 320ms ease,
        width 360ms cubic-bezier(0.22, 1, 0.36, 1),
        padding 360ms cubic-bezier(0.22, 1, 0.36, 1),
        background 260ms ease,
        border-color 260ms ease;
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav.is-visible:not(.is-collapsed) {
      transition:
        transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 320ms ease,
        width 360ms cubic-bezier(0.22, 1, 0.36, 1),
        padding 360ms cubic-bezier(0.22, 1, 0.36, 1),
        background 260ms ease,
        border-color 260ms ease;
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav.is-collapsed {
      width: 0;
      padding: 0;
      border-left-color: transparent;
      background: transparent;
      backdrop-filter: none;
      box-shadow: none;
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav.is-collapsed::after {
      opacity: 0;
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav.is-collapsed .procedure-side-nav-body {
      opacity: 0;
      visibility: hidden;
      transform: translate3d(-6px, 0, 0);
      pointer-events: none;
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav .procedure-side-nav-body {
      width: clamp(190px, 15vw, 240px);
      min-width: clamp(190px, 15vw, 240px);
      transition:
        opacity 300ms ease,
        visibility 300ms ease,
        transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav .procedure-side-nav-toggle {
      right: -14px;
      transition:
        background 220ms ease,
        border-color 220ms ease,
        transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav.is-collapsed .procedure-side-nav-toggle {
      right: -14px;
      transform: translateY(-50%);
    }

    .patient-procedure-detail-reveal-root .procedure-side-nav .procedure-side-nav-toggle-arrow {
      transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  .patient-procedure-detail-reveal-root .procedure-section-visual .service-image-placeholder.compact.has-procedure-image {
    overflow: visible;
    border: 0;
    background: transparent;
    box-shadow: none;
    isolation: isolate;
  }

  .patient-procedure-detail-reveal-root .procedure-section-visual .service-image-placeholder.compact.has-procedure-image::before {
    content: "";
    position: absolute;
    inset: 12px -12px -12px 12px;
    z-index: 0;
    border: 1px solid rgba(159, 118, 87, 0.24);
    background: rgba(159, 118, 87, 0.09);
    box-shadow: 0 16px 34px rgba(31, 29, 26, 0.08);
    pointer-events: none;
  }

  .patient-procedure-detail-reveal-root .procedure-section-visual .service-image-photo {
    z-index: 1;
  }

  .patient-procedure-detail-reveal-root .procedure-section-visual .service-image-photo-shade {
    z-index: 2;
  }

  .patient-procedure-detail-reveal-root .procedure-section-visual .service-image-copy {
    z-index: 3;
  }

  .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal] {
    opacity: 1;
    transform: none;
    transition:
      border-color 280ms ease,
      box-shadow 280ms ease;
    will-change: auto;
  }

  .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal] > * {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    transition:
      opacity 700ms var(--ease),
      transform 700ms var(--ease);
    will-change: opacity, transform;
  }

  .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal].is-loaded,
  .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal].is-loaded > * {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    will-change: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal],
    .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal] > *,
    .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal].is-loaded,
    .patient-procedure-detail-reveal-root.is-reveal-enabled [data-patient-procedure-detail-reveal].is-loaded > * {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`

export function ProcedurePageView({ page }: ProcedurePageViewProps) {
  const relatedPages = page.relatedSlugs
    .map((slug) => patientProcedurePages.find((entry) => entry.slug === slug))
    .filter((entry): entry is ProcedurePage => Boolean(entry))

  const sideNavItems = [
    { id: "overview", title: "Overview" },
    ...page.sections.map((section) => ({
      id: toAnchorId(section.title),
      title: section.title,
    })),
  ]

  return (
    <>
      <SiteHeader overlay />

      <PatientProcedureCenteringStyles />
      <style>{patientProcedureDetailRevealStyles}</style>
      <PatientProcedureReveal
        rootSelector="[data-patient-procedure-detail-reveal-root]"
        itemSelector="[data-patient-procedure-detail-reveal]"
      />

      <main
        className="page-shell procedure-shell patient-procedure-shell patient-procedure-detail-reveal-root hero-drawer-reveal"
        data-patient-procedure-detail-reveal-root
      >
        <ProcedureSideNav items={sideNavItems} />

        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <h1 className="inner-hero-title">{page.title}</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                {page.description}
              </p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact Us to Discuss Treatment
                </Link>
                <Link href="/referrals" className="btn-ghost">
                  Referral Information
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-nav-strip">
          <div className="section-inner procedure-nav-inner">
            <nav className="procedure-jump-nav" aria-label="Section navigation">
              <a href="#overview" className="procedure-jump-link">
                Overview
              </a>
              {page.sections.map((section) => (
                <a
                  key={section.title}
                  href={`#${toAnchorId(section.title)}`}
                  className="procedure-jump-link"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {page.quickFacts.length > 0 ? (
          <section className="procedure-facts-strip">
            <div
              className="section-inner"
              data-patient-procedure-detail-reveal="quick-facts"
            >
              <ProcedureQuickFactsCarousel facts={page.quickFacts} />
            </div>
          </section>
        ) : null}

        <section id="overview" className="procedure-section">
          <div
            className="section-inner"
            data-patient-procedure-detail-reveal="overview"
          >
            <div className="procedure-section-header">
              <div className="section-label">Overview</div>
            </div>

            <div className="procedure-detail-intro">
              {page.intro.map((paragraph) => (
                <p key={paragraph} className="procedure-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {page.sections.map((section) => (
          <section
            key={section.title}
            id={toAnchorId(section.title)}
            className={`procedure-section ${
              section.tone ? `procedure-section-${section.tone}` : ""
            }`}
          >
            <div
              className="section-inner"
              data-patient-procedure-detail-reveal="section"
            >
              <div className="procedure-section-header">
                {section.eyebrow ? (
                  <div className="section-label">{section.eyebrow}</div>
                ) : null}
                <h2 className="procedure-section-title">{section.title}</h2>
              </div>

              <div
                className={
                  section.visual ? "procedure-section-with-visual" : undefined
                }
              >
                <div>
                  {section.intro ? (
                    <div className="procedure-intro-grid procedure-section-intro">
                      {section.intro.map((paragraph) => (
                        <p key={paragraph} className="procedure-paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {section.paragraphs ? (
                    <div className="procedure-section-paragraphs">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="procedure-paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {section.cards ? (
                    <div className="procedure-card-grid">
                      {section.cards.map((card) => (
                        <article key={card.title} className="procedure-card">
                          <h3 className="procedure-card-title">{card.title}</h3>
                          <p className="procedure-card-copy">
                            {card.description}
                          </p>
                        </article>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className="procedure-bullet-list">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}

                  {section.infoBox ? (
                    <div className="procedure-info-box">
                      <p className="procedure-info-box-title">
                        {section.infoBox.title}
                      </p>
                      <p className="procedure-info-box-body">
                        {section.infoBox.body}
                      </p>
                    </div>
                  ) : null}
                </div>

                {section.visual ? (
                  <div className="procedure-section-visual">
                    <ProcedureImagePlaceholder visual={section.visual} />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}

        <section className="procedure-cta-section">
          <div
            className="section-inner procedure-cta-grid"
            data-patient-procedure-detail-reveal="cta"
          >
            <div>
              <div className="section-label">Next Step</div>
              <h2 className="procedure-cta-title">
                Discuss whether {page.shortTitle.toLowerCase()} is appropriate.
              </h2>
              <p className="procedure-cta-copy">
                The clinic can review your symptoms, prior treatment, imaging,
                and whether this procedure fits into your care plan.
              </p>
            </div>

            <div className="procedure-cta-panel">
              <div className="procedure-cta-actions">
                <a href="tel:2897529388" className="btn-primary">
                  Call to Discuss This Procedure
                </a>
                <Link href="/referrals" className="btn-ghost">
                  Review Referral Information
                </Link>
              </div>
              <p className="procedure-cta-note">
                If you have a question after a recent procedure, call the clinic
                directly rather than waiting for an online response.
              </p>
            </div>
          </div>
        </section>

        {relatedPages.length > 0 ? (
          <section className="procedure-section procedure-related-section">
            <div
              className="section-inner"
              data-patient-procedure-detail-reveal="related"
            >
              <div className="procedure-section-header">
                <div className="section-label">Related Pages</div>
                <h2 className="procedure-section-title">
                  Explore adjacent treatment pathways.
                </h2>
              </div>

              <div className="procedure-card-grid">
                {relatedPages.map((relatedPage) => (
                  <article key={relatedPage.slug} className="procedure-card">
                    <h3 className="procedure-card-title">
                      {relatedPage.title}
                    </h3>
                    <p className="procedure-card-copy">
                      {relatedPage.cardSummary}
                    </p>
                    <Link
                      href={getPatientProcedureHref(relatedPage.slug)}
                      className="procedure-card-link"
                    >
                      View page
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  )
}
