import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Doctors | Precision Pain Centre",
  description:
    "Meet the Precision Care Centre team, including interventional radiologists, an anesthesiologist, and a nurse practitioner pain consultant.",
}

const doctors = [
  {
    name: "Dr. Aziz Qazi",
    credentials: "BSc, MD, FRCPC",
    role: "Interventional Radiologist",
    biography: [
      "Dr. Qazi is a diagnostic and Interventional Radiologist. He completed medical school at the University of Calgary in 2013 followed by a 5-year residency in diagnostic imaging at the University of Toronto. He subsequently completed a fellowship in Vascular and Interventional Radiology at the University Health Network in 2019.",
      "Dr. Qazi has received numerous awards throughout his training and is focused on providing high quality pain intervention for his patients.",
    ],
    philosophy:
      "Quality in a service or product is not what you put into it. It is what the customer gets out of it.",
    quoteSide: "right",
  },
  {
    name: "Dr. Ahmed Farooq",
    credentials: "BSc, MD, FRCPC",
    role: "Interventional Radiologist",
    biography: [
      "Dr. Farooq is a diagnostic and Interventional Radiologist. He completed medical school at McMaster University in 2003 followed by a 5-year residency in diagnostic imaging at the University of Manitoba. He subsequently completed a fellowship in Vascular and Interventional Radiology at the University Health Network in 2009.",
      "Dr. Farooq is a highly experienced physician with expertise in spine intervention.",
    ],
    philosophy:
      "Patients don't care how much you know until they know how much you care.",
    quoteSide: "left",
  },
  {
    name: "Dr. Madi Ali",
    credentials: "BSc, MD, FRCPC",
    role: "Anesthesiologist",
    biography: [
      "Dr. Madi Ali is a highly skilled Anesthesiologist and Chronic Pain Specialist at Hamilton Health Sciences, dedicated to helping patients find relief from chronic pain. He specializes in image-guided procedures, using advanced medical imaging to deliver precise, minimally invasive treatments designed to reduce pain and improve quality of life.",
      "Dr. Ali is committed to compassionate, patient-centered care, working closely with each individual to create personalized treatment plans. He is also a Clinical Associate Professor at McMaster University, where he contributes to the education of future healthcare professionals in pain management and anesthesia care.",
    ],
    philosophy: "Improving patient experience is not an extra. It is the work.",
    quoteSide: "right",
  },
  {
    name: "Sharon House",
    credentials: "",
    role: "Nurse Practitioner - Pain Consultant",
    biography: [
      "Sharon House is a Nurse Practitioner specializing in adult and acute care. She completed her undergraduate studies at McMaster University in 2018 followed by her post-graduate Master's education at the University of Toronto in 2023. She has vast experience in orthopaedics, sports medicine, spine and pain services.",
      "She enjoys meeting with patients and families to discuss both interventional and non-interventional treatment options for acute and chronic pain conditions. She has special interest in research surrounding fibromyalgia spectrum disorders and patient education.",
    ],
    philosophy:
      "It's not how much you do, but how much love you put into the doing.",
    quoteSide: "left",
  },
] as const

