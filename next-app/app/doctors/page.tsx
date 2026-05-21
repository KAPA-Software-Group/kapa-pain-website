import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Clinical Practices | Precision Pain Centre",
  description:
    "Learn about Precision Care Centre's interventional radiology and anesthesiology pain care practices.",
}

const doctors = [
  {
    id: "interventional-radiology",
    practice: "Interventional Radiology",
    biography: [
      "Interventional radiology uses image guidance to perform precise, minimally invasive procedures. In pain care, this can help target the source of symptoms while supporting faster recovery, spine intervention, and a more focused treatment plan.",
    ],
  },
  {
    id: "anesthesiology-pain-medicine",
    practice: "Anesthesiology and Chronic Pain",
    biography: [
      "Anesthesiology in chronic pain care focuses on understanding pain pathways, medication strategies, and image-guided procedures. Using advanced medical imaging can help deliver precise, minimally invasive treatments designed to reduce pain and improve quality of life.",
    ],
  },
] as const

const doctorsPageStyles = `
  .doctors-page-scope.doctors-intro-section .section-inner {
    max-width: 1320px;
  }

  .doctors-page-scope .doctors-intro-grid {
    align-items: start;
  }

  .doctors-page-scope .doctors-intro-copy {
    margin-top: 42px;
    position: relative;
    max-width: 620px;
    padding: clamp(24px, 3vw, 34px);
    border: 1px solid rgba(62, 57, 51, 0.13);
    background:
      linear-gradient(
        145deg,
        rgba(246, 239, 227, 0.9),
        rgba(229, 222, 211, 0.52)
      ),
      rgba(246, 239, 227, 0.7);
    box-shadow: 0 24px 60px rgba(31, 29, 26, 0.06);
    overflow: hidden;
  }

  .doctors-page-scope .doctors-intro-copy::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: rgba(159, 118, 87, 0.54);
  }

  .doctors-page-scope .doctors-profile {
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
    padding: clamp(78px, 9vw, 128px) 0;
    border-top-color: rgba(159, 118, 87, 0.22);
  }

  .doctors-page-scope .doctors-profile-copy {
    width: 100%;
    max-width: 900px;
    min-width: 0;
  }

  .doctors-page-scope .doctors-profile:first-child {
    padding-top: clamp(18px, 3vw, 36px);
  }

  .doctors-page-scope .doctors-profile-heading {
    gap: 20px;
  }

  .doctors-page-scope .doctors-profile-role {
    position: relative;
    max-width: 100%;
    padding: 12px 16px 12px 20px;
    border-color: rgba(159, 118, 87, 0.36);
    background:
      linear-gradient(
        135deg,
        rgba(159, 118, 87, 0.14),
        rgba(246, 239, 227, 0.58)
      ),
      rgba(246, 239, 227, 0.7);
    box-shadow: 0 14px 32px rgba(31, 29, 26, 0.045);
    font-size: 12px;
    letter-spacing: 0.14em;
  }

  .doctors-page-scope .doctors-profile-role::before {
    content: "";
    position: absolute;
    inset: 8px auto 8px 8px;
    width: 3px;
    background: rgba(159, 118, 87, 0.62);
  }

  .doctors-page-scope .doctors-quote-card {
    position: relative;
    top: auto;
    width: 100%;
    max-width: 420px;
    align-self: start;
    height: clamp(300px, 25vw, 360px);
    min-height: 0;
    padding: clamp(24px, 2.5vw, 32px);
    align-items: flex-start;
    justify-content: flex-start;
    gap: clamp(32px, 4vw, 54px);
    transition:
      opacity 650ms var(--ease),
      border-color 280ms ease,
      box-shadow 280ms ease,
      transform 650ms var(--ease);
  }

  .doctors-page-scope .doctors-quote-card .procedure-card-topline {
    width: 100%;
    justify-content: flex-start;
  }

  .doctors-page-scope .doctors-quote-card .procedure-card-eyebrow {
    text-align: left;
  }

  .doctors-page-scope .doctors-quote {
    width: 100%;
    max-width: min(100%, 30ch);
    font-size: clamp(24px, 2.1vw, 32px);
    line-height: 1.16;
    overflow-wrap: break-word;
  }

  .doctors-page-scope #interventional-radiology .doctors-quote {
    font-size: clamp(22px, 1.9vw, 30px);
    line-height: 1.18;
  }

  .doctors-page-scope .doctors-profile[data-quote-side="left"] .doctors-quote-card {
    align-self: center;
    height: clamp(260px, 22vw, 310px);
    padding: clamp(26px, 2.7vw, 36px);
    gap: clamp(34px, 4vw, 52px);
  }

  .doctors-page-scope .doctors-profile[data-quote-side="left"] .doctors-quote {
    max-width: min(100%, 24ch);
    font-size: clamp(25px, 2.2vw, 34px);
    line-height: 1.15;
  }

  @media (hover: hover) and (pointer: fine) {
    .doctors-page-scope .doctors-quote-card:hover {
      border-color: rgba(159, 118, 87, 0.34);
      box-shadow: 0 30px 72px rgba(31, 29, 26, 0.08);
      transform: translateY(-3px);
    }
  }

  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal] {
    opacity: 1;
    transform: none;
    transition:
      border-color 280ms ease,
      box-shadow 280ms ease;
    will-change: auto;
  }

  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal] > :not([data-doctors-reveal]) {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    transition:
      opacity 700ms var(--ease),
      transform 700ms var(--ease);
    will-change: opacity, transform;
  }

  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope .doctors-quote-card[data-doctors-reveal] > * {
    transform: translate3d(0, 10px, 0);
    transition-duration: 650ms, 650ms;
  }

  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal].is-loaded,
  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal].is-loaded > :not([data-doctors-reveal]) {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    will-change: auto;
  }

  @media (max-width: 1024px) {
    .doctors-page-scope .doctors-profile {
      grid-template-columns: minmax(0, 1fr);
      align-items: start;
      padding: 64px 0;
    }

    .doctors-page-scope .doctors-profile-copy,
    .doctors-page-scope .doctors-quote-card {
      max-width: none;
    }

    .doctors-page-scope .doctors-quote-card {
      height: clamp(230px, 28vw, 280px);
    }

    .doctors-page-scope .doctors-quote {
      max-width: min(100%, 30ch);
    }
  }

  @media (max-width: 768px) {
    .doctors-page-scope .doctors-intro-copy {
      margin-top: 0;
      max-width: none;
      padding: 24px;
    }

    .doctors-page-scope .doctors-profile {
      padding: 56px 0;
    }

    .doctors-page-scope .doctors-profile:first-child {
      padding-top: 0;
    }

    .doctors-page-scope .doctors-profile-heading {
      gap: 16px;
    }

    .doctors-page-scope .doctors-profile-role {
      padding: 11px 14px 11px 18px;
      font-size: 11px;
      letter-spacing: 0.12em;
    }

    .doctors-page-scope .doctors-quote-card {
      height: auto;
      min-height: auto;
      gap: 28px;
      justify-content: flex-start;
    }

    .doctors-page-scope .doctors-quote {
      max-width: none;
      font-size: clamp(28px, 8.8vw, 40px);
      line-height: 1.14;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal],
    .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal] > :not([data-doctors-reveal]),
    .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal].is-loaded,
    .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal].is-loaded > :not([data-doctors-reveal]) {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .doctors-page-scope .doctors-quote-card {
      transition: none;
    }
  }
`

