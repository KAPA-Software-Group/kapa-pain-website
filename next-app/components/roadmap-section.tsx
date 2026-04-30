"use client"

import { useEffect, useRef } from "react"

const SVG_H      = 3200
const SCENE_W    = 1340
const SVG_OFFSET = 270
const CARD_W     = 228
const CARD_GAP   = 68

const ROAD_D = "M 400 0 C 400 180 280 300 250 460 C 220 620 560 700 572 870 C 584 1040 268 1130 238 1300 C 208 1470 545 1555 562 1720 C 579 1885 318 1960 298 2120 C 278 2280 476 2360 490 2520 C 504 2680 400 2820 400 3200"

const MILESTONES = [
  { km: "KM 0",   title: "GP Referral",               desc: "Ask your family physician for a referral. Most treatments are covered by OHIP once referred.",                       side: "right" as const, t: 0.07 },
  { km: "KM 18",  title: "Initial Consultation",       desc: "A specialist reviews your history, symptoms, and imaging — without rush or assumptions.",                            side: "left"  as const, t: 0.24 },
  { km: "KM 34",  title: "Multidisciplinary Review",   desc: "Your case is assessed across five specialties before any path is proposed.",                                        side: "right" as const, t: 0.41 },
  { km: "KM 50",  title: "Personalised Care Plan",     desc: "A strategy built around your condition and response — a plan, not a protocol.",                                     side: "left"  as const, t: 0.58 },
  { km: "KM 67",  title: "Treatment & Procedures",     desc: "Image-guided injections, regenerative therapy, and integrated care — delivered with precision.",                    side: "right" as const, t: 0.75 },
  { km: "KM 83",  title: "Monitoring & Adjustment",    desc: "Regular follow-ups track your progress and adjust your plan based on real outcomes.",                               side: "left"  as const, t: 0.92 },
]

