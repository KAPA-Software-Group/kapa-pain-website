import type { Metadata } from "next"
import Link from "next/link"

import { HushmailReferralForm } from "@/components/hushmail-referral-form"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Referrals | Precision Pain Centre",
  description:
    "Refer a patient to Precision Care Centre through our secure Hushmail referral form.",
}

const contactDetails = [
  { label: "Phone", value: "289-752-9388", href: "tel:2897529388" },
  { label: "Fax", value: "289-800-9399", href: null },
] as const

const referralSteps = [
  {
    title: "Complete the secure referral form",
    copy: "Submit the referral through the Hushmail form on this page. The form is hosted by Hushmail and submits directly through their secure form system. FOH EXEMPT",
  },
  {
    title: "Attach relevant imaging",
    copy: "Please attach all relevant imaging and documents at the bottom of the secure form. PDF and JPG files are accepted by the referral template.",
  },
  {
    title: "Clinic review and follow-up",
    copy: "The clinic team reviews submitted referrals and follows up with the referring office or patient as appropriate.",
  },
] as const

const referralsPageStyles = `
  .referrals-page-scope .section-inner {
    max-width: 1240px;
  }

  .referrals-overview-section {
    background: var(--vanilla);
  }

  .referrals-form-first-section {
    background: rgba(229, 222, 211, 0.36);
    border-top: 1px solid var(--hairline);
  }

  .referrals-intro-grid {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(36px, 6vw, 76px);
    align-items: start;
  }

  .referrals-intro-panel {
    display: grid;
    gap: 26px;
    padding: clamp(26px, 4vw, 40px);
    border: 1px solid var(--hairline);
    border-radius: 8px;
    background: rgba(246, 239, 227, 0.78);
    box-shadow: 0 24px 60px rgba(31, 29, 26, 0.06);
  }

  .referrals-intro-copy,
  .referrals-contact-copy,
  .referral-form-copy,
  .referral-security-note {
    margin: 0;
    font-family: var(--f-sans);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.85;
    color: var(--mahogany);
    opacity: 0.72;
  }

  .referrals-contact-card {
    display: grid;
    gap: 18px;
    padding-top: 24px;
    border-top: 1px solid var(--hairline);
  }

  .referrals-card-label,
  .referral-card-label {
    font-family: var(--f-sans);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--clay-dark);
  }

  .referrals-contact-list {
    display: grid;
    gap: 12px;
    margin: 0;
  }

  .referrals-contact-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(62, 57, 51, 0.1);
  }

  .referrals-contact-row:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .referrals-contact-row dt {
    font-family: var(--f-sans);
    font-size: 12px;
    font-weight: 600;
    color: var(--mahogany);
  }

  .referrals-contact-row dd {
    margin: 0;
    font-family: var(--f-sans);
    font-size: 15px;
    font-weight: 400;
    color: var(--mahogany);
  }

  .referrals-contact-row a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid rgba(62, 57, 51, 0.24);
  }

  .referrals-process-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    margin: clamp(44px, 6vw, 72px) 0 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--hairline);
    border-radius: 8px;
    background: rgba(246, 239, 227, 0.66);
    overflow: hidden;
  }

  .referrals-process-step {
    display: grid;
    gap: 22px;
    min-height: 280px;
    padding: clamp(28px, 4vw, 42px);
    border-right: 1px solid var(--hairline);
  }

  .referrals-process-step:last-child {
    border-right: 0;
  }

  .referrals-process-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(159, 118, 87, 0.32);
    border-radius: 50%;
    font-family: var(--f-serif);
    font-size: 20px;
    font-style: italic;
    font-weight: 300;
    color: var(--clay-dark);
  }

  .referrals-process-title {
    margin: 0;
    font-family: var(--f-serif);
    font-size: 2rem;
    font-style: italic;
    font-weight: 300;
    line-height: 1.12;
    color: var(--mahogany);
  }

  .referrals-process-copy {
    margin: 0;
    font-family: var(--f-sans);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.8;
    color: var(--mahogany);
    opacity: 0.68;
  }

  .referral-form-section {
    background: rgba(229, 222, 211, 0.36);
    border-top: 1px solid var(--hairline);
  }

  .referral-form-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    border: 1px solid var(--hairline);
    border-radius: 8px;
    background: rgba(246, 239, 227, 0.8);
    box-shadow: 0 28px 80px rgba(31, 29, 26, 0.08);
    overflow: hidden;
  }

  .referral-form-context,
  .referral-form-panel {
    padding: clamp(30px, 5vw, 56px);
  }

  .referral-form-context {
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(260px, 0.48fr);
    gap: 42px;
    align-items: end;
    border-bottom: 1px solid var(--hairline);
    background: rgba(246, 239, 227, 0.58);
  }

  .referral-form-heading {
    margin: 0 0 18px;
    font-family: var(--f-serif);
    font-size: 2.5rem;
    font-style: italic;
    font-weight: 300;
    line-height: 1.08;
    color: var(--mahogany);
  }

  .referral-security-card {
    display: grid;
    gap: 14px;
    padding-top: 28px;
    border-top: 1px solid var(--hairline);
  }

  .referral-form-panel {
    background: rgba(246, 239, 227, 0.92);
  }

  .referrals-form-first-section .referral-form-layout {
    grid-template-columns: 1fr;
  }

  .referrals-form-first-section .section-inner {
    max-width: 1440px;
  }

  .referrals-form-first-section .referral-form-panel {
    padding: clamp(18px, 3vw, 34px);
  }

  .referral-embed {
    display: grid;
    gap: 16px;
  }

  .referral-embed-loading {
    border: 1px solid rgba(159, 118, 87, 0.24);
    border-radius: 8px;
    background: rgba(246, 239, 227, 0.78);
    padding: 16px 18px;
    font-family: var(--f-sans);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.65;
    color: var(--mahogany);
  }

  .referral-embed-frame {
    min-height: 1040px;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid rgba(62, 57, 51, 0.12);
    border-radius: 8px;
    background: rgba(255, 252, 247, 0.62);
    padding: clamp(18px, 3vw, 40px);
    box-shadow: 0 14px 36px rgba(31, 29, 26, 0.05);
  }

  .referral-embed-frame iframe {
    width: 100%;
    min-height: 1040px;
    border: 0;
    background: transparent;
  }

  @media (max-width: 1024px) {
    .referrals-intro-grid,
    .referral-form-layout {
      grid-template-columns: 1fr;
    }

    .referral-form-context {
      grid-template-columns: 1fr;
      border-bottom: 1px solid var(--hairline);
    }

    .referrals-process-list {
      grid-template-columns: 1fr;
    }

    .referrals-process-step {
      min-height: auto;
      border-right: 0;
      border-bottom: 1px solid var(--hairline);
    }

    .referrals-process-step:last-child {
      border-bottom: 0;
    }
  }

  @media (max-width: 768px) {
    .referrals-intro-panel,
    .referral-form-context,
    .referral-form-panel {
      padding: 24px;
    }

    .referral-form-heading {
      font-size: 2rem;
    }

    .referrals-process-title {
      font-size: 1.75rem;
    }

    .referral-embed-frame,
    .referral-embed-frame iframe {
      min-height: 900px;
    }

  }

  @media (max-width: 480px) {
    .referrals-intro-panel,
    .referral-form-context,
    .referral-form-panel {
      padding: 20px;
    }

    .referrals-contact-row {
      align-items: flex-start;
      flex-direction: column;
      gap: 6px;
    }

    .referrals-process-step {
      padding: 24px 20px;
    }

    .referral-embed-frame {
      min-height: 780px;
      padding: 12px;
    }

    .referral-embed-frame iframe {
      min-height: 780px;
    }
  }
`

