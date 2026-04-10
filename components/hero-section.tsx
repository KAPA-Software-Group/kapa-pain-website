"use client"

import { useEffect, useRef } from "react"
import { HeroShaderBg } from "@/components/ui/hero-shader-bg"

export function HeroSection() {
  const navRef = useRef<HTMLElement>(null)

  // Nav: transparent → mahogany on scroll
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 60)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Intersection observer — reveal elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view")
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ─── NAV ──────────────────────────────────────────── */}
      <nav ref={navRef} className="nav">
        <a href="#" className="nav-logo">
          Precision Pain Centre
        </a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#specialties">Specialties</a></li>
            <li><a href="#conditions">Conditions</a></li>
            <li><a href="#locations">Locations</a></li>
          </ul>
          <a href="tel:2897529388" className="nav-cta">
            289-752-9388
          </a>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="section hero" style={{ scrollSnapAlign: "start" }}>
        {/* Shader as absolute background layer */}
        <HeroShaderBg
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />

        {/* Content sits above shader */}
        <div className="hero-inner" style={{ position: "relative", zIndex: 1 }}>
          <p className="hero-label">
            Precision Pain Centre — Brampton &amp; Hamilton
          </p>
          <h1 className="hero-headline">
            Where precision
            <br />
            meets care.
          </h1>
          <p className="hero-sub">
            Evidence-based pain management delivered by a multidisciplinary
            team of specialists. Covered by OHIP when referred.
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