const doctorsRevealScript = `
  (() => {
    const loadReveals = () => {
      const root = document.querySelector("[data-doctors-reveal-root]");
      if (!root) return;

      root.classList.add("is-reveal-enabled");

      const revealItems = Array.from(root.querySelectorAll("[data-doctors-reveal]"));

      if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-loaded"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries, activeObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-loaded");
            activeObserver.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.14,
        }
      );

      revealItems.forEach((item) => observer.observe(item));
    };

    window.requestAnimationFrame(loadReveals);
  })();
`

type DoctorProfileProps = (typeof doctors)[number]

function renderBiography(paragraph: string) {
  const linkedPhrase = "advanced medical imaging"

  if (!paragraph.includes(linkedPhrase)) {
    return paragraph
  }

  const [before, after] = paragraph.split(linkedPhrase)

  return (
    <>
      {before}
      <Link
        href="/patient-procedures/advanced-specialized-procedures"
        className="doctors-inline-link"
      >
        {linkedPhrase}
      </Link>
      {after}
    </>
  )
}

function DoctorProfile({
  biography,
  id,
  practice,
}: DoctorProfileProps) {
  return (
    <article
      id={id}
      className="doctors-profile"
      data-doctors-reveal="profile"
    >
      <div className="doctors-profile-copy">
        <div className="doctors-profile-heading">
          <div>
            <h2 className="procedure-section-title doctors-profile-name">
              {practice}
            </h2>
          </div>
          <p className="doctors-profile-role">Clinical Practice</p>
        </div>

        <div className="doctors-profile-bio">
          {biography.map((paragraph) => (
            <p key={paragraph}>{renderBiography(paragraph)}</p>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function DoctorsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: doctorsPageStyles }} />
      <Script
        id="doctors-reveal-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: doctorsRevealScript }}
      />
      <SiteHeader overlay />

      <main
        className="page-shell doctors-shell doctors-reveal-root hero-drawer-reveal"
        data-doctors-reveal-root
      >
        <section className="inner-hero procedure-hero doctors-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-centered">
              <h1 className="inner-hero-title">Clinical Practices</h1>
              <p className="inner-hero-copy procedure-hero-copy">
                Learn about the clinical practices behind Precision Care
                Centre&apos;s multidisciplinary pain care, including
                interventional radiology and anesthesiology expertise.
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

        <section className="procedure-section doctors-intro-section doctors-page-scope">
          <div
            className="section-inner doctors-intro-grid"
            data-doctors-reveal="section"
          >
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="procedure-section-title">
                Specialist care shaped around diagnosis, precision, and
                follow-through.
              </h2>
            </div>
            <p className="procedure-section-copy doctors-intro-copy">
              The team brings together imaging expertise, chronic pain
              treatment, spine intervention, and patient education so care plans
              can be matched to each patient&apos;s symptoms, function, and
              goals.
            </p>
          </div>
        </section>

        <section className="procedure-section doctors-profile-section doctors-page-scope">
          <div className="section-inner">
            <div className="doctors-profile-list">
              {doctors.map((doctor) => (
                <DoctorProfile key={doctor.id} {...doctor} />
              ))}
            </div>
          </div>
        </section>

        <section className="procedure-cta-section">
          <div className="section-inner procedure-cta-grid">
            <div>
              <div className="section-label">Next Step</div>
              <h2 className="procedure-cta-title">
                Need help choosing the right clinical pathway?
              </h2>
              <p className="procedure-cta-copy">
                Patients and referring providers can contact the clinic to
                discuss referrals, appointment details, or which procedure page
                is most relevant to the care plan.
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