const teamFacts = [
  {
    label: "Clinical Team",
    value: "4 pain-focused specialists",
  },
  {
    label: "Care Model",
    value: "Interventional, anesthesiology, and nurse practitioner expertise",
  },
  {
    label: "Clinical Focus",
    value:
      "Image-guided pain care, spine intervention, and chronic pain planning",
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
    align-items: stretch;
    padding: clamp(78px, 9vw, 128px) 0;
    border-top-color: rgba(159, 118, 87, 0.22);
  }

  .doctors-page-scope .doctors-profile-copy {
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
    align-self: stretch;
    height: auto;
    min-height: clamp(230px, 26vw, 340px);
    padding: clamp(24px, 3vw, 34px);
    align-items: flex-start;
    justify-content: flex-start;
    gap: clamp(22px, 3vw, 34px);
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
    max-width: min(100%, 26ch);
    font-size: clamp(30px, 3vw, 46px);
    line-height: 1.12;
    overflow-wrap: break-word;
  }

  @media (hover: hover) and (pointer: fine) {
    .doctors-page-scope .doctors-quote-card:hover {
      border-color: rgba(159, 118, 87, 0.34);
      box-shadow: 0 30px 72px rgba(31, 29, 26, 0.08);
      transform: translateY(-3px);
    }
  }

  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal] {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
    transition:
      opacity 700ms var(--ease),
      transform 700ms var(--ease),
      border-color 280ms ease,
      box-shadow 280ms ease;
    will-change: opacity, transform;
  }

  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope .doctors-quote-card[data-doctors-reveal] {
    transform: translate3d(0, 10px, 0);
    transition-duration: 650ms, 650ms, 280ms, 280ms;
  }

  .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal].is-loaded {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    will-change: auto;
  }

  @media (max-width: 1024px) {
    .doctors-page-scope .doctors-profile {
      align-items: start;
      padding: 64px 0;
    }

    .doctors-page-scope .doctors-quote-card {
      min-height: clamp(210px, 32vw, 280px);
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
      min-height: auto;
      gap: 28px;
    }

    .doctors-page-scope .doctors-quote {
      max-width: none;
      font-size: clamp(28px, 8.8vw, 40px);
      line-height: 1.14;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal],
    .doctors-reveal-root.is-reveal-enabled .doctors-page-scope [data-doctors-reveal].is-loaded {
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
  credentials,
  name,
  philosophy,
  quoteSide,
  role,
}: DoctorProfileProps) {
  return (
    <article
      className="doctors-profile"
      data-doctors-reveal="profile"
      data-quote-side={quoteSide}
    >
      <div className="doctors-profile-copy">
        <div className="doctors-profile-heading">
          <div>
            <h2 className="procedure-section-title doctors-profile-name">
              {name}
            </h2>
            {credentials ? (
              <p className="doctors-profile-credentials">{credentials}</p>
            ) : null}
          </div>
          <p className="doctors-profile-role">{role}</p>
        </div>

        <div className="doctors-profile-bio">
          {biography.map((paragraph) => (
            <p key={paragraph}>{renderBiography(paragraph)}</p>
          ))}
        </div>
      </div>

      <aside
        className="procedure-card doctors-quote-card"
        data-doctors-reveal="philosophy"
      >
        <div className="procedure-card-topline">
          <span className="procedure-card-eyebrow">Clinical Philosophy</span>
        </div>
        <blockquote className="doctors-quote">
          &ldquo;{philosophy}&rdquo;
        </blockquote>
      </aside>
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
        className="page-shell doctors-shell doctors-reveal-root"
        data-doctors-reveal-root
      >
        <section className="inner-hero procedure-hero doctors-hero">
          <div className="section-inner procedure-hero-content">
            <div className="procedure-hero-grid doctors-hero-grid">
              <div className="procedure-hero-copy-wrap">
                <div className="section-label">Medical Team</div>
                <h1 className="inner-hero-title">Meet Our Team</h1>
                <p className="inner-hero-copy procedure-hero-copy">
                  Meet the clinicians behind Precision Care Centre&apos;s
                  multidisciplinary pain care, including interventional
                  radiology, anesthesiology, and nurse practitioner expertise.
                </p>
                <div className="procedure-hero-actions">
                  <a href="tel:2897529388" className="btn-primary">
                    Call the Clinic
                  </a>
                  <Link href="/referrals" className="btn-ghost">
                    Referral Information
                  </Link>
                </div>
              </div>

              <div className="procedure-facts">
                {teamFacts.map((fact) => (
                  <div key={fact.label} className="procedure-fact">
                    <span className="procedure-fact-label">{fact.label}</span>
                    <p className="procedure-fact-value">{fact.value}</p>
                  </div>
                ))}
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
                <DoctorProfile key={doctor.name} {...doctor} />
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
                <a href="tel:2897529388" className="btn-primary">
                  Call 289-752-9388
                </a>
                <Link href="/contact-us" className="btn-ghost">
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
