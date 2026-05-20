"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const FRAME_COUNT = 149
const FRAME_PATH = (i: number) =>
  `/media/scroll-hero-frames/f${String(i).padStart(3, "0")}.webp`

const CLOUD_FADE_START = 0.42
const CLOUD_FADE_END = 0.58

const CARE_DISCIPLINES = [
  "Interventional Radiology",
  "Chronic Pain Specialists",
  "Orthopaedic Surgeons",
]

type ScrollHeroProps = { className?: string }

function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export function ScrollHero({ className = "" }: ScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const overlayARef = useRef<HTMLDivElement | null>(null)
  const overlayBRef = useRef<HTMLDivElement | null>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const drawnIndexRef = useRef(-1)
  const rafRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [introIn, setIntroIn] = useState(false)

  useEffect(() => {
    const imgs: HTMLImageElement[] = []
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = "async"
      img.src = FRAME_PATH(i)
      if (i === 1) {
        img.onload = () => {
          drawFrame(0)
          setMounted(true)
          requestAnimationFrame(() => setIntroIn(true))
        }
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
      // scrub completes 1 viewport before the container's bottom so the last
      // frame holds while the next section slides up over it (drawer reveal)
      const scrubLength = rect.height - viewport * 2
      if (scrubLength <= 0) return 0
      return Math.max(0, Math.min(1, -rect.top / scrubLength))
    }

    const applyOverlays = (p: number) => {
      const cloud = smoothstep(CLOUD_FADE_START, CLOUD_FADE_END, p)
      const a = overlayARef.current
      const b = overlayBRef.current
      if (a) {
        a.style.opacity = String(1 - cloud)
        a.style.transform = `translateY(${cloud * -32}px)`
        a.style.pointerEvents = cloud > 0.5 ? "none" : "auto"
        if (cloud < 0.05) a.classList.add("sh-phase-active")
        else a.classList.remove("sh-phase-active")
      }
      if (b) {
        b.style.opacity = String(cloud)
        b.style.transform = `translateY(${(1 - cloud) * 32}px)`
        b.style.pointerEvents = cloud > 0.5 ? "auto" : "none"
        if (cloud > 0.95) b.classList.add("sh-phase-active")
        else b.classList.remove("sh-phase-active")
      }
    }

    const tick = () => {
      const lerp = 0.16
      currentRef.current += (targetRef.current - currentRef.current) * lerp
      const idx = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(currentRef.current * (FRAME_COUNT - 1)))
      )
      drawFrame(idx)
      applyOverlays(currentRef.current)
      if (Math.abs(targetRef.current - currentRef.current) > 0.0005) {
        rafRef.current = window.requestAnimationFrame(tick)
      } else {
        currentRef.current = targetRef.current
        applyOverlays(currentRef.current)
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
    <section
      ref={containerRef}
      className={`sh-root relative w-full ${className}`}
      style={{ height: "600vh", zIndex: 0 }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{
            display: "block",
            opacity: mounted ? 1 : 0,
            transition: "opacity 500ms ease-out",
            willChange: "opacity",
          }}
        />


        {/* ─────────────── PHASE A - Where precision meets care ─────────────── */}
        <div
          ref={overlayARef}
          className={`sh-overlay sh-phase-a ${introIn ? "sh-in" : ""}`}
        >
          {/* bottom row: oversized headline left, meta column right */}
          <div className="sh-bottom">
            <h1 className="sh-headline" aria-label="Where precision meets care.">
              <span className="sh-line"><span>WHERE</span></span>
              <span className="sh-line"><span>PRECISION</span></span>
              <span className="sh-line"><span>MEETS CARE.</span></span>
            </h1>

            <aside className="sh-meta">
              <span className="sh-meta-rule sh-fade-up" />
              <p className="sh-sub sh-fade-up">
                Evidence-based pain management delivered by a multidisciplinary
                team of specialists. Covered by OHIP when referred.
              </p>
              <div className="sh-actions sh-fade-up">
                <Link href="/contact-us" className="sh-btn-primary">
                  Request a Consultation
                  <span className="sh-arrow" aria-hidden>→</span>
                </Link>
                <a href="#specialties" className="sh-btn-ghost">
                  Our Treatments
                </a>
              </div>
            </aside>
          </div>
        </div>

        {/* ─────────────── PHASE B - Pain is complex ─────────────── */}
        <div
          ref={overlayBRef}
          className="sh-overlay sh-phase-b"
          style={{ opacity: 0 }}
        >
          <div className="sh-b-center">
            <p className="sh-b-eyebrow">A MULTIDISCIPLINARY PRACTICE</p>
            <h2 className="sh-portal-h" aria-label="Pain is complex.">
              <span className="sh-portal-line"><span>PAIN IS</span></span>
              <span className="sh-portal-line sh-portal-complex"><span>COMPLEX<span className="sh-dot">.</span></span></span>
            </h2>
            <p className="sh-bridge">WE MAKE THE PATH CLEAR.</p>
          </div>

          <div className="sh-b-bottom">
            <div className="sh-disciplines">
              {CARE_DISCIPLINES.map((d) => (
                <span key={d} className="sh-discipline">{d}</span>
              ))}
            </div>
            <p className="sh-body">
              Five stops. One road. Your story, told the way it actually unfolds - 
              from the bumpy uncertainty of the first referral to the steady
              ground of lasting relief.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(:root) {
          --sh-cream: #f6efe3;
          --sh-cream-soft: rgba(246, 239, 227, 0.78);
          --sh-clay: #e8b27a;
          --sh-ink: #1a140e;
        }

        .sh-overlay {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-rows: 1fr auto;
          padding: clamp(32px, 4.5vw, 64px) clamp(28px, 5.5vw, 96px);
          color: var(--sh-cream);
          will-change: opacity, transform;
          transition: opacity 90ms linear;
        }
        .sh-headline,
        .sh-headline span,
        .sh-sub,
        .sh-b-eyebrow,
        .sh-portal-h,
        .sh-portal-h span,
        .sh-bridge,
        .sh-disciplines,
        .sh-discipline,
        .sh-body {
          background: transparent !important;
          -webkit-backdrop-filter: none;
          backdrop-filter: none;
        }

        /* ── Shared top row ── */
        .sh-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          z-index: 2;
        }
        .sh-kicker {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--sh-cream-soft);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
          display: inline-flex;
          align-items: center;
          gap: 16px;
        }
        .sh-rule {
          display: inline-block;
          width: 36px;
          height: 1px;
          background: rgba(246, 239, 227, 0.45);
        }
        .sh-index {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--sh-cream-soft);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
        }
        .sh-index-num {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.24em;
          color: var(--sh-cream);
        }
        .sh-index-sep {
          display: inline-block;
          width: 18px;
          height: 1px;
          background: rgba(246, 239, 227, 0.4);
        }
        .sh-index-label {
          opacity: 0.78;
        }

        /* ── Phase A bottom layout ── */
        .sh-bottom {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 380px);
          align-items: end;
          gap: clamp(32px, 6vw, 96px);
          padding-bottom: clamp(8px, 2vw, 24px);
        }
        @media (max-width: 900px) {
          .sh-bottom {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* Cinematic display headline */
        .sh-headline {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-weight: 600;
          font-size: clamp(40px, 7.5vw, 116px);
          line-height: 0.94;
          letter-spacing: -0.015em;
          text-transform: uppercase;
          color: var(--sh-cream);
          margin: 0;
          display: flex;
          flex-direction: column;
          text-shadow:
            0 14px 80px rgba(0, 0, 0, 0.5),
            0 2px 14px rgba(0, 0, 0, 0.42);
        }
        .sh-line {
          display: block;
          overflow: hidden;
        }
        .sh-line > span {
          display: inline-block;
          transform: translateY(110%);
          opacity: 0;
          transition:
            transform 1100ms cubic-bezier(0.2, 0.62, 0.2, 1),
            opacity 1100ms cubic-bezier(0.2, 0.62, 0.2, 1);
        }
        .sh-line:nth-child(1) > span { transition-delay: 80ms; }
        .sh-line:nth-child(2) > span { transition-delay: 220ms; }
        .sh-line:nth-child(3) > span { transition-delay: 360ms; }
        .sh-in .sh-line > span {
          transform: translateY(0);
          opacity: 1;
        }
        /* accent line variant removed - uniform uppercase */

        /* Meta column */
        .sh-meta {
          display: flex;
          flex-direction: column;
          gap: 22px;
          padding-bottom: 8px;
        }
        .sh-meta-rule {
          width: 56px;
          height: 1px;
          background: rgba(246, 239, 227, 0.5);
        }
        .sh-sub {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-size: 19px;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(246, 239, 227, 0.9);
          margin: 0;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
          max-width: 38ch;
        }
        .sh-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
          margin-top: 4px;
        }
        .sh-btn-primary {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--sh-ink);
          background: var(--sh-cream);
          padding: 22px 34px 22px 38px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 24px 52px rgba(0, 0, 0, 0.32);
          transition:
            transform 0.4s cubic-bezier(0.2, 0.62, 0.2, 1),
            box-shadow 0.4s cubic-bezier(0.2, 0.62, 0.2, 1),
            background 0.3s;
        }
        .sh-arrow {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.2, 0.62, 0.2, 1);
        }
        .sh-btn-primary:hover {
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.38);
        }
        .sh-btn-primary:hover .sh-arrow {
          transform: translateX(4px);
        }
        .sh-btn-ghost {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(246, 239, 227, 0.88);
          text-decoration: none;
          padding: 2px 0 4px 0;
          border-bottom: 1px solid rgba(246, 239, 227, 0.4);
          transition:
            color 0.3s,
            border-color 0.3s,
            letter-spacing 0.3s;
        }
        .sh-btn-ghost:hover {
          color: var(--sh-cream);
          border-color: var(--sh-cream);
          letter-spacing: 0.24em;
        }

        /* Staggered fade-up helper */
        .sh-fade-up {
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 900ms cubic-bezier(0.2, 0.62, 0.2, 1),
            transform 900ms cubic-bezier(0.2, 0.62, 0.2, 1);
        }
        .sh-top .sh-fade-up:nth-child(1) { transition-delay: 0ms; }
        .sh-top .sh-fade-up:nth-child(2) { transition-delay: 120ms; }
        .sh-meta .sh-fade-up:nth-child(1) { transition-delay: 520ms; }
        .sh-meta .sh-fade-up:nth-child(2) { transition-delay: 620ms; }
        .sh-meta .sh-fade-up:nth-child(3) { transition-delay: 740ms; }
        .sh-in .sh-fade-up {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─────────────── Phase B ─────────────── */
        .sh-phase-b {
          grid-template-rows: 1fr auto;
          align-items: center;
        }
        .sh-b-kicker,
        .sh-b-index {
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 60ms,
            transform 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 60ms;
        }
        .sh-b-index { transition-delay: 160ms; }
        .sh-phase-active .sh-b-kicker,
        .sh-phase-active .sh-b-index {
          opacity: 1;
          transform: translateY(0);
        }

        .sh-b-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0;
          padding: 0 16px;
        }
        .sh-b-eyebrow {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-weight: 500;
          font-size: 11px;
          color: rgba(246, 239, 227, 0.78);
          letter-spacing: 0.34em;
          text-transform: uppercase;
          margin: 0 0 clamp(24px, 3vw, 36px);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 220ms,
            transform 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 220ms;
        }
        .sh-phase-active .sh-b-eyebrow {
          opacity: 1;
          transform: translateY(0);
        }

        .sh-portal-h {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-weight: 600;
          color: var(--sh-cream);
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.92;
          letter-spacing: -0.015em;
          text-transform: uppercase;
          font-size: clamp(48px, 9vw, 140px);
          text-shadow:
            0 14px 80px rgba(0, 0, 0, 0.5),
            0 2px 14px rgba(0, 0, 0, 0.42);
        }
        .sh-portal-line {
          display: block;
          overflow: hidden;
        }
        .sh-portal-line > span { display: inline-block; }
        .sh-portal-complex { color: var(--sh-cream); }
        .sh-dot {
          color: var(--sh-clay);
        }
        .sh-portal-line > span {
          transform: translateY(110%);
          opacity: 0;
          transition:
            transform 1100ms cubic-bezier(0.2, 0.62, 0.2, 1),
            opacity 1100ms cubic-bezier(0.2, 0.62, 0.2, 1);
        }
        .sh-portal-line:nth-child(1) > span { transition-delay: 300ms; }
        .sh-portal-line:nth-child(2) > span { transition-delay: 440ms; }
        .sh-phase-active .sh-portal-line > span {
          transform: translateY(0);
          opacity: 1;
        }

        .sh-bridge {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-weight: 500;
          font-size: clamp(12px, 1.1vw, 14px);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          line-height: 1.4;
          color: rgba(246, 239, 227, 0.86);
          margin: clamp(24px, 3vw, 36px) 0 0 0;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
          max-width: 36ch;
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 1000ms cubic-bezier(0.2, 0.62, 0.2, 1) 700ms,
            transform 1000ms cubic-bezier(0.2, 0.62, 0.2, 1) 700ms;
        }
        .sh-phase-active .sh-bridge {
          opacity: 1;
          transform: translateY(0);
        }

        .sh-b-bottom {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 460px);
          gap: clamp(32px, 6vw, 96px);
          align-items: end;
          padding-top: 32px;
        }
        @media (max-width: 900px) {
          .sh-b-bottom { grid-template-columns: 1fr; gap: 24px; }
        }
        .sh-disciplines {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(246, 239, 227, 0.74);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 820ms,
            transform 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 820ms;
        }
        .sh-discipline { line-height: 1.7; }
        .sh-body {
          font-family: var(--font-sans, "DM Sans", system-ui, sans-serif);
          font-weight: 400;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(246, 239, 227, 0.82);
          margin: 0;
          max-width: 44ch;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 920ms,
            transform 900ms cubic-bezier(0.2, 0.62, 0.2, 1) 920ms;
        }
        .sh-phase-active .sh-disciplines,
        .sh-phase-active .sh-body {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}

export default ScrollHero