export function RoadmapSection() {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const sceneRef    = useRef<HTMLDivElement>(null)
  const pathRef     = useRef<SVGPathElement>(null)
  const carRef      = useRef<HTMLDivElement>(null)
  const carGlowRef  = useRef<SVGEllipseElement>(null)
  const dotsRef     = useRef<SVGGElement>(null)
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const path   = pathRef.current as SVGPathElement | null
    const car    = carRef.current as HTMLDivElement | null
    const scene  = sceneRef.current as HTMLDivElement | null
    const scroll = scrollRef.current as HTMLDivElement | null
    if (!path || !car || !scene || !scroll) return

    // TS narrowing doesn't cross function boundaries, so capture as asserted non-null
    const _path   = path as SVGPathElement
    const _car    = car as HTMLDivElement
    const _scene  = scene as HTMLDivElement
    const _scroll = scroll as HTMLDivElement

    const pathLen = _path.getTotalLength()

    const getScale = () => Math.min(1, window.innerWidth / SCENE_W)

    // Position cards and dots based on path geometry
    const dotsGroup = dotsRef.current
    MILESTONES.forEach((m, i) => {
      const pt = _path.getPointAtLength(m.t * pathLen)

      if (dotsGroup) {
        const outer = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        outer.setAttribute("cx", String(pt.x))
        outer.setAttribute("cy", String(pt.y))
        outer.setAttribute("r", "10")
        outer.setAttribute("fill", "rgba(245,197,24,0.12)")
        dotsGroup.appendChild(outer)

        const inner = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        inner.setAttribute("cx", String(pt.x))
        inner.setAttribute("cy", String(pt.y))
        inner.setAttribute("r", "4.5")
        inner.setAttribute("fill", "#F5C518")
        inner.setAttribute("opacity", "0.85")
        dotsGroup.appendChild(inner)
      }

      const card = cardsRef.current[i]
      if (card) {
        const ptInScene = SVG_OFFSET + pt.x
        card.style.left = m.side === "right"
          ? `${ptInScene + CARD_GAP}px`
          : `${ptInScene - CARD_GAP - CARD_W}px`
        card.style.top = `${pt.y - 54}px`
      }
    })

    function update() {
      const scale      = getScale()
      const scrollTop  = window.scrollY
      const roadTop    = _scroll.offsetTop
      const scrollable = _scroll.offsetHeight - window.innerHeight
      const progress   = Math.max(0, Math.min(1, (scrollTop - roadTop) / scrollable))

      const translateY = -progress * (SVG_H - window.innerHeight / scale)
      _scene.style.transform       = `translateX(-50%) translateY(${translateY}px) scale(${scale})`
      _scene.style.transformOrigin = "top center"

      const carLen = progress * pathLen
      const carPt  = _path.getPointAtLength(carLen)
      const d      = 4
      const p1     = _path.getPointAtLength(Math.max(0, carLen - d))
      const p2     = _path.getPointAtLength(Math.min(pathLen, carLen + d))
      const angle  = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI - 90

      _car.style.left      = `${SVG_OFFSET + carPt.x}px`
      _car.style.top       = `${carPt.y}px`
      _car.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`

      const glow = carGlowRef.current
      if (glow) {
        glow.setAttribute("cx", String(carPt.x))
        glow.setAttribute("cy", String(carPt.y))
        glow.setAttribute("opacity", progress > 0 && progress < 1 ? "1" : "0")
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        // threshold offset: -0.09 so KM 0 shows immediately at progress=0
        if (progress >= MILESTONES[i].t - 0.09) card.classList.add("show")
        else card.classList.remove("show")
      })
    }

    let pending = false
    const onScroll = () => {
      if (!pending) {
        requestAnimationFrame(() => { update(); pending = false })
        pending = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <>
      {/* Header */}
      <section className="section pj-header-section">
        <div className="section-inner pj-header">
          <div className="section-label pj-label reveal">Our Philosophy</div>
          <h2 className="pj-heading reveal reveal-delay-1">
            Pain Is Complex.
            <br />
            Care Should Be Too.
          </h2>
          <p className="pj-sub reveal reveal-delay-2">
            Every patient follows a different road. Here is the route we walk
            together — from first contact to lasting relief.
          </p>
        </div>
      </section>

      {/* Sticky road scroll */}
      <div ref={scrollRef} className="pj-road-scroll">
        <div className="pj-road-sticky">
          <div ref={sceneRef} className="pj-road-scene">

            <svg
              className="pj-road-svg"
              width="800"
              height={SVG_H}
              viewBox={`0 0 800 ${SVG_H}`}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="pjCarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(245,197,24,0.18)" />
                  <stop offset="100%" stopColor="rgba(245,197,24,0)" />
                </radialGradient>
              </defs>

              {/* invisible reference path used by JS */}
              <path ref={pathRef} d={ROAD_D} fill="none" stroke="none" />

              {/* Road glow / halo */}
              <path d={ROAD_D} fill="none" stroke="rgba(100,75,25,0.55)"      strokeWidth="110" strokeLinecap="butt" />
              {/* Road body — warm dark brown, clearly visible against near-black bg */}
              <path d={ROAD_D} fill="none" stroke="#3a2d18"                   strokeWidth="90"  strokeLinecap="butt" />
              {/* Warm cream edge lines */}
              <path d={ROAD_D} fill="none" stroke="rgba(255,225,160,0.22)"    strokeWidth="90"  strokeLinecap="butt" />
              {/* Re-fill interior (slightly darker) */}
              <path d={ROAD_D} fill="none" stroke="#2c2210"                   strokeWidth="82"  strokeLinecap="butt" />
              {/* Amber centre dashes */}
              <path d={ROAD_D} fill="none" stroke="#F5C518" strokeWidth="3"   strokeDasharray="28 18" strokeLinecap="round" />

              {/* Milestone dots (injected by JS) */}
              <g ref={dotsRef} />

              {/* Car glow ellipse */}
              <ellipse ref={carGlowRef} cx="400" cy="0" rx="46" ry="56" fill="url(#pjCarGlow)" opacity="0" />
            </svg>

            {/* Car */}
            <div ref={carRef} className="pj-car">
              <svg width="32" height="50" viewBox="-16 -25 32 50" overflow="visible">
                <rect x="-9"  y="-18" width="18" height="34" rx="5" fill="rgba(0,0,0,0.35)" transform="translate(1,2)" />
                <rect x="-9"  y="-18" width="18" height="34" rx="5" fill="#cdd8d0" />
                <rect x="-6"  y="-15" width="12" height="11" rx="2.5" fill="#162a1e" opacity="0.92" />
                <rect x="-5"  y="-14" width="4"  height="3"  rx="1"   fill="rgba(255,255,255,0.12)" />
                <rect x="-5"  y="6"   width="10" height="7"  rx="2"   fill="#162a1e" opacity="0.68" />
                <rect x="-14" y="-14" width="6"  height="9"  rx="2"   fill="#0c0c0c" />
                <rect x="8"   y="-14" width="6"  height="9"  rx="2"   fill="#0c0c0c" />
                <rect x="-14" y="7"   width="6"  height="9"  rx="2"   fill="#0c0c0c" />
                <rect x="8"   y="7"   width="6"  height="9"  rx="2"   fill="#0c0c0c" />
                <ellipse cx="-4"  cy="-20" rx="2.8" ry="2"   fill="rgba(255,235,160,0.7)" />
                <ellipse cx="4"   cy="-20" rx="2.8" ry="2"   fill="rgba(255,235,160,0.7)" />
                <ellipse cx="-4.5" cy="17" rx="2"   ry="1.5" fill="rgba(200,60,60,0.5)" />
                <ellipse cx="4.5"  cy="17" rx="2"   ry="1.5" fill="rgba(200,60,60,0.5)" />
              </svg>
            </div>

            {/* Milestone cards */}
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el }}
                className={`pj-mc pj-mc--${m.side}`}
              >
                <div className="pj-mc-step">{m.km}</div>
                <div className="pj-mc-title">{m.title}</div>
                <p className="pj-mc-desc">{m.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}
