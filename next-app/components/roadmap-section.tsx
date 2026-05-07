"use client"

import { useEffect, useRef } from "react"

const SVG_H      = 1600
const SCENE_W    = 1800
const SCENE_H    = SVG_H
const SVG_OFFSET = 500
const CARD_GAP   = 80
const SCENE_MIN_SCALE = 0.48
const SCENE_MAX_SCALE = 2.4

const ROAD_OVERLAY_D = "M 400 -600 C 400 -430 330 -330 370 -210 C 415 -95 400 -35 400 0 C 400 110 285 175 280 285 C 274 420 560 470 540 610 C 522 735 300 770 320 910 C 340 1055 555 1095 520 1230 C 490 1350 390 1435 400 1600 C 404 1680 402 1760 400 1840"
const ROAD_TRAVEL_D = "M 400 0 C 400 110 285 175 280 285 C 274 420 560 470 540 610 C 522 735 300 770 320 910 C 340 1055 555 1095 520 1230 C 490 1350 390 1435 400 1600"

const MILESTONES: { km: string; t: number; side: "left"|"right"; zone: string; terrain: string; light: string }[] = [
  { km:"KM 00", t:0.05, side:"right", zone:"The first mile",     terrain:"rough",       light:"overcast" },
  { km:"KM 18", t:0.22, side:"left",  zone:"Listening",          terrain:"rocky",       light:"diffuse"  },
  { km:"KM 34", t:0.39, side:"right", zone:"Many minds",         terrain:"clearing",    light:"breaking" },
  { km:"KM 50", t:0.56, side:"left",  zone:"A path of your own", terrain:"settling",    light:"warm"     },
  { km:"KM 67", t:0.74, side:"right", zone:"Precision",          terrain:"open ground", light:"golden"   },
  { km:"KM 83", t:0.92, side:"left",  zone:"Lasting relief",     terrain:"meadow",      light:"radiant"  },
]

const CARE_DISCIPLINES = [
  "Interventional Radiology",
  "Chronic Pain Specialists",
  "Orthopaedic Surgeons",
]

const MILESTONE_CONTENT = [
  { title:"GP referral",              desc:"Ask your family physician for a referral. Most treatments are covered by OHIP once referred — no out-of-pocket starting line.",       foot:"Day 1 · paperwork-free for you",       stop:"Stop 01 / 06" },
  { title:"Initial consultation",     desc:"A specialist reviews your history, symptoms, and imaging — without rush or assumptions. The conversation that should have happened sooner.", foot:"Average visit · 45 minutes",           stop:"Stop 02 / 06" },
  { title:"Multidisciplinary review", desc:"Your case is assessed across five specialties before any path is proposed. Five sets of eyes; one coherent plan.",                    foot:"Five disciplines · one room",          stop:"Stop 03 / 06" },
  { title:"Personalised care plan",   desc:"A strategy built around your condition and response — a plan, not a protocol. Adjusted as we learn what your body answers to.",       foot:"Built for you, not from a template",   stop:"Stop 04 / 06" },
  { title:"Treatment & procedures",   desc:"Image-guided injections, regenerative therapy, and integrated care — delivered at the source, with millimetric precision.",           foot:"Onsite fluoroscopy & ultrasound",       stop:"Stop 05 / 06" },
  { title:"Monitoring & adjustment",  desc:"Regular follow-ups track your progress and adjust your plan based on real outcomes. Care that doesn't end at the procedure.",         foot:"Outcomes reviewed · quarterly",        stop:"Stop 06 / 06" },
]

const TONE_STOPS: [number, [number, number, number]][] = [
  [0.00, [216, 210, 196]],
  [0.20, [223, 216, 200]],
  [0.45, [230, 220, 204]],
  [0.65, [236, 221, 199]],
  [0.85, [240, 220, 190]],
  [1.00, [243, 216, 176]],
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}

