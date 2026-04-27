"use client"

import { SiteHeader } from "@/components/site-header"
import { useEffect, useRef, useState } from "react"

const HEADLINE = "Where precision meets care."
const HEADLINE_LETTERS = Array.from(HEADLINE)

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [settled, setSettled] = useState(false)

  /* Intersection observer — reveal elements below hero */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("in-view")
        ),
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
   *   `settled` state reveals the supporting copy and actions.
   */
  useEffect(() => {
    const video = videoRef.current
    const text = textRef.current
    if (!video || !text) return

    let raf: number
    let done = false
    let visibleLetterCount = 0
    const letters = Array.from(text.querySelectorAll<HTMLElement>(".hero-letter"))

    const revealLetters = (count: number) => {
      const nextCount = Math.min(letters.length, Math.max(0, count))
      if (nextCount <= visibleLetterCount) return

      for (let i = visibleLetterCount; i < nextCount; i += 1) {
        letters[i]?.classList.add("is-visible")
      }

      visibleLetterCount = nextCount
    }

    const tick = () => {
      if (!video.duration) {
        raf = requestAnimationFrame(tick)
        return
      }

      const p = video.currentTime / video.duration

      if (p >= 0.5 && !done) {
        done = true
        video.pause()
        text.style.transform = "translateX(0)"
        text.style.filter = "none"
        text.style.opacity = "1"
        revealLetters(letters.length)
        setSettled(true)
        return
      }

      if (!done) {
        const x = -18 + p * 36 // -18vw → 0vw
        const blur = 12 * Math.max(0, 1 - p * 2) // 12px → 0px
        const letterProgress = Math.min(1, Math.max(0, (p - 0.04) / 0.42))
        text.style.transform = `translateX(${x}vw)`
        text.style.filter = `blur(${blur}px)`
        text.style.opacity = String(Math.min(1, p / 0.06)) // quick fade-in
        revealLetters(Math.ceil(letterProgress * letters.length))
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <SiteHeader overlay />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="section hero">
        {/* B&W video — no loop, pauses at midpoint */}
        <video ref={videoRef} className="hero-video" autoPlay muted playsInline>
          <source src="/media/home/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        {/* Text block — JS positions this; .settled class drives letter animations */}
        <div
          className={["hero-text-track", settled ? "settled" : ""]
            .filter(Boolean)
            .join(" ")}
          ref={textRef}
          style={{ opacity: 0 }}
        >
          <h1 className="hero-headline" aria-label={HEADLINE}>
            {HEADLINE_LETTERS.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                className={letter === " " ? "hero-letter space" : "hero-letter"}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <p className="hero-sub">
            Evidence-based pain management delivered by a multidisciplinary team
            of specialists. Covered by OHIP when referred.
          </p>
          <div className="hero-actions">
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
