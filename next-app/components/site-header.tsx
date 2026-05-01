"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const NAV_ITEMS = [
  { href: "/patient-procedures", label: "Patient Procedures" },
  { href: "/doctors", label: "Doctors" },
  { href: "/locations", label: "Locations" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/referrals", label: "Referrals" },
]

type SiteHeaderProps = {
  overlay?: boolean
}

export function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(!overlay)
  const [inRoadmap, setInRoadmap] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(true)
  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    if (!overlay) return

    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [overlay])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrollingDown(y >= lastY)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const roadEl = document.querySelector(".pj-road-scroll")
    if (!roadEl) return
    const obs = new IntersectionObserver(
      ([entry]) => setInRoadmap(entry.isIntersecting),
      { threshold: 0.01 }
    )
    obs.observe(roadEl)
    return () => obs.disconnect()
  }, [])

  if (inRoadmap && scrollingDown) {
    return (
      <button
        className="nav-back-arrow"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>
    )
  }

  const navClassName = [
    "nav",
    scrolled ? "scrolled" : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <nav className={navClassName}>
      <Link href="/" className="nav-logo">
        <Image
          src="/media/logo/Logo.png"
          alt="Precision Pain Centre"
          width={96}
          height={64}
          sizes="64px"
          priority
          className="nav-logo-img"
        />
        <span className="nav-logo-name">Precision Care Centre</span>
      </Link>

      <div className="nav-right">
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActivePath(item.href) ? "is-active" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="tel:2897529388" className="nav-cta">
          289-752-9388
        </a>

        <button
          type="button"
          className="nav-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="site-mobile-nav"
        className={["mobile-nav", menuOpen ? "is-open" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "mobile-nav-link",
                isActivePath(item.href) ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a href="tel:2897529388" className="mobile-nav-cta">
          Call 289-752-9388
        </a>
      </div>
    </nav>
  )
}
