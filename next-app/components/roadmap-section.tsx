"use client"

import { useEffect, useRef } from "react"

const FRAME_COUNT = 149
const FRAME_PATH = (i: number) =>
  `/media/road-scrub-frames/f${String(i).padStart(3, "0")}.webp`

// Six evenly-spaced milestone stops across the scrub: 1/7, 2/7, ..., 6/7
const MILESTONES = [
  { t: 1 / 7, title: "GP referral",              desc: "Ask your family physician for a referral. Most treatments are covered by OHIP once referred — no out-of-pocket starting line.",       foot: "Day 1 · paperwork-free for you" },
  { t: 2 / 7, title: "Initial consultation",     desc: "A specialist reviews your history, symptoms, and imaging — without rush or assumptions. The conversation that should have happened sooner.", foot: "Average visit · 45 minutes" },
  { t: 3 / 7, title: "Multidisciplinary review", desc: "Your case is assessed across five specialties before any path is proposed. Five sets of eyes; one coherent plan.",                       foot: "Five disciplines · one room" },
  { t: 4 / 7, title: "Personalised care plan",   desc: "A strategy built around your condition and response — a plan, not a protocol. Adjusted as we learn what your body answers to.",         foot: "Built for you, not from a template" },
  { t: 5 / 7, title: "Treatment & procedures",   desc: "Image-guided injections, regenerative therapy, and integrated care — delivered at the source, with millimetric precision.",             foot: "Onsite fluoroscopy & ultrasound" },
  { t: 6 / 7, title: "Monitoring & adjustment",  desc: "Regular follow-ups track your progress and adjust your plan based on real outcomes. Care that doesn't end at the procedure.",           foot: "Outcomes reviewed · quarterly" },
]

// Show window around each milestone t
const SHOW_BEFORE = 0.04
const SHOW_AFTER = 0.10

export function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const drawnIndexRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const stopRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const imgs: HTMLImageElement[] = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = "async"
      img.src = FRAME_PATH(i)
      if (i === 1) {
        img.onload = () => drawFrame(0)
      }
      imgs.push(img)
    }
    framesRef.current = imgs

    const drawFrame = (idx: number) => {
      const canvas = canvasRef.current
      const img = framesRef.current[idx]
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return
      if (drawnIndexRef.current === idx) return
      const ctx = canvas.getContext("2d", { alpha: false })
      if (!ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      const targetW = Math.round(cw * dpr)
      const targetH = Math.round(ch * dpr)
      if (canvas.width !== targetW) canvas.width = targetW
      if (canvas.height !== targetH) canvas.height = targetH
      const ir = img.naturalWidth / img.naturalHeight
      const cr = targetW / targetH
      let dw = targetW
      let dh = targetH
      if (ir > cr) dw = targetH * ir
      else dh = targetW / ir
      const dx = (targetW - dw) / 2
      const dy = (targetH - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
      drawnIndexRef.current = idx
    }

    const computeProgress = () => {
      const container = containerRef.current
      if (!container) return 0
      const rect = container.getBoundingClientRect()
      const viewport = window.innerHeight
      const scrollable = rect.height - viewport
      if (scrollable <= 0) return 0
      return Math.max(0, Math.min(1, -rect.top / scrollable))
    }

    const applyMilestones = (p: number) => {
      MILESTONES.forEach((m, i) => {
        const card = cardsRef.current[i]
        const stop = stopRefs.current[i]
        if (card) {
          if (p >= m.t - SHOW_BEFORE && p <= m.t + SHOW_AFTER) card.classList.add("show")
          else card.classList.remove("show")
        }
        if (stop) {
          if (p >= m.t - 0.01) stop.classList.add("is-passed")
          else stop.classList.remove("is-passed")
        }
      })
    }

    const tick = () => {
      const lerp = 0.28
      currentRef.current += (targetRef.current - currentRef.current) * lerp
      const idx = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(currentRef.current * (FRAME_COUNT - 1)))
      )
      drawFrame(idx)
      applyMilestones(currentRef.current)
      if (Math.abs(targetRef.current - currentRef.current) > 0.0005) {
        rafRef.current = window.requestAnimationFrame(tick)
      } else {
        currentRef.current = targetRef.current
        applyMilestones(currentRef.current)
        rafRef.current = null
      }
    }

    const wake = () => {
      targetRef.current = computeProgress()
      if (rafRef.current === null) rafRef.current = window.requestAnimationFrame(tick)
    }

    const onScroll = () => wake()
    const onResize = () => {
      drawnIndexRef.current = -1
      wake()
    }

    wake()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <>
      {/* ── ROAD SCRUB ── */}
      <div ref={containerRef} className="pj-road-scroll" id="road">
        <div className="pj-road-sticky">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pj-road-canvas"
          />

          {/* Sidebar — journey stops */}
          <ol className="pj-stop-list" aria-label="Journey stops">
            {MILESTONES.map((m, i) => (
              <li
                key={i}
                ref={(el) => { stopRefs.current[i] = el }}
                className="pj-stop-item"
              >
                <span className="pj-stop-num">Step {String(i + 1).padStart(2, "0")}</span>
                <span className="pj-stop-title">{m.title}</span>
              </li>
            ))}
          </ol>

          {/* Right-side milestone cards */}
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="pj-mc"
              data-zone={m.title}
            >
              <div className="pj-mc-head">
                <span className="pj-mc-num">Step {String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="pj-mc-title">{m.title}</div>
              <p className="pj-mc-desc">{m.desc}</p>
              <div className="pj-mc-foot">
                <span className="dot" aria-hidden="true" />
                {m.foot}
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
