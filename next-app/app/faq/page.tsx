import type { Metadata } from "next"
import type { CSSProperties } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "FAQ | Precision Pain Centre",
  description:
    "Browse frequently asked questions about Precision Care Centre services, referrals, appointments, and clinic visits.",
}

type FaqItem = {
  question: string
  answer: ReactNode
}

const faqItems: FaqItem[] = [
  {
    question: "What services do you offer?",
    answer: (
      <>
        <p>We offer a wide range of pain management treatments, including:</p>
        <ul>
          <li>fluoroscopy</li>
          <li>ultrasound-guided treatments</li>
          <li>medication management</li>
          <li>rTMS</li>
          <li>regenerative therapies</li>
        </ul>
        <p>
          Speak with your family physician or contact us to see if our services
          are right for you.
        </p>
      </>
    ),
  },
  {
    question: "What conditions do you treat?",
    answer: (
      <>
        <p>We treat a range of pain-related conditions, including:</p>
        <ul>
          <li>chronic pain</li>
          <li>chronic headaches and migraines</li>
          <li>musculoskeletal disorders</li>
          <li>sports medicine concerns</li>
        </ul>
      </>
    ),
  },
  {
    question: "Do I need a referral?",
    answer: (
      <>
        <p>Yes, a referral is required in order to book an appointment.</p>
        <p>
          Your Family Physician can fill out our online referral form or send it
          to us by fax or email.
        </p>
      </>
    ),
  },
  {
    question: "Are your services covered?",
    answer: (
      <>
        <p>
          If you are referred by your Family Physician and are a resident of
          Ontario, our services are covered by OHIP.
        </p>
        <p>
          If you are unable to get a referral or reside outside of Ontario,
          please contact our clinic to discuss your options.
        </p>
      </>
    ),
  },
  {
    question: "How do I book an appointment?",
    answer: (
      <p>
        Once our clinic receives a referral from your Family Physician, we will
        contact you directly to book an appointment.
      </p>
    ),
  },
  {
    question: "What happens during the initial appointment?",
    answer: (
      <>
        <p>
          During your initial appointment, our physicians will perform a
          thorough assessment, review the appropriate investigations, and provide
          you with an initial treatment plan.
        </p>
        <p>
          Every patient&apos;s pain management journey is different, and our
          physicians are dedicated to providing the most appropriate care
          possible.
        </p>
      </>
    ),
  },
  {
    question: "Where do I send imaging before my appointment?",
    answer: (
      <>
        <p>Patients can send imaging before their appointment, including:</p>
        <ul>
          <li>CT scans</li>
          <li>X-rays</li>
          <li>ultrasounds</li>
          <li>MRIs</li>
        </ul>
        <p>
          Send files to:{" "}
          <a href="mailto:imaging.ppc@gmail.com">imaging.ppc@gmail.com</a>
        </p>
      </>
    ),
  },
  {
    question: "What languages do your doctors offer services in?",
    answer: (
      <>
        <p>Our doctors offer services in:</p>
        <ul>
          <li>English</li>
          <li>Urdu</li>
          <li>Oriya</li>
        </ul>
      </>
    ),
  },
  {
    question: "Is parking available?",
    answer: (
      <>
        <p>Parking is available at both locations.</p>
        <ul>
          <li>Brampton: free parking</li>
          <li>Hamilton: paid parking</li>
        </ul>
      </>
    ),
  },
]

export default function FaqPage() {
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

      <main className="page-shell hero-drawer-reveal">
        <section className="inner-hero procedure-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <div className="section-label">Patient Questions</div>
              <h1 className="inner-hero-title">
                Frequently Asked Questions
              </h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Answers to common questions about appointments, referrals,
                coverage, clinic visits, imaging, languages, and parking.
              </p>
              <div className="procedure-hero-actions">
                <Link href="/contact-us" className="btn-primary">
                  Contact the Clinic
                </Link>
                <Link href="/referrals" className="btn-ghost">
                  Referral Information
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,var(--page-a)_0%,var(--page-b)_58%,var(--page-a)_100%)]">
          <div className="section-inner">
            <div className="mx-auto max-w-[980px]">
              <div className="section-label text-[color:var(--mahogany)]">
                FAQ
              </div>
              <div className="mt-5 h-px w-full bg-[color:var(--clay)] opacity-25" />

              <div className="mt-8 space-y-4">
                {faqItems.map((item, index) => (
                  <details
                    key={item.question}
                    className="faq-motion-row group relative overflow-hidden rounded-[8px] border border-[color:var(--hairline)] bg-[linear-gradient(135deg,rgba(246,239,227,0.92),rgba(229,222,211,0.5))] opacity-0 shadow-[0_20px_48px_rgba(31,29,26,0.04)] transition-[background,border-color,box-shadow,transform] duration-500 ease-out open:border-[rgba(159,118,87,0.34)] open:bg-[linear-gradient(135deg,var(--surface-strong),rgba(216,203,187,0.34))] open:shadow-[0_30px_72px_rgba(31,29,26,0.08)] hover:-translate-y-[3px] hover:border-[rgba(159,118,87,0.34)] hover:bg-[linear-gradient(135deg,var(--surface-strong),rgba(216,203,187,0.28))] hover:shadow-[0_30px_72px_rgba(31,29,26,0.08)]"
                    style={
                      {
                        "--faq-delay": `${(index + 1) * 70}ms`,
                      } as CSSProperties
                    }
                  >
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[color:var(--clay)] opacity-45 transition-all duration-500 group-open:w-2 group-open:opacity-80" />
                    <summary className="relative flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left font-sans text-[15px] font-medium leading-6 text-[color:var(--mahogany)] transition-colors duration-300 marker:hidden hover:bg-[rgba(216,203,187,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--clay)] sm:px-6 sm:text-[17px] [&::-webkit-details-marker]:hidden">
                      <span className="transition-colors duration-300 group-hover:text-[color:var(--ink)] group-open:text-[color:var(--clay-dark)]">
                        {item.question}
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
                        <div className="faq-answer-inner px-5 pb-6 pt-5 font-sans text-[14px] font-light leading-7 text-[rgba(62,57,51,0.72)] opacity-0 sm:px-6 sm:text-[15px] [&_a]:font-medium [&_a]:text-[color:var(--clay-dark)] [&_a]:underline-offset-4 [&_a:hover]:underline [&_li+li]:mt-2 [&_li::marker]:text-[color:var(--clay-dark)] [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul+p]:mt-4">
                          <div className="faq-answer-anchor mb-4 h-px w-full bg-[linear-gradient(90deg,var(--clay),transparent)] opacity-0" />
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Still Have Questions?</div>
              <h2 className="procedure-cta-title">
                Contact the clinic for referral or appointment details.
              </h2>
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
