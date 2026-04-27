import { HeroSection } from "@/components/hero-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* ═══ 02  PHILOSOPHY ════════════════════════════════ */}
      <section className="section philosophy">
        <div className="section-inner">
          <div className="section-label reveal">Our Philosophy</div>
          <div className="philosophy-grid">
            <div className="phil-left reveal">
              <span className="phil-num">01</span>
            </div>
            <div className="phil-right">
              <h2 className="display-heading phil-heading reveal reveal-delay-1">
                Chronic pain deserves more than a prescription. It deserves a
                plan.
              </h2>
              <p className="phil-body reveal reveal-delay-2">
                We built Precision Pain Centre around a single conviction: every
                patient deserves specialist-led, evidence-based care — without
                financial barriers, without excessive wait times, and without
                compromise. Our multidisciplinary team works together to
                understand your pain from every angle and treat it with the
                precision it demands.
              </p>
              <div className="phil-rule reveal reveal-delay-3" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 03  SERVICES ══════════════════════════════════ */}
      <section className="section services" id="specialties">
        <div className="section-inner">
          <div className="section-label reveal">02 — Specialties</div>
          <div className="services-header">
            <h2 className="display-heading services-heading reveal reveal-delay-1">
              Every dimension of pain, addressed.
            </h2>
          </div>
          {[
            {
              n: "01",
              name: "Image-Guided Procedures",
              desc: "Fluoroscopic and ultrasound-guided injections deliver treatment precisely to the source — with real-time imaging accuracy.",
            },
            {
              n: "02",
              name: "Regenerative & Sports Therapy",
              desc: "PRP, prolotherapy, and sport-specific rehabilitation that activate the body's natural healing potential for lasting recovery.",
            },
            {
              n: "03",
              name: "Medication Management",
              desc: "Pharmacological strategies that balance effective pain control with long-term safety, quality of life, and patient wellbeing.",
            },
            {
              n: "04",
              name: "Migraine & Headache Care",
              desc: "Neurologist-led diagnosis and ongoing management of chronic migraines, cluster headaches, and tension-type disorders.",
            },
            {
              n: "05",
              name: "Mental Health Integration",
              desc: "Psychological care woven into your treatment plan — because chronic pain and mental wellbeing are never separate.",
            },
          ].map((s, i) => (
            <div
              key={s.n}
              className={`service-row reveal reveal-delay-${i + 1}`}
            >
              <span className="service-n">{s.n}</span>
              <span className="service-name">{s.name}</span>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 04  DIFFERENTIATORS ═══════════════════════════ */}
      <section className="section differ">
        <div className="section-inner">
          <div className="section-label reveal">03 — Why Precision Care</div>
          <h2 className="differ-heading reveal reveal-delay-1">
            Specialist access. Evidence-based care. No compromises.
          </h2>
          <div className="differ-grid">
            {[
              {
                n: "01",
                title: "OHIP-Covered",
                text: "When referred by your family physician, most treatments are fully covered. Specialist pain care without financial barriers.",
              },
              {
                n: "02",
                title: "Short Wait Times",
                text: "Our streamlined intake process is designed to get you seen by the right specialist quickly — because timely care changes outcomes.",
              },
              {
                n: "03",
                title: "All Under One Roof",
                text: "Five distinct specialties, two locations. Your care is coordinated — not fragmented across multiple providers and referrals.",
              },
              {
                n: "04",
                title: "State-of-the-Art",
                text: "Onsite fluoroscopy and advanced imaging enable precision procedures at a standard not commonly available in a clinic setting.",
              },
            ].map((d, i) => (
              <div
                key={d.n}
                className={`differ-item reveal reveal-delay-${i + 1}`}
              >
                <span className="differ-n">{d.n}</span>
                <h3 className="differ-title">{d.title}</h3>
                <p className="differ-text">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 05  PATIENT JOURNEY ═══════════════════════════ */}
      <section className="section journey">
        <div className="section-inner">
          <div className="section-label reveal">04 — Getting Started</div>
          <h2 className="display-heading journey-heading reveal reveal-delay-1">
            From first contact to lasting relief.
          </h2>
          <div className="steps">
            {[
              {
                n: "01",
                title: "Referral",
                desc: "Ask your family physician for a referral to Precision Pain Centre. Most treatments are covered by OHIP once referred.",
              },
              {
                n: "02",
                title: "Initial Assessment",
                desc: "A thorough consultation with your specialist to understand your history, symptoms, and goals — with no rush, no assumptions.",
              },
              {
                n: "03",
                title: "Personalised Plan",
                desc: "Your care plan is built around your specific condition, lifestyle, and response — drawing on all five specialist disciplines where needed.",
              },
              {
                n: "04",
                title: "Ongoing Care",
                desc: "Ongoing monitoring, adjustments, and specialist follow-up are built into your care from the start.",
              },
            ].map((s, i) => (
              <div key={s.n} className={`step reveal reveal-delay-${i + 1}`}>
                <span className="step-num">{s.n}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 06  CONDITIONS ════════════════════════════════ */}
      <section className="section conditions" id="conditions">
        <div className="section-inner">
          <div className="section-label reveal">05 — Conditions Treated</div>
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
          <div className="section-label reveal">06 — Find Us</div>
          <h2 className="display-heading locations-heading reveal reveal-delay-1">
            Two clinics. One standard of care.
          </h2>
          <div className="loc-grid">
            <div className="loc-card reveal reveal-delay-2">
              <span className="loc-tag">Main Clinic</span>
              <div className="loc-city">Brampton</div>
              <address className="loc-address">
                Unit 200 &amp; 502
                <br />
                18 Kensington Road
                <br />
                Brampton, ON &nbsp; L6T 4S5
              </address>
              <a href="tel:2897529388" className="loc-phone">
                289-752-9388
              </a>
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
            </div>
            <div className="loc-card reveal reveal-delay-3">
              <span className="loc-tag">Second Location</span>
              <div className="loc-city">Hamilton</div>
              <address className="loc-address">
                Unit 101
                <br />
                25 Charlton Ave E<br />
                Hamilton, ON &nbsp; L8N 1Y2
              </address>
              <a href="tel:2897529388" className="loc-phone">
                289-752-9388
              </a>
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
            </div>
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
            <a href="tel:2897529388" className="btn-primary">
              Call 289-752-9388
            </a>
            <a href="mailto:info@precisioncare.ca" className="btn-ghost">
              info@precisioncare.ca
            </a>
          </div>
        </div>
        <div className="cta-footer reveal reveal-delay-4">
          <div className="cta-footer-item">
            <span className="cf-dot" />
            <span className="cf-text">OHIP Accepted When Referred</span>
          </div>
          <div className="cta-footer-item">
            <span className="cf-dot" />
            <span className="cf-text">Brampton &amp; Hamilton</span>
          </div>
          <div className="cta-footer-item">
            <span className="cf-dot" />
            <span className="cf-text">Fax: 289-800-9399</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
