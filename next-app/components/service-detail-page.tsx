import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

type ServiceVisual = {
  label: string
  title: string
  copy: string
}

type ServiceFeatureSection = {
  id: string
  eyebrow: string
  title: string
  paragraphs?: ReactNode[]
  bullets?: string[]
  bulletLabel?: string
  visual?: ServiceVisual
  tone?: "muted" | "alert"
}

type ServiceFaq = {
  question: string
  paragraphs?: ReactNode[]
  bullets?: string[]
}

export type ServiceDetailPageData = {
  eyebrow?: string
  title: string
  heroLabel?: string
  intro: ReactNode[]
  heroVisual: ServiceVisual
  quickFacts: {
    label: string
    value: string
  }[]
  sections: ServiceFeatureSection[]
  faqs: ServiceFaq[]
}

export function ServiceDetailPage({ page }: { page: ServiceDetailPageData }) {
  return (
    <>
      <SiteHeader overlay />
      <style>
        {`
          @keyframes faq-rise {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .faq-motion-row {
            animation: faq-rise 620ms ease-out both;
            animation-delay: var(--faq-delay, 70ms);
            interpolate-size: allow-keywords;
            will-change: opacity, transform;
          }

          .faq-motion-row::details-content {
            block-size: 0;
            overflow: hidden;
            transition:
              block-size 680ms var(--ease),
              content-visibility 680ms allow-discrete;
          }

          .faq-motion-row[open]::details-content {
            block-size: auto;
          }

          @keyframes faq-answer-reveal {
            from {
              opacity: 0;
              transform: translateY(-14px) scale(0.985);
              filter: blur(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes faq-answer-wash {
            from {
              opacity: 0;
              transform: scaleX(0.84);
            }
            to {
              opacity: 1;
              transform: scaleX(1);
            }
          }

          details[open] .faq-answer-inner {
            animation: faq-answer-reveal 520ms var(--ease) both;
          }

          details[open] .faq-answer-anchor {
            animation: faq-answer-wash 560ms var(--ease) both;
            transform-origin: left center;
          }

          @media (prefers-reduced-motion: reduce) {
            .faq-motion-row {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              will-change: auto !important;
            }

            details[open] .faq-answer-inner,
            details[open] .faq-answer-anchor {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          }
        `}
      </style>

      <main className="page-shell procedure-shell service-detail-shell">
        <section className="inner-hero procedure-hero service-detail-hero">
          <div className="section-inner procedure-hero-content">
            <div className="service-hero-grid">
              <div className="service-hero-copy-block">
                <div className="section-label">
                  {page.heroLabel ?? "Services"}
                </div>
                {page.eyebrow ? (
                  <p className="service-hero-eyebrow">{page.eyebrow}</p>
                ) : null}
                <h1 className="inner-hero-title">{page.title}</h1>
                <div className="service-hero-intro">
                  {page.intro.map((paragraph, index) => (
                    <p
                      key={index}
                      className="inner-hero-copy procedure-hero-copy"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="procedure-hero-actions">
                  <Link href="/contact-us" className="btn-primary">
                    Contact the Clinic
                  </Link>
                  <Link href="/services" className="btn-ghost">
                    Back to Services
                  </Link>
                </div>
              </div>

              <div
                className="service-hero-panel"
                aria-label="Image placeholder"
              >
                <ServiceImagePlaceholder visual={page.heroVisual} />
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-nav-strip service-nav-strip">
          <div className="section-inner procedure-nav-inner">
            <nav className="procedure-jump-nav" aria-label="Section navigation">
              {page.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="procedure-jump-link"
                >
                  {section.eyebrow}
                </a>
              ))}
              <a href="#faq" className="procedure-jump-link">
                FAQ
              </a>
            </nav>
          </div>
        </section>

        <section className="procedure-section service-facts-section">
          <div className="section-inner">
            <div className="service-facts-grid">
              {page.quickFacts.map((fact) => (
                <div key={fact.label} className="service-fact-tile">
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {page.sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={[
              "procedure-section",
              "service-content-section",
              section.tone ? `procedure-section-${section.tone}` : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="section-inner">
              <div
                className="service-content-grid"
                data-media-side={index % 2 === 0 ? "right" : "left"}
              >
                <div className="service-content-copy">
                  <div className="section-label">{section.eyebrow}</div>
                  <h2 className="procedure-section-title">{section.title}</h2>
                  {section.paragraphs ? (
                    <div className="service-copy-stack">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="procedure-paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {section.bullets ? (
                    <div className="service-bullet-panel">
                      {section.bulletLabel ? (
                        <p className="service-bullet-label">
                          {section.bulletLabel}
                        </p>
                      ) : null}
                      <ul className="procedure-bullet-list service-bullet-grid">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {section.visual ? (
                  <div className="service-content-media">
                    <ServiceImagePlaceholder visual={section.visual} compact />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}

        <section id="faq" className="procedure-section procedure-section-muted">
          <div className="section-inner">
            <div className="procedure-section-header">
              <div className="section-label">Frequently Asked Questions</div>
              <h2 className="procedure-section-title">
                Answers before your appointment.
              </h2>
              <p className="procedure-section-copy">
                Have more questions? Contact us at info@precisioncare.ca.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {page.faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="faq-motion-row group relative overflow-hidden rounded-[8px] border border-[color:var(--hairline)] bg-[linear-gradient(135deg,rgba(246,239,227,0.92),rgba(229,222,211,0.5))] opacity-0 shadow-[0_20px_48px_rgba(31,29,26,0.04)] transition-[background,border-color,box-shadow,transform] duration-500 ease-out open:border-[rgba(159,118,87,0.34)] open:bg-[linear-gradient(135deg,var(--surface-strong),rgba(216,203,187,0.34))] open:shadow-[0_30px_72px_rgba(31,29,26,0.08)] hover:-translate-y-[3px] hover:border-[rgba(159,118,87,0.34)] hover:bg-[linear-gradient(135deg,var(--surface-strong),rgba(216,203,187,0.28))] hover:shadow-[0_30px_72px_rgba(31,29,26,0.08)]"
                  style={
                    {
                      "--faq-delay": `${(index + 1) * 70}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[color:var(--clay)] opacity-45 transition-all duration-500 group-open:w-2 group-open:opacity-80" />
                  <summary className="relative flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left font-sans text-[15px] leading-6 font-medium text-[color:var(--mahogany)] transition-colors duration-300 marker:hidden hover:bg-[rgba(216,203,187,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--clay)] sm:px-6 sm:text-[17px] [&::-webkit-details-marker]:hidden">
                    <span className="transition-colors duration-300 group-open:text-[color:var(--clay-dark)] group-hover:text-[color:var(--ink)]">
                      {faq.question}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(246,239,227,0.78)] text-[color:var(--clay-dark)] shadow-[0_8px_18px_rgba(31,29,26,0.08)] transition-[background-color,color,transform] duration-300 ease-out group-open:bg-[color:var(--clay)] group-open:text-[color:var(--vanilla)]">
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 ease-out group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="m6 9 6 6 6-6"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="max-h-0 overflow-hidden border-t border-transparent transition-[max-height,border-color] duration-700 ease-out group-open:max-h-[40rem] group-open:border-[color:var(--hairline)]">
                    <div className="min-h-0 overflow-hidden">
                      <div className="faq-answer-inner px-5 pt-5 pb-6 font-sans text-[14px] leading-7 font-light text-[rgba(62,57,51,0.72)] opacity-0 sm:px-6 sm:text-[15px] [&_a]:font-medium [&_a]:text-[color:var(--clay-dark)] [&_a]:underline-offset-4 [&_a:hover]:underline [&_li+li]:mt-2 [&_li::marker]:text-[color:var(--clay-dark)] [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul+p]:mt-4">
                        <div className="faq-answer-anchor mb-4 h-px w-full bg-[linear-gradient(90deg,var(--clay),transparent)] opacity-0" />
                        {faq.paragraphs?.map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}
                        {faq.bullets ? (
                          <ul>
                            {faq.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Next Step</div>
              <h2 className="procedure-cta-title">
                Discuss whether {page.title.toLowerCase()} fits your care plan.
              </h2>
              <p className="procedure-cta-copy">
                Call the clinic or send a message and we can help direct you to
                the most appropriate service for your situation.
              </p>
            </div>

            <div className="procedure-cta-panel">
              <div className="procedure-cta-actions">
                <a href="tel:2897529388" className="btn-primary">
                  Call the Clinic
                </a>
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

function ServiceImagePlaceholder({
  visual,
  compact = false,
}: {
  visual: ServiceVisual
  compact?: boolean
}) {
  return (
    <div
      className={
        compact
          ? "service-image-placeholder compact"
          : "service-image-placeholder"
      }
    >
      <div className="service-image-grid" />
      <div className="service-image-scan" />
      <div className="service-image-marker service-image-marker-primary" />
      <div className="service-image-marker service-image-marker-secondary" />
      <div className="service-image-copy">
        <span>{visual.label}</span>
        <strong>{visual.title}</strong>
        <p>{visual.copy}</p>
      </div>
    </div>
  )
}
