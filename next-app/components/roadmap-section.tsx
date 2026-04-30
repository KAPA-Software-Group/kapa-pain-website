"use client"

import { useEffect, useRef } from "react"

const SVG_H      = 3200
const SCENE_W    = 1800
const SVG_OFFSET = 500
const CARD_W     = 440
const CARD_GAP   = 100
const ENTRY_EXIT_PORTION = 0.1
const CAR_EXIT_PAD = 90

const ROAD_D = "M 400 0 C 400 180 280 300 250 460 C 220 620 560 700 572 870 C 584 1040 268 1130 238 1300 C 208 1470 545 1555 562 1720 C 579 1885 318 1960 298 2120 C 278 2280 476 2360 490 2520 C 504 2680 400 2820 400 3200"

const NERVE_BRANCHES = [
  "M 388 210 C 300 218 248 252 190 306",
  "M 412 335 C 500 342 560 382 620 448",
  "M 267 552 C 178 562 126 604 76 668",
  "M 470 715 C 562 724 626 768 690 838",
  "M 552 924 C 640 940 694 992 742 1062",
  "M 305 1106 C 218 1120 154 1164 92 1234",
  "M 252 1394 C 166 1410 110 1458 58 1530",
  "M 522 1544 C 612 1560 670 1608 724 1680",
  "M 536 1814 C 624 1834 684 1888 732 1960",
  "M 324 1996 C 236 2014 172 2066 116 2140",
  "M 312 2264 C 226 2284 164 2338 112 2414",
  "M 476 2432 C 566 2452 626 2508 676 2584",
  "M 484 2706 C 572 2728 632 2790 680 2872",
  "M 408 2948 C 318 2970 258 3032 208 3112",
]

type Zone = "storm" | "transition" | "serenity"
const MILESTONES: { km: string; title: string; desc: string; side: "left"|"right"; t: number; zone: Zone }[] = [
  { km: "KM 0",  title: "GP Referral",             desc: "Ask your family physician for a referral. Most treatments are covered by OHIP once referred.",             side: "right", t: 0.07, zone: "storm"      },
  { km: "KM 18", title: "Initial Consultation",     desc: "A specialist reviews your history, symptoms, and imaging — without rush or assumptions.",                  side: "left",  t: 0.24, zone: "storm"      },
  { km: "KM 34", title: "Multidisciplinary Review", desc: "Your case is assessed across five specialties before any path is proposed.",                               side: "right", t: 0.41, zone: "transition" },
  { km: "KM 50", title: "Personalised Care Plan",   desc: "A strategy built around your condition and response — a plan, not a protocol.",                            side: "left",  t: 0.58, zone: "transition" },
  { km: "KM 67", title: "Treatment & Procedures",   desc: "Image-guided injections, regenerative therapy, and integrated care — delivered with precision.",           side: "right", t: 0.75, zone: "serenity"   },
  { km: "KM 83", title: "Monitoring & Adjustment",  desc: "Regular follow-ups track your progress and adjust your plan based on real outcomes.",                      side: "left",  t: 0.92, zone: "serenity"   },
]

const mkRain = (seed: number, n: number) =>
  Array.from({ length: n }, (_, i) => ({
    x:   ((i * 31 + seed * 17) % 1000) - 100,
    y:   ((i * 73 + seed * 29) % 700),
    len: 14 + (i % 5) * 7,
    w:   0.55 + (i % 3) * 0.3,
    op:  0.18 + (i % 5) * 0.07,
  }))
const RAIN_A = mkRain(1, 22)
const RAIN_B = mkRain(7, 18)
const RAIN_C = mkRain(13, 16)

