"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

type PatientProcedureRevealProps = {
  rootSelector: string
  itemSelector: string
}

export function PatientProcedureReveal({
  rootSelector,
  itemSelector,
}: PatientProcedureRevealProps) {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector)
    if (!root) return

    root.classList.add("is-reveal-enabled")

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>(itemSelector))
    revealItems.forEach((item) => item.classList.remove("is-loaded"))

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-loaded"))
      return
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add("is-loaded")
          activeObserver.unobserve(entry.target)
        })
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      }
    )

    const frameId = window.requestAnimationFrame(() => {
      revealItems.forEach((item) => observer.observe(item))
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [itemSelector, pathname, rootSelector])

  return null
}
