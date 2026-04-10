"use client"

import { useEffect, useRef, useState } from "react"

const HEADLINE = "Where precision meets care."
const CHAR_DELAY = 32        // ms stagger between each letter
const CHAR_DURATION = 520    // ms per letter animation
const ALL_DONE_MS = (HEADLINE.length - 1) * CHAR_DELAY + CHAR_DURATION

export function HeroSection() {
  const navRef   = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef  = useRef<HTMLDivElement>(null)
  const [settled, setSettled] = useState(false)

  /* Nav: transparent → mahogany on scroll */
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Intersection observer — reveal elements below hero */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /*
   * Phase 1 — TRACKING (p: 0 → 0.5)
   *   Text drifts from -18vw → 0 following the runner.
   *   Container blur fades 12px → 0 as it approaches centre.
   *
   * Phase 2 — SETTLED (p = 0.5)
   *   Video pauses. Text locked at centre.
   *   `settled` state triggers letter-by-letter ribbon animation.
   */
  useEffect(() => {
    const video = videoRef.current
    const text  = textRef.current
    if (!video || !text) return

    let raf: number
    let done = false

    const tick = () => {
      if (!video.duration) { raf = requestAnimationFrame(tick); return }

      const p = video.currentTime / video.duration

      if (p >= 0.5 && !done) {
        done = true
        video.pause()
        text.style.transform  = "translateX(0)"
        text.style.filter     = "none"
        text.style.opacity    = "1"
        setSettled(true)
        return
      }

      if (!done) {
        const x    = -18 + p * 36                  // -18vw → 0vw
        const blur = 12 * Math.max(0, 1 - p * 2)  // 12px → 0px
        text.style.transform = `translateX(${x}vw)`
        text.style.filter    = `blur(${blur}px)`
        text.style.opacity   = String(Math.min(1, p / 0.06)) // quick fade-in
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {/* ─── NAV ──────────────────────────────────────────── */}
      <nav ref={navRef} className="nav">
        <a href="#" className="nav-logo">Precision Pain Centre</a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#specialties">Specialties</a></li>
            <li><a href="#conditions">Conditions</a></li>
            <li><a href="#locations">Locations</a></li>
          </ul>
          <a href="tel:2897529388" className="nav-cta">289-752-9388</a>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="section hero" style={{ scrollSnapAlign: "start" }}>

        {/* B&W video — no loop, pauses at midpoint */}
        <video ref={videoRef} className="hero-video" autoPlay muted playsInline>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        {/* Text block — JS positions this; .settled class drives letter animations */}
        <div
          className={`hero-text-track${settled ? " settled" : ""}`}
          ref={textRef}
          style={{ opacity: 0 }}
        >

          {/* Phase 1: solid blurred text drifts with runner */}
          {/* Phase 2: swapped for per-character ribbon animation */}
          <h1 className="hero-headline">
            {!settled
              ? HEADLINE
              : HEADLINE.split("").map((char, i) => (
                  <span
                    key={i}
                    className="hero-char"
                    style={{ animationDelay: `${i * CHAR_DELAY}ms` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))
            }
          </h1>

          {/* Label, sub, actions appear after all letters land */}
          <p
            className="hero-sub"
            style={{ animationDelay: `${ALL_DONE_MS + 180}ms` }}
          >
            Evidence-based pain management delivered by a multidisciplinary
            team of specialists. Covered by OHIP when referred.
          </p>
          <div
            className="hero-actions"
            style={{ animationDelay: `${ALL_DONE_MS + 360}ms` }}
          >
            <a href="tel:2897529388" className="btn-primary">
              Request a Consultation
            </a>
            <a href="#specialties" className="btn-ghost">
              Our Specialties
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
