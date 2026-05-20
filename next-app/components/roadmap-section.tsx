"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const FRAME_COUNT = 149
const FRAME_PATH = (i: number) =>
  `/media/road-scrub-frames-optimized/f${String(i).padStart(3, "0")}.webp`
const MAX_CANVAS_WIDTH = 1440
const SCRUB_LERP = 0.115
const SCRUB_SETTLE_EPSILON = 0.00025

// Five milestone stops, evenly tiled across the scrub. Each card owns a
// segment of progress with a small cross-fade overlap.
const MILESTONES = [
  {
    title: "GP referral",
    titleLines: ["GP", "referral"],
    desc: "Ask your family physician for a referral. FOH EXEMPT",
    cta: { href: "/referrals", label: "Referral form" },
  },
  {
    title: "Initial consultation",
    titleLines: ["Initial", "consultation"],
    desc: "A specialist reviews your history, symptoms, and imaging — without rush or assumptions. The conversation that should have happened sooner.",
  },
  {
    title: "Image-guided intervention",
    titleLines: ["Image-guided", "intervention"],
    desc: "Image-guided intervention, regenerative therapy, and integrated care — delivered at the source, with millimetric precision.",
  },
  {
    title: "Multidisciplinary review",
    titleLines: ["Multidisciplinary", "review"],
    desc: "Your case is assessed across five specialties before any path is proposed. Five sets of eyes; one coherent plan.",
  },
  {
    title: "Monitoring & adjustment",
    titleLines: ["Monitoring &", "adjustment"],
    desc: "Regular follow-ups track your progress and adjust your plan based on real outcomes. Care that doesn't end at the procedure.",
  },
].map((m, i, arr) => {
  // segment center; used for sidebar "is-passed" cue
  const t = (i + 0.5) / arr.length
  return { ...m, t }
})

