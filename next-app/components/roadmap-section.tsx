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

const MILESTONES: { t: number; side: "left"|"right"; zone: string }[] = [
  { t:0.05, side:"right", zone:"The first mile" },
  { t:0.22, side:"left",  zone:"Listening" },
  { t:0.39, side:"right", zone:"Many minds" },
  { t:0.56, side:"left",  zone:"A path of your own" },
  { t:0.74, side:"right", zone:"Precision" },
  { t:0.92, side:"left",  zone:"Lasting relief" },
]

const CARE_DISCIPLINES = [
  "Interventional Radiology",
  "Chronic Pain Specialists",
  "Orthopaedic Surgeons",
]

const MILESTONE_CONTENT = [
  { title:"GP referral",              desc:"Ask your family physician for a referral. Most treatments are covered by OHIP once referred — no out-of-pocket starting line.",       foot:"Day 1 · paperwork-free for you" },
  { title:"Initial consultation",     desc:"A specialist reviews your history, symptoms, and imaging — without rush or assumptions. The conversation that should have happened sooner.", foot:"Average visit · 45 minutes" },
  { title:"Multidisciplinary review", desc:"Your case is assessed across five specialties before any path is proposed. Five sets of eyes; one coherent plan.",                    foot:"Five disciplines · one room" },
  { title:"Personalised care plan",   desc:"A strategy built around your condition and response — a plan, not a protocol. Adjusted as we learn what your body answers to.",       foot:"Built for you, not from a template" },
  { title:"Treatment & procedures",   desc:"Image-guided injections, regenerative therapy, and integrated care — delivered at the source, with millimetric precision.",           foot:"Onsite fluoroscopy & ultrasound" },
  { title:"Monitoring & adjustment",  desc:"Regular follow-ups track your progress and adjust your plan based on real outcomes. Care that doesn't end at the procedure.",         foot:"Outcomes reviewed · quarterly" },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t))
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

  const veilRef = useRef<HTMLDivElement>(null)
  const introGateReleasedRef = useRef(false)
  const releaseIntroGateRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const intro = document.querySelector(".pj-intro") as HTMLElement | null
    const road = scrollRef.current
    const veil = veilRef.current
    if (!intro || !road || !veil) return

    const COVER_MS = 460
    const HOLD_MS = 90
    const CLEAR_MS = 720
    const END_SLOP = 2
    const GESTURE_QUIET_MS = 46
    let isAnimating = false
    let cooldown = 0
    let gateHeld = false
    let lastGateInputAt = 0
    let lastScrollY = window.scrollY
    let touchStartedAfterHold = false

    const scrollWithoutSmooth = (targetTop: number) => {
      const prev = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = "auto"
      window.scrollTo({ top: targetTop, left: 0 })
      document.documentElement.style.scrollBehavior = prev
    }

    const runTransition = (targetTop: number) => {
      if (isAnimating || Date.now() - cooldown < 200) return
      gateHeld = false
      isAnimating = true
      introGateReleasedRef.current = true
      veil.classList.remove("clearing")
      // force reflow so re-adding 'covering' restarts transitions
      void veil.offsetWidth
      veil.classList.add("covering")
      window.setTimeout(() => {
        road.style.visibility = ""
        scrollWithoutSmooth(targetTop)
        window.setTimeout(() => {
          veil.classList.remove("covering")
          veil.classList.add("clearing")
          window.setTimeout(() => {
            veil.classList.remove("clearing")
            isAnimating = false
            cooldown = Date.now()
          }, CLEAR_MS)
        }, HOLD_MS)
      }, COVER_MS)
    }

    const getIntroEndTop = () =>
      intro.offsetTop + intro.offsetHeight - window.innerHeight

    const snapToIntroEnd = () => {
      scrollWithoutSmooth(getIntroEndTop())
    }

    const holdAtIntroEnd = () => {
      const wasHeld = gateHeld
      gateHeld = true
      introGateReleasedRef.current = false
      touchStartedAfterHold = false
      snapToIntroEnd()
      if (!wasHeld) {
        road.style.visibility = "hidden"
      }
      lastGateInputAt = performance.now()
      lastScrollY = getIntroEndTop()
    }

    const releaseIntroHold = () => {
      gateHeld = false
      road.style.visibility = ""
    }
    releaseIntroGateRef.current = releaseIntroHold

    const normalizeWheelDeltaY = (e: WheelEvent) => {
      if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) return e.deltaY * 16
      if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) return e.deltaY * window.innerHeight
      return e.deltaY
    }

    const shouldCatchIntroEnd = (deltaY: number) => {
      const introEndTop = getIntroEndTop()
      return window.scrollY < introEndTop - END_SLOP &&
        window.scrollY + deltaY >= introEndTop - END_SLOP
    }

    const atIntroEndGate = () => {
      const introEndTop = getIntroEndTop()
      const roadTop = intro.offsetTop + intro.offsetHeight
      const y = window.scrollY

      return y >= introEndTop - END_SLOP && y < roadTop - END_SLOP
    }

    const onWheel = (e: WheelEvent) => {
      if (isAnimating) { e.preventDefault(); return }
      const deltaY = normalizeWheelDeltaY(e)

      if (gateHeld) {
        e.preventDefault()
        const now = performance.now()
        const isFreshScroll = now - lastGateInputAt >= GESTURE_QUIET_MS
        lastGateInputAt = now
        if (deltaY < 0) {
          const targetTop = Math.max(0, getIntroEndTop() + deltaY)
          releaseIntroHold()
          introGateReleasedRef.current = false
          scrollWithoutSmooth(targetTop)
          lastScrollY = window.scrollY
          return
        }
        snapToIntroEnd()
        if (deltaY > 0 && isFreshScroll) {
          runTransition(intro.offsetTop + intro.offsetHeight)
        }
        return
      }

      if (deltaY > 0 && shouldCatchIntroEnd(deltaY)) {
        e.preventDefault()
        holdAtIntroEnd()
        return
      }

      // At the end of Pain is Complex, hold the image until a second scroll starts the transition.
      if (deltaY > 0 && atIntroEndGate()) {
        e.preventDefault()
        holdAtIntroEnd()
        return
      }
    }

    const DOWN_KEYS = new Set(["PageDown", "ArrowDown", "Space", " ", "End"])
    const UP_KEYS = new Set(["PageUp", "ArrowUp", "Home"])
    const onKey = (e: KeyboardEvent) => {
      if (isAnimating) { e.preventDefault(); return }
      if (gateHeld) {
        if (UP_KEYS.has(e.key)) {
          e.preventDefault()
          releaseIntroHold()
          introGateReleasedRef.current = false
          scrollWithoutSmooth(Math.max(0, getIntroEndTop() - window.innerHeight * 0.75))
        } else if (DOWN_KEYS.has(e.key)) {
          e.preventDefault()
          snapToIntroEnd()
          if (!e.repeat) runTransition(intro.offsetTop + intro.offsetHeight)
        }
        return
      }
      if (DOWN_KEYS.has(e.key) && shouldCatchIntroEnd(window.innerHeight)) {
        e.preventDefault()
        holdAtIntroEnd()
      } else if (DOWN_KEYS.has(e.key) && atIntroEndGate()) {
        e.preventDefault()
        holdAtIntroEnd()
      }
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
      if (gateHeld) touchStartedAfterHold = true
    }
    const onTouchMove = (e: TouchEvent) => {
      if (isAnimating) { e.preventDefault(); return }
      const dy = touchStartY - (e.touches[0]?.clientY ?? 0)
      if (Math.abs(dy) < 14) return
      if (gateHeld) {
        e.preventDefault()
        if (dy < 0) {
          releaseIntroHold()
          introGateReleasedRef.current = false
          scrollWithoutSmooth(Math.max(0, getIntroEndTop() + dy))
          touchStartY = e.touches[0]?.clientY ?? touchStartY
          lastScrollY = window.scrollY
          return
        }
        snapToIntroEnd()
        if (touchStartedAfterHold) {
          runTransition(intro.offsetTop + intro.offsetHeight)
        }
        touchStartY = e.touches[0]?.clientY ?? touchStartY
        return
      }
      if (dy > 0 && shouldCatchIntroEnd(dy)) {
        e.preventDefault()
        holdAtIntroEnd()
      } else if (dy > 0 && atIntroEndGate()) {
        e.preventDefault()
        holdAtIntroEnd()
        touchStartY = e.touches[0]?.clientY ?? touchStartY
      }
    }

    const keepIntroEndCovered = () => {
      if (isAnimating) return
      const introEndTop = getIntroEndTop()
      const y = window.scrollY
      const scrollingDown = y > lastScrollY

      if (y <= introEndTop - END_SLOP) {
        releaseIntroHold()
        introGateReleasedRef.current = false
      } else if (!introGateReleasedRef.current && scrollingDown && y > introEndTop + END_SLOP) {
        holdAtIntroEnd()
        return
      }

      lastScrollY = window.scrollY
    }

    let pendingScrollCheck = false
    const onScroll = () => {
      if (pendingScrollCheck) return
      pendingScrollCheck = true
      requestAnimationFrame(() => {
        pendingScrollCheck = false
        keepIntroEndCovered()
      })
    }

    window.addEventListener("wheel", onWheel, { passive: false, capture: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })
    window.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      road.style.visibility = ""
      releaseIntroGateRef.current = null
      window.removeEventListener("wheel", onWheel, true)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove, true)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const scrollToRoad = () => {
    const intro = document.querySelector(".pj-intro") as HTMLElement | null
    const road = scrollRef.current
    const veil = veilRef.current
    if (!intro || !road || !veil) return
    releaseIntroGateRef.current?.()
    introGateReleasedRef.current = true
    veil.classList.remove("clearing")
    void veil.offsetWidth
    veil.classList.add("covering")
    window.setTimeout(() => {
      const prev = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = "auto"
      window.scrollTo({ top: intro.offsetTop + intro.offsetHeight, left: 0 })
      document.documentElement.style.scrollBehavior = prev
      window.setTimeout(() => {
        veil.classList.remove("covering")
        veil.classList.add("clearing")
        window.setTimeout(() => veil.classList.remove("clearing"), 720)
      }, 90)
    }, 460)
  }

  return (
    <>
      {/* ── CLOUD VEIL — transition between intro and road ── */}
      <div ref={veilRef} className="pj-cloud-veil" aria-hidden="true">
        <div className="pj-cloud-base" />
        <div className="pj-cloud-layer pj-cloud-l1" />
        <div className="pj-cloud-layer pj-cloud-l2" />
        <div className="pj-cloud-layer pj-cloud-l3" />
        <div className="pj-cloud-layer pj-cloud-l4" />
        <img
          src="/media/logo/Logo.png"
          alt=""
          className="pj-cloud-logo"
          aria-hidden="true"
        />
      </div>

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

          <div className="pj-intro-rule" aria-hidden="true" />

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
            </aside>
          </div>

          <div className="pj-portal-foot">
            <button className="pj-hint" onClick={scrollToRoad}>
              Scroll to follow the road
              <span className="arrow" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </section>

      {/* ── STICKY ROAD SCROLL ── */}
      <div ref={scrollRef} className="pj-road-scroll" id="road">
        <div ref={stickyRef} className="pj-road-sticky">

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
                <span className="pj-mc-num">Step {i + 1}</span>
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
