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
    copy: "Submit the referral through the Hushmail form on this page. The form is hosted by Hushmail and submits directly through their secure form system.",
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

const locationChoices = ["Brampton", "Hamilton", "Guelph", "Toronto"] as const

const intakeDetails = [
  {
    title: "Initial referral details",
    items: [
      "Date of referral",
      "Location choice",
      "FHO / FHT / FHN membership status",
      "Please note all our physicians have FHO exemption",
    ],
  },
  {
    title: "Referring physician information",
    items: [
      "Physician name",
      "Billing number",
      "Office phone",
      "Office fax",
      "Clinic address",
    ],
  },
  {
    title: "Patient information",
    items: [
      "Full name",
      "Date of birth",
      "Health Card # (VC)",
      "Home address",
      "Primary phone",
      "Email address",
    ],
  },
  {
    title: "Clinical details and documents",
    items: [
      "Clinical comments / observations",
      "Additional clinical history",
      "Specific diagnostic questions",
      "Relevant imaging and documents",
    ],
  },
] as const

const referralGroups = [
  {
    title: "Pain Consultation",
    options: [
      "Lower back pain / sciatica",
      "Neck pain with upper extremity pain",
      "Fibromyalgia",
      "Headache / migraine",
      "Shoulder, knee, or hip joint pain",
      "Opioid management",
      "Other",
    ],
  },
  {
    title: "Orthopaedic Consultation",
    options: [
      "Upper extremity",
      "Lower extremity",
      "Back pain",
      "Neck pain",
      "Joint replacement",
      "Other",
    ],
  },
  {
    title: "Image Guided Injections",
    options: [
      "Cortisone injections",
      "HA injections",
      "PRP",
      "Radiofrequency ablation: joints",
      "Radiofrequency ablation: cervical, thoracic, or lumbar",
      "Epidural steroid injections: cervical, thoracic, or lumbar",
      "Facet joint injections: cervical, thoracic, or lumbar",
      "Piriformis injection / decompression",
      "Intercostal nerves",
      "Other",
    ],
  },
] as const

