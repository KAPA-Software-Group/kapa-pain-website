"use client"

import { useEffect, useState } from "react"

type SideNavItem = {
  id: string
  title: string
}

type ProcedureSideNavProps = {
  items: SideNavItem[]
}

export function ProcedureSideNav({ items }: ProcedureSideNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "")
  const [onDark, setOnDark] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (items.length === 0) return

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const darkSelectors = [".procedure-cta-section"]
    const darkElements = darkSelectors.flatMap((sel) =>
      Array.from(document.querySelectorAll<HTMLElement>(sel)),
    )
    const heroEl = document.querySelector<HTMLElement>(".procedure-hero")

    const update = () => {
      const probeY = window.innerHeight / 2

      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom
        setIsVisible(heroBottom <= 80)
      } else {
        setIsVisible(window.scrollY > 200)
      }

      if (elements.length > 0) {
        const offset = window.innerHeight * 0.3
        let current = elements[0].id
        for (const el of elements) {
          const top = el.getBoundingClientRect().top
          if (top - offset <= 0) {
            current = el.id
          } else {
            break
          }
        }
        setActiveId(current)
      }

      const overDark = darkElements.some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= probeY && r.bottom >= probeY
      })
      setOnDark(overDark)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <aside
      className={`procedure-side-nav${onDark ? " on-dark" : ""}${
        isVisible ? " is-visible" : ""
      }${isCollapsed ? " is-collapsed" : ""}`}
      aria-label="On this page"
      aria-hidden={!isVisible}
    >
      <button
        type="button"
        className="procedure-side-nav-toggle"
        onClick={() => setIsCollapsed((prev) => !prev)}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? "Expand section navigation" : "Collapse section navigation"}
      >
        <span className="procedure-side-nav-toggle-arrow" aria-hidden="true" />
      </button>
      <div className="procedure-side-nav-body">
        <ul className="procedure-side-nav-list">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`procedure-side-nav-link${
                    isActive ? " is-active" : ""
                  }`}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={isCollapsed ? -1 : undefined}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