// Sky gradient stops — used to compute sticky background at car's current y
const SKY_STOPS: [number, string][] = [
  [0,    "#0c1018"],
  [0.22, "#0f1622"],
  [0.44, "#1a2638"],
  [0.62, "#2a4a6a"],
  [0.78, "#7fb8d4"],
  [0.88, "#c8e4ee"],
  [1.0,  "#fce4b0"],
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3)
}
function easeInCubic(t: number) {
  return Math.pow(Math.max(0, Math.min(1, t)), 3)
}
function lerpHex(c1: string, c2: string, t: number) {
  const p = (h: string) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]
  const [r1,g1,b1] = p(c1), [r2,g2,b2] = p(c2)
  return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`
}
function skyColor(t: number): string {
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    const [p0, c0] = SKY_STOPS[i], [p1, c1] = SKY_STOPS[i + 1]
    if (t <= p1) return lerpHex(c0, c1, (t - p0) / (p1 - p0))
  }
  return SKY_STOPS[SKY_STOPS.length - 1][1]
}

export function RoadmapSection() {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const sceneRef    = useRef<HTMLDivElement>(null)
  const pathRef     = useRef<SVGPathElement>(null)
  const carRef      = useRef<HTMLDivElement>(null)
  const carGlowRef  = useRef<SVGEllipseElement>(null)
  const dotsRef     = useRef<SVGGElement>(null)
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([])
  const stickyRef   = useRef<HTMLDivElement>(null)
  // bg SVG refs
  const rainRef     = useRef<SVGGElement>(null)
  const fogRef      = useRef<SVGRectElement>(null)
  const sunRef      = useRef<SVGGElement>(null)
  const lightRef    = useRef<SVGEllipseElement>(null)
  const cloudsRef   = useRef<SVGGElement>(null)

  useEffect(() => {
    const path   = pathRef.current
    const car    = carRef.current
    const scene  = sceneRef.current
    const scroll = scrollRef.current
    const sticky = stickyRef.current
    if (!path || !car || !scene || !scroll || !sticky) return

    const roadPath = path
    const roadCar = car
    const roadScene = scene
    const roadScroll = scroll
    const roadSticky = sticky

    const pathLen  = roadPath.getTotalLength()
    const getScale = () => Math.min(1, window.innerWidth / SCENE_W)

    const milestonePoints = MILESTONES.map((m) =>
      roadPath.getPointAtLength(m.t * pathLen)
    )

    dotsRef.current?.replaceChildren()

    MILESTONES.forEach((_m, i) => {
      const pt = milestonePoints[i]
      const dg = dotsRef.current
      if (dg) {
        const outer = document.createElementNS("http://www.w3.org/2000/svg","circle")
        outer.setAttribute("cx",String(pt.x)); outer.setAttribute("cy",String(pt.y))
        outer.setAttribute("r","10"); outer.setAttribute("fill","rgba(245,197,24,0.10)")
        dg.appendChild(outer)
        const inner = document.createElementNS("http://www.w3.org/2000/svg","circle")
        inner.setAttribute("cx",String(pt.x)); inner.setAttribute("cy",String(pt.y))
        inner.setAttribute("r","4.5"); inner.setAttribute("fill","#F5C518"); inner.setAttribute("opacity","0.8")
        dg.appendChild(inner)
      }
    })

    function update() {
      const scale      = getScale()
      const scrollTop  = window.scrollY
      const roadTop    = roadScroll.getBoundingClientRect().top + window.scrollY
      const scrollable = roadScroll.offsetHeight - window.innerHeight
      const progress   = Math.max(0, Math.min(1, (scrollTop - roadTop) / scrollable))

      const carLen = progress * pathLen
      const carPt  = roadPath.getPointAtLength(carLen)
      const p1     = roadPath.getPointAtLength(Math.max(0, carLen - 4))
      const p2     = roadPath.getPointAtLength(Math.min(pathLen, carLen + 4))
      const angle  = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI - 90

      const entryT = progress / ENTRY_EXIT_PORTION
      const exitT = (progress - (1 - ENTRY_EXIT_PORTION)) / ENTRY_EXIT_PORTION
      const carViewportY =
        progress < ENTRY_EXIT_PORTION
          ? lerp(window.innerHeight + CAR_EXIT_PAD, window.innerHeight / 2, easeOutCubic(entryT))
          : progress > 1 - ENTRY_EXIT_PORTION
            ? lerp(window.innerHeight / 2, -CAR_EXIT_PAD, easeInCubic(exitT))
            : window.innerHeight / 2

      const translateY = carViewportY - carPt.y * scale
      const leftOffset = (window.innerWidth - SCENE_W) / 2
      roadScene.style.left            = `${leftOffset}px`
      roadScene.style.transform       = `translateY(${translateY}px) scale(${scale})`
      roadScene.style.transformOrigin = "top center"

      roadCar.style.left      = `${SVG_OFFSET + carPt.x}px`
      roadCar.style.top       = `${carPt.y}px`
      roadCar.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`

      const glow = carGlowRef.current
      if (glow) {
        glow.setAttribute("cx", String(carPt.x))
        glow.setAttribute("cy", String(carPt.y))
        glow.setAttribute("opacity", progress > 0 && progress < 1 ? "1" : "0")
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return

        const pt = milestonePoints[i]
        const anchorX =
          window.innerWidth / 2 + (SVG_OFFSET + pt.x - SCENE_W / 2) * scale
        const anchorY = translateY + pt.y * scale
        const cardW = card.offsetWidth || CARD_W
        const cardH = card.offsetHeight || 150
        const gap = Math.max(28, CARD_GAP * scale)
        const minX = 16
        const maxX = window.innerWidth - cardW - minX
        const rawLeft =
          MILESTONES[i].side === "right"
            ? anchorX + gap
            : anchorX - gap - cardW
        const left = Math.max(minX, Math.min(maxX, rawLeft))
        const top = Math.max(18, Math.min(window.innerHeight - cardH - 18, anchorY - cardH / 2))
        const connector =
          MILESTONES[i].side === "right"
            ? Math.max(0, left - anchorX)
            : Math.max(0, anchorX - (left + cardW))

        card.style.left = `${left}px`
        card.style.top = `${top}px`
        card.style.setProperty("--pj-connector", `${connector}px`)

        if (progress >= MILESTONES[i].t - 0.04) card.classList.add("show")
        else card.classList.remove("show")
      })

      // Sticky background exactly matches bg SVG sky at car's y-position
      roadSticky.style.backgroundColor = skyColor(carPt.y / SVG_H)

      const stormT  = Math.max(0, 1 - progress / 0.42)
      const sereneT = Math.max(0, (progress - 0.52) / 0.48)

      const rain    = rainRef.current;    if (rain)   rain.style.opacity   = String(stormT * 0.9)
      const fog     = fogRef.current;     if (fog)    fog.setAttribute("opacity", String(stormT * 0.25))
      const clouds  = cloudsRef.current;  if (clouds) clouds.style.opacity = String(Math.max(0.04, stormT))
      const sun     = sunRef.current;     if (sun)    sun.style.opacity    = String(sereneT)
      const light   = lightRef.current;   if (light)  light.setAttribute("opacity", String(sereneT * 0.18))
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
      {/* ── INTRO PORTAL ─────────────────────────────────────── */}
      <section className="pj-intro">
        <div className="pj-intro-atmosphere" aria-hidden="true">
          <svg className="pj-intro-mountains" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 320 L0 200 L60 140 L120 200 L180 100 L240 180 L290 80 L340 160 L390 60 L440 140 L490 40 L540 120 L590 30 L640 110 L690 20 L740 95 L795 25 L850 90 L905 15 L960 85 L1010 20 L1060 90 L1120 30 L1180 100 L1240 45 L1300 120 L1360 60 L1440 130 L1440 320 Z" fill="#0a0e18" opacity="0.95"/>
            <path d="M0 320 L0 240 L80 185 L160 240 L220 170 L290 225 L350 165 L420 220 L480 155 L550 210 L610 150 L680 210 L740 160 L810 215 L870 155 L940 210 L1000 158 L1070 215 L1140 165 L1210 220 L1280 170 L1360 225 L1440 185 L1440 320 Z" fill="#070b14" opacity="0.8"/>
          </svg>
        </div>

        <div className="pj-intro-content">
          <div className="pj-intro-label">01 — Your Journey</div>

          <h2 className="pj-intro-h2">
            <span className="pj-intro-line-a">Pain is</span>
            <span className="pj-intro-line-b">complex.</span>
          </h2>

          <p className="pj-intro-bridge">We make the path clear.</p>

          <p className="pj-intro-body">
            Follow us through every milestone — from your first referral to lasting relief.
            Six stops. One road. Your story.
          </p>

          <button className="pj-intro-hint" onClick={scrollToRoad} aria-label="Scroll to journey">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
              <path d="M8 1v14M2 11l6 7 6-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            scroll to follow the road
          </button>
        </div>
      </section>

      {/* ── STICKY ROAD SCROLL ───────────────────────────────── */}
      <div ref={scrollRef} className="pj-road-scroll">
        <div ref={stickyRef} className="pj-road-sticky">
          <div ref={sceneRef} className="pj-road-scene">

            {/* ── Full-width atmosphere (fills entire 1800px scene) ── */}
            <svg
              className="pj-bg-svg"
              height={SVG_H}
              viewBox={`0 0 1800 ${SVG_H}`}
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pjSky" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%"   stopColor="#0c1018"/>
                  <stop offset="22%"  stopColor="#0f1622"/>
                  <stop offset="44%"  stopColor="#1a2638"/>
                  <stop offset="62%"  stopColor="#2a4a6a"/>
                  <stop offset="78%"  stopColor="#7fb8d4"/>
                  <stop offset="88%"  stopColor="#c8e4ee"/>
                  <stop offset="100%" stopColor="#fce4b0"/>
                </linearGradient>
                <linearGradient id="pjGround" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%"   stopColor="#06090e"/>
                  <stop offset="32%"  stopColor="#0c1520"/>
                  <stop offset="56%"  stopColor="#142218"/>
                  <stop offset="74%"  stopColor="#1e4024"/>
                  <stop offset="88%"  stopColor="#3a6e40"/>
                  <stop offset="100%" stopColor="#6aaa68"/>
                </linearGradient>
                <radialGradient id="pjSunHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(255,235,140,0.5)"/>
                  <stop offset="40%"  stopColor="rgba(255,210,80,0.18)"/>
                  <stop offset="100%" stopColor="rgba(255,180,50,0)"/>
                </radialGradient>
                <radialGradient id="pjWarmLight" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(255,215,120,0.28)"/>
                  <stop offset="100%" stopColor="rgba(255,200,80,0)"/>
                </radialGradient>
                <filter id="pjFog" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="16"/>
                </filter>
              </defs>

              {/* Sky + ground fill */}
              <rect x="0" y="0" width="1800" height={SVG_H} fill="url(#pjSky)"/>
              <rect x="0" y="0" width="1800" height={SVG_H} fill="url(#pjGround)" opacity="0.65"/>

              {/* Storm clouds — full width */}
              <g ref={cloudsRef}>
                {/* Left cluster */}
                <ellipse cx="110"  cy="72"  rx="95"  ry="42"  fill="#141c2a"/>
                <ellipse cx="175"  cy="48"  rx="72"  ry="36"  fill="#1a2336"/>
                <ellipse cx="60"   cy="96"  rx="55"  ry="28"  fill="#0f1720"/>
                <ellipse cx="310"  cy="130" rx="100" ry="35"  fill="#111926" opacity="0.75"/>
                {/* Center cluster (around road at x=900) */}
                <ellipse cx="760"  cy="52"  rx="115" ry="50"  fill="#10182a"/>
                <ellipse cx="860"  cy="24"  rx="88"  ry="40"  fill="#182030"/>
                <ellipse cx="700"  cy="76"  rx="68"  ry="30"  fill="#0e1622"/>
                <ellipse cx="1000" cy="140" rx="110" ry="34"  fill="#111928" opacity="0.8"/>
                <ellipse cx="900"  cy="200" rx="90"  ry="28"  fill="#0d1520" opacity="0.65"/>
                {/* Right cluster */}
                <ellipse cx="1340" cy="65"  rx="100" ry="44"  fill="#141c2a"/>
                <ellipse cx="1450" cy="40"  rx="80"  ry="38"  fill="#182030"/>
                <ellipse cx="1280" cy="90"  rx="65"  ry="28"  fill="#0e1622"/>
                <ellipse cx="1600" cy="110" rx="85"  ry="36"  fill="#141c2a"/>
                <ellipse cx="1680" cy="80"  rx="62"  ry="30"  fill="#0f1720"/>
                {/* Lightning hints */}
                <polyline points="222,182 238,222 227,222 246,272" fill="none" stroke="rgba(200,220,255,0.2)" strokeWidth="1.5"/>
                <polyline points="900,152 916,188 903,188 920,228" fill="none" stroke="rgba(200,220,255,0.15)" strokeWidth="1.2"/>
              </g>

              {/* Storm ridges — full 1800px width */}
              <path d="M 0 700 L 0 255 L 100 155 L 220 235 L 340 95 L 450 185 L 540 55 L 640 140 L 720 22 L 820 95 L 900 12 L 980 88 L 1060 18 L 1160 95 L 1260 28 L 1370 105 L 1460 38 L 1570 118 L 1670 48 L 1800 105 L 1800 700 Z" fill="#0a1118" opacity="0.95"/>
              <path d="M 0 840 L 0 450 L 120 368 L 240 445 L 360 328 L 480 408 L 580 295 L 700 375 L 810 262 L 920 345 L 1040 248 L 1160 328 L 1270 235 L 1380 315 L 1490 228 L 1600 308 L 1700 222 L 1800 295 L 1800 840 Z" fill="#081018" opacity="0.78"/>
              <path d="M 0 1080 L 0 760 Q 200 700 400 768 Q 600 828 800 728 Q 1000 628 1200 748 Q 1400 848 1600 748 Q 1700 698 1800 728 L 1800 1080 Z" fill="#0d1820" opacity="0.86"/>

              {/* Transition terrain */}
              <path d="M 0 2060 Q 300 1890 600 1960 Q 900 2030 1200 1890 Q 1500 1750 1800 1850 L 1800 2160 L 0 2160 Z" fill="#162a1c" opacity="0.8"/>
              <path d="M 0 2180 Q 350 2060 700 2120 Q 1050 2180 1350 2040 Q 1600 1930 1800 2010 L 1800 2240 L 0 2240 Z" fill="#1c3622" opacity="0.7"/>

              {/* Serene meadow hills */}
              <path d="M 0 2740 Q 300 2590 600 2650 Q 900 2710 1200 2570 Q 1500 2430 1800 2560 L 1800 3200 L 0 3200 Z" fill="#2d5c32" opacity="0.75"/>
              <path d="M 0 2900 Q 360 2790 720 2850 Q 1080 2910 1400 2770 Q 1620 2680 1800 2750 L 1800 3200 L 0 3200 Z" fill="#3e7044" opacity="0.84"/>
              <path d="M 0 3070 Q 450 2995 900 3030 Q 1350 3065 1800 2970 L 1800 3200 L 0 3200 Z" fill="#558c5a" opacity="0.9"/>
              <path d="M 0 3140 Q 500 3095 900 3118 Q 1300 3142 1800 3100 L 1800 3200 L 0 3200 Z" fill="#6aa870" opacity="0.65"/>

              {/* Sun glow (right of road in clear sky area) */}
              <g ref={sunRef} style={{ opacity: 0 }}>
                <ellipse cx="1400" cy="2680" rx="300" ry="300" fill="url(#pjSunHalo)"/>
                <ellipse cx="1400" cy="2680" rx="60"  ry="60"  fill="rgba(255,240,160,0.18)"/>
                {Array.from({ length: 10 }, (_, i) => {
                  const a = (i * 36) * Math.PI / 180
                  return <line key={i} x1={1400+Math.cos(a)*75} y1={2680+Math.sin(a)*75} x2={1400+Math.cos(a)*175} y2={2680+Math.sin(a)*175} stroke="rgba(255,220,100,0.11)" strokeWidth="18" strokeLinecap="round"/>
                })}
                <ellipse cx="900" cy="3060" rx="480" ry="130" fill="rgba(255,210,100,0.055)"/>
              </g>

              {/* Warm ground wash */}
              <ellipse ref={lightRef} cx="900" cy={SVG_H * 0.88} rx="700" ry="240" fill="url(#pjWarmLight)" opacity="0"/>

              {/* Storm fog */}
              <rect ref={fogRef} x="0" y="0" width="1800" height="1300" fill="#8ab5cc" opacity="0.18" filter="url(#pjFog)"/>
            </svg>

            {/* ── Road SVG (800px, offset 500px — only road + rain) ── */}
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
                  <stop offset="0%"   stopColor="rgba(245,197,24,0.22)"/>
                  <stop offset="100%" stopColor="rgba(245,197,24,0)"/>
                </radialGradient>
                <linearGradient id="pjSpineBone" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff5dc"/>
                  <stop offset="46%" stopColor="#d8b982"/>
                  <stop offset="100%" stopColor="#8a6335"/>
                </linearGradient>
                <linearGradient id="pjSpineCord" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(165,210,235,0.84)"/>
                  <stop offset="48%" stopColor="rgba(245,197,24,0.92)"/>
                  <stop offset="100%" stopColor="rgba(255,244,200,0.9)"/>
                </linearGradient>
                <linearGradient id="pjNerveStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(245,197,24,0.56)"/>
                  <stop offset="100%" stopColor="rgba(165,210,235,0)"/>
                </linearGradient>
                <clipPath id="pjStormClip">
                  <rect x="-200" y="-100" width="1200" height="1900"/>
                </clipPath>
              </defs>

              {/* Rain */}
              <g ref={rainRef} clipPath="url(#pjStormClip)">
                <g className="pj-rain-a">
                  {RAIN_A.map((d,i) => <line key={i} x1={d.x} y1={d.y} x2={d.x-4} y2={d.y+d.len} stroke={`rgba(160,205,235,${d.op})`} strokeWidth={d.w} strokeLinecap="round"/>)}
                </g>
                <g className="pj-rain-b">
                  {RAIN_B.map((d,i) => <line key={i} x1={d.x} y1={d.y} x2={d.x-4} y2={d.y+d.len} stroke={`rgba(140,190,225,${d.op})`} strokeWidth={d.w} strokeLinecap="round"/>)}
                </g>
                <g className="pj-rain-c">
                  {RAIN_C.map((d,i) => <line key={i} x1={d.x} y1={d.y} x2={d.x-4} y2={d.y+d.len} stroke={`rgba(180,215,240,${d.op})`} strokeWidth={d.w} strokeLinecap="round"/>)}
                </g>
              </g>

              {/* Reference path (invisible) */}
              <path ref={pathRef} d={ROAD_D} fill="none" stroke="none"/>

              {/* Road */}
              <path d={ROAD_D} fill="none" stroke="rgba(80,55,15,0.6)"     strokeWidth="116" strokeLinecap="butt"/>
              <path d={ROAD_D} fill="none" stroke="#332510"                 strokeWidth="94"  strokeLinecap="butt"/>
              <path d={ROAD_D} fill="none" stroke="rgba(255,225,160,0.16)" strokeWidth="94"  strokeLinecap="butt"/>
              <path d={ROAD_D} fill="none" stroke="#281e0d"                 strokeWidth="86"  strokeLinecap="butt"/>
              <path d={ROAD_D} fill="none" stroke="#F5C518" strokeWidth="3" strokeDasharray="28 18" strokeLinecap="round"/>

              <g ref={dotsRef}/>
              <ellipse ref={carGlowRef} cx="400" cy="0" rx="46" ry="56" fill="url(#pjCarGlow)" opacity="0"/>
            </svg>

            {/* Car */}
            <div ref={carRef} className="pj-car">
              <svg width="32" height="50" viewBox="-16 -25 32 50" overflow="visible">
                <rect x="-9"  y="-18" width="18" height="34" rx="5" fill="rgba(0,0,0,0.35)" transform="translate(1,2)"/>
                <rect x="-9"  y="-18" width="18" height="34" rx="5" fill="#cdd8d0"/>
                <rect x="-6"  y="-15" width="12" height="11" rx="2.5" fill="#162a1e" opacity="0.92"/>
                <rect x="-5"  y="-14" width="4"  height="3"  rx="1"   fill="rgba(255,255,255,0.12)"/>
                <rect x="-5"  y="6"   width="10" height="7"  rx="2"   fill="#162a1e" opacity="0.68"/>
                <rect x="-14" y="-14" width="6"  height="9"  rx="2"   fill="#0c0c0c"/>
                <rect x="8"   y="-14" width="6"  height="9"  rx="2"   fill="#0c0c0c"/>
                <rect x="-14" y="7"   width="6"  height="9"  rx="2"   fill="#0c0c0c"/>
                <rect x="8"   y="7"   width="6"  height="9"  rx="2"   fill="#0c0c0c"/>
                <ellipse cx="-4"   cy="-20" rx="2.8" ry="2"   fill="rgba(255,235,160,0.7)"/>
                <ellipse cx="4"    cy="-20" rx="2.8" ry="2"   fill="rgba(255,235,160,0.7)"/>
                <ellipse cx="-4.5" cy="17"  rx="2"   ry="1.5" fill="rgba(200,60,60,0.5)"/>
                <ellipse cx="4.5"  cy="17"  rx="2"   ry="1.5" fill="rgba(200,60,60,0.5)"/>
              </svg>
            </div>

          </div>

          {/* Milestone cards are positioned in viewport space from the road path. */}
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el }}
              className={`pj-mc pj-mc--${m.side}`}
              data-zone={m.zone}
            >
              <div className="pj-mc-km">{m.km}</div>
              <div className="pj-mc-title">{m.title}</div>
              <p className="pj-mc-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pj-bridge" aria-hidden="true"/>
    </>
  )
}
