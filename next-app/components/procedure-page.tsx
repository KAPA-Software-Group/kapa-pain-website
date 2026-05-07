import Image from "next/image"
import Link from "next/link"
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
    <div className="service-image-placeholder compact">
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
        <span>{visual.label}</span>
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

      <main className="page-shell procedure-shell">
        <ProcedureSideNav items={sideNavItems} />

        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <h1 className="inner-hero-title">{page.title}</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                {page.description}
              </p>
              <div className="procedure-hero-actions">
                <a href="tel:2897529388" className="btn-primary">
                  Call to Discuss Treatment
                </a>
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
            <div className="section-inner">
              <ProcedureQuickFactsCarousel facts={page.quickFacts} />
            </div>
          </section>
        ) : null}

        <section id="overview" className="procedure-section">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">Overview</div>
              <h2 className="procedure-section-title">
                Clear information before the visit.
              </h2>
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
            <div className="section-inner">
              <div className="procedure-section-header">
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
          <div className="section-inner procedure-cta-grid">
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
            <div className="section-inner">
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
