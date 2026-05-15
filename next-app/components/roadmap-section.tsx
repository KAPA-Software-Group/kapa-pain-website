"use client"

import { useEffect, useRef } from "react"

const FRAME_COUNT = 149
const FRAME_PATH = (i: number) =>
  `/media/road-scrub-frames/f${String(i).padStart(3, "0")}.webp`

// Six milestone stops, evenly tiled across the scrub. Each card owns a
// segment of progress: [i/6 .. (i+1)/6] with a small cross-fade overlap.
const MILESTONES = [
  { title: "GP referral",              titleLines: ["GP", "referral"],                  desc: "Ask your family physician for a referral. Most treatments are covered by OHIP once referred — no out-of-pocket starting line." },
  { title: "Initial consultation",     titleLines: ["Initial", "consultation"],         desc: "A specialist reviews your history, symptoms, and imaging — without rush or assumptions. The conversation that should have happened sooner." },
  { title: "Multidisciplinary review", titleLines: ["Multidisciplinary", "review"],     desc: "Your case is assessed across five specialties before any path is proposed. Five sets of eyes; one coherent plan." },
  { title: "Personalised care plan",   titleLines: ["Personalised", "care plan"],       desc: "A strategy built around your condition and response — a plan, not a protocol. Adjusted as we learn what your body answers to." },
  { title: "Treatment & procedures",   titleLines: ["Treatment &", "procedures"],       desc: "Image-guided injections, regenerative therapy, and integrated care — delivered at the source, with millimetric precision." },
  { title: "Monitoring & adjustment",  titleLines: ["Monitoring &", "adjustment"],      desc: "Regular follow-ups track your progress and adjust your plan based on real outcomes. Care that doesn't end at the procedure." },
].map((m, i, arr) => {
  // segment center; used for sidebar "is-passed" cue
  const t = (i + 0.5) / arr.length
  return { ...m, t }
})

const CARD_FADE = 0.04 // fade-in/out width on each side of a card's segment

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export function RoadmapSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const drawnIndexRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const containerEl = containerRef.current
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
      const drawerDistance = viewport * 1.65
      const entering = rect.top > 0 && rect.top < drawerDistance && rect.bottom > viewport
      const drawerProgress = entering
        ? Math.max(0, Math.min(1, 1 - rect.top / drawerDistance))
        : 1
      const drawer = entering ? 1 - smoothstep(0, 1, drawerProgress) : 0
      container.classList.toggle("is-prepinned", entering)
      container.style.setProperty("--pj-road-drawer", `${drawer * 100}%`)
      // Include the full-screen handoff in the scrub range. The road is
      // fixed while entering, then sticky until its bottom reaches the
      // viewport bottom, so progress spans that whole visible lock.
      const scrubLength = rect.height
      if (scrubLength <= 0) return 0
      return Math.max(0, Math.min(1, (viewport - rect.top) / scrubLength))
    }

    const applyMilestones = (p: number) => {
      const n = MILESTONES.length
      MILESTONES.forEach((m, i) => {
        const start = i / n
        const end = (i + 1) / n
        // Crossfade at segment boundaries: each card is fully visible across
        // its segment, fading in over [start-fade, start] and out over
        // [end-fade, end] so neighbours cross smoothly with no dark gap.
        const fadeIn = smoothstep(start - CARD_FADE, start, p)
        const fadeOut = 1 - smoothstep(end - CARD_FADE, end, p)
        const alpha = Math.max(0, Math.min(1, fadeIn * fadeOut))
        const card = cardsRef.current[i]
        if (card) {
          card.style.opacity = String(alpha)
          card.style.transform = `translateY(${(1 - alpha) * 32}px)`
          card.style.pointerEvents = alpha > 0.5 ? "auto" : "none"
        }
        const progressItem = progressRefs.current[i]
        if (progressItem) {
          const stepFill = Math.max(0, Math.min(1, (p - start) / (end - start)))
          progressItem.style.setProperty("--pj-step-fill", `${stepFill * 100}%`)
          progressItem.classList.toggle("is-passed", p >= end)
          progressItem.classList.toggle("is-active", p >= start && p < end)
        }
      })
    }

    const tick = () => {
      // Smooth, cinematic scrub: lower damping avoids frame jumps on wheel/touchpad input.
      const lerp = 0.18
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
      containerEl?.classList.remove("is-prepinned")
      containerEl?.style.removeProperty("--pj-road-drawer")
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

          {/* Step progress */}
          <div className="pj-step-progress" aria-label="Journey progress">
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                ref={(el) => { progressRefs.current[i] = el }}
                className="pj-step-progress-item"
              >
                <span className="pj-step-progress-track" />
                <span className="pj-step-progress-label">Step {String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          {/* Full-screen milestone overlays */}
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
              <div className="pj-mc-title">
                {m.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <p className="pj-mc-desc">{m.desc}</p>
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
