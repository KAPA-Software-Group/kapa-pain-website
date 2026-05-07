import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Contact Us | Precision Pain Centre",
  description:
    "Get in touch with Precision Care Centre. Reach the clinic by phone, email, or through our contact form.",
}

const contactEmail = "info@precisioncare.ca"
const contactPhone = "289-752-9388"
const contactPhoneHref = "tel:2897529388"
const contactFax = "289-800-9399"

const contactPageStyles = `
  .contact-page-scope .section-inner {
    max-width: 1320px;
  }

  .contact-page-scope .page-placeholder {
    padding-bottom: 0;
  }

  .contact-layout {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 0;
    border: 1px solid var(--hairline);
    background: rgba(246, 239, 227, 0.46);
    box-shadow: 0 28px 80px rgba(31, 29, 26, 0.08);
    margin-bottom: 0;
  }

  .contact-info-panel {
    padding: clamp(40px, 5vw, 64px);
    border-right: 1px solid var(--hairline);
    background:
      linear-gradient(
        145deg,
        rgba(246, 239, 227, 0.92),
        rgba(229, 222, 211, 0.5)
      ),
      rgba(246, 239, 227, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 48px;
  }

  .contact-info-eyebrow {
    font-family: var(--f-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--clay-dark);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .contact-info-eyebrow::before {
    content: "";
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--clay);
    flex-shrink: 0;
  }

  .contact-info-heading {
    font-family: var(--f-serif);
    font-size: clamp(30px, 3.4vw, 44px);
    font-style: italic;
    font-weight: 300;
    line-height: 1.08;
    letter-spacing: -0.015em;
    color: var(--mahogany);
    max-width: 380px;
    margin-bottom: 22px;
  }

  .contact-info-copy {
    font-family: var(--f-sans);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.85;
    color: var(--mahogany);
    opacity: 0.7;
    max-width: 420px;
  }

  .contact-info-list {
    display: grid;
    gap: 28px;
    border-top: 1px solid var(--hairline);
    padding-top: 32px;
  }

  .contact-info-row {
    display: grid;
    gap: 8px;
  }

  .contact-info-label {
    font-family: var(--f-sans);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--clay-dark);
  }

  .contact-info-value {
    font-family: var(--f-sans);
    font-size: 15px;
    font-weight: 400;
    color: var(--mahogany);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a.contact-info-value:hover {
    color: var(--clay-dark);
  }

  .contact-info-fineprint {
    font-family: var(--f-sans);
    font-size: 12px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--mahogany);
    opacity: 0.55;
  }

  .contact-form-panel {
    padding: clamp(40px, 5vw, 64px);
    background: rgba(246, 239, 227, 0.92);
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .contact-form-header {
    display: grid;
    gap: 14px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--hairline);
  }

  .contact-form-eyebrow {
    font-family: var(--f-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--clay-dark);
  }

  .contact-form-title {
    font-family: var(--f-serif);
    font-size: clamp(26px, 2.8vw, 34px);
    font-style: italic;
    font-weight: 300;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--mahogany);
  }

  .contact-form-sub {
    font-family: var(--f-sans);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.8;
    color: var(--mahogany);
    opacity: 0.65;
    max-width: 480px;
  }

  .contact-form {
    display: grid;
    gap: 26px;
  }

  .contact-form-row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px;
  }

  .contact-field {
    display: grid;
    gap: 10px;
    min-width: 0;
  }

  .contact-field-label {
    font-family: var(--f-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--mahogany);
    opacity: 0.78;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .contact-field-optional {
    font-family: var(--f-sans);
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--clay-dark);
    opacity: 0.7;
  }

  .contact-input,
  .contact-textarea {
    font-family: var(--f-sans);
    font-size: 14px;
    font-weight: 400;
    color: var(--mahogany);
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(62, 57, 51, 0.22);
    padding: 12px 2px;
    width: 100%;
    border-radius: 0;
    outline: none;
    transition:
      border-color 0.3s ease,
      background 0.3s ease;
  }

  .contact-input::placeholder,
  .contact-textarea::placeholder {
    color: rgba(62, 57, 51, 0.35);
    font-weight: 300;
  }

  .contact-input:hover,
  .contact-textarea:hover {
    border-bottom-color: rgba(62, 57, 51, 0.4);
  }

  .contact-input:focus,
  .contact-textarea:focus {
    border-bottom-color: var(--clay);
    background: rgba(246, 239, 227, 0.5);
  }

  .contact-textarea {
    min-height: 132px;
    resize: vertical;
    padding: 14px 12px;
    line-height: 1.7;
    border: 1px solid rgba(62, 57, 51, 0.22);
    background: rgba(246, 239, 227, 0.5);
  }

  .contact-textarea:hover {
    border-color: rgba(62, 57, 51, 0.4);
  }

  .contact-textarea:focus {
    border-color: var(--clay);
    background: rgba(246, 239, 227, 0.85);
  }

  .contact-form-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    padding-top: 12px;
    border-top: 1px solid var(--hairline);
  }

  .contact-form-note {
    font-family: var(--f-sans);
    font-size: 11px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--mahogany);
    opacity: 0.55;
    max-width: 380px;
  }

  .contact-submit {
    border: none;
    cursor: pointer;
    font-family: var(--f-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--vanilla);
    background: var(--charcoal);
    padding: 16px clamp(28px, 3vw, 42px);
    box-shadow: 0 14px 32px rgba(31, 29, 26, 0.14);
    display: inline-flex;
    align-items: center;
    gap: 14px;
    transition:
      background 0.35s ease,
      box-shadow 0.35s ease,
      transform 0.35s ease,
      gap 0.3s ease;
  }

  .contact-submit:hover {
    background: var(--ink);
    box-shadow: 0 18px 42px rgba(31, 29, 26, 0.2);
    transform: translateY(-2px);
    gap: 18px;
  }

  .contact-submit-arrow {
    width: 14px;
    height: 1px;
    background: var(--vanilla);
    position: relative;
    flex-shrink: 0;
  }

  .contact-submit-arrow::after {
    content: "";
    position: absolute;
    right: -1px;
    top: -3px;
    width: 7px;
    height: 7px;
    border-top: 1px solid var(--vanilla);
    border-right: 1px solid var(--vanilla);
    transform: rotate(45deg);
  }

  @media (max-width: 1024px) {
    .contact-layout {
      grid-template-columns: 1fr;
    }
    .contact-info-panel {
      border-right: none;
      border-bottom: 1px solid var(--hairline);
    }
  }

  @media (max-width: 768px) {
    .contact-form-row {
      grid-template-columns: 1fr;
      gap: 26px;
    }
    .contact-form-footer {
      flex-direction: column;
      align-items: stretch;
    }
    .contact-submit {
      width: 100%;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .contact-info-panel,
    .contact-form-panel {
      padding: 24px 20px;
    }

    .contact-info-eyebrow,
    .contact-field-label,
    .contact-field-optional {
      overflow-wrap: anywhere;
    }

    .contact-info-value,
    .contact-form-note {
      overflow-wrap: anywhere;
    }
  }
`

