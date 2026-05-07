"use client"

import { useEffect, useState } from "react"

type QuickFact = {
  label: string
  value: string
}

type ProcedureQuickFactsCarouselProps = {
  facts: QuickFact[]
}

export function ProcedureQuickFactsCarousel({
  facts,
}: ProcedureQuickFactsCarouselProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (facts.length <= 1 || isPaused) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % facts.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [facts.length, isPaused])

  if (facts.length === 0) return null

  return (
    <div
      className="procedure-facts-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="procedure-facts-carousel-stage">
        {facts.length > 1 ? (
          <button
            type="button"
            className="procedure-facts-carousel-arrow procedure-facts-carousel-arrow-prev"
            aria-label="Previous fact"
            onClick={() =>
              setIndex((current) => (current - 1 + facts.length) % facts.length)
            }
          >
            <span aria-hidden="true" />
          </button>
        ) : null}

        <div className="procedure-facts-carousel-viewport">
          <div
            className="procedure-facts-carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className="procedure-facts-carousel-slide"
                aria-hidden={i !== index}
                aria-roledescription="slide"
              >
                <span className="procedure-facts-carousel-label">
                  {fact.label}
                </span>
                <strong className="procedure-facts-carousel-value">
                  {fact.value}
                </strong>
              </div>
            ))}
          </div>
        </div>

        {facts.length > 1 ? (
          <button
            type="button"
            className="procedure-facts-carousel-arrow procedure-facts-carousel-arrow-next"
            aria-label="Next fact"
            onClick={() =>
              setIndex((current) => (current + 1) % facts.length)
            }
          >
            <span aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {facts.length > 1 ? (
        <div
          className="procedure-facts-carousel-dots"
          role="tablist"
          aria-label="Quick facts"
        >
          {facts.map((fact, i) => (
            <button
              key={fact.label}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={fact.label}
              className={`procedure-facts-carousel-dot${
                i === index ? " is-active" : ""
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
