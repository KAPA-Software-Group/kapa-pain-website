"use client"

import Link from "next/link"
import Image from "next/image"
import { Fragment, useEffect, useRef, useState } from "react"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Our Doctors" },
  { href: "/locations", label: "Locations" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/faq", label: "FAQ's" },
  { href: "/referrals", label: "Referrals" },
]

const SERVICE_LINKS = [
  { href: "/services/image-guided-procedures", label: "Image-Guided Procedures" },
  { href: "/services/landmark-injections", label: "Landmark Injections" },
  { href: "/services/regenerative-sports-therapy", label: "Regenerative & Sports Therapy" },
  { href: "/services/medication-management", label: "Medication Management" },
  { href: "/services/fluoroscopy", label: "Fluoroscopy" },
]

const LOCATIONS = [
  {
    city: "Brampton",
    address: ["18 Kensington Road, Unit 200 & 502", "Brampton, ON  L6T 4S5"],
  },
  {
    city: "Hamilton",
    address: ["25 Charlton Ave E, Unit 101", "Hamilton, ON  L8N 1Y2"],
  },
]

const HOURS = [
  { day: "Mon – Fri", time: "9:00 am – 5:00 pm" },
  { day: "Saturday", time: "Select dates" },
  { day: "Sunday", time: "Closed" },
]

export function SiteFooter() {
  const [open, setOpen] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      footerRef.current?.scrollIntoView({ block: "end" })
      return
    }

    let animationFrame = 0
    const startedAt = performance.now()
    const duration = 520

    const keepFooterBottomInView = (now: number) => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "instant",
      })

      if (now - startedAt < duration) {
        animationFrame = requestAnimationFrame(keepFooterBottomInView)
      }
    }

    animationFrame = requestAnimationFrame(keepFooterBottomInView)

    return () => cancelAnimationFrame(animationFrame)
  }, [open])

  return (
    <footer ref={footerRef} className={`sf${open ? " sf--open" : ""}`}>

      {/* Expandable panel */}
      <div className="sf-panel" id="clinic-info" aria-hidden={!open}>
        <div className="sf-panel-inner">

          <div className="sf-col">
            <p className="sf-col-label">Navigate</p>
            <ul className="sf-list">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="sf-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sf-col">
            <p className="sf-col-label">Services</p>
            <ul className="sf-list">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="sf-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sf-col">
            <p className="sf-col-label">Locations</p>
            {LOCATIONS.map((loc, i) => (
              <div key={loc.city} className={`sf-loc${i > 0 ? " sf-loc-second" : ""}`}>
                <p className="sf-loc-city">{loc.city}</p>
                <address className="sf-loc-addr">
                  {loc.address.map((line, j) => <span key={j}>{line}</span>)}
                </address>
                <dl className="sf-hours">
                  {HOURS.map((h) => (
                    <Fragment key={`${loc.city}-${h.day}`}>
                      <dt>{h.day}</dt>
                      <dd>{h.time}</dd>
                    </Fragment>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="sf-col">
            <p className="sf-col-label">Contact</p>
            <a href="tel:2897529388" className="sf-contact-phone">289-752-9388</a>
            <span className="sf-contact-fax">Fax: 289-800-9399</span>
          </div>

        </div>
      </div>

      {/* Always-visible bar */}
      <div className="sf-bar">
        <Link href="/" className="sf-logo">
          <Image
            src="/media/logo/Logo.png"
            alt="Precision Care Centre"
            width={36}
            height={24}
            className="sf-logo-img"
          />
          <span className="sf-logo-name">Precision Care Centre</span>
        </Link>

        <div className="sf-bar-meta">
          <a href="tel:2897529388" className="sf-bar-phone">289-752-9388</a>
          <span className="sf-bar-sep" aria-hidden="true" />
          <span className="sf-bar-locs">Brampton &nbsp;·&nbsp; Hamilton</span>
        </div>

        <div className="sf-bar-right">
          <span className="sf-bar-copy">
            &copy; {new Date().getFullYear()} Precision Care Centre
          </span>
          <button
            type="button"
            className="sf-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="clinic-info"
          >
            <span className="sf-toggle-icon" aria-hidden="true" />
            {open ? "Close" : "Clinic Info"}
          </button>
        </div>
      </div>

    </footer>
  )
}
