"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const NAV_ITEMS = [
  { href: "/services", label: "Services" },
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
  const [scrolled, setScrolled] = useState(
    () => !overlay || (typeof window !== "undefined" && window.scrollY > 60)
  )

  useEffect(() => {
    if (!overlay) {
      return
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [overlay])

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
        Precision Pain Centre
      </Link>

      <div className="nav-right">
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? "is-active" : undefined}
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
                pathname === item.href ? "is-active" : "",
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