function toneAt(p: number): string {
  for (let i = 0; i < TONE_STOPS.length - 1; i++) {
    const [p0, c0] = TONE_STOPS[i]
    const [p1, c1] = TONE_STOPS[i + 1]
    if (p <= p1) {
      const t = (p - p0) / (p1 - p0)
      return `rgb(${Math.round(lerp(c0[0],c1[0],t))},${Math.round(lerp(c0[1],c1[1],t))},${Math.round(lerp(c0[2],c1[2],t))})`
    }
  }
  const c = TONE_STOPS[TONE_STOPS.length - 1][1]
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

export function RoadmapSection() {
  const scrollRef      = useRef<HTMLDivElement>(null)
  const sceneRef       = useRef<HTMLDivElement>(null)
  const pathRef        = useRef<SVGPathElement>(null)
  const carRef         = useRef<HTMLDivElement>(null)
  const carGlowRef     = useRef<SVGEllipseElement>(null)
  const dotsRef        = useRef<SVGGElement>(null)
  const cardsRef       = useRef<(HTMLDivElement | null)[]>([])
  const stopRefs       = useRef<(HTMLLIElement | null)[]>([])
  const stickyRef      = useRef<HTMLDivElement>(null)
  const progReadRef    = useRef<HTMLSpanElement>(null)
  const progBarRef     = useRef<HTMLSpanElement>(null)
  const climateBarRef  = useRef<HTMLDivElement>(null)
  const terrainReadRef = useRef<HTMLSpanElement>(null)
  const lightReadRef   = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const path   = pathRef.current
    const car    = carRef.current
    const scene  = sceneRef.current
    const scroll = scrollRef.current
    const sticky = stickyRef.current
    if (!path || !car || !scene || !scroll || !sticky) return

    // narrow to non-nullable for closures
    const _path   = path   as SVGPathElement
    const _car    = car    as HTMLDivElement
    const _scene  = scene  as HTMLDivElement
    const _scroll = scroll as HTMLDivElement
    const _sticky = sticky as HTMLDivElement

    const pathLen  = _path.getTotalLength()
    const clampScale = (scale: number) =>
      Math.min(SCENE_MAX_SCALE, Math.max(SCENE_MIN_SCALE, scale))
    const getViewport = () => {
      const visualViewport = window.visualViewport
      const viewportW = Math.max(
        _sticky.clientWidth,
        visualViewport?.width ?? 0,
        window.innerWidth,
      )
      const viewportH = Math.max(
        _sticky.clientHeight,
        visualViewport?.height ?? 0,
        window.innerHeight,
      )

      return { viewportW, viewportH }
    }
    const getScale = () => {
      const { viewportW, viewportH } = getViewport()
      const widthScale = viewportW / SCENE_W
      const heightScale = viewportH / SCENE_H

      return clampScale(Math.max(widthScale, heightScale))
    }
    const milestonePoints = MILESTONES.map(m => _path.getPointAtLength(m.t * pathLen))

    dotsRef.current?.replaceChildren()
    MILESTONES.forEach((_, i) => {
      const pt = milestonePoints[i]
      const dg = dotsRef.current
      if (!dg) return

      const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      ring.setAttribute("cx", String(pt.x))
      ring.setAttribute("cy", String(pt.y))
      ring.setAttribute("r", "11")
      ring.setAttribute("fill", "rgba(159,118,87,0.12)")
      dg.appendChild(ring)

      const inner = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      inner.setAttribute("cx", String(pt.x))
      inner.setAttribute("cy", String(pt.y))
      inner.setAttribute("r", "4")
      inner.setAttribute("fill", "#9f7657")
      dg.appendChild(inner)

      const pin = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      pin.setAttribute("cx", String(pt.x))
      pin.setAttribute("cy", String(pt.y))
      pin.setAttribute("r", "1.4")
      pin.setAttribute("fill", "#f6efe3")
      dg.appendChild(pin)
    })

    function update() {
      const scale = getScale()
      const top   = _scroll.getBoundingClientRect().top + window.scrollY
      const range = _scroll.offsetHeight - window.innerHeight
      const p     = Math.max(0, Math.min(1, (window.scrollY - top) / range))

      const carLen = p * pathLen
      const carPt  = _path.getPointAtLength(carLen)
      const p1     = _path.getPointAtLength(Math.max(0, carLen - 4))
      const p2     = _path.getPointAtLength(Math.min(pathLen, carLen + 4))
      const angle  = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI - 90

      const { viewportW, viewportH } = getViewport()
      const viewportAnchorY = lerp(0, viewportH, p)
      const translateY = viewportAnchorY - carPt.y * scale
      const leftOffset = (viewportW - SCENE_W) / 2
      _scene.style.left            = `${leftOffset}px`
      _scene.style.transform       = `translateY(${translateY}px) scale(${scale})`
      _scene.style.transformOrigin = "top center"

      _car.style.left      = `${SVG_OFFSET + carPt.x}px`
      _car.style.top       = `${carPt.y}px`
      _car.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`

      const glow = carGlowRef.current
      if (glow) {
        glow.setAttribute("cx", String(carPt.x))
        glow.setAttribute("cy", String(carPt.y))
        glow.setAttribute("opacity", (p > 0.005 && p < 0.995) ? "1" : "0")
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const m      = MILESTONES[i]
        const pt     = milestonePoints[i]
        const anchorX = viewportW / 2 + (SVG_OFFSET + pt.x - SCENE_W / 2) * scale
        const anchorY = translateY + pt.y * scale
        const cardW   = card.offsetWidth || 360
        const cardH   = card.offsetHeight || 180
        const gap     = Math.max(28, CARD_GAP * scale)
        const minX    = 16
        const maxX    = viewportW - cardW - minX
        const rawLeft = m.side === "right" ? anchorX + gap : anchorX - gap - cardW
        const left    = Math.max(minX, Math.min(maxX, rawLeft))
        const tp      = Math.max(80, Math.min(viewportH - cardH - 80, anchorY - cardH / 2))
        card.style.left = `${left}px`
        card.style.top  = `${tp}px`
        if (p >= m.t - 0.07 && p <= m.t + 0.09) card.classList.add("show")
        else card.classList.remove("show")
      })


      if (progReadRef.current) progReadRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%"
      if (progBarRef.current) progBarRef.current.style.setProperty("--pj-progress", `${p * 100}%`)
      if (climateBarRef.current) climateBarRef.current.style.setProperty("--pj-progress", `${p * 100}%`)

      let activeIdx = -1
      for (let i = 0; i < MILESTONES.length; i++) {
        if (p >= MILESTONES[i].t - 0.04) activeIdx = i
      }

      if (activeIdx === -1) {
        if (terrainReadRef.current) terrainReadRef.current.textContent = "rough"
        if (lightReadRef.current) lightReadRef.current.textContent = "overcast"
      } else {
        const m = MILESTONES[activeIdx]
        if (terrainReadRef.current) terrainReadRef.current.textContent = m.terrain
        if (lightReadRef.current) lightReadRef.current.textContent = m.light
      }

      stopRefs.current.forEach((li, i) => {
        if (!li) return
        if (p >= MILESTONES[i].t - 0.02) li.classList.add("is-passed")
        else li.classList.remove("is-passed")
      })
    }

    let pending = false
    const onScroll = () => {
      if (!pending) { requestAnimationFrame(() => { update(); pending = false }); pending = true }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    window.visualViewport?.addEventListener("resize", update, { passive: true })
    window.visualViewport?.addEventListener("scroll", update, { passive: true })
    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(_sticky)
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", update)
      window.visualViewport?.removeEventListener("resize", update)
      window.visualViewport?.removeEventListener("scroll", update)
      resizeObserver.disconnect()
    }
  }, [])

  const scrollToRoad = () => scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <>
      {/* ── INTRO PORTAL ── */}
      <section className="pj-intro" id="journey">
        <div className="pj-intro-grid">
          <div className="pj-refine-callout">
            <div>
              <span className="pj-refine-kicker">Our Standard</span>
              <h2 className="pj-refine-title">Refining modern medicine.</h2>
            </div>
            <div className="pj-refine-disciplines" aria-label="Care disciplines">
              {CARE_DISCIPLINES.map((discipline) => (
                <span key={discipline} className="pj-refine-discipline">
                  {discipline}
                </span>
              ))}
            </div>
          </div>

          <div className="pj-intro-meta">
            <span className="pj-intro-meta-label">01 — Your Journey</span>
            <span className="pj-intro-meta-mark">a road, not a protocol</span>
            <span className="pj-intro-meta-counter">CHAPTER 01 / 06</span>
          </div>

          <div className="pj-portal">
            <div className="pj-portal-text">
              <h2 className="pj-portal-h">
                <span className="word">Pain is</span>
                <span className="word complex">complex</span>
              </h2>
              <p className="pj-portal-bridge">We make the path clear.</p>
              <p className="pj-portal-body">
                Six stops. One road. Your story, told the way it actually unfolds —
                from the bumpy uncertainty of the first referral to the steady ground
                of lasting relief.
              </p>
            </div>

            <aside className="pj-portal-aside" aria-hidden="true">
              <p className="pj-portal-stamp">
                06<br/>
                <span style={{ fontSize: "0.4em", opacity: 0.65 }}>stops</span>
              </p>
              <div className="pj-portal-stat">
                <span className="k">Length</span>
                <span className="v">Weeks, not months</span>
              </div>
              <div className="pj-portal-stat">
                <span className="k">Coverage</span>
                <span className="v">OHIP-accepted</span>
              </div>
              <div className="pj-portal-stat">
                <span className="k">Disciplines</span>
                <span className="v">Five, under one roof</span>
              </div>
            </aside>
          </div>

          <div className="pj-portal-foot">
            <button className="pj-hint" onClick={scrollToRoad}>
              Scroll to follow the road
              <span className="arrow" aria-hidden="true"/>
            </button>
            <div className="pj-portal-legend">
              <span>uncertain</span>
              <span className="swatch"/>
              <span>relief</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY ROAD SCROLL ── */}
      <div ref={scrollRef} className="pj-road-scroll" id="road">
        <div ref={stickyRef} className="pj-road-sticky">

          <div className="pj-climate" aria-hidden="true">
            <div className="pj-climate-row">
              <span className="lbl">Terrain</span>
              <span className="val" ref={terrainReadRef}>rough</span>
            </div>
            <div className="pj-climate-row">
              <span className="lbl">Light</span>
              <span className="val" ref={lightReadRef}>overcast</span>
            </div>
            <div className="pj-climate-bar" ref={climateBarRef}/>
          </div>

          <ol className="pj-stop-list" aria-label="Journey stops">
            {MILESTONE_CONTENT.map((c, i) => (
              <li
                key={i}
                ref={el => { stopRefs.current[i] = el }}
                className="pj-stop-item"
              >
                <span className="pj-stop-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pj-stop-title">{c.title}</span>
              </li>
            ))}
          </ol>

          <div ref={sceneRef} className="pj-road-scene">
            {/* Atmospheric backdrop */}
            {/* Fill divs extend above/below the 3200px SVG to cover translateY gaps */}
            <div className="pj-scene-fill pj-scene-fill-top" aria-hidden="true" />
            <div className="pj-scene-fill pj-scene-fill-bot" aria-hidden="true" />

            {/* Road SVG */}
            <svg className="pj-road-svg" width="800" height={SVG_H}
              viewBox={`0 0 800 ${SVG_H}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <radialGradient id="carHalo2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(159,118,87,0.30)"/>
                  <stop offset="100%" stopColor="rgba(159,118,87,0)"/>
                </radialGradient>
              </defs>
              <path ref={pathRef} d={ROAD_TRAVEL_D} fill="none" stroke="none"/>
              <path d={ROAD_OVERLAY_D} fill="none" stroke="#9f7657" strokeOpacity="0.10" strokeWidth="48" strokeLinecap="butt"/>
              <path d={ROAD_OVERLAY_D} fill="none" stroke="#3e3933" strokeOpacity="0.16" strokeWidth="22" strokeLinecap="butt"/>
              <path d={ROAD_OVERLAY_D} fill="none" stroke="#3e3933" strokeOpacity="0.92" strokeWidth="2"  strokeLinecap="butt"/>
              <path d={ROAD_OVERLAY_D} fill="none" stroke="#9f7657" strokeOpacity="0.6"  strokeWidth="1.2" strokeDasharray="6 10" strokeLinecap="butt"/>
              <g ref={dotsRef}/>
              <ellipse ref={carGlowRef} cx="400" cy="0" rx="36" ry="44" fill="url(#carHalo2)" opacity="0"/>
            </svg>

            {/* Car — ink dot with cream ring + clay halo */}
            <div ref={carRef} className="pj-car">
              <svg width="40" height="40" viewBox="-20 -20 40 40" overflow="visible" aria-hidden="true">
                <circle cx="0" cy="0" r="18" fill="#9f7657" fillOpacity="0.18"/>
                <circle cx="0" cy="0" r="11" fill="#f6efe3"/>
                <circle cx="0" cy="0" r="8"  fill="#1f1d1a"/>
                <circle cx="0" cy="0" r="3"  fill="#f6efe3"/>
              </svg>
            </div>
          </div>

          {/* Milestone cards */}
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el }}
              className="pj-mc"
              data-side={m.side}
              data-zone={m.zone}
            >
              <div className="pj-mc-head">
                <span className="pj-mc-num">{m.km}</span>
                <span className="pj-mc-zone">{MILESTONE_CONTENT[i].stop}</span>
              </div>
              <div className="pj-mc-title">{MILESTONE_CONTENT[i].title}</div>
              <p className="pj-mc-desc">{MILESTONE_CONTENT[i].desc}</p>
              <div className="pj-mc-foot">
                <span className="dot" aria-hidden="true"/>
                {MILESTONE_CONTENT[i].foot}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── OUTRO ── */}
      <section className="pj-outro">
        <div className="pj-outro-inner">
          <div className="pj-outro-k">End of chapter one</div>
          <h3 className="pj-outro-h">
            Six stops behind you. <em>Now,</em> the specialties that make each one possible.
          </h3>
          <a href="#specialties" className="pj-outro-cta">Continue · Specialties</a>
        </div>
      </section>
    </>
  )
}