export default function ContactUsPage() {
  return (
    <>
      <SiteHeader overlay />

      <main className="page-shell contact-page-scope">
        <style>{contactPageStyles}</style>

        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Get In Touch</div>
              <h1 className="inner-hero-title">Contact Us</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Questions about a referral, a procedure, or scheduling? Reach
                the clinic directly, or send us a note and our team will be in
                touch.
              </p>
              <div className="procedure-hero-actions">
                <a href={contactPhoneHref} className="btn-primary">
                  Call the Clinic
                </a>
                <a href="#contact-form" className="btn-ghost">
                  Send a Message
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="page-placeholder" id="contact-form">
          <div className="section-inner">
            <div className="contact-layout">
              <aside className="contact-info-panel">
                <div>
                  <span className="contact-info-eyebrow">Reach the Clinic</span>
                  <h2 className="contact-info-heading">
                    We&apos;re here to help.
                  </h2>
                  <p className="contact-info-copy">
                    Our front desk team is available Monday through Friday to
                    answer questions, confirm referrals, and help schedule your
                    initial assessment.
                  </p>
                </div>

                <dl className="contact-info-list">
                  <div className="contact-info-row">
                    <dt className="contact-info-label">Phone</dt>
                    <dd>
                      <a
                        href={contactPhoneHref}
                        className="contact-info-value"
                      >
                        {contactPhone}
                      </a>
                    </dd>
                  </div>
                  <div className="contact-info-row">
                    <dt className="contact-info-label">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="contact-info-value"
                      >
                        {contactEmail}
                      </a>
                    </dd>
                  </div>
                  <div className="contact-info-row">
                    <dt className="contact-info-label">Fax</dt>
                    <dd className="contact-info-value">{contactFax}</dd>
                  </div>
                  <div className="contact-info-row">
                    <dt className="contact-info-label">Hours</dt>
                    <dd className="contact-info-value">
                      Mon – Fri &nbsp;·&nbsp; 9:00 am – 5:00 pm
                    </dd>
                  </div>
                </dl>

                <p className="contact-info-fineprint">
                  Please do not include sensitive medical information in this
                  form. For urgent medical concerns, call your family physician
                  or 911.
                </p>
              </aside>

              <div className="contact-form-panel">
                <header className="contact-form-header">
                  <span className="contact-form-eyebrow">Send a Message</span>
                  <h2 className="contact-form-title">
                    Tell us how we can help.
                  </h2>
                  <p className="contact-form-sub">
                    Fill out the form below and a member of our team will
                    respond during regular clinic hours.
                  </p>
                </header>

                <form className="contact-form" noValidate>
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label
                        htmlFor="contact-first-name"
                        className="contact-field-label"
                      >
                        First Name
                      </label>
                      <input
                        id="contact-first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Jane"
                        className="contact-input"
                      />
                    </div>
                    <div className="contact-field">
                      <label
                        htmlFor="contact-last-name"
                        className="contact-field-label"
                      >
                        Last Name
                      </label>
                      <input
                        id="contact-last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Doe"
                        className="contact-input"
                      />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label
                        htmlFor="contact-email"
                        className="contact-field-label"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="contact-input"
                      />
                    </div>
                    <div className="contact-field">
                      <label
                        htmlFor="contact-phone"
                        className="contact-field-label"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(555) 123-4567"
                        className="contact-input"
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label
                      htmlFor="contact-message"
                      className="contact-field-label"
                    >
                      Message
                      <span className="contact-field-optional">— Optional</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Briefly describe your inquiry…"
                      className="contact-textarea"
                    />
                  </div>

                  <div className="contact-form-footer">
                    <p className="contact-form-note">
                      By submitting, you agree to be contacted by Precision Care
                      Centre regarding your inquiry.
                    </p>
                    <button type="submit" className="contact-submit">
                      Send Message
                      <span className="contact-submit-arrow" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