const procedureDetailNote =
  "For joint, side, area, level, or 'Other' details, please include the specifics in the clinical comments area of the secure Hushmail form."

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
  .referral-security-note,
  .referral-help-copy,
  .referrals-detail-note {
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
  .referral-card-label,
  .referrals-chip-label {
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

  .referrals-process-title,
  .referrals-detail-title,
  .referrals-group-title {
    margin: 0;
    font-family: var(--f-serif);
    font-size: 2rem;
    font-style: italic;
    font-weight: 300;
    line-height: 1.12;
    color: var(--mahogany);
  }

  .referrals-process-copy,
  .referrals-detail-list,
  .referrals-group-list {
    margin: 0;
    font-family: var(--f-sans);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.8;
    color: var(--mahogany);
    opacity: 0.68;
  }

  .referrals-prep-section {
    background: rgba(229, 222, 211, 0.3);
    border-top: 1px solid var(--hairline);
  }

  .referrals-prep-header {
    display: grid;
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
    gap: clamp(32px, 6vw, 74px);
    align-items: end;
    margin-bottom: clamp(38px, 6vw, 62px);
  }

  .referrals-location-card {
    display: grid;
    gap: 20px;
    padding: 24px;
    border: 1px solid var(--hairline);
    border-radius: 8px;
    background: rgba(246, 239, 227, 0.66);
  }

  .referrals-location-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .referrals-location-list li,
  .referrals-group-chip {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    border: 1px solid rgba(159, 118, 87, 0.26);
    border-radius: 999px;
    padding: 8px 14px;
    font-family: var(--f-sans);
    font-size: 12px;
    font-weight: 400;
    color: var(--mahogany);
    background: rgba(246, 239, 227, 0.7);
  }

  .referrals-detail-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
    border: 1px solid var(--hairline);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(246, 239, 227, 0.72);
  }

  .referrals-detail-card {
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-height: 320px;
    padding: clamp(24px, 3vw, 34px);
    border-right: 1px solid var(--hairline);
  }

  .referrals-detail-card:last-child {
    border-right: 0;
  }

  .referrals-detail-list,
  .referrals-group-list {
    display: grid;
    gap: 10px;
    padding: 0;
    list-style: none;
  }

  .referrals-detail-list li,
  .referrals-group-list li {
    position: relative;
    padding-left: 18px;
  }

  .referrals-detail-list li::before,
  .referrals-group-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.78em;
    width: 6px;
    height: 1px;
    background: var(--clay);
  }

  .referrals-groups-section {
    background: var(--vanilla);
    border-top: 1px solid var(--hairline);
  }

  .referrals-group-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-top: clamp(34px, 5vw, 56px);
  }

  .referrals-group-card {
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-height: 100%;
    padding: clamp(24px, 3vw, 34px);
    border: 1px solid var(--hairline);
    border-radius: 8px;
    background: rgba(246, 239, 227, 0.68);
    box-shadow: 0 18px 44px rgba(31, 29, 26, 0.045);
  }

  .referrals-group-chip {
    align-self: flex-start;
    border-radius: 8px;
  }

  .referrals-detail-note {
    max-width: 760px;
    margin-top: 28px;
    padding-left: 22px;
    border-left: 3px solid rgba(159, 118, 87, 0.38);
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
    overflow: hidden;
    border: 1px solid rgba(62, 57, 51, 0.12);
    border-radius: 8px;
    background: rgba(255, 252, 247, 0.62);
    box-shadow: 0 14px 36px rgba(31, 29, 26, 0.05);
  }

  .referral-embed-frame iframe {
    width: 100%;
    min-height: 1040px;
    border: 0;
    background: transparent;
  }

  .referral-help-section {
    background: var(--vanilla);
  }

  .referral-help-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    padding: clamp(28px, 4vw, 42px);
    border: 1px solid var(--hairline);
    border-radius: 8px;
    background: rgba(246, 239, 227, 0.72);
  }

  .referral-help-title {
    margin: 0 0 10px;
    font-family: var(--f-serif);
    font-size: 2.125rem;
    font-style: italic;
    font-weight: 300;
    line-height: 1.12;
    color: var(--mahogany);
  }

  @media (max-width: 1180px) {
    .referrals-detail-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .referrals-detail-card:nth-child(2) {
      border-right: 0;
    }

    .referrals-detail-card:nth-child(3),
    .referrals-detail-card:nth-child(4) {
      border-top: 1px solid var(--hairline);
    }
  }

  @media (max-width: 1024px) {
    .referrals-intro-grid,
    .referrals-prep-header,
    .referral-form-layout,
    .referrals-group-grid {
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
    .referrals-location-card,
    .referral-form-context,
    .referral-form-panel,
    .referral-help-panel {
      padding: 24px;
    }

    .referrals-detail-grid {
      grid-template-columns: 1fr;
    }

    .referrals-detail-card,
    .referrals-detail-card:nth-child(2) {
      min-height: auto;
      border-right: 0;
      border-top: 1px solid var(--hairline);
    }

    .referrals-detail-card:first-child {
      border-top: 0;
    }

    .referral-form-heading {
      font-size: 2rem;
    }

    .referrals-process-title,
    .referrals-detail-title,
    .referrals-group-title,
    .referral-help-title {
      font-size: 1.75rem;
    }

    .referral-embed-frame,
    .referral-embed-frame iframe {
      min-height: 900px;
    }

    .referral-help-panel {
      align-items: stretch;
      flex-direction: column;
    }
  }
`

export default function ReferralsPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell referrals-page-scope">
        <style>{referralsPageStyles}</style>

        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Provider Access</div>
              <h1 className="inner-hero-title">Refer a Patient</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Physicians and healthcare providers can securely submit patient
                referrals to Precision Care Centre through our Hushmail referral
                portal. The secure form is embedded directly on this page.
              </p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-ghost">
                  Contact the Clinic
                </Link>
              </div>
            </div>
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
                  relevant imaging at the bottom of the form. The website
                  displays the secure form only; referral data is not processed
                  or stored by this frontend.
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

        <section className="procedure-section referrals-prep-section">
          <div className="section-inner">
            <div className="referrals-prep-header">
              <div>
                <div className="section-label">Before You Begin</div>
                <h2 className="procedure-section-title">
                  Information requested in the secure referral form.
                </h2>
              </div>

              <aside className="referrals-location-card">
                <span className="referrals-chip-label">
                  Available Location Choices
                </span>
                <ul className="referrals-location-list">
                  {locationChoices.map((location) => (
                    <li key={location}>{location}</li>
                  ))}
                </ul>
              </aside>
            </div>

            <div
              className="referrals-detail-grid"
              aria-label="Referral information checklist"
            >
              {intakeDetails.map((section) => (
                <article className="referrals-detail-card" key={section.title}>
                  <h3 className="referrals-detail-title">{section.title}</h3>
                  <ul className="referrals-detail-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="procedure-section referrals-groups-section">
          <div className="section-inner">
            <div className="section-label">Reason For Referral</div>
            <h2 className="procedure-section-title">
              Select the most relevant consultation or procedure category in
              the secure form.
            </h2>

            <div className="referrals-group-grid">
              {referralGroups.map((group) => (
                <article className="referrals-group-card" key={group.title}>
                  <span className="referrals-group-chip">
                    Primary Indication
                  </span>
                  <h3 className="referrals-group-title">{group.title}</h3>
                  <ul className="referrals-group-list">
                    {group.options.map((option) => (
                      <li key={option}>{option}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <p className="referrals-detail-note">{procedureDetailNote}</p>
          </div>
        </section>

        <section className="procedure-section referral-help-section">
          <div className="section-inner">
            <div className="referral-help-panel">
              <div>
                <h2 className="referral-help-title">
                  Difficulty submitting the form?
                </h2>
                <p className="referral-help-copy">
                  If the secure form does not load or you need assistance with a
                  referral, please contact the clinic directly during regular
                  hours.
                </p>
              </div>
              <Link href="/contact-us" className="btn-primary">
                Contact the Clinic
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
