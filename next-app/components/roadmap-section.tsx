"use client"

import { useEffect, useRef } from "react"

const SVG_H      = 1600
const SCENE_W    = 1800
const SVG_OFFSET = 500
const CARD_GAP   = 80

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
  const stickyRef      = useRef<HTMLDivElement>(null)
  const sunRef         = useRef<SVGGElement>(null)
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
    const getScale = () => Math.min(1, Math.max(0.45, window.innerWidth / SCENE_W))
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

      const viewportAnchorY = lerp(0, window.innerHeight, p)
      const translateY = viewportAnchorY - carPt.y * scale
      const leftOffset = (window.innerWidth - SCENE_W) / 2
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
        const anchorX = window.innerWidth / 2 + (SVG_OFFSET + pt.x - SCENE_W / 2) * scale
        const anchorY = translateY + pt.y * scale
        const cardW   = card.offsetWidth || 360
        const cardH   = card.offsetHeight || 180
        const gap     = Math.max(28, CARD_GAP * scale)
        const minX    = 16
        const maxX    = window.innerWidth - cardW - minX
        const rawLeft = m.side === "right" ? anchorX + gap : anchorX - gap - cardW
        const left    = Math.max(minX, Math.min(maxX, rawLeft))
        const tp      = Math.max(80, Math.min(window.innerHeight - cardH - 80, anchorY - cardH / 2))
        card.style.left = `${left}px`
        card.style.top  = `${tp}px`
        if (p >= m.t - 0.07 && p <= m.t + 0.09) card.classList.add("show")
        else card.classList.remove("show")
      })


      const sun = sunRef.current
      if (sun) sun.setAttribute("opacity", String(Math.min(1, Math.max(0, (p - 0.50) / 0.45)) * 0.95))

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
    }

    let pending = false
    const onScroll = () => {
      if (!pending) { requestAnimationFrame(() => { update(); pending = false }); pending = true }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", update)
    }
  }, [])

  const scrollToRoad = () => scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <>
      {/* ── INTRO PORTAL ── */}
      <section className="pj-intro" id="journey">
        <div className="pj-intro-grid">
          <div className="pj-intro-meta">
            <span className="pj-intro-meta-label">02 — Your Journey</span>
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

          <div ref={sceneRef} className="pj-road-scene">
            {/* Atmospheric backdrop */}
            {/* Fill divs extend above/below the 3200px SVG to cover translateY gaps */}
            <div className="pj-scene-fill pj-scene-fill-top" aria-hidden="true" />
            <div className="pj-scene-fill pj-scene-fill-bot" aria-hidden="true" />

            <svg className="pj-bg-svg" viewBox="0 0 1800 3200" preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1800" height={SVG_H}>
              <defs>
                <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#d8d2c4"/>
                  <stop offset="18%"  stopColor="#dfd8c8"/>
                  <stop offset="40%"  stopColor="#e6dccc"/>
                  <stop offset="62%"  stopColor="#ecddc7"/>
                  <stop offset="82%"  stopColor="#f0dcbe"/>
                  <stop offset="100%" stopColor="#f3d8b0"/>
                </linearGradient>
                <radialGradient id="coolHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(76,72,66,0.32)"/>
                  <stop offset="100%" stopColor="rgba(76,72,66,0)"/>
                </radialGradient>
                <radialGradient id="sunHalo2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(220,180,120,0.45)"/>
                  <stop offset="50%"  stopColor="rgba(180,140,90,0.18)"/>
                  <stop offset="100%" stopColor="rgba(150,110,70,0)"/>
                </radialGradient>
                <filter id="paperGrain2">
                  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={5}/>
                  <feColorMatrix values="0 0 0 0 0.3 0 0 0 0 0.27 0 0 0 0 0.22 0 0 0 0.06 0"/>
                  <feComposite in2="SourceGraphic" operator="in"/>
                </filter>
                <pattern id="cracks2" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 0 12 L 16 18 L 22 6 M 30 28 L 44 22 L 52 38 M 12 50 L 28 42 L 36 56"
                    stroke="rgba(62,57,51,0.18)" strokeWidth="0.6" fill="none"/>
                </pattern>
              </defs>

              <rect width="1800" height="3200" fill="url(#paperGrad)"/>

              {/* EARLY ZONE: cold, rough, jagged */}
              <ellipse cx="900" cy="200" rx="1300" ry="700" fill="url(#coolHalo)" opacity="0.7"/>
              <ellipse cx="600" cy="500" rx="800"  ry="500" fill="url(#coolHalo)" opacity="0.5"/>
              <g opacity="0.85">
                <path d="M 0 480 L 80 380 L 130 460 L 200 320 L 260 420 L 320 280 L 400 410 L 470 290 L 540 400 L 620 260 L 700 410 L 780 290 L 860 420 L 940 270 L 1020 400 L 1100 300 L 1180 420 L 1260 280 L 1340 410 L 1420 320 L 1500 430 L 1580 290 L 1660 420 L 1740 340 L 1800 400 L 1800 600 L 0 600 Z"
                  fill="#3e3933" fillOpacity="0.34"/>
                <path d="M 0 580 L 100 500 L 180 560 L 260 460 L 340 540 L 420 440 L 510 540 L 590 470 L 680 540 L 770 450 L 860 540 L 950 470 L 1040 540 L 1130 460 L 1220 540 L 1310 470 L 1400 540 L 1490 460 L 1580 540 L 1680 480 L 1800 540 L 1800 700 L 0 700 Z"
                  fill="#3e3933" fillOpacity="0.22"/>
              </g>
              <rect x="0" y="600" width="1800" height="500" fill="url(#cracks2)" opacity="0.5"/>
              <g fill="none" opacity="0.65">
                <path d="M 220 760 L 220 700 M 220 720 L 200 695 M 220 730 L 240 700 M 220 745 L 205 720"
                  stroke="rgba(62,57,51,0.5)" strokeWidth="1.2"/>
                <path d="M 980 880 L 980 810 M 980 830 L 958 800 M 980 840 L 1002 808 M 980 855 L 962 832"
                  stroke="rgba(62,57,51,0.5)" strokeWidth="1.2"/>
                <path d="M 1340 980 L 1340 920 M 1340 940 L 1318 912 M 1340 950 L 1360 920"
                  stroke="rgba(62,57,51,0.5)" strokeWidth="1.2"/>
                <path d="M 320 1100 L 320 1030 M 320 1050 L 298 1020 M 320 1060 L 342 1028"
                  stroke="rgba(62,57,51,0.5)" strokeWidth="1.2"/>
              </g>
              <g fill="rgba(62,57,51,0.4)">
                <ellipse cx="180"  cy="1080" rx="14" ry="6"/>
                <ellipse cx="280"  cy="1180" rx="10" ry="5"/>
                <ellipse cx="1080" cy="1240" rx="16" ry="7"/>
                <ellipse cx="1480" cy="1120" rx="12" ry="6"/>
                <ellipse cx="540"  cy="900"  rx="9"  ry="4"/>
                <ellipse cx="1280" cy="940"  rx="11" ry="5"/>
              </g>

              {/* MIDDLE ZONE: transition */}
              <g opacity="0.6">
                <path d="M 0 1700 Q 240 1620 480 1670 T 960 1680 T 1440 1670 T 1800 1672 L 1800 1820 L 0 1820 Z"
                  fill="#9f7657" fillOpacity="0.10"/>
                <path d="M 0 1780 Q 220 1720 460 1758 T 920 1760 T 1380 1758 T 1800 1750 L 1800 1820 L 0 1820 Z"
                  fill="#9f7657" fillOpacity="0.08"/>
              </g>
              <g opacity="0.5">
                <path d="M 200 1680 L 200 1620 M 200 1640 Q 188 1632 192 1620 M 200 1640 Q 212 1632 208 1620 M 200 1656 Q 188 1648 192 1636 M 200 1656 Q 212 1648 208 1636"
                  stroke="rgba(62,57,51,0.4)" strokeWidth="1" fill="none"/>
                <path d="M 1500 1720 L 1500 1660 M 1500 1680 Q 1488 1672 1492 1660 M 1500 1680 Q 1512 1672 1508 1660 M 1500 1696 Q 1488 1688 1492 1676"
                  stroke="rgba(62,57,51,0.4)" strokeWidth="1" fill="none"/>
              </g>

              {/* LATE ZONE: warm, lush, sun */}
              <g ref={sunRef} opacity={0}>
                <ellipse cx="1280" cy="2620" rx="520" ry="380" fill="url(#sunHalo2)"/>
                <ellipse cx="1280" cy="2620" rx="120" ry="120" fill="rgba(230,190,130,0.25)"/>
                <g stroke="rgba(220,180,120,0.18)" strokeWidth="14" strokeLinecap="round">
                  <line x1="1280" y1="2480" x2="1280" y2="2380"/>
                  <line x1="1380" y1="2520" x2="1460" y2="2460"/>
                  <line x1="1180" y1="2520" x2="1100" y2="2460"/>
                  <line x1="1420" y1="2620" x2="1520" y2="2620"/>
                  <line x1="1140" y1="2620" x2="1040" y2="2620"/>
                </g>
              </g>
              <g opacity="0.85">
                <path d="M 0 2540 Q 300 2400 620 2480 T 1180 2470 T 1620 2510 T 1800 2490 L 1800 2700 L 0 2700 Z" fill="#9f7657" fillOpacity="0.13"/>
                <path d="M 0 2680 Q 280 2580 580 2630 T 1140 2620 T 1580 2650 T 1800 2640 L 1800 2820 L 0 2820 Z" fill="#9f7657" fillOpacity="0.16"/>
                <path d="M 0 2820 Q 320 2740 640 2780 T 1240 2770 T 1640 2790 T 1800 2780 L 1800 2940 L 0 2940 Z" fill="#9f7657" fillOpacity="0.20"/>
                <path d="M 0 2980 Q 360 2900 720 2940 T 1320 2930 T 1800 2920 L 1800 3100 L 0 3100 Z" fill="#9f7657" fillOpacity="0.24"/>
              </g>
              {/* Lush trees */}
              <g>
                <g transform="translate(220 2620)">
                  <path d="M 0 0 L 0 -38" stroke="rgba(62,57,51,0.55)" strokeWidth="1.6"/>
                  <ellipse cx="0"  cy="-46" rx="22" ry="18" fill="rgba(159,118,87,0.45)"/>
                  <ellipse cx="-8" cy="-42" rx="14" ry="12" fill="rgba(159,118,87,0.55)"/>
                  <ellipse cx="9"  cy="-50" rx="14" ry="12" fill="rgba(159,118,87,0.40)"/>
                </g>
                <g transform="translate(380 2700)">
                  <path d="M 0 0 L 0 -32" stroke="rgba(62,57,51,0.5)" strokeWidth="1.4"/>
                  <ellipse cx="0" cy="-38" rx="18" ry="15" fill="rgba(159,118,87,0.5)"/>
                </g>
                <g transform="translate(620 2780)">
                  <path d="M 0 0 L 0 -42" stroke="rgba(62,57,51,0.55)" strokeWidth="1.6"/>
                  <ellipse cx="0"   cy="-50" rx="24" ry="20" fill="rgba(159,118,87,0.48)"/>
                  <ellipse cx="-10" cy="-46" rx="14" ry="13" fill="rgba(159,118,87,0.58)"/>
                  <ellipse cx="11"  cy="-54" rx="14" ry="13" fill="rgba(159,118,87,0.42)"/>
                </g>
                <g transform="translate(1480 2660)">
                  <path d="M 0 0 L 0 -36" stroke="rgba(62,57,51,0.55)" strokeWidth="1.5"/>
                  <ellipse cx="0"  cy="-42" rx="20" ry="17" fill="rgba(159,118,87,0.46)"/>
                  <ellipse cx="-7" cy="-38" rx="12" ry="11" fill="rgba(159,118,87,0.56)"/>
                </g>
                <g transform="translate(1620 2780)">
                  <path d="M 0 0 L 0 -40" stroke="rgba(62,57,51,0.5)" strokeWidth="1.5"/>
                  <ellipse cx="0" cy="-46" rx="20" ry="18" fill="rgba(159,118,87,0.48)"/>
                </g>
                <g transform="translate(1240 2860)">
                  <path d="M 0 0 L 0 -34" stroke="rgba(62,57,51,0.5)" strokeWidth="1.4"/>
                  <ellipse cx="0" cy="-40" rx="16" ry="14" fill="rgba(159,118,87,0.5)"/>
                </g>
              </g>
              {/* Wildflowers */}
              <g fill="rgba(159,118,87,0.6)" opacity="0.7">
                <circle cx="240"  cy="2860" r="2.5"/><circle cx="280"  cy="2890" r="2"/>
                <circle cx="340"  cy="2920" r="2.5"/><circle cx="540"  cy="2950" r="2"/>
                <circle cx="800"  cy="2920" r="2.5"/><circle cx="980"  cy="2960" r="2"/>
                <circle cx="1100" cy="2940" r="2.5"/><circle cx="1320" cy="2970" r="2"/>
                <circle cx="1540" cy="2940" r="2.5"/><circle cx="1700" cy="2970" r="2"/>
                <circle cx="160"  cy="2940" r="2"/>  <circle cx="420"  cy="2970" r="2.5"/>
                <circle cx="700"  cy="3010" r="2"/>  <circle cx="1180" cy="3020" r="2.5"/>
                <circle cx="1480" cy="3010" r="2"/>
              </g>
              {/* Birds */}
              <g stroke="rgba(62,57,51,0.5)" strokeWidth="1.4" fill="none" opacity="0.7">
                <path d="M 1100 2400 Q 1108 2394 1116 2400 Q 1124 2394 1132 2400"/>
                <path d="M 1180 2360 Q 1186 2356 1192 2360 Q 1198 2356 1204 2360"/>
                <path d="M 980 2440 Q 988 2434 996 2440 Q 1004 2434 1012 2440"/>
              </g>
              <rect width="1800" height="3200" filter="url(#paperGrain2)" opacity="0.20"/>
            </svg>

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

            {/* Car — ink dot with clay halo */}
            <div ref={carRef} className="pj-car">
              <svg width="22" height="22" viewBox="-11 -11 22 22" overflow="visible" aria-hidden="true">
                <circle cx="0" cy="0" r="9"   fill="#9f7657" fillOpacity="0.20"/>
                <circle cx="0" cy="0" r="5.5" fill="#3e3933"/>
                <circle cx="0" cy="0" r="2.2" fill="#f6efe3"/>
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
