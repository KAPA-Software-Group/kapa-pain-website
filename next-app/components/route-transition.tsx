"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

const COVER_MS = 460
const CLEAR_MS = 720

export function RouteTransition() {
  const pathname = usePathname()
  const veilRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const lastPath = useRef(pathname)
  const clearTimerRef = useRef<number | null>(null)
  const cleanupTimerRef = useRef<number | null>(null)

  // When pathname actually changes, hold the cover then play the clear.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      lastPath.current = pathname
      return
    }
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    const veil = veilRef.current
    if (!veil) return

    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current)
    if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current)

    // Make sure we're in covering state (in case the click handler missed)
    if (!veil.classList.contains("covering")) {
      veil.classList.remove("clearing")
      void veil.offsetWidth
      veil.classList.add("covering")
    }

    window.scrollTo({ top: 0, left: 0 })

    clearTimerRef.current = window.setTimeout(() => {
      veil.classList.remove("covering")
      veil.classList.add("clearing")
      cleanupTimerRef.current = window.setTimeout(() => {
        veil.classList.remove("clearing")
      }, CLEAR_MS)
    }, COVER_MS)

    return () => {
      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current)
      if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current)
    }
  }, [pathname])

  // On any internal-link click, start the cover animation in parallel with
  // navigation. We do NOT preventDefault — Next.js Link navigates normally,
  // dropdowns/onClick handlers still fire, and the pathname effect above
  // takes over once the new route mounts.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const target = e.target as HTMLElement | null
      if (!target) return
      const a = target.closest("a") as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute("href")
      if (!href) return
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return
      if (a.target && a.target !== "" && a.target !== "_self") return
      if (a.hasAttribute("download")) return
      let url: URL
      try { url = new URL(a.href, window.location.href) } catch { return }
      if (url.host !== window.location.host) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      const veil = veilRef.current
      if (!veil) return
      veil.classList.remove("clearing")
      void veil.offsetWidth
      veil.classList.add("covering")
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <div ref={veilRef} className="pj-cloud-veil pj-cloud-route" aria-hidden="true">
      <div className="pj-cloud-base" />
      <div className="pj-cloud-layer pj-cloud-l1" />
      <div className="pj-cloud-layer pj-cloud-l2" />
      <div className="pj-cloud-layer pj-cloud-l3" />
      <div className="pj-cloud-layer pj-cloud-l4" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/logo/Logo.png" alt="" className="pj-cloud-logo" aria-hidden="true" />
    </div>
  )
}
