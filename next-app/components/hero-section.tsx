"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import HeroText from "@/components/ui/hero-shutter-text"
import { useCallback, useEffect, useRef, useState } from "react"

const HEADLINE = "Where precision meets care."

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [settled, setSettled] = useState(false)
  const handleShutterComplete = useCallback(() => setSettled(true), [])

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let raf: number
    let done = false

    const tick = () => {
      if (!video.duration) {
        raf = requestAnimationFrame(tick)
        return
      }

      if (video.currentTime / video.duration >= 0.5 && !done) {
        done = true
        video.pause()
        return
      }

      if (!done) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <SiteHeader overlay />

      <section className="section hero">
        <video ref={videoRef} className="hero-video" autoPlay muted playsInline>
          <source src="/media/home/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />

        <div className="hero-text-track">
          <h1 className="sr-only">{HEADLINE}</h1>
          <HeroText
            text={HEADLINE}
            showControls={false}
            onAnimationComplete={handleShutterComplete}
            className="h-auto min-h-0 max-w-[300px] items-start justify-center bg-transparent px-0 dark:bg-transparent md:max-w-none"
            contentClassName="items-start px-0"
            lineClassName="justify-start md:flex-nowrap"
            textClassName="hero-shutter-headline text-[40px] font-semibold uppercase tracking-normal text-vanilla [text-shadow:0_6px_64px_rgba(20,14,8,0.78),0_2px_14px_rgba(20,14,8,0.58)] md:text-[clamp(28px,3.25vw,52px)]"
          />

          <div className={["hero-support", settled ? "is-visible" : ""].join(" ")}>
              <p className="hero-sub">
                Evidence-based pain management delivered by a multidisciplinary
                team of specialists. Covered by OHIP when referred.
              </p>
              <div className="hero-actions">
                <Link href="/contact-us" className="btn-primary">
                  Request a Consultation
                </Link>
                <a href="#specialties" className="btn-ghost">
                  Our Specialties
                </a>
              </div>
          </div>
        </div>

      </section>
    </>
  )
}
