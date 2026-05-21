"use client"

import { useEffect, useState } from "react"

export function ScrollHint() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const threshold = () => Math.max(120, window.innerHeight * 0.18)
    const onScroll = () => setHidden(window.scrollY > threshold())
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const onClick = () => {
    window.scrollBy({
      top: window.innerHeight * 0.85,
      behavior: "smooth",
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll down"
      className={["scroll-hint", hidden ? "is-hidden" : ""].join(" ")}
    >
      <span className="scroll-hint-label">Scroll</span>
      <svg
        className="scroll-hint-arrow"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 5v14" />
        <path d="m6 13 6 6 6-6" />
      </svg>
    </button>
  )
}