const CARD_FADE = 0.065 // fade-in/out width on each side of a card's segment

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
  const drawnFrameRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const containerEl = containerRef.current
    let disposed = false
    const wakeTimers: number[] = []

    const findNearestLoadedFrame = (index: number) => {
      const frames = framesRef.current
      const maxDistance = frames.length - 1

      for (let distance = 0; distance <= maxDistance; distance++) {
        const before = index - distance
        const after = index + distance
        const beforeImg = frames[before]
        const afterImg = frames[after]

        if (beforeImg?.complete && beforeImg.naturalWidth > 0) return before
        if (afterImg?.complete && afterImg.naturalWidth > 0) return after
      }

      return -1
    }

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      if (cw <= 0 || ch <= 0) return

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25)
      const targetW = Math.round(Math.min(cw * pixelRatio, MAX_CANVAS_WIDTH))
      const targetH = Math.round(targetW * (ch / cw))

      if (canvas.width !== targetW) canvas.width = targetW
      if (canvas.height !== targetH) canvas.height = targetH

      canvasSizeRef.current = { width: targetW, height: targetH }
      drawnFrameRef.current = -1
    }

    const drawImageCover = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      width: number,
      height: number
    ) => {
      const ir = img.naturalWidth / img.naturalHeight
      const cr = width / height
      let dw = width
      let dh = height

      if (ir > cr) dw = height * ir
      else dh = width / ir

      const dx = (width - dw) / 2
      const dy = (height - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    const drawScrubFrame = (progress: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const exactFrame = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, progress * (FRAME_COUNT - 1))
      )
      if (Math.abs(drawnFrameRef.current - exactFrame) < 0.003) return

      const baseIndex = Math.floor(exactFrame)
      const nextIndex = Math.min(FRAME_COUNT - 1, baseIndex + 1)
      let baseImg = framesRef.current[baseIndex]
      let nextImg: HTMLImageElement | undefined = framesRef.current[nextIndex]
      let canBlend = true

      if (!baseImg?.complete || baseImg.naturalWidth === 0) {
        const fallbackIndex = findNearestLoadedFrame(baseIndex)
        if (fallbackIndex < 0) return
        baseImg = framesRef.current[fallbackIndex]
        nextImg = undefined
        canBlend = false
      }

      const ctx = ctxRef.current ?? canvas.getContext("2d", { alpha: false })
      if (!ctx) return
      ctxRef.current = ctx
      if (!canvasSizeRef.current.width || !canvasSizeRef.current.height) {
        resizeCanvas()
      }
      const { width: targetW, height: targetH } = canvasSizeRef.current
      if (!targetW || !targetH) return
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "low"

      ctx.globalAlpha = 1
      drawImageCover(ctx, baseImg, targetW, targetH)

      const blend = exactFrame - baseIndex
      if (
        canBlend &&
        blend > 0.001 &&
        nextImg?.complete &&
        nextImg.naturalWidth > 0
      ) {
        ctx.globalAlpha = blend
        drawImageCover(ctx, nextImg, targetW, targetH)
        ctx.globalAlpha = 1
      }

      drawnFrameRef.current = exactFrame
    }

    const computeProgress = () => {
      const container = containerRef.current
      if (!container) return 0
      const rect = container.getBoundingClientRect()
      const viewport = window.innerHeight
      const drawerDistance = viewport * 1.65
      const entering =
        rect.top > 0 && rect.top < drawerDistance && rect.bottom > viewport
      const drawerProgress = entering
        ? Math.max(0, Math.min(1, 1 - rect.top / drawerDistance))
        : 1
      const drawer = entering ? 1 - smoothstep(0, 1, drawerProgress) : 0
      container.classList.toggle("is-prepinned", entering)
      container.style.setProperty("--pj-road-drawer", `${drawer * 100}%`)
      // Keep the entry handoff on step one. The scrub starts once the road
      // reaches the top of the viewport, then finishes as the sticky releases.
      const scrubLength = rect.height - viewport
      if (scrubLength <= 0) return 0
      return Math.max(0, Math.min(1, -rect.top / scrubLength))
    }

    const applyMilestones = (p: number) => {
      const n = MILESTONES.length
      MILESTONES.forEach((m, i) => {
        const start = i / n
        const end = (i + 1) / n
        // Crossfade at segment boundaries: each card is fully visible across
        // its segment, fading in over [start-fade, start] and out over
        // [end-fade, end] so neighbours cross smoothly with no dark gap.
        const fadeIn = i === 0 ? 1 : smoothstep(start - CARD_FADE, start, p)
        const fadeOut =
          i === n - 1 ? 1 : 1 - smoothstep(end - CARD_FADE, end, p)
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
          progressItem.style.setProperty("--pj-step-fill", String(stepFill))
          progressItem.classList.toggle("is-passed", p >= end)
          progressItem.classList.toggle(
            "is-active",
            p >= start && (p < end || i === n - 1)
          )
        }
      })
    }

    const tick = () => {
      currentRef.current +=
        (targetRef.current - currentRef.current) * SCRUB_LERP
      drawScrubFrame(currentRef.current)
      applyMilestones(currentRef.current)
      if (
        Math.abs(targetRef.current - currentRef.current) > SCRUB_SETTLE_EPSILON
      ) {
        rafRef.current = window.requestAnimationFrame(tick)
      } else {
        currentRef.current = targetRef.current
        drawScrubFrame(currentRef.current)
        applyMilestones(currentRef.current)
        rafRef.current = null
      }
    }

    const wake = () => {
      targetRef.current = computeProgress()
      const hasAppliedMilestones = cardsRef.current.some(
        (card) => card?.style.opacity
      )
      if (!hasAppliedMilestones) {
        currentRef.current = targetRef.current
        drawnFrameRef.current = -1
        drawScrubFrame(currentRef.current)
        applyMilestones(currentRef.current)
      }
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = window.requestAnimationFrame(tick)
    }

    const queueWake = () => {
      wake()
      window.requestAnimationFrame(() => {
        if (!disposed) wake()
      })
      ;[80, 250, 600].forEach((delay) => {
        wakeTimers.push(
          window.setTimeout(() => {
            if (!disposed) wake()
          }, delay)
        )
      })
    }

    const onScroll = () => wake()
    const onResize = () => {
      resizeCanvas()
      wake()
    }
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") queueWake()
    }

    const imgs = Array.from({ length: FRAME_COUNT }, () => new Image())
    framesRef.current = imgs
    imgs.forEach((img, index) => {
      img.decoding = "async"
      img.fetchPriority = index < 12 ? "high" : "low"
      img.onload = () => {
        if (disposed) return
        const targetIndex = Math.round(targetRef.current * (FRAME_COUNT - 1))
        if (index === 0 || Math.abs(index - targetIndex) <= 2) {
          drawnFrameRef.current = -1
          wake()
        }
      }
      img.src = FRAME_PATH(index + 1)
    })

    resizeCanvas()
    queueWake()
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    window.addEventListener("pageshow", queueWake)
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => {
      disposed = true
      wakeTimers.forEach((timer) => window.clearTimeout(timer))
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
      imgs.forEach((img) => {
        img.onload = null
      })
      ctxRef.current = null
      containerEl?.classList.remove("is-prepinned")
      containerEl?.style.removeProperty("--pj-road-drawer")
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pageshow", queueWake)
      document.removeEventListener("visibilitychange", onVisibilityChange)
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
                ref={(el) => {
                  progressRefs.current[i] = el
                }}
                className="pj-step-progress-item"
              >
                <span className="pj-step-progress-track" />
                <span className="pj-step-progress-label">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* Full-screen milestone overlays */}
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="pj-mc"
              data-zone={m.title}
            >
              <div className="pj-mc-head">
                <span className="pj-mc-num">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="pj-mc-title">
                {m.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <div className="pj-mc-body">
                <p className="pj-mc-desc">{m.desc}</p>
                {"cta" in m && m.cta ? (
                  <Link href={m.cta.href} className="pj-mc-cta">
                    {m.cta.label}
                    <span className="pj-mc-cta-arrow" aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── OUTRO ── */}
      <section className="pj-outro">
        <div className="pj-outro-inner">
          <h3 className="pj-outro-h">
            Five stops behind you. <em>Now,</em> the treatments that make each
            one possible.
          </h3>
          <a href="#specialties" className="pj-outro-cta">
            Continue · Treatments
          </a>
        </div>
      </section>
    </>
  )
}
