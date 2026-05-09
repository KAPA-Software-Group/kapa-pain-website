"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const PROCEDURE_GROUPS = [
  {
    label: "Assessment & Planning",
    items: [
      {
        href: "/patient-procedures/chronic-pain-assessment-medical-management",
        label: "Chronic Pain Assessment",
      },
    ],
  },
  {
    label: "Nerve & Spine",
    items: [
      { href: "/patient-procedures/nerve-hydrodissection", label: "Nerve Hydrodissection" },
      { href: "/patient-procedures/nerve-blocks-diagnostic-injections", label: "Nerve Blocks & Diagnostic Injections" },
      { href: "/patient-procedures/radiofrequency-ablation", label: "Radiofrequency Ablation" },
      { href: "/patient-procedures/epidural-injections", label: "Epidural Injections" },
    ],
  },
  {
    label: "Joint & Specialized",
    items: [
      { href: "/patient-procedures/arthritis-joint-injections", label: "Arthritis Joint Injections" },
      { href: "/patient-procedures/stellate-ganglion-block", label: "Stellate Ganglion Block" },
      { href: "/patient-procedures/advanced-specialized-procedures", label: "Advanced & Specialized Procedures" },
    ],
  },
]

const SERVICES_ITEMS = [
  { href: "/services/image-guided-procedures", label: "Image Guided Procedures" },
  { href: "/services/regenerative-sports-therapy", label: "Regenerative & Sports Therapy" },
  { href: "/services/medication-management", label: "Medication Management" },
  { href: "/services/fluoroscopy", label: "Fluoroscopy" },
]

const NAV_ITEMS = [
  { href: "/patient-procedures", label: "Patient Procedures", dropdown: "procedures" as const },
  { href: "/services", label: "Services", dropdown: "services" as const },
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
          <path d="M7 12V2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 6.5L7 2.5L11 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Top
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
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <li key={item.href} className="nav-dropdown-item">
                <Link
                  href={item.href}
                  className={isActivePath(item.href) ? "is-active" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <svg
                    className="nav-chevron"
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1L4.5 5L8 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <div
                  className={[
                    "nav-dropdown",
                    item.dropdown === "procedures"
                      ? "nav-dropdown-procedures"
                      : "nav-dropdown-services",
                  ].join(" ")}
                  role="menu"
                >
                  {item.dropdown === "procedures" ? (
                    PROCEDURE_GROUPS.map((group) => (
                      <div key={group.label} className="nav-dropdown-group">
                        <span className="nav-dropdown-group-label">{group.label}</span>
                        <ul className="nav-dropdown-list">
                          {group.items.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className={pathname === sub.href ? "is-active" : undefined}
                                onClick={() => setMenuOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="nav-dropdown-group">
                      <span className="nav-dropdown-group-label">Services</span>
                      <ul className="nav-dropdown-list">
                        {SERVICES_ITEMS.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={pathname === sub.href ? "is-active" : undefined}
                              onClick={() => setMenuOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActivePath(item.href) ? "is-active" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
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
        className={["mobile-nav", menuOpen ? "is-open" : ""].filter(Boolean).join(" ")}
      >
        <div className="mobile-nav-links">
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.href} className="mobile-nav-procedure">
                <Link
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
                <div className="mobile-nav-sublinks">
                  {item.dropdown === "procedures" ? (
                    PROCEDURE_GROUPS.map((group) => (
                      <div key={group.label} className="mobile-nav-subgroup">
                        <span className="mobile-nav-subgroup-label">{group.label}</span>
                        {group.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={[
                              "mobile-nav-sublink",
                              pathname === sub.href ? "is-active" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => setMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))
                  ) : (
                    <div className="mobile-nav-subgroup">
                      {SERVICES_ITEMS.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={[
                            "mobile-nav-sublink",
                            pathname === sub.href ? "is-active" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
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
            )
          )}
        </div>
        <Link href="/contact-us" className="mobile-nav-cta">
          Contact the Clinic
        </Link>
      </div>
    </nav>
  )
}