export default function ReferralsPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell referrals-page-scope hero-drawer-reveal">
        <style>{referralsPageStyles}</style>

        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <h1 className="inner-hero-title">Refer a Patient</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Physicians and healthcare providers can securely submit patient
                referrals to Precision Care Centre through our Hushmail referral
                portal. The secure form is embedded directly on this page.
              </p>
              <p className="inner-hero-copy procedure-hero-copy">FOH EXEMPT</p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-ghost">
                  Contact the Clinic
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-section referrals-overview-section">
          <div className="section-inner">
            <div className="referrals-intro-grid">
              <div>
                <div className="section-label">Patient Referral</div>
                <h2 className="procedure-section-title">
                  Secure referral intake for pain care, orthopaedic
                  consultation, and image-guided procedures.
                </h2>
              </div>

              <aside className="referrals-intro-panel">
                <p className="referrals-intro-copy">
                  Please complete the secure Hushmail form below and attach all
                  relevant imaging at the bottom of the form.
                </p>

                <div className="referrals-contact-card">
                  <span className="referrals-card-label">Contact Info</span>
                  <dl className="referrals-contact-list">
                    {contactDetails.map((detail) => (
                      <div className="referrals-contact-row" key={detail.label}>
                        <dt>{detail.label}</dt>
                        <dd>
                          {detail.href ? (
                            <a href={detail.href}>{detail.value}</a>
                          ) : (
                            detail.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>

            <ol className="referrals-process-list" aria-label="Referral steps">
              {referralSteps.map((step, index) => (
                <li className="referrals-process-step" key={step.title}>
                  <span className="referrals-process-number">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="referrals-process-title">{step.title}</h3>
                    <p className="referrals-process-copy">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="procedure-section referrals-form-first-section"
          aria-labelledby="secure-referral-form"
        >
          <div className="section-inner">
            <div className="referral-form-layout">
              <aside className="referral-form-context">
                <div>
                  <div className="section-label">Secure Submission</div>
                  <h2
                    className="referral-form-heading"
                    id="secure-referral-form"
                  >
                    Complete the referral through the embedded Hushmail form.
                  </h2>
                  <p className="referral-form-copy">
                    Fill out the secure form here on the Precision Care Centre
                    website. The form itself is loaded from Hushmail and submits
                    directly through Hushmail&apos;s own infrastructure.
                  </p>
                </div>

                <div className="referral-security-card">
                  <span className="referral-card-label">Security Note</span>
                  <p className="referral-security-note">
                    Referral information is sensitive health information. This
                    page displays the Hushmail-hosted secure form only; it does
                    not collect, log, validate, store, or route referral data
                    through Precision Care Centre&apos;s frontend, backend,
                    analytics tools, or browser storage.
                  </p>
                </div>
              </aside>

              <div className="referral-form-panel">
                <HushmailReferralForm />
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Referral Support</div>
              <h2 className="procedure-cta-title">
                Difficulty submitting the form?
              </h2>
              <p className="procedure-cta-copy">
                If the secure form does not load or you need assistance with a
                referral, please contact the clinic directly during regular
                hours.
              </p>
            </div>

            <div className="procedure-cta-panel">
              <div className="procedure-cta-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
