"use client"

import { useEffect, useRef } from "react"

const DISCIPLINES = [
  "Interventional Radiology",
  "Chronic Pain Specialists",
  "Orthopaedic Surgeons",
]

export function BridgeSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view")
        }),
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    )

    section.querySelectorAll(".br").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bridge-section" aria-label="Our approach">

      {/* Vertical journey axis */}
      <div className="bridge-axis" aria-hidden="true">
        <span className="bridge-axis-word bridge-axis-from">uncertain</span>
        <div className="bridge-axis-line" />
        <span className="bridge-axis-word bridge-axis-to">relief</span>
      </div>

      {/* Dark zone — disciplines */}
      <div className="bridge-dark">
        <p className="bridge-tagline br">Refining modern medicine.</p>
        <ul className="bridge-disciplines" aria-label="Specialties">
          {DISCIPLINES.map((d, i) => (
            <li
              key={d}
              className={`bridge-discipline br br-d${i + 1}`}
            >
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Pivot — the big concept */}
      <div className="bridge-pivot">
        <h2 className="bridge-pivot-h br">
          <em>a road,</em>
          <span>not a protocol</span>
        </h2>
      </div>

      {/* Light zone — promise, stats, CTA */}
      <div className="bridge-light">
        <p className="bridge-body br br-d1">
          Five stops. One road. Your story, told the way it actually
          unfolds — from the bumpy uncertainty of the first referral
          to the steady ground of lasting relief.
        </p>

        <a href="#road" className="bridge-scroll br br-d3">
          <span>Scroll to follow the road</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 2v10M3 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
