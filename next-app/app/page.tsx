import Link from "next/link"
import { RoadmapSection } from "@/components/roadmap-section"
import { ScrollHero } from "@/components/scroll-hero"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { RevealObserver } from "@/components/reveal-observer"

export default function Home() {
  return (
    <>
      <RevealObserver />
      <SiteHeader overlay />
      <ScrollHero />

      <div className="sh-reveal-wrap">
        {/* ═══ 02  PHILOSOPHY + ROADMAP ═════════════════════ */}
        <RoadmapSection />

        {/* ═══ 02b  THE DIFFERENCE ══════════════════════════ */}
        <section className="section specialties" id="our-specialists">
          <div className="section-inner">
            <div className="spec-slide-head">
              <div className="section-label reveal">Specialties</div>
              <h2 className="display-heading spec-heading reveal reveal-delay-1">
                Leveraging the expertise of{" "}
                <em>Interventional Radiologists</em>
              </h2>
              <p className="spec-deck reveal reveal-delay-2">
                Every image-guided procedure is planned and performed by a
                specialist trained to use live imaging, so treatment is directed
                at the source instead of guessed by feel.
              </p>
            </div>

            <div
              className="spec-slide-body spec-specialty-body"
              aria-label="Specialties at Precision Care Centre"
            >
              <div className="spec-proof-list">
                {[
                  {
                    title: "Interventional Radiology",
                    href: "/doctors#interventional-radiology",
                    desc: "Image-guided procedures use fluoroscopy and ultrasound to target painful joints, nerves, tendons, and soft tissues with precision.",
                  },
                  {
                    title: "Anesthesiology and Chronic Pain",
                    href: "/doctors#anesthesiology-pain-medicine",
                    desc: "Chronic pain expertise helps connect symptoms, medication strategy, and procedural options into a clear treatment plan.",
                  },
                  {
                    title: "Chronic Pain Specialists",
                    href: "/doctors#nurse-practitioner-pain-consulting",
                    desc: "Focused pain consultations support assessment, education, follow-up, and coordination throughout each patient's care pathway.",
                  },
                ].map((item, index) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`spec-proof-row reveal reveal-delay-${index + 3}`}
                  >
                    <h3 className="spec-proof-title">{item.title}</h3>
                    <p className="spec-proof-desc">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 03  SERVICES ══════════════════════════════════ */}
        <section className="section services" id="specialties">
          <div className="section-inner">
            <div className="section-label reveal">Treatments / Services</div>
            <div className="services-header">
              <h2 className="display-heading services-heading reveal reveal-delay-1">
                Every dimension of pain, addressed.
              </h2>
            </div>
            {[
              {
                name: "Image-Guided Procedures",
                href: "/services/image-guided-procedures",
                desc: "Fluoroscopic and ultrasound-guided injections deliver treatment precisely to the source - with real-time imaging accuracy.",
              },
              {
                name: "Regenerative & Sports Therapy",
                href: "/services/regenerative-sports-therapy",
                desc: "PRP, prolotherapy, and sport-specific rehabilitation that activate the body's natural healing potential for lasting recovery.",
              },
              {
                name: "Medication Management",
                href: "/services#medication-management",
                desc: "Pharmacological strategies that balance effective pain control with long-term safety, quality of life, and patient wellbeing.",
              },
              {
                name: "Migraine & Headache Care",
                desc: "Neurologist-led diagnosis and ongoing management of chronic migraines, cluster headaches, and tension-type disorders.",
              },
              {
                name: "Trigger Point Injections & Nerve Blocks",
                href: "/patient-procedures/nerve-blocks-diagnostic-injections",
                desc: "Targeted treatments that relax painful muscle knots and interrupt pain signals from irritated nerves - providing meaningful relief, improved mobility, and direction for the next step in care.",
              },
              {
                name: "Lidocaine & Ketamine Infusions",
                desc: "Controlled IV treatments that calm overactive pain signals in the nervous system - considered for complex, persistent, or nerve-related pain when other treatments have not provided enough relief.",
              },
            ].map((s, i) =>
              s.href ? (
                <Link
                  key={s.name}
                  href={s.href}
                  className={`service-row reveal reveal-delay-${i + 1}`}
                >
                  <span className="service-name">{s.name}</span>
                  <p className="service-desc">{s.desc}</p>
                </Link>
              ) : (
                <div
                  key={s.name}
                  className={`service-row reveal reveal-delay-${i + 1}`}
                >
                  <span className="service-name">{s.name}</span>
                  <p className="service-desc">{s.desc}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ═══ 06  CONDITIONS ════════════════════════════════ */}
        <section className="section conditions" id="conditions">
          <div className="section-inner">
            <div className="section-label reveal">Conditions Treated</div>
            <h2 className="display-heading conditions-heading reveal reveal-delay-1">
              If it hurts, we treat it.
            </h2>
            <div className="cond-grid">
              {[
                "Chronic Back Pain",
                "Neck Pain",
                "Osteoarthritis",
                "Sciatica",
                "Sports Injuries",
                "Disc Herniation",
                "Facet Joint Pain",
                "Sacroiliac Pain",
                "Fibromyalgia",
                "Neuropathic Pain",
                "Migraines",
                "Cluster Headaches",
                "Shoulder Pain",
                "Knee Pain",
                "Complex Regional Pain",
                "Post-Surgical Pain",
              ].map((c) => (
                <div key={c} className="cond-item">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 07  LOCATIONS ═════════════════════════════════ */}
        <section className="section locations" id="locations">
          <div className="section-inner">
            <div className="section-label reveal">Find Us</div>
            <h2 className="display-heading locations-heading reveal reveal-delay-1">
              Three clinics. One standard of care.
            </h2>
            <div className="loc-grid">
              <Link
                href="/locations/brampton"
                className="loc-card reveal reveal-delay-2"
              >
                <span className="loc-tag">Main Clinic</span>
                <div className="loc-city">Brampton</div>
                <address className="loc-address">
                  Unit 200 &amp; 502
                  <br />
                  18 Kensington Road
                  <br />
                  Brampton, ON &nbsp; L6T 4S5
                </address>
                <span className="loc-phone">289-752-9388</span>
                <div className="loc-divider" />
                <div className="hours-row">
                  <span className="h-day">Mon – Fri</span>
                  <span className="h-time">9:00 am – 5:00 pm</span>
                </div>
                <div className="hours-row">
                  <span className="h-day">Saturday</span>
                  <span className="h-time">By Appointment</span>
                </div>
                <div className="hours-row">
                  <span className="h-day">Sunday</span>
                  <span className="h-time">Closed</span>
                </div>
                <span className="loc-cta">View location →</span>
              </Link>
              <Link
                href="/locations/hamilton"
                className="loc-card reveal reveal-delay-3"
              >
                <span className="loc-tag">Second Location</span>
                <div className="loc-city">Hamilton</div>
                <address className="loc-address">
                  Unit 101
                  <br />
                  25 Charlton Ave E<br />
                  Hamilton, ON &nbsp; L8N 1Y2
                </address>
                <span className="loc-phone">289-752-9388</span>
                <div className="loc-divider" />
                <div className="hours-row">
                  <span className="h-day">Mon – Fri</span>
                  <span className="h-time">9:00 am – 5:00 pm</span>
                </div>
                <div className="hours-row">
                  <span className="h-day">Saturday</span>
                  <span className="h-time">By Appointment</span>
                </div>
                <div className="hours-row">
                  <span className="h-day">Sunday</span>
                  <span className="h-time">Closed</span>
                </div>
                <span className="loc-cta">View location →</span>
              </Link>
              <Link
                href="/locations/guelph"
                className="loc-card reveal reveal-delay-4"
              >
                <span className="loc-tag">Third Location</span>
                <div className="loc-city">Guelph</div>
                <address className="loc-address">
                  Suite 202
                  <br />
                  21 Surrey St W<br />
                  Guelph, ON &nbsp; N1H 3R3
                </address>
                <span className="loc-phone">519-265-9622</span>
                <div className="loc-divider" />
                <div className="hours-row">
                  <span className="h-day">Mon – Fri</span>
                  <span className="h-time">9:00 am – 5:00 pm</span>
                </div>
                <div className="hours-row">
                  <span className="h-day">Saturday</span>
                  <span className="h-time">By Appointment</span>
                </div>
                <div className="hours-row">
                  <span className="h-day">Sunday</span>
                  <span className="h-time">Closed</span>
                </div>
                <span className="loc-cta">View location →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 08  CTA ═══════════════════════════════════════ */}
        <section className="section cta-section">
          <div className="cta-inner">
            <div className="section-label reveal">Begin Your Care</div>
            <h2 className="cta-heading reveal reveal-delay-1">
              Take the first step
              <br />
              toward a life
              <br />
              with less pain.
            </h2>
            <p className="cta-sub reveal reveal-delay-2">
              A referral from your family physician is all you need to begin.
              We&apos;ll take care of the rest.
            </p>
            <div className="cta-actions reveal reveal-delay-3">
              <Link href="/contact-us" className="btn-primary">
                Contact the Clinic
              </Link>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  )
}
